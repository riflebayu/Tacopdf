import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, keyword, content, imageUrl } = req.body;

    if (!title || !keyword || !content) {
      return res.status(400).json({ error: 'Missing required fields: title, keyword, or content' });
    }

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined in the environment variables. Please add it in Vercel.");
    }

    const systemInstruction = `PERAN: Kamu adalah Pakar SEO Internasional, Evaluator E-E-A-T Google, dan Copywriter Senior.

TUGAS: Kembangkan input title, keyword, dan content mentah menjadi artikel blog SEO yang komprehensif, informatif, dan mengalir natural.

ATURAN GAYA BAHASA: Tingkatkan burstiness dan perplexity. HINDARI MUTLAK kata-kata klise AI (seperti: "Di era digital ini", "Penting untuk diingat", "Kesimpulannya", "Mari kita selami"). Gunakan format Markdown (H2, H3, bold pada kata kunci, bullet points).

LOKALISASI (7 BAHASA): Buat konten orisinal dan terjemahkan ke dalam 7 kode bahasa ini: id (Indonesia), en (Inggris), es (Spanyol), fr (Prancis), de (Jerman), ja (Jepang), dan pt (Portugis).

STRUKTUR OUTPUT (WAJIB JSON MURNI): Kamu HARUS MENGEMBALIKAN respons HANYA dalam bentuk objek JSON (JSON object). DILARANG menuliskan teks apa pun di luar JSON. Struktur harus seperti ini:
{
  "id": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "en": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "es": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "fr": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "de": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "ja": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." },
  "pt": { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." }
}
Pastikan slug relevan dengan bahasa masing-masing dan URL-friendly.`;

    const userPrompt = `Title: ${title}
Target Keyword: ${keyword}
Raw Content: ${content}

Tolong kembangkan dan lokalisasi artikel ini berdasarkan instruksi sistem. PASTIKAN output 100% valid JSON.`;

    // Call Groq API with llama-3.3-70b-versatile (very fast and supports JSON mode)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemInstruction
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    const responseText = chatCompletion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error("Empty response from Groq API.");
    }

    const generatedJSON = JSON.parse(responseText);

    return res.status(200).json({
      message: "AI Generation successful",
      generatedData: generatedJSON,
      imageUrl: imageUrl
    });

  } catch (error: any) {
    console.error('Error generating article via Groq API:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message || String(error)
    });
  }
}
