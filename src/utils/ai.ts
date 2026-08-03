import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// Helper to get API key
function getApiKey() {
  // Try import.meta.env first (Astro/Vite), then process.env
  return (import.meta.env && import.meta.env.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';
}

function getGenAI() {
  const key = getApiKey();
  if (!key) throw new Error("GEMINI_API_KEY is not set in .env");
  return new GoogleGenerativeAI(key);
}

export async function suggestTopics() {
  const model = getGenAI().getGenerativeModel({
    model: 'gemini-flash-latest',
    // In some older @google/generative-ai versions, Google Search tool might not be typed properly,
    // but the API supports it if passed like this:
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
}

export async function generateTitles(topic: string) {
  const model = getGenAI().getGenerativeModel({ model: 'gemini-flash-latest' });
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
}

export async function generateArticle(topic: string, language: string, promptOverride: string) {
  // We use gemini-flash-latest for content generation to stay within free tier limits
  const model = getGenAI().getGenerativeModel({ 
    model: 'gemini-flash-latest',
    generationConfig: {
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

  const systemPrompt = `You are a Senior SEO Content Writer. 
Write a highly engaging, human-like article about "${topic}" in the ${language} language.
Use high burstiness and perplexity. Avoid AI cliches (e.g., 'In conclusion', 'Delve into', 'It is important to note').
Use H2 and H3 markdown tags for structuring the content. 
Ensure the content is deeply informative, solving a specific problem. Length should be between 1200 and 2000 words.

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
}
