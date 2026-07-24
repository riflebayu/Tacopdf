const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  en: `\n    "tool.watermark.text": "Watermark Text",\n    "workspace.btn.save_download": "Save & Download PDF",\n    "tool.watermark.reset": "Reset Default"`,
  id: `\n    "tool.watermark.text": "Teks Watermark",\n    "workspace.btn.save_download": "Simpan & Unduh PDF",\n    "tool.watermark.reset": "Atur Ulang"`,
  es: `\n    "tool.watermark.text": "Texto de Marca de Agua",\n    "workspace.btn.save_download": "Guardar y Descargar PDF",\n    "tool.watermark.reset": "Restablecer"`,
  hi: `\n    "tool.watermark.text": "वाटरमार्क टेक्स्ट",\n    "workspace.btn.save_download": "सहेजें और पीडीएफ डाउनलोड करें",\n    "tool.watermark.reset": "रीसेट"`,
  ja: `\n    "tool.watermark.text": "透かしテキスト",\n    "workspace.btn.save_download": "保存してPDFをダウンロード",\n    "tool.watermark.reset": "リセット"`,
  ar: `\n    "tool.watermark.text": "نص العلامة المائية",\n    "workspace.btn.save_download": "حفظ وتنزيل PDF",\n    "tool.watermark.reset": "إعادة تعيين"`,
  pt: `\n    "tool.watermark.text": "Texto da Marca D'água",\n    "workspace.btn.save_download": "Salvar e Baixar PDF",\n    "tool.watermark.reset": "Redefinir"`,
  zh: `\n    "tool.watermark.text": "水印文本",\n    "workspace.btn.save_download": "保存并下载 PDF",\n    "tool.watermark.reset": "重置"`,
  de: `\n    "tool.watermark.text": "Wasserzeichen Text",\n    "workspace.btn.save_download": "Speichern & PDF Herunterladen",\n    "tool.watermark.reset": "Zurücksetzen"`,
  fr: `\n    "tool.watermark.text": "Texte du Filigrane",\n    "workspace.btn.save_download": "Enregistrer et Télécharger PDF",\n    "tool.watermark.reset": "Réinitialiser"`
};

// We will split the file by lines and track the current language.
// When we encounter `  },` or `  }` (end of object), we insert our additions before it.

let lines = file.split('\\n');
let currentLang = '';
let newLines = [];
let injected = {};

for (let i = 0; i < lines.length; i++) {
  const langMatch = lines[i].match(/^  ([a-z]{2}): \{/);
  if (langMatch) {
    currentLang = langMatch[1];
  }
  
  if ((lines[i] === '  },' || lines[i] === '  }') && currentLang && !injected[currentLang]) {
    if (additions[currentLang] && !file.includes('"tool.watermark.text"')) {
      // Append a comma to the previous line if it doesn't have one
      if (newLines.length > 0 && !newLines[newLines.length - 1].endsWith(',') && !newLines[newLines.length - 1].endsWith('{')) {
        newLines[newLines.length - 1] += ',';
      }
      newLines.push(additions[currentLang].substring(1)); // skip the leading \n
      injected[currentLang] = true;
    }
  }
  newLines.push(lines[i]);
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\\n'));
console.log('Translations added correctly this time.');
