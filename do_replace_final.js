const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const enAdditions = `
    "tool.ocr.status.loading_image": "Loading image...",
    "tool.ocr.status.preprocessing": "Pre-processing image...",
    "tool.ocr.status.running_ocr_image": "Running OCR on image...",`;

const idAdditions = `
    "tool.ocr.status.loading_image": "Memuat gambar...",
    "tool.ocr.status.preprocessing": "Pra-pemrosesan gambar...",
    "tool.ocr.status.running_ocr_image": "Menjalankan OCR pada gambar...",`;

content = content.replace(/("workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + enAdditions);
content = content.replace(/(  "id": \{[\s\S]*?"workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + idAdditions);

fs.writeFileSync('src/data/translations.ts', content);
