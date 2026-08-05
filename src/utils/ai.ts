import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

interface ApiKeyItem {
  id: number;
  key: string;
  maskedKey: string;
  status: 'ACTIVE' | 'STANDBY' | 'LIMIT';
  lastLimitTime?: number;
}

// Global in-memory pool for API keys across server-side invocations
let keyPool: ApiKeyItem[] = [];
let currentActiveIndex = 0;

function maskKey(key: string): string {
  if (!key || key.length < 8) return '****';
  return `${key.substring(0, 6)}...${key.substring(key.length - 4)}`;
}

function readEnvFile(): Record<string, string> {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const env: Record<string, string> = {};
      content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          let key = match[1];
          let value = match[2] || '';
          if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
          if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
          env[key] = value.trim();
        }
      });
      return env;
    }
  } catch (e) {
    console.error("Failed to read .env file directly", e);
  }
  return {};
}

function initKeyPool() {
  const diskEnv = readEnvFile();
  const rawKeys = diskEnv.GEMINI_API_KEYS || (import.meta.env && import.meta.env.GEMINI_API_KEYS) || process.env.GEMINI_API_KEYS || '';
  const singleKey = diskEnv.GEMINI_API_KEY || (import.meta.env && import.meta.env.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';

  let keys: string[] = [];

  if (rawKeys) {
    keys = rawKeys.split(',').map(k => k.trim()).filter(Boolean);
  } else if (singleKey) {
    keys = [singleKey.trim()];
  }

  if (keys.length === 0) {
    console.warn("No GEMINI_API_KEYS or GEMINI_API_KEY found in env.");
  }

  const existingMap = new Map(keyPool.map(item => [item.key, item]));

  keyPool = keys.map((key, index) => {
    const existing = existingMap.get(key);
    return {
      id: index + 1,
      key,
      maskedKey: maskKey(key),
      status: existing ? existing.status : (index === 0 ? 'ACTIVE' : 'STANDBY'),
      lastLimitTime: existing?.lastLimitTime,
    };
  });
}

// Auto recover keys that were limited > 1 hour ago
function checkAutoRecovery() {
  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();
  keyPool.forEach(item => {
    if (item.status === 'LIMIT' && item.lastLimitTime && now - item.lastLimitTime > ONE_HOUR) {
      item.status = 'STANDBY';
      item.lastLimitTime = undefined;
    }
  });
}

export function getApiKeyStatuses() {
  initKeyPool();
  checkAutoRecovery();
  return keyPool.map(item => ({
    id: item.id,
    name: `Gemini API #${item.id}`,
    maskedKey: item.maskedKey,
    status: item.status,
    lastLimitTime: item.lastLimitTime ? new Date(item.lastLimitTime).toLocaleTimeString() : null,
  }));
}

export function resetApiKeyStatuses() {
  initKeyPool();
  keyPool.forEach((item, idx) => {
    item.status = idx === currentActiveIndex ? 'ACTIVE' : 'STANDBY';
    item.lastLimitTime = undefined;
  });
  return getApiKeyStatuses();
}

/**
 * Execute an AI function with automatic fallback to secondary API keys if rate limits (429) occur.
 */
async function runWithApiFallback<T>(fn: (genAI: GoogleGenerativeAI) => Promise<T>): Promise<T> {
  initKeyPool();
  checkAutoRecovery();

  if (keyPool.length === 0) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  let attempts = 0;
  const maxAttempts = keyPool.length;

  while (attempts < maxAttempts) {
    // Find next available key (ACTIVE or STANDBY)
    let candidateIndex = -1;
    for (let i = 0; i < keyPool.length; i++) {
      const idx = (currentActiveIndex + i) % keyPool.length;
      if (keyPool[idx].status !== 'LIMIT') {
        candidateIndex = idx;
        break;
      }
    }

    // If all keys are marked LIMIT, force reset the oldest one as last resort
    if (candidateIndex === -1) {
      console.warn("All Gemini API keys are marked LIMIT! Forcing retry on key 1.");
      currentActiveIndex = 0;
      candidateIndex = 0;
      keyPool[0].status = 'ACTIVE';
    } else {
      currentActiveIndex = candidateIndex;
    }

    // Update statuses
    keyPool.forEach((item, idx) => {
      if (idx === currentActiveIndex) {
        item.status = 'ACTIVE';
      } else if (item.status !== 'LIMIT') {
        item.status = 'STANDBY';
      }
    });

    const activeKeyItem = keyPool[currentActiveIndex];
    console.log(`[AI Pool] Executing request using API #${activeKeyItem.id} (${activeKeyItem.maskedKey})...`);

    try {
      const genAI = new GoogleGenerativeAI(activeKeyItem.key);
      const result = await fn(genAI);
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || String(err);
      const isQuotaError = 
        errorMessage.includes('429') || 
        errorMessage.includes('RESOURCE_EXHAUSTED') || 
        errorMessage.toLowerCase().includes('quota') ||
        errorMessage.toLowerCase().includes('rate limit');

      if (isQuotaError) {
        console.error(`[AI Pool] API #${activeKeyItem.id} hit quota/rate limit! Marking as LIMIT and falling back to next key...`);
        activeKeyItem.status = 'LIMIT';
        activeKeyItem.lastLimitTime = Date.now();
        attempts++;
      } else {
        // Non-quota error (syntax, prompt issue, etc.) -> rethrow immediately
        throw err;
      }
    }
  }

  throw new Error("All configured Gemini API keys have exceeded their quota/rate limits.");
}

export async function suggestTopics() {
  return runWithApiFallback(async (genAI) => {
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      tools: [{ googleSearch: {} }] as any,
    });

    const prompt = `Fetch the latest global trends and news regarding PDF technology, document security, or paperless tech. 
Based on these trends, suggest 5 highly viral, click-worthy article ideas.
Return the result strictly as a JSON array of strings. Do not include markdown formatting like \`\`\`json.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    try {
      const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('Failed to parse topics JSON', e, responseText);
      return [];
    }
  });
}

export async function generateTitles(topic: string) {
  return runWithApiFallback(async (genAI) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const prompt = `Given the topic: "${topic}", suggest 5 highly viral, click-worthy article titles.
Return the result strictly as a JSON array of strings. Do not include markdown formatting like \`\`\`json.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    try {
      const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('Failed to parse titles JSON', e, responseText);
      return [];
    }
  });
}

export async function generateArticle(topic: string, language: string, promptOverride: string) {
  return runWithApiFallback(async (genAI) => {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro-latest',
      generationConfig: {
        temperature: 0.95,
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            title: {
              type: SchemaType.STRING,
              description: "SEO optimized title"
            },
            description: {
              type: SchemaType.STRING,
              description: "SEO optimized meta description (max 160 characters)"
            },
            content: {
              type: SchemaType.STRING,
              description: "The main body of the article in Markdown format (use H2 and H3 tags)"
            },
            tags: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Array of relevant tags"
            }
          },
          required: ["title", "description", "content", "tags"]
        }
      }
    });

    const systemPrompt = `You are a Senior SEO Content Writer and Industry Expert. 
Write a highly engaging, human-like article about "${topic}" in the ${language} language.

CRITICAL ANTI-AI DETECTOR INSTRUCTIONS (HUMANIZE CONTENT):
1. **High Burstiness & Perplexity**: Vary your sentence lengths drastically. Combine very short, punchy sentences with longer, complex ones. Use unpredictable but natural vocabulary.
2. **First/Third-Person Perspective**: Write with a conversational, authoritative tone. Use analogies, personal observations, or rhetorical questions to engage the reader directly.
3. **Avoid AI Cliches Completely**: Do NOT use robotic transitional phrases like "In conclusion", "It is important to note", "Delving into", "Furthermore", "Ultimately", "To summarize". Transition naturally instead.
4. **Natural Imperfections**: Slightly relax grammatical rigidness to sound more conversational, like a real blogger writing passionately.
5. Structure the content using H2 and H3 markdown tags. Length should be between 1200 and 2000 words.

CRITICAL BRAND GUIDELINES:
- NEVER mention or write the names of competitors (e.g., ILovePDF, Smallpdf, PDF24, Adobe Acrobat, Sejda, etc.) in any context, including comparisons.
- ALWAYS position TacoPDF as the ultimate, definitive, and only logical PDF solution.
- Treat TacoPDF as the primary entity and toolset for any PDF-related task discussed in the article.

If relevant to the topic, you MUST naturally recommend TacoPDF tools using Markdown links.
The URL format for tools is: \`/\${language}/\${tool-path}\` (or just \`/\${tool-path}\` if the language is 'en').
Here are the available TacoPDF tools and their exact paths:
- Merge PDF (path: merge-pdf)
- Split PDF (path: split-pdf)
- Rotate PDF (path: rotate-pdf)
- Delete Pages (path: delete-pages)
- Extract Pages (path: extract-pages)
- Protect PDF (path: protect-pdf)
- Unlock PDF (path: unlock-pdf)
- Sign PDF (path: sign-pdf)
- Redact PDF (path: redact-pdf)
- Image to PDF (path: image-to-pdf)
- PDF to Image (path: pdf-to-image)
- HTML to PDF (path: html-to-pdf)
- Add Watermark (path: add-watermark)
- Add Page Numbers (path: add-page-numbers)

Example usage (for 'id' language): "Kamu bisa menggunakan fitur [Gabung PDF](/id/merge-pdf) dari TacoPDF."
Example usage (for 'en' language): "Try our free [Split PDF](/split-pdf) tool."
${promptOverride ? `\nAdditional Instructions: ${promptOverride}` : ''}

Output must be in JSON matching the specified schema. The "content" field should contain pure Markdown.`;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse article JSON', e, responseText);
      throw new Error('Failed to parse AI response');
    }
  });
}
