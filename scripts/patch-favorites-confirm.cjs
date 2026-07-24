const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

fs.writeFileSync('scripts/temp-favorites-confirm.cjs', `module.exports = ${objStr}`);

const TRANSLATIONS = require('../scripts/temp-favorites-confirm.cjs');

const favoritesConfirmTranslations = {
  en: {
    'favorites.confirm_reset': 'Are you sure you want to reset your favorites?'
  },
  id: {
    'favorites.confirm_reset': 'Apakah Anda yakin ingin mengatur ulang daftar favorit Anda?'
  },
  es: {
    'favorites.confirm_reset': '¿Estás seguro de que deseas restablecer tus favoritos?'
  },
  ja: {
    'favorites.confirm_reset': 'お気に入りをリセットしてもよろしいですか？'
  },
  fr: {
    'favorites.confirm_reset': 'Êtes-vous sûr de vouloir réinitialiser vos favoris ?'
  },
  de: {
    'favorites.confirm_reset': 'Sind Sie sicher, dass Sie Ihre Favoriten zurücksetzen möchten?'
  },
  pt: {
    'favorites.confirm_reset': 'Tem certeza de que deseja redefinir seus favoritos?'
  }
};

for (const lang in favoritesConfirmTranslations) {
  if (TRANSLATIONS[lang]) {
    Object.assign(TRANSLATIONS[lang], favoritesConfirmTranslations[lang]);
  }
}

const outContent = 'export const TRANSLATIONS = ' + JSON.stringify(TRANSLATIONS, null, 2) + ';';
fs.writeFileSync('src/data/translations.ts', outContent);
console.log('Successfully added favorites confirm translations');
