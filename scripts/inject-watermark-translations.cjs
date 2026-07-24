const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  en: `    "tool.watermark.text": "Watermark Text",\n    "workspace.btn.save_download": "Save & Download PDF",\n    "tool.watermark.reset": "Reset Default",`,
  id: `    "tool.watermark.text": "Teks Watermark",\n    "workspace.btn.save_download": "Simpan & Unduh PDF",\n    "tool.watermark.reset": "Atur Ulang",`,
  es: `    "tool.watermark.text": "Texto de Marca de Agua",\n    "workspace.btn.save_download": "Guardar y Descargar PDF",\n    "tool.watermark.reset": "Restablecer",`,
  hi: `    "tool.watermark.text": "वाटरमार्क टेक्स्ट",\n    "workspace.btn.save_download": "सहेजें और पीडीएफ डाउनलोड करें",\n    "tool.watermark.reset": "रीसेट",`,
  ja: `    "tool.watermark.text": "透かしテキスト",\n    "workspace.btn.save_download": "保存してPDFをダウンロード",\n    "tool.watermark.reset": "リセット",`,
  ar: `    "tool.watermark.text": "نص العلامة المائية",\n    "workspace.btn.save_download": "حفظ وتنزيل PDF",\n    "tool.watermark.reset": "إعادة تعيين",`,
  pt: `    "tool.watermark.text": "Texto da Marca D'água",\n    "workspace.btn.save_download": "Salvar e Baixar PDF",\n    "tool.watermark.reset": "Redefinir",`,
  zh: `    "tool.watermark.text": "水印文本",\n    "workspace.btn.save_download": "保存并下载 PDF",\n    "tool.watermark.reset": "重置",`,
  de: `    "tool.watermark.text": "Wasserzeichen Text",\n    "workspace.btn.save_download": "Speichern & PDF Herunterladen",\n    "tool.watermark.reset": "Zurücksetzen",`,
  fr: `    "tool.watermark.text": "Texte du Filigrane",\n    "workspace.btn.save_download": "Enregistrer et Télécharger PDF",\n    "tool.watermark.reset": "Réinitialiser",`
};

let currentLang = '';
let lines = file.split('\\n');
let newLines = [];
let insertedForLang = {};

for (let i = 0; i < lines.length; i++) {
  newLines.push(lines[i]);
  const langMatch = lines[i].match(/^  ([a-z]{2}): \{/);
  if (langMatch) {
    currentLang = langMatch[1];
  }
  if (lines[i].includes('"tool.sign.scale"') && currentLang && !insertedForLang[currentLang]) {
    if (additions[currentLang]) {
      newLines.push(additions[currentLang]);
      insertedForLang[currentLang] = true;
    }
  }
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\\n'));
console.log('Translations added safely.');
