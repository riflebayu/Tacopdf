import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

// Inisialisasi SDK Google Gen AI
// Pastikan GEMINI_API_KEY sudah diset di Vercel Environment Variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS Headers for local development and API access
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, keyword, content, imageUrl } = req.body;

    if (!title || !keyword || !content) {
      return res.status(400).json({ error: 'Missing required fields: title, keyword, or content' });
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }

    const systemInstruction = `PERAN: Kamu adalah Pakar SEO Internasional, Evaluator E-E-A-T Google, dan Copywriter Senior.

TUGAS: Kembangkan input title, keyword, dan content mentah menjadi artikel blog SEO yang komprehensif, informatif, dan mengalir natural.

ATURAN GAYA BAHASA: Tingkatkan burstiness dan perplexity. HINDARI MUTLAK kata-kata klise AI (seperti: "Di era digital ini", "Penting untuk diingat", "Kesimpulannya", "Mari kita selami"). Gunakan format Markdown (H2, H3, bold pada kata kunci, bullet points).

LOKALISASI (7 BAHASA): Buat konten orisinal dan terjemahkan ke dalam 7 kode bahasa ini: id (Indonesia), en (Inggris), es (Spanyol), fr (Prancis), de (Jerman), ja (Jepang), dan pt (Portugis).

STRUKTUR OUTPUT (WAJIB JSON MURNI): Kembalikan respons HANYA dalam bentuk objek JSON murni (tanpa bungkus backticks markdown seperti \`\`\`json ). Struktur harus seperti ini:
{
  "id": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "en": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "es": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "fr": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "de": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "ja": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "pt": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." }
}
Pastikan slug relevan dengan bahasa masing-masing dan URL-friendly.
`;

    const prompt = `Title: ${title}
Target Keyword: ${keyword}
Raw Content: ${content}

Tolong kembangkan dan lokalisasi artikel ini berdasarkan instruksi sistem.`;

    // Panggil model gemini-2.5-pro dengan strict JSON output
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text;
    
    if (!responseText) {
      throw new Error("Empty response from Gemini API.");
    }

    // Karena menggunakan responseMimeType: "application/json", response.text dijamin berupa string JSON.
    const generatedJSON = JSON.parse(responseText);

    return res.status(200).json({
      message: "AI Generation successful",
      generatedData: generatedJSON,
      imageUrl: imageUrl // passing image URL if any
    });

  } catch (error: any) {
    console.error('Error generating article via Gemini API:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message || String(error)
    });
  }
}
