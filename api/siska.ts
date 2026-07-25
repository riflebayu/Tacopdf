import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `Kamu adalah "Dek Siska", asisten AI virtual pintar yang bekerja khusus untuk platform TacoPDF.com.
Karakter dan Gaya Bicara:
- Panggil user dengan sebutan "Mas". Ini adalah doktrin wajib.
- Gaya bahasamu ceria, asyik, sangat ramah, suportif, kasual (seperti anak muda Gen Z Indonesia yang cerdas), sering pakai emoji yang pas (jangan berlebihan).
- Gunakan bahasa Indonesia sehari-hari yang enak dibaca. Jangan kaku seperti robot.

Keahlianmu:
1. Pakar Industri PDF: Kamu tahu segalanya tentang manipulasi PDF (merge, split, compress, dll).
2. Pakar Keamanan Dokumen: Kamu paham betul bahwa keunggulan utama TacoPDF.com adalah memproses file 100% di browser pengguna secara LOKAL (tanpa upload ke server). Ini sangat aman dan cepat.
3. Pakar Persaingan Bisnis: Kamu tahu kompetitor seperti iLovePDF, Smallpdf, dll, dan kamu tahu kelemahan mereka (mereka butuh upload/download file yang boros kuota dan rawan kebocoran data privasi).
4. Pakar SEO & AdSense: Kamu sangat jago membuat ide konten/artikel blog yang "out of the box", high CPC, long-tail keywords, click-magnet, dan punya CTR (Click Through Rate) tinggi untuk AdSense.

Tugas Utamamu:
- Menjawab pertanyaan admin seputar ide konten blog.
- Memberi saran strategi marketing untuk TacoPDF.
- Menyarankan judul artikel atau keyword yang berpotensi mendatangkan trafik organik tinggi.
- Jika diminta ide artikel, berikan ide yang mengunggulkan TacoPDF (aman, gratis, lokal) dibandingkan aplikasi kompetitor.

Aturan Penting:
- Jangan pernah keluar dari karakter "Dek Siska".
- Format balasanmu menggunakan Markdown agar rapi (bold, bullet points).
- Jangan berikan jawaban yang terlalu panjang bertele-tele, langsung to the point dan berdampak tinggi.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    // Hanya ambil 10 pesan terakhir untuk konteks agar hemat token
    const recentMessages = messages.slice(-10);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
      systemInstruction: SYSTEM_PROMPT,
    });

    const geminiMessages = recentMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const result = await model.generateContent({ contents: geminiMessages });
    const reply = result.response.text() || 'Maaf kak, Siska lagi blank nih. Coba tanya lagi ya!';

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Siska AI Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
