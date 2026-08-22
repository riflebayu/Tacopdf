const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const translations = {
  en: `
    "tool_name.compress": "Compress PDF",
    "seo.features.compress": "Reduce PDF file size significantly while maintaining good quality for web sharing and email.",
    "tool_name.ocr": "OCR PDF",
    "seo.features.ocr": "Extract text from scanned PDFs and images using Optical Character Recognition (OCR).",
    "tool_name.organize": "Organize PDF",
    "seo.features.organize": "Reorder, delete, and manage PDF pages visually with an intuitive interface.",`,
  id: `
    "tool_name.compress": "Kompres PDF",
    "seo.features.compress": "Kurangi ukuran file PDF secara signifikan dengan tetap menjaga kualitas baik untuk berbagi di web dan email.",
    "tool_name.ocr": "OCR PDF",
    "seo.features.ocr": "Ekstrak teks dari PDF pindaian dan gambar menggunakan Pengenalan Karakter Optik (OCR).",
    "tool_name.organize": "Atur PDF",
    "seo.features.organize": "Atur ulang, hapus, dan kelola halaman PDF secara visual dengan antarmuka yang intuitif.",`,
  ja: `
    "tool_name.compress": "PDF圧縮",
    "seo.features.compress": "Web共有やメール用に高画質を維持しながらPDFファイルサイズを大幅に縮小します。",
    "tool_name.ocr": "PDF OCR",
    "seo.features.ocr": "光学式文字認識（OCR）を使用して、スキャンしたPDFや画像からテキストを抽出します。",
    "tool_name.organize": "PDF整理",
    "seo.features.organize": "直感的なインターフェースでPDFページを視覚的に並べ替え、削除、管理します。",`,
  pt: `
    "tool_name.compress": "Comprimir PDF",
    "seo.features.compress": "Reduza significativamente o tamanho do arquivo PDF mantendo boa qualidade para compartilhamento web e e-mail.",
    "tool_name.ocr": "OCR PDF",
    "seo.features.ocr": "Extraia texto de PDFs digitalizados e imagens usando Reconhecimento Óptico de Caracteres (OCR).",
    "tool_name.organize": "Organizar PDF",
    "seo.features.organize": "Reordene, exclua e gerencie páginas de PDF visualmente com uma interface intuitiva.",`,
  fr: `
    "tool_name.compress": "Compresser PDF",
    "seo.features.compress": "Réduisez considérablement la taille du fichier PDF tout en conservant une bonne qualité pour le partage Web et par e-mail.",
    "tool_name.ocr": "OCR PDF",
    "seo.features.ocr": "Extrayez du texte à partir de PDF numérisés et d'images à l'aide de la reconnaissance optique de caractères (OCR).",
    "tool_name.organize": "Organiser PDF",
    "seo.features.organize": "Réorganisez, supprimez et gérez visuellement les pages PDF avec une interface intuitive.",`,
  de: `
    "tool_name.compress": "PDF Komprimieren",
    "seo.features.compress": "Reduzieren Sie die Dateigröße von PDFs erheblich bei gleichzeitiger Beibehaltung guter Qualität für das Web und E-Mails.",
    "tool_name.ocr": "OCR PDF",
    "seo.features.ocr": "Extrahieren Sie Text aus gescannten PDFs und Bildern mithilfe der optischen Zeichenerkennung (OCR).",
    "tool_name.organize": "PDF Organisieren",
    "seo.features.organize": "PDF-Seiten visuell mit einer intuitiven Benutzeroberfläche neu anordnen, löschen und verwalten.",`,
  es: `
    "tool_name.compress": "Comprimir PDF",
    "seo.features.compress": "Reduzca significativamente el tamaño del archivo PDF manteniendo una buena calidad para compartir en la web y por correo electrónico.",
    "tool_name.ocr": "OCR PDF",
    "seo.features.ocr": "Extraiga texto de archivos PDF escaneados e imágenes mediante el reconocimiento óptico de caracteres (OCR).",
    "tool_name.organize": "Organizar PDF",
    "seo.features.organize": "Reordene, elimine y administre páginas PDF visualmente con una interfaz intuitiva.",`
};

for (const [lang, additions] of Object.entries(translations)) {
  if (lang === 'en') {
    content = content.replace(/("workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + additions);
  } else {
    // Regex matches the language object start, anything up to workspace.merge.upload_more, and appends
    const regexStr = "(  \"" + lang + "\": \\{[\\s\\S]*?\"workspace\\.merge\\.upload_more\": \"[^\"]+\"\\s*\\n\\s*\\},)";
    const regex = new RegExp(regexStr, 'g');
    content = content.replace(regex, '$1\n' + additions);
  }
}

fs.writeFileSync('src/data/translations.ts', content);
console.log('done!');
