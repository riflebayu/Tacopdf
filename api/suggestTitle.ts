import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Missing topic' });
    }
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined");
    }

    const systemInstruction = `Kamu adalah Pakar SEO dan Copywriter Senior.
Tugas: Berikan 3 ide judul artikel blog yang sangat SEO-friendly, Clickbait elegan, dan Marketing-oriented tentang topik yang diberikan.
Topik yang diberikan akan berkaitan dengan TacoPDF (sebuah aplikasi web untuk mengelola file PDF secara lokal tanpa upload, aman 100%, menggunakan WebAssembly).
Setiap ide judul harus disertai 1 "Target Keyword" terbaik untuk SEO.

Output HARUS berupa JSON object dengan key "suggestions" yang berisi array of objects:
{
  "suggestions": [
    {
      "title": "Judul Artikel 1",
      "keyword": "keyword utama 1"
    },
    {
      "title": "Judul Artikel 2",
      "keyword": "keyword utama 2"
    }
  ]
}
DILARANG memberikan teks apa pun di luar JSON tersebut.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: `Topik kasar: ${topic}` }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseText = chatCompletion.choices[0]?.message?.content;
    if (!responseText) throw new Error("Empty response");

    const json = JSON.parse(responseText);
    return res.status(200).json(json);
  } catch (error: any) {
    console.error('Error suggesting title:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
