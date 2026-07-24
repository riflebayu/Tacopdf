const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

fs.writeFileSync('scripts/temp-favorites.cjs', `module.exports = ${objStr}`);

const TRANSLATIONS = require('../scripts/temp-favorites.cjs');

const favoritesTranslations = {
  en: {
    'favorites.reset': 'Reset Favorites'
  },
  id: {
    'favorites.reset': 'Atur Ulang Favorit'
  },
  es: {
    'favorites.reset': 'Restablecer Favoritos'
  },
  ja: {
    'favorites.reset': 'お気に入りをリセット'
  },
  fr: {
    'favorites.reset': 'Réinitialiser les Favoris'
  },
  de: {
    'favorites.reset': 'Favoriten Zurücksetzen'
  },
  pt: {
    'favorites.reset': 'Redefinir Favoritos'
  }
};

for (const lang in favoritesTranslations) {
  if (TRANSLATIONS[lang]) {
    Object.assign(TRANSLATIONS[lang], favoritesTranslations[lang]);
  }
}

const outContent = 'export const TRANSLATIONS = ' + JSON.stringify(TRANSLATIONS, null, 2) + ';';
fs.writeFileSync('src/data/translations.ts', outContent);
console.log('Successfully added favorites translations');
