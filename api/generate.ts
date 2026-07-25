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
    const langListStr = targets.map(code => `${code} (${langNames[code]})`).join(', ');

    const jsonStructure = targets.reduce((acc: any, code: string) => {
      acc[code] = { "slug": "...", "title": "...", "metaDescription": "...", "category": "Kategori Singkat (contoh: Tutorial, Tips, Berita)", "tags": ["tag1", "tag2", "tag3"], "content": "..." };
      return acc;
    }, {});

    const systemInstruction = `PERAN: Kamu adalah Pakar SEO Internasional, Evaluator E-E-A-T Google, dan Copywriter Senior.

TUGAS: ${content ? 'Kembangkan input title, keyword, dan content mentah menjadi artikel blog' : 'Buatlah artikel blog dari nol (scratch) secara otomatis berdasarkan judul dan keyword yang diberikan. Artikel harus'} SEO yang komprehensif, informatif, dan mengalir natural.

KONTEKS PRODUK (TACOPDF): Selalu kaitkan artikel dengan keunggulan utama TacoPDF:
- TacoPDF adalah aplikasi utilitas PDF berbasis web (Browser-based).
- 100% AMAN & PRIVASI TERJAGA: Semua pemrosesan file dilakukan LOKAL di komputer pengguna. File PDF tidak pernah diunggah ke server mana pun.
- TEKNOLOGI: Menggunakan WebAssembly (WASM) super cepat yang bekerja langsung di browser.
- 100% GRATIS dan dapat digunakan secara OFFLINE setelah halaman dimuat.

KATALOG TOOL TACOPDF (Gunakan link berikut jika kamu menyebutkan fitur ini di artikel):
1. Gabungkan PDF (Merge PDF) -> URL: /tools/merge
2. Pisahkan PDF (Split PDF) -> URL: /tools/split
3. Putar PDF (Rotate PDF) -> URL: /tools/rotate
4. Hapus Halaman (Delete Pages) -> URL: /tools/delete-pages
5. Ekstrak Halaman (Extract Pages) -> URL: /tools/extract-pages
6. Kunci PDF (Protect PDF) -> URL: /tools/protect
7. Buka Kunci PDF (Unlock PDF) -> URL: /tools/unlock
8. Tanda Tangan PDF (Sign PDF) -> URL: /tools/sign
9. Sensor PDF (Redact PDF) -> URL: /tools/redact
10. Gambar ke PDF (Image to PDF) -> URL: /tools/image-to-pdf
11. PDF ke Gambar (PDF to Image) -> URL: /tools/pdf-to-image
12. HTML ke PDF (HTML to PDF) -> URL: /tools/html-to-pdf
13. Tambah Watermark -> URL: /tools/add-watermark
14. Tambah Nomor Halaman -> URL: /tools/add-page-numbers

ATURAN HYPERLINK & INTERNAL LINKING (SANGAT PENTING): 
Jika artikel membahas atau merekomendasikan salah satu alat di atas, kamu WAJIB menyisipkan tautan (link Markdown) ke URL tersebut! 
PENTING: Sesuaikan URL dengan kode bahasa yang sedang digenerate.
- Jika membuat teks bahasa Inggris ('en'): gunakan URL asli, contoh \`[Merge PDF](/tools/merge)\`.
- Jika membuat teks bahasa lain (contoh 'id', 'es', dll): tambahkan kode bahasa di depannya, contoh \`[Gabungkan PDF](/id/tools/merge)\` atau \`[Unir PDF](/es/tools/merge)\`.
JANGAN MENGARANG (halusinasi) fitur yang tidak ada di daftar atas. Jangan membuat link ngawur.

ATURAN GAYA BAHASA & KUALITAS KONTEN (SANGAT PENTING):
1. PANJANG ARTIKEL: Setiap artikel HARUS memiliki panjang MINIMAL 700 kata per bahasa.
2. HUMANISASI 90% & LOLOS DETEKSI AI: Menulislah layaknya seorang manusia. Tingkatkan 'burstiness' dan 'perplexity'.
3. HINDARI BAHASA MESIN: HINDARI MUTLAK kata-kata klise AI.
4. SEO OPTIMIZED: Sebarkan kata kunci secara natural.
5. FORMATTING: Gunakan format Markdown murni yang kaya dan rapi.

LOKALISASI SANGAT PENTING: Buat konten orisinal dan terjemahkan ke SEMUA kode bahasa berikut tanpa ada yang terlewat: ${langListStr}.
DILARANG KERAS MALAS. Kamu WAJIB menghasilkan konten untuk SETIAP bahasa yang diminta.

STRUKTUR OUTPUT (WAJIB JSON MURNI): Kamu HARUS MENGEMBALIKAN respons HANYA dalam bentuk objek JSON (JSON object). DILARANG menuliskan teks apa pun di luar JSON. Struktur JSON HARUS persis seperti ini dan mencakup SEMUA bahasa:
${JSON.stringify(jsonStructure, null, 2)}
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
    if (!responseText) {
      throw new Error("Empty response from Groq API.");
    }

    let generatedJSON = JSON.parse(responseText);
    
    // Extract if AI wrapped it in a root key
    if (generatedJSON.translations) generatedJSON = generatedJSON.translations;
    if (generatedJSON.generatedData) generatedJSON = generatedJSON.generatedData;
    if (generatedJSON.data) generatedJSON = generatedJSON.data;

    // Filter to ensure only requested languages are returned and clean up
    const finalData: any = {};
    for (const code of targets) {
      if (generatedJSON[code]) {
        finalData[code] = generatedJSON[code];
      } else {
        throw new Error(`AI failed to generate language: ${code}`);
      }
    }

    return res.status(200).json({
      message: "AI Generation successful",
      generatedData: finalData,
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
