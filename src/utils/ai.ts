import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import OpenAI from 'openai';
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

export function setActiveApiKey(id: number) {
  initKeyPool();
  const index = keyPool.findIndex(k => k.id === id);
  if (index !== -1) {
    currentActiveIndex = index;
    keyPool.forEach((item, idx) => {
      item.status = idx === currentActiveIndex ? 'ACTIVE' : (item.status === 'LIMIT' ? 'LIMIT' : 'STANDBY');
    });
  }
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
      console.warn(`[AI Pool] API #${activeKeyItem.id} threw an error: ${errorMessage}`);
      
      const isQuotaError = 
        errorMessage.includes('429') || 
        errorMessage.includes('503') || 
        errorMessage.includes('403') || 
        errorMessage.includes('500') || 
        errorMessage.includes('RESOURCE_EXHAUSTED') || 
        errorMessage.toLowerCase().includes('quota') ||
        errorMessage.toLowerCase().includes('rate limit') ||
        errorMessage.toLowerCase().includes('overloaded') ||
        errorMessage.toLowerCase().includes('fetch failed') ||
        errorMessage.toLowerCase().includes('internal error');

      if (isQuotaError) {
        console.error(`[AI Pool] API #${activeKeyItem.id} hit quota/server error! Marking as LIMIT and falling back...`);
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
      model: 'gemini-flash-latest',
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
            imageAlt: {
              type: SchemaType.STRING,
              description: "Descriptive alt text for the featured hero image detailing visual context for accessibility and Google Image Search"
            },
            slug: {
              type: SchemaType.STRING,
              description: "SEO-optimized clean URL slug in lowercase alphanumeric-hyphenated ASCII format. FOR JAPANESE (ja) OR NON-LATIN: this MUST be in English/Romanized keywords (e.g. 'why-switch-to-tacopdf', 'merge-pdf-guide-japan')."
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
          required: ["title", "description", "imageAlt", "slug", "content", "tags"]
        }
      }
    });

    const systemPrompt = `You are a Senior SEO Content Writer, Native-Level Linguist, and Industry Expert. 
Write a highly engaging, human-like article about "${topic}" in the ${language} language.

CRITICAL LOCALIZATION & MULTILINGUAL INSTRUCTIONS:
- You are writing in ${language} (Target languages include English, Japanese, Spanish, German, French, Portuguese, or Indonesian). 
- Do NOT translate English concepts word-for-word. Use native idioms, culturally relevant analogies, and natural sentence structures specific to ${language}. 
- For Japanese (if applicable): Use natural Keigo/Teineigo or standard Desu/Masu form appropriate for a tech-blog, avoiding robotic direct translations.
- For the 'slug' field: MUST ALWAYS be clean ASCII kebab-case (e.g. 'why-choose-tacopdf'). If the language is Japanese ('ja'), translate the core meaning into concise English words for the slug (e.g., 'tacopdf-security-reasons-guide') to prevent percent-encoding or garbage URLs.

CRITICAL ANTI-AI DETECTOR INSTRUCTIONS (HUMANIZE CONTENT):
1. High Burstiness & Perplexity: Vary your sentence lengths drastically. Combine very short, punchy sentences with longer, complex ones. Use unpredictable but natural vocabulary.
2. First/Third-Person Perspective: Write with a conversational, authoritative tone. Use analogies, personal observations, or rhetorical questions to engage the reader directly.
3. Avoid AI Cliches Completely: Do NOT use robotic transitional phrases in ANY language (e.g., "In conclusion", "Kesimpulan", "Pada akhirnya", "Zusammenfassend", "En conclusión", "En résumé", "Em resumo", "結論として", "Delving into", "Furthermore", "Ultimately"). Transition naturally instead.
4. Natural Imperfections: Slightly relax grammatical rigidness to sound more conversational, like a real blogger writing passionately.
5. Asymmetrical Paragraphs: AI naturally writes symmetrical paragraphs (e.g., always 3-4 lines). Break this pattern completely. Write a 1-sentence paragraph. Follow it with a 5-sentence deep-dive. Then a 2-sentence punchline. Make it look visually irregular.
6. E-E-A-T Injection (Experience & Expertise): Simulate real-world experience. Use phrases that imply hands-on testing or real industry observation naturally in ${language} (e.g., "In my years of managing documents...", "When I tested this exact issue last week...").

CRITICAL SEO & GOOGLE HELPFUL CONTENT INSTRUCTIONS:
1. TL;DR / Quick Answer: Immediately after the introduction, provide a bolded "Quick Takeaway" or a short bulleted summary. Google algorithms love this for Featured Snippets.
2. Semantic LSI Keywords: Do not just stuff the main keyword. Naturally sprinkle Latent Semantic Indexing (LSI) terms throughout the text.
3. Data & Tables: Google heavily favors structured data. You MUST include at least one Markdown table (\`| Column 1 | Column 2 |\`) in the article to compare features, summarize data, or list pros/cons.
4. Structure & Depth: The article MUST be detailed and comprehensive (at least 1000 - 1500 words). Use H2, H3 tags, and heavily utilize bulleted/numbered lists for readability. Do NOT write short summaries. 

CRITICAL BRAND GUIDELINES:
- BRAND RULE ON COMPETITORS: Do NOT mention competitors (e.g., ILovePDF, Smallpdf, PDF24, Adobe Acrobat, Sejda) UNLESS the "${topic}" or instructions explicitly ask for a comparison. If a comparison IS requested, ALWAYS frame the competitor's flaws (e.g., privacy risks, limits, costs) and position TacoPDF as the superior, secure, and ultimate solution.
- ALWAYS position TacoPDF as the primary entity and toolset for any PDF-related task discussed in the article.
- Do NOT include the article title (H1, e.g. '# Title') at the beginning of the 'content' field. Start directly with the introductory paragraph.
- Do NOT write or list "#Tags" manually at the bottom of the 'content' field. Tags should ONLY be provided in the separate 'tags' JSON array.

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
(Adapt the anchor text naturally based on the ${language} being used).
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

export async function generateArticleOpenRouter(topic: string, language: string, promptOverride: string, modelName: string) {
  const diskEnv = readEnvFile();
  const apiKey = diskEnv.OPENROUTER_API_KEY || (import.meta.env && import.meta.env.OPENROUTER_API_KEY) || process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables.");
  }

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
  });

  const systemPrompt = `You are a Senior SEO Content Writer, Native-Level Linguist, and Industry Expert. 
