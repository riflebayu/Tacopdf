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
    const { title, keyword, content, customPrompt, imageUrl, targetLanguages } = req.body;

    if (!title || !keyword) {
      return res.status(400).json({ error: 'Missing required fields: title or keyword' });
    }

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined in the environment variables. Please add it in Vercel.");
    }

    const langNames: Record<string, string> = {
      'id': 'Indonesia', 'en': 'Inggris', 'es': 'Spanyol', 'fr': 'Prancis', 'de': 'Jerman', 'ja': 'Jepang', 'pt': 'Portugis'
    };
    const targets = Array.isArray(targetLanguages) && targetLanguages.length > 0 ? targetLanguages : Object.keys(langNames);
    const chunkArray = (arr: string[], size: number) => {
      const result = [];
      for(let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    };

    // Chunk languages into groups of 2 to avoid hitting the 8192 token output limit
    const targetChunks = chunkArray(targets, 2);
    
    const generateForChunk = async (chunk: string[]) => {
      const chunkLangListStr = chunk.map(code => `${code} (${langNames[code]})`).join(', ');
      const chunkJsonStructure = chunk.reduce((acc: any, code: string) => {
        acc[code] = { "slug": "...", "title": "...", "metaDescription": "...", "content": "..." };
        return acc;
      }, {});

      const systemInstruction = `PERAN: Kamu adalah Pakar SEO Internasional, Evaluator E-E-A-T Google, dan Copywriter Senior.

TUGAS: ${content ? 'Kembangkan input title, keyword, dan content mentah menjadi artikel blog' : 'Buatlah artikel blog dari nol (scratch) secara otomatis berdasarkan judul dan keyword yang diberikan. Artikel harus'} SEO yang komprehensif, informatif, dan mengalir natural.

KONTEKS PRODUK (TACOPDF): Selalu kaitkan artikel dengan keunggulan utama TacoPDF:
- TacoPDF adalah aplikasi utilitas PDF berbasis web (Browser-based).
- 100% AMAN & PRIVASI TERJAGA: Semua pemrosesan file dilakukan LOKAL di komputer pengguna. File PDF tidak pernah diunggah ke server mana pun.
- TEKNOLOGI: Menggunakan WebAssembly (WASM) super cepat yang bekerja langsung di browser.
- 100% GRATIS dan dapat digunakan secara OFFLINE setelah halaman dimuat.
- FITUR: Merge PDF (menggabungkan), Split (memisahkan), Compress, dll.
- KOMPETITOR: Sangat sadar bahwa pesaing seperti iLovePDF, Smallpdf, atau Adobe mengharuskan pengguna MENGUNGGAH dokumen mereka ke server jarak jauh (boros waktu, boros kuota, dan rentan pencurian data/bocor).
- KEUNGGULAN MUTLAK KITA: Jelaskan bahwa TacoPDF adalah solusi masa depan yang memproses dokumen SECARA LOKAL di perangkat pengguna, TANPA UPLOAD. Ini sangat krusial untuk dokumen rahasia perusahaan, KTP, atau laporan keuangan.
(Gunakan konteks ini secara natural untuk mempromosikan alat TacoPDF di dalam artikel).

ATURAN GAYA BAHASA & KUALITAS KONTEN (SANGAT PENTING):
1. PANJANG ARTIKEL: Setiap artikel HARUS memiliki panjang MINIMAL 700 kata per bahasa. Jabarkan poin-poin dengan analogi, contoh nyata, dan penjelasan mendalam.
2. HUMANISASI 90% & LOLOS DETEKSI AI: Menulislah layaknya seorang manusia (Blogger Profesional). Gunakan variasi panjang kalimat (ada yang sangat pendek, ada yang panjang). Tingkatkan 'burstiness' dan 'perplexity' secara ekstrem.
3. HINDARI BAHASA MESIN: HINDARI MUTLAK kata-kata klise AI (seperti: "Di era digital ini", "Penting untuk diingat", "Kesimpulannya", "Mari kita selami", "Selain itu", "Bukan rahasia lagi").
4. SEO OPTIMIZED: Sebarkan kata kunci secara natural (jangan memaksakan/keyword stuffing). Gunakan LSI (Latent Semantic Indexing) keywords.
5. FORMATTING: Gunakan format Markdown murni yang kaya dan rapi (H2, H3, bold pada kata kunci penting, bullet points \`*\`, numbered lists \`1.\`, dan tabel jika perlu).

LOKALISASI SANGAT PENTING: Buat konten orisinal dan terjemahkan ke SEMUA kode bahasa berikut tanpa ada yang terlewat: ${chunkLangListStr}.
DILARANG KERAS MALAS. Kamu WAJIB menghasilkan konten untuk SETIAP bahasa yang diminta.

STRUKTUR OUTPUT (WAJIB JSON MURNI): Kamu HARUS MENGEMBALIKAN respons HANYA dalam bentuk objek JSON (JSON object). DILARANG menuliskan teks apa pun di luar JSON. Struktur JSON HARUS persis seperti ini dan mencakup SEMUA bahasa:
${JSON.stringify(chunkJsonStructure, null, 2)}
Pastikan slug relevan dengan bahasa masing-masing dan URL-friendly.`;

      const userPrompt = `Title: ${title}
Target Keyword: ${keyword}
${content ? `Raw Content: ${content}` : 'Instruksi: Buat artikel dari nol berdasarkan judul dan keyword di atas.'}

${customPrompt ? `INSTRUKSI KHUSUS (CUSTOM PROMPT) DARI ADMIN:\n"${customPrompt}"\n\nPastikan kamu mematuhi instruksi khusus di atas dalam penulisan artikel ini.\n\n` : ''}Tolong kembangkan dan lokalisasi artikel ini berdasarkan instruksi sistem. PASTIKAN output 100% valid JSON.`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        response_format: { type: "json_object" }
      });

      const responseText = chatCompletion.choices[0]?.message?.content;
      if (!responseText) throw new Error("Empty response from Groq API.");
      
      return JSON.parse(responseText);
    };

    // Execute all chunks in parallel
    const chunkResults = await Promise.all(targetChunks.map(chunk => generateForChunk(chunk)));
    
    // Combine results
    let finalGeneratedData = {};
    for (const res of chunkResults) {
      finalGeneratedData = { ...finalGeneratedData, ...res };
    }

    return res.status(200).json({
      message: "AI Generation successful",
      generatedData: finalGeneratedData,
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
