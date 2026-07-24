const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

// Create a temporary JS file
fs.writeFileSync('scripts/temp-trans2.cjs', `module.exports = ${objStr}`);

const translations = require('./temp-trans2.cjs');

const missingTranslations = {
  en: {
    "workspace.file.remove": "Remove File",
    "workspace.btn.save_download": "Save & Download PDF"
  },
  id: {
    "workspace.file.remove": "Hapus File",
    "workspace.btn.save_download": "Simpan & Unduh PDF"
  },
  es: {
    "workspace.file.remove": "Eliminar Archivo",
    "workspace.btn.save_download": "Guardar y Descargar PDF"
  },
  ja: {
    "workspace.file.remove": "ファイルを削除",
    "workspace.btn.save_download": "保存してPDFをダウンロード"
  },
  fr: {
    "workspace.file.remove": "Supprimer le Fichier",
    "workspace.btn.save_download": "Enregistrer et Télécharger PDF"
  },
  de: {
    "workspace.file.remove": "Datei Entfernen",
    "workspace.btn.save_download": "Speichern & PDF Herunterladen"
  },
  pt: {
    "workspace.file.remove": "Remover Arquivo",
    "workspace.btn.save_download": "Salvar e Baixar PDF"
  },
  hi: {
    "workspace.file.remove": "फ़ाइल निकालें",
    "workspace.btn.save_download": "सहेजें और PDF डाउनलोड करें"
  },
  ar: {
    "workspace.file.remove": "إزالة الملف",
    "workspace.btn.save_download": "حفظ وتنزيل PDF"
  },
  zh: {
    "workspace.file.remove": "删除文件",
    "workspace.btn.save_download": "保存并下载 PDF"
  }
};

for (const lang in translations) {
  if (missingTranslations[lang]) {
    Object.assign(translations[lang], missingTranslations[lang]);
  } else {
    Object.assign(translations[lang], missingTranslations['en']);
  }
}

// Write back with exact correct syntax
fs.writeFileSync('src/data/translations.ts', `export const TRANSLATIONS = ${JSON.stringify(translations, null, 2)};\n`);
console.log('Successfully added missing workspace keys!');
