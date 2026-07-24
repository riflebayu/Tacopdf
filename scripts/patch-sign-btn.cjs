const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

fs.writeFileSync('scripts/temp-sign-btn.cjs', `module.exports = ${objStr}`);

const TRANSLATIONS = require('../scripts/temp-sign-btn.cjs');

const signBtnTranslations = {
  en: {
    'tool.sign.add_btn': 'Add Signature',
    'tool.sign.delete_btn': 'Delete Signature'
  },
  id: {
    'tool.sign.add_btn': 'Tambah Tanda Tangan',
    'tool.sign.delete_btn': 'Hapus Tanda Tangan'
  },
  es: {
    'tool.sign.add_btn': 'Agregar Firma',
    'tool.sign.delete_btn': 'Eliminar Firma'
  },
  ja: {
    'tool.sign.add_btn': '署名を追加',
    'tool.sign.delete_btn': '署名を削除'
  },
  fr: {
    'tool.sign.add_btn': 'Ajouter une Signature',
    'tool.sign.delete_btn': 'Supprimer la Signature'
  },
  de: {
    'tool.sign.add_btn': 'Unterschrift Hinzufügen',
    'tool.sign.delete_btn': 'Unterschrift Löschen'
  },
  pt: {
    'tool.sign.add_btn': 'Adicionar Assinatura',
    'tool.sign.delete_btn': 'Excluir Assinatura'
  }
};

for (const lang in signBtnTranslations) {
  if (TRANSLATIONS[lang]) {
    Object.assign(TRANSLATIONS[lang], signBtnTranslations[lang]);
  }
}

const outContent = 'export const TRANSLATIONS = ' + JSON.stringify(TRANSLATIONS, null, 2) + ';';
fs.writeFileSync('src/data/translations.ts', outContent);
console.log('Successfully added sign button translations');
