const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const newStrings = {
  ja: `    "tool.ocr.status.running_ocr_image": "画像上でOCRを実行中...",
    "tool.ocr.status.extracting_digital_page": "ページ{page}からデジタルテキストを抽出中...",
    "tool.ocr.status.running_ocr_page": "スキャンしたページ{page}でOCRを実行中...",
    "tool.ocr.extracting": "テキストを抽出中...",
    "tool.ocr.extracted": "抽出されたテキスト",
    "tool.ocr.download_txt": "TXTとしてダウンロード",
    "tool.ocr.restart": "別のドキュメントを処理",
    "tool.compress.status.download": "圧縮エンジンをダウンロード中（初回は時間がかかる場合があります）...",
    "tool.compress.status.compressing": "画像とフォントを圧縮中...",
    "tool.compress.reduced_by": "{percent}% 削減 ({size} MB)",
    "tool.compress.compressing": "PDFを圧縮中...",
    "tool.compress.complete": "圧縮完了！",`,
  de: `    "tool.ocr.status.running_ocr_image": "OCR wird auf Bild ausgeführt...",
    "tool.ocr.status.extracting_digital_page": "Digitaler Text wird aus Seite {page} extrahiert...",
    "tool.ocr.status.running_ocr_page": "OCR wird auf gescannter Seite {page} ausgeführt...",
    "tool.ocr.extracting": "Text wird extrahiert...",
    "tool.ocr.extracted": "Extrahierter Text",
    "tool.ocr.download_txt": "Als TXT herunterladen",
    "tool.ocr.restart": "Anderes Dokument verarbeiten",
    "tool.compress.status.download": "Komprimierungs-Engine wird heruntergeladen (dies kann beim ersten Mal etwas dauern)...",
    "tool.compress.status.compressing": "Bilder und Schriftarten werden komprimiert...",
    "tool.compress.reduced_by": "Reduziert um {percent}% ({size} MB)",
    "tool.compress.compressing": "PDF wird komprimiert...",
    "tool.compress.complete": "Komprimierung abgeschlossen!",`
};

Object.keys(newStrings).forEach(lang => {
  const regex = new RegExp(`"\\b${lang}\\b":\\s*\\{`);
  const match = content.match(regex);
  if (match) {
    const insertIdx = match.index + match[0].length;
    content = content.slice(0, insertIdx) + '\n' + newStrings[lang] + ',' + content.slice(insertIdx);
    console.log('Injected for', lang);
  } else {
    console.log('Failed to find', lang);
  }
});

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log('Done!');
