const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

fs.writeFileSync('scripts/temp-favorites-popup.cjs', `module.exports = ${objStr}`);

const TRANSLATIONS = require('../scripts/temp-favorites-popup.cjs');

const favoritesPopupTranslations = {
  en: {
    'favorites.reset.title': 'Reset Favorites',
    'favorites.reset.desc': 'Are you sure you want to reset your favorites? This action cannot be undone.',
    'favorites.reset.cancel': 'Cancel',
    'favorites.reset.confirm': 'Reset'
  },
  id: {
    'favorites.reset.title': 'Atur Ulang Favorit',
    'favorites.reset.desc': 'Apakah Anda yakin ingin mengatur ulang favorit Anda? Tindakan ini tidak dapat dibatalkan.',
    'favorites.reset.cancel': 'Batal',
    'favorites.reset.confirm': 'Atur Ulang'
  },
  es: {
    'favorites.reset.title': 'Restablecer Favoritos',
    'favorites.reset.desc': '¿Estás seguro de que deseas restablecer tus favoritos? Esta acción no se puede deshacer.',
    'favorites.reset.cancel': 'Cancelar',
    'favorites.reset.confirm': 'Restablecer'
  },
  ja: {
    'favorites.reset.title': 'お気に入りをリセット',
    'favorites.reset.desc': 'お気に入りをリセットしてもよろしいですか？この操作は元に戻せません。',
    'favorites.reset.cancel': 'キャンセル',
    'favorites.reset.confirm': 'リセット'
  },
  fr: {
    'favorites.reset.title': 'Réinitialiser les Favoris',
    'favorites.reset.desc': 'Êtes-vous sûr de vouloir réinitialiser vos favoris ? Cette action ne peut pas être annulée.',
    'favorites.reset.cancel': 'Annuler',
    'favorites.reset.confirm': 'Réinitialiser'
  },
  de: {
    'favorites.reset.title': 'Favoriten Zurücksetzen',
    'favorites.reset.desc': 'Sind Sie sicher, dass Sie Ihre Favoriten zurücksetzen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    'favorites.reset.cancel': 'Abbrechen',
    'favorites.reset.confirm': 'Zurücksetzen'
  },
  pt: {
    'favorites.reset.title': 'Redefinir Favoritos',
    'favorites.reset.desc': 'Tem certeza de que deseja redefinir seus favoritos? Esta ação não pode ser desfeita.',
    'favorites.reset.cancel': 'Cancelar',
    'favorites.reset.confirm': 'Redefinir'
  }
};

for (const lang in favoritesPopupTranslations) {
  if (TRANSLATIONS[lang]) {
    Object.assign(TRANSLATIONS[lang], favoritesPopupTranslations[lang]);
  }
}

const outContent = 'export const TRANSLATIONS = ' + JSON.stringify(TRANSLATIONS, null, 2) + ';';
fs.writeFileSync('src/data/translations.ts', outContent);
console.log('Successfully added favorites popup translations');
