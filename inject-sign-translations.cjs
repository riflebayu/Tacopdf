const fs = require('fs');
const path = require('path');

const additionalTranslations = {
  en: {
    "banner.message": "🎉 Welcome to TacoPDF: The ultimate 100% free, secure, and offline-ready PDF toolkit!",
    "tool_name.sign": "Sign PDF",
    "seo.features.sign": "E-Sign documents locally by drawing or uploading your signature. No server uploads.",
    "tool.sign.title": "Electronic Signature",
    "tool.sign.draw": "Draw Signature",
    "tool.sign.upload": "Upload Image",
    "tool.sign.clear": "Clear",
    "tool.sign.upload_placeholder": "Select PNG/JPG image...",
    "tool.sign.where": "Where to place signature?",
    "tool.sign.last_page": "Last Page Only",
    "tool.sign.all_pages": "All Pages"
  },
  id: {
    "banner.message": "🎉 Selamat datang di TacoPDF: Alat PDF 100% gratis, aman, dan tanpa internet!",
    "tool_name.sign": "Tanda Tangan PDF",
    "seo.features.sign": "Tanda tangani dokumen secara lokal dengan menggambar atau mengunggah. Tanpa unggah server.",
    "tool.sign.title": "Tanda Tangan Elektronik",
    "tool.sign.draw": "Gambar TTD",
    "tool.sign.upload": "Unggah Foto",
    "tool.sign.clear": "Hapus",
    "tool.sign.upload_placeholder": "Pilih foto PNG/JPG...",
    "tool.sign.where": "Di mana letak tanda tangan?",
    "tool.sign.last_page": "Halaman Terakhir Saja",
    "tool.sign.all_pages": "Semua Halaman"
  },
  es: {
    "banner.message": "🎉 ¡Bienvenido a TacoPDF: El kit de herramientas PDF 100% gratuito, seguro y sin conexión!",
    "tool_name.sign": "Firmar PDF",
    "seo.features.sign": "Firme documentos localmente dibujando o subiendo su firma. Sin subidas al servidor.",
    "tool.sign.title": "Firma Electrónica",
    "tool.sign.draw": "Dibujar Firma",
    "tool.sign.upload": "Subir Imagen",
    "tool.sign.clear": "Limpiar",
    "tool.sign.upload_placeholder": "Seleccionar imagen PNG/JPG...",
    "tool.sign.where": "¿Dónde colocar la firma?",
    "tool.sign.last_page": "Solo Última Página",
    "tool.sign.all_pages": "Todas las Páginas"
  },
  ja: {
    "banner.message": "🎉 TacoPDFへようこそ：100％無料で安全、オフラインで使える究極のPDFツールキット！",
    "tool_name.sign": "PDFに署名",
    "seo.features.sign": "署名を描くかアップロードしてローカルで電子署名。サーバーへのアップロードはありません。",
    "tool.sign.title": "電子署名",
    "tool.sign.draw": "署名を描く",
    "tool.sign.upload": "画像をアップロード",
    "tool.sign.clear": "クリア",
    "tool.sign.upload_placeholder": "PNG/JPG画像を選択...",
    "tool.sign.where": "署名をどこに配置しますか？",
    "tool.sign.last_page": "最後のページのみ",
    "tool.sign.all_pages": "すべてのページ"
  },
  pt: {
    "banner.message": "🎉 Bem-vindo ao TacoPDF: O kit de ferramentas PDF 100% gratuito, seguro e offline!",
    "tool_name.sign": "Assinar PDF",
    "seo.features.sign": "Assine documentos localmente desenhando ou fazendo upload da sua assinatura. Sem envios.",
    "tool.sign.title": "Assinatura Eletrônica",
    "tool.sign.draw": "Desenhar Assinatura",
    "tool.sign.upload": "Fazer upload",
    "tool.sign.clear": "Limpar",
    "tool.sign.upload_placeholder": "Selecionar imagem PNG/JPG...",
    "tool.sign.where": "Onde colocar a assinatura?",
    "tool.sign.last_page": "Apenas Última Página",
    "tool.sign.all_pages": "Todas as Páginas"
  },
  de: {
    "banner.message": "🎉 Willkommen bei TacoPDF: Das ultimative 100% kostenlose, sichere und offline PDF-Toolkit!",
    "tool_name.sign": "PDF unterschreiben",
    "seo.features.sign": "Unterzeichnen Sie Dokumente lokal, indem Sie Ihre Unterschrift zeichnen oder hochladen.",
    "tool.sign.title": "Elektronische Signatur",
    "tool.sign.draw": "Unterschrift zeichnen",
    "tool.sign.upload": "Bild hochladen",
    "tool.sign.clear": "Löschen",
    "tool.sign.upload_placeholder": "PNG/JPG-Bild auswählen...",
    "tool.sign.where": "Wo soll die Unterschrift platziert werden?",
    "tool.sign.last_page": "Nur letzte Seite",
    "tool.sign.all_pages": "Alle Seiten"
  },
  fr: {
    "banner.message": "🎉 Bienvenue sur TacoPDF : La boîte à outils PDF 100 % gratuite, sécurisée et hors ligne !",
    "tool_name.sign": "Signer le PDF",
    "seo.features.sign": "Signez des documents localement en dessinant ou en téléchargeant votre signature.",
    "tool.sign.title": "Signature électronique",
    "tool.sign.draw": "Dessiner une signature",
    "tool.sign.upload": "Télécharger une image",
    "tool.sign.clear": "Effacer",
    "tool.sign.upload_placeholder": "Sélectionnez l'image PNG/JPG...",
    "tool.sign.where": "Où placer la signature ?",
    "tool.sign.last_page": "Dernière page uniquement",
    "tool.sign.all_pages": "Toutes les pages"
  }
};

const file = path.join(__dirname, 'src', 'data', 'translations.ts');
let content = fs.readFileSync(file, 'utf8');

for (const lang of Object.keys(additionalTranslations)) {
  const translations = additionalTranslations[lang];
  let injected = '';
  for (const key of Object.keys(translations)) {
    injected += `    "${key}": ${JSON.stringify(translations[key])},\n`;
  }
  
  const langBlockStartRegex = new RegExp(`(${lang}:\\s*\\{)`);
  if (content.match(langBlockStartRegex)) {
    content = content.replace(langBlockStartRegex, `$1\n${injected}`);
  }
}

fs.writeFileSync(file, content);
console.log('Successfully injected sign translations.');
