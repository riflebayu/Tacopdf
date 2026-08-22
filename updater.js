const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const newStrings = {
  en: `    "tool.ocr.status.running_ocr_image": "Running OCR on image...",
    "tool.ocr.status.extracting_digital_page": "Extracting digital text from page {page}...",
    "tool.ocr.status.running_ocr_page": "Running OCR on scanned page {page}...",
    "tool.ocr.extracting": "Extracting Text...",
    "tool.ocr.extracted": "Extracted Text",
    "tool.ocr.download_txt": "Download as TXT",
    "tool.ocr.restart": "Process Another Document",
    "tool.compress.status.download": "Downloading compression engine (this may take a while on first run)...",
    "tool.compress.status.compressing": "Compressing images and subsetting fonts...",
    "tool.compress.reduced_by": "Reduced by {percent}% ({size} MB)",
    "tool.compress.compressing": "Compressing PDF...",
    "tool.compress.complete": "Compression Complete!",`,
  id: `    "tool.ocr.status.running_ocr_image": "Menjalankan OCR pada gambar...",
    "tool.ocr.status.extracting_digital_page": "Mengekstrak teks digital dari halaman {page}...",
    "tool.ocr.status.running_ocr_page": "Menjalankan OCR pada halaman {page} hasil pindaian...",
    "tool.ocr.extracting": "Mengekstrak Teks...",
    "tool.ocr.extracted": "Teks Terekstrak",
    "tool.ocr.download_txt": "Unduh sebagai TXT",
    "tool.ocr.restart": "Proses Dokumen Lainnya",
    "tool.compress.status.download": "Mengunduh mesin kompresi (mungkin memakan waktu untuk pertama kali)...",
    "tool.compress.status.compressing": "Mengompres gambar dan mengurangi subset font...",
    "tool.compress.reduced_by": "Berkurang {percent}% ({size} MB)",
    "tool.compress.compressing": "Mengompres PDF...",
    "tool.compress.complete": "Kompresi Selesai!",`,
  es: `    "tool.ocr.status.running_ocr_image": "Ejecutando OCR en imagen...",
    "tool.ocr.status.extracting_digital_page": "Extrayendo texto digital de la página {page}...",
    "tool.ocr.status.running_ocr_page": "Ejecutando OCR en la página escaneada {page}...",
    "tool.ocr.extracting": "Extrayendo Texto...",
    "tool.ocr.extracted": "Texto Extraído",
    "tool.ocr.download_txt": "Descargar como TXT",
    "tool.ocr.restart": "Procesar Otro Documento",
    "tool.compress.status.download": "Descargando motor de compresión (esto puede tardar en la primera ejecución)...",
    "tool.compress.status.compressing": "Comprimiendo imágenes y subconjuntos de fuentes...",
    "tool.compress.reduced_by": "Reducido en un {percent}% ({size} MB)",
    "tool.compress.compressing": "Comprimiendo PDF...",
    "tool.compress.complete": "¡Compresión Completa!",`,
  pt: `    "tool.ocr.status.running_ocr_image": "Executando OCR na imagem...",
    "tool.ocr.status.extracting_digital_page": "Extraindo texto digital da página {page}...",
    "tool.ocr.status.running_ocr_page": "Executando OCR na página digitalizada {page}...",
    "tool.ocr.extracting": "Extraindo Texto...",
    "tool.ocr.extracted": "Texto Extraído",
    "tool.ocr.download_txt": "Baixar como TXT",
    "tool.ocr.restart": "Processar Outro Documento",
    "tool.compress.status.download": "Baixando motor de compressão (isso pode demorar na primeira execução)...",
    "tool.compress.status.compressing": "Comprimindo imagens e subconjuntos de fontes...",
    "tool.compress.reduced_by": "Reduzido em {percent}% ({size} MB)",
    "tool.compress.compressing": "Comprimindo PDF...",
    "tool.compress.complete": "Compressão Concluída!",`,
  ms: `    "tool.ocr.status.running_ocr_image": "Menjalankan OCR pada imej...",
    "tool.ocr.status.extracting_digital_page": "Mengekstrak teks digital dari halaman {page}...",
    "tool.ocr.status.running_ocr_page": "Menjalankan OCR pada halaman {page} yang diimbas...",
    "tool.ocr.extracting": "Mengekstrak Teks...",
    "tool.ocr.extracted": "Teks Diekstrak",
    "tool.ocr.download_txt": "Muat turun sebagai TXT",
    "tool.ocr.restart": "Proses Dokumen Lain",
    "tool.compress.status.download": "Memuat turun enjin pemampatan (mungkin mengambil masa pada larian pertama)...",
    "tool.compress.status.compressing": "Memampatkan imej dan mengecilkan subset fon...",
    "tool.compress.reduced_by": "Berkurang {percent}% ({size} MB)",
    "tool.compress.compressing": "Memampatkan PDF...",
    "tool.compress.complete": "Pemampatan Selesai!",`,
  fr: `    "tool.ocr.status.running_ocr_image": "Exécution de l'OCR sur l'image...",
    "tool.ocr.status.extracting_digital_page": "Extraction du texte numérique de la page {page}...",
    "tool.ocr.status.running_ocr_page": "Exécution de l'OCR sur la page numérisée {page}...",
    "tool.ocr.extracting": "Extraction du Texte...",
    "tool.ocr.extracted": "Texte Extrait",
    "tool.ocr.download_txt": "Télécharger en TXT",
    "tool.ocr.restart": "Traiter un Autre Document",
    "tool.compress.status.download": "Téléchargement du moteur de compression (cela peut prendre un certain temps lors de la première exécution)...",
    "tool.compress.status.compressing": "Compression des images et sous-ensembles de polices...",
    "tool.compress.reduced_by": "Réduit de {percent}% ({size} MB)",
    "tool.compress.compressing": "Compression du PDF...",
    "tool.compress.complete": "Compression Terminée !",`,
  ar: `    "tool.ocr.status.running_ocr_image": "تشغيل التعرف الضوئي على الحروف على الصورة...",
    "tool.ocr.status.extracting_digital_page": "استخراج النص الرقمي من الصفحة {page}...",
    "tool.ocr.status.running_ocr_page": "تشغيل التعرف الضوئي على الحروف على الصفحة الممسوحة ضوئيا {page}...",
    "tool.ocr.extracting": "استخراج النص...",
    "tool.ocr.extracted": "النص المستخرج",
    "tool.ocr.download_txt": "تنزيل كـ TXT",
    "tool.ocr.restart": "معالجة مستند آخر",
    "tool.compress.status.download": "تنزيل محرك الضغط (قد يستغرق ذلك بعض الوقت في التشغيل الأول)...",
    "tool.compress.status.compressing": "ضغط الصور وتقليل خطوط النص...",
    "tool.compress.reduced_by": "تم تقليله بنسبة {percent}% ({size} MB)",
    "tool.compress.compressing": "جاري ضغط PDF...",
    "tool.compress.complete": "اكتمل الضغط!",`
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
