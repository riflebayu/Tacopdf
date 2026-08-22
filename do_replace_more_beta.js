const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const enAdditions = `
    "tool.organize.loading": "Loading pages...",
    "tool.organize.organizing": "Organizing PDF...",
    "tool.organize.success": "PDF Organized Successfully!",
    "tool.organize.download": "Download PDF",
    "tool.organize.another": "Organize another file",
    "tool.organize.empty": "All pages removed. Please upload again.",
    "tool.organize.select": "Select PDF file",
    "tool.organize.drop": "Drop your PDF here to reorder or remove pages.",

    "tool.compress.compressing": "Compressing PDF...",
    "tool.compress.complete": "Compression Complete!",
    "tool.compress.another": "Compress another file",
    "tool.compress.failed": "Compression Failed",
    "tool.compress.try_again": "Try Again",
    "tool.compress.select": "Select PDF file",
    "tool.compress.drop": "Drop your PDF here or click to browse. Max file size: 50MB.",

    "tool.ocr.extracting": "Extracting Text...",
    "tool.ocr.extracted": "Extracted Text",
    "tool.ocr.download_txt": "Download as TXT",
    "tool.ocr.restart": "Restart",
    "tool.ocr.select": "Select PDF or Image",
    "tool.ocr.drop": "Drop your Scanned PDF here to extract text.",`;

const idAdditions = `
    "tool.organize.loading": "Memuat halaman...",
    "tool.organize.organizing": "Mengatur PDF...",
    "tool.organize.success": "PDF Berhasil Diatur!",
    "tool.organize.download": "Unduh PDF",
    "tool.organize.another": "Atur file lain",
    "tool.organize.empty": "Semua halaman dihapus. Silakan unggah lagi.",
    "tool.organize.select": "Pilih file PDF",
    "tool.organize.drop": "Tarik PDF Anda ke sini untuk mengatur ulang atau menghapus halaman.",

    "tool.compress.compressing": "Mengkompresi PDF...",
    "tool.compress.complete": "Kompresi Selesai!",
    "tool.compress.another": "Kompres file lain",
    "tool.compress.failed": "Kompresi Gagal",
    "tool.compress.try_again": "Coba Lagi",
    "tool.compress.select": "Pilih file PDF",
    "tool.compress.drop": "Tarik PDF Anda ke sini atau klik untuk menelusuri. Maks 50MB.",

    "tool.ocr.extracting": "Mengekstrak Teks...",
    "tool.ocr.extracted": "Teks Terekstrak",
    "tool.ocr.download_txt": "Unduh sebagai TXT",
    "tool.ocr.restart": "Mulai Ulang",
    "tool.ocr.select": "Pilih PDF atau Gambar",
    "tool.ocr.drop": "Tarik PDF Pindaian Anda ke sini untuk mengekstrak teks.",`;

content = content.replace(/("workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + enAdditions);

content = content.replace(/(  "id": \{[\s\S]*?"workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + idAdditions);

fs.writeFileSync('src/data/translations.ts', content);
console.log('done!');
