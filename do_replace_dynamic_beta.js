const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const enAdditions = `
    "tool.compress.status.init": "Initializing...",
    "tool.compress.status.download": "Downloading compression engine (this may take a while on first run)...",
    "tool.compress.status.engine_loaded": "Engine loaded. Optimizing PDF structure...",
    "tool.compress.status.compressing": "Compressing images and subsetting fonts...",
    "tool.compress.status.finalizing": "Finalizing...",
    "tool.ocr.status.init": "Initializing Tesseract engine...",
    "tool.ocr.status.engine_init": "Engine initialized...",
    "tool.ocr.status.processing_page": "Processing page",
    "tool.ocr.error": "An error occurred during text extraction.",`;

const idAdditions = `
    "tool.compress.status.init": "Menginisialisasi...",
    "tool.compress.status.download": "Mengunduh mesin kompresi (mungkin butuh waktu pada proses pertama)...",
    "tool.compress.status.engine_loaded": "Mesin dimuat. Mengoptimalkan struktur PDF...",
    "tool.compress.status.compressing": "Mengkompresi gambar dan font...",
    "tool.compress.status.finalizing": "Menyelesaikan...",
    "tool.ocr.status.init": "Menginisialisasi mesin Tesseract...",
    "tool.ocr.status.engine_init": "Mesin diinisialisasi...",
    "tool.ocr.status.processing_page": "Memproses halaman",
    "tool.ocr.error": "Terjadi kesalahan saat ekstraksi teks.",`;

content = content.replace(/("workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + enAdditions);
content = content.replace(/(  "id": \{[\s\S]*?"workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + idAdditions);

fs.writeFileSync('src/data/translations.ts', content);
console.log('done!');
