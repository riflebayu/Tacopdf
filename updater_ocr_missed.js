const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const newStrings = {
  en: `    "tool.ocr.status.loading_image": "Loading image...",
    "tool.ocr.status.preprocessing": "Pre-processing image...",
    "tool.ocr.status.init": "Initializing OCR engine...",
    "tool.ocr.status.processing_page_of": "Processing page {page} of {total}...",`,
  id: `    "tool.ocr.status.loading_image": "Memuat gambar...",
    "tool.ocr.status.preprocessing": "Memproses awal gambar...",
    "tool.ocr.status.init": "Menginisialisasi mesin OCR...",
    "tool.ocr.status.processing_page_of": "Memproses halaman {page} dari {total}...",`,
  es: `    "tool.ocr.status.loading_image": "Cargando imagen...",
    "tool.ocr.status.preprocessing": "Preprocesando imagen...",
    "tool.ocr.status.init": "Inicializando motor OCR...",
    "tool.ocr.status.processing_page_of": "Procesando página {page} de {total}...",`,
  pt: `    "tool.ocr.status.loading_image": "Carregando imagem...",
    "tool.ocr.status.preprocessing": "Pré-processando imagem...",
    "tool.ocr.status.init": "Inicializando motor OCR...",
    "tool.ocr.status.processing_page_of": "Processando página {page} de {total}...",`,
  fr: `    "tool.ocr.status.loading_image": "Chargement de l'image...",
    "tool.ocr.status.preprocessing": "Prétraitement de l'image...",
    "tool.ocr.status.init": "Initialisation du moteur OCR...",
    "tool.ocr.status.processing_page_of": "Traitement de la page {page} sur {total}...",`,
  ja: `    "tool.ocr.status.loading_image": "画像を読み込み中...",
    "tool.ocr.status.preprocessing": "画像の前処理中...",
    "tool.ocr.status.init": "OCRエンジンを初期化中...",
    "tool.ocr.status.processing_page_of": "ページ {page} / {total} を処理中...",`,
  de: `    "tool.ocr.status.loading_image": "Bild wird geladen...",
    "tool.ocr.status.preprocessing": "Bild wird vorverarbeitet...",
    "tool.ocr.status.init": "OCR-Engine wird initialisiert...",
    "tool.ocr.status.processing_page_of": "Seite {page} von {total} wird verarbeitet...",`
};

Object.keys(newStrings).forEach(lang => {
  const regex = new RegExp(`"\\b${lang}\\b":\\s*\\{`);
  const match = content.match(regex);
  if (match) {
    const insertIdx = match.index + match[0].length;
    content = content.slice(0, insertIdx) + '\n' + newStrings[lang] + content.slice(insertIdx);
    console.log('Injected for', lang);
  } else {
    console.log('Failed to find', lang);
  }
});

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log('Done!');