Write a highly engaging, human-like article about "${topic}" in the ${language} language.

CRITICAL LOCALIZATION & MULTILINGUAL INSTRUCTIONS:
- You are writing in ${language} (Target languages include English, Japanese, Spanish, German, French, Portuguese, or Indonesian). 
- Do NOT translate English concepts word-for-word. Use native idioms, culturally relevant analogies, and natural sentence structures specific to ${language}. 
- For Japanese (if applicable): Use natural Keigo/Teineigo or standard Desu/Masu form appropriate for a tech-blog, avoiding robotic direct translations.

CRITICAL ANTI-AI DETECTOR INSTRUCTIONS (HUMANIZE CONTENT):
1. High Burstiness & Perplexity: Vary your sentence lengths drastically. Combine very short, punchy sentences with longer, complex ones. Use unpredictable but natural vocabulary.
2. First/Third-Person Perspective: Write with a conversational, authoritative tone. Use analogies, personal observations, or rhetorical questions to engage the reader directly.
3. Avoid AI Cliches Completely: Do NOT use robotic transitional phrases in ANY language (e.g., "In conclusion", "Kesimpulan", "Pada akhirnya", "Zusammenfassend", "En conclusión", "En résumé", "Em resumo", "結論として", "Delving into", "Furthermore", "Ultimately"). Transition naturally instead.
4. Natural Imperfections: Slightly relax grammatical rigidness to sound more conversational, like a real blogger writing passionately.
5. Asymmetrical Paragraphs: AI naturally writes symmetrical paragraphs (e.g., always 3-4 lines). Break this pattern completely. Write a 1-sentence paragraph. Follow it with a 5-sentence deep-dive. Then a 2-sentence punchline. Make it look visually irregular.
6. E-E-A-T Injection (Experience & Expertise): Simulate real-world experience. Use phrases that imply hands-on testing or real industry observation naturally in ${language} (e.g., "In my years of managing documents...", "When I tested this exact issue last week...").

CRITICAL SEO & GOOGLE HELPFUL CONTENT INSTRUCTIONS:
1. TL;DR / Quick Answer: Immediately after the introduction, provide a bolded "Quick Takeaway" or a short bulleted summary. Google algorithms love this for Featured Snippets.
2. Semantic LSI Keywords: Do not just stuff the main keyword. Naturally sprinkle Latent Semantic Indexing (LSI) terms throughout the text.
3. Data & Tables: Google heavily favors structured data. You MUST include at least one Markdown table (\`| Column 1 | Column 2 |\`) in the article to compare features, summarize data, or list pros/cons.
4. Structure & Depth: The article MUST be detailed and comprehensive (at least 1000 - 1500 words). Use H2, H3 tags, and heavily utilize bulleted/numbered lists for readability. Do NOT write short summaries. 

CRITICAL BRAND GUIDELINES:
- BRAND RULE ON COMPETITORS: Do NOT mention competitors (e.g., ILovePDF, Smallpdf, PDF24, Adobe Acrobat, Sejda) UNLESS the "${topic}" or instructions explicitly ask for a comparison. If a comparison IS requested, ALWAYS frame the competitor's flaws (e.g., privacy risks, limits, costs) and position TacoPDF as the superior, secure, and ultimate solution.
- ALWAYS position TacoPDF as the primary entity and toolset for any PDF-related task discussed in the article.
- Do NOT include the article title (H1, e.g. '# Title') at the beginning of the 'content' field. Start directly with the introductory paragraph.
- Do NOT write or list "#Tags" manually at the bottom of the 'content' field. Tags should ONLY be provided in the separate 'tags' JSON array.

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
(Adapt the anchor text naturally based on the ${language} being used).
${promptOverride ? `\nAdditional Instructions: ${promptOverride}` : ''}

CRITICAL: You must return the output STRICTLY as a raw JSON object (without Markdown code blocks like ```json). The JSON must have the following structure:
{
  "title": "SEO optimized title",
  "description": "SEO optimized meta description (max 160 characters)",
  "imageAlt": "Descriptive alt text for the featured hero image for visually impaired users and SEO",
  "slug": "SEO-optimized clean lowercase alphanumeric-hyphenated ASCII URL slug (MUST be English/Romanized keywords for Japanese/non-Latin)",
  "content": "The main body of the article in Markdown format (use H2 and H3 tags)",
  "tags": ["Array", "of", "relevant", "tags"]
}`;

  console.log(`[OpenRouter] Generating article using model: ${modelName}`);
  
  const completion = await openai.chat.completions.create({
    model: modelName || "openai/gpt-4o-mini",
    temperature: 0.95,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt }
    ]
  });

  const responseText = completion.choices[0]?.message?.content || "";
  
  try {
    const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('[OpenRouter] Failed to parse generateArticle JSON', e, responseText);
    throw e;
  }
}
