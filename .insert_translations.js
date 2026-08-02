const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  '"en": {': '"en": {\n    "favorites.title": "Favorite Tools",\n    "favorites.reset": "Reset Favorites",\n    "favorites.confirm_reset": "Are you sure you want to clear all your favorite tools?",',
  '"id": {': '"id": {\n    "favorites.title": "Alat Favorit",\n    "favorites.reset": "Reset Favorit",\n    "favorites.confirm_reset": "Apakah Anda yakin ingin menghapus semua alat favorit Anda?",',
  '"es": {': '"es": {\n    "favorites.title": "Herramientas Favoritas",\n    "favorites.reset": "Restablecer Favoritas",\n    "favorites.confirm_reset": "¿Estás seguro de que quieres borrar todas tus herramientas favoritas?",',
  '"ja": {': '"ja": {\n    "favorites.title": "お気に入りツール",\n    "favorites.reset": "お気に入りをリセット",\n    "favorites.confirm_reset": "すべてのお気に入りツールを消去してもよろしいですか？",',
  '"pt": {': '"pt": {\n    "favorites.title": "Ferramentas Favoritas",\n    "favorites.reset": "Redefinir Favoritas",\n    "favorites.confirm_reset": "Tem certeza de que deseja limpar todas as suas ferramentas favoritas?",',
  '"de": {': '"de": {\n    "favorites.title": "Lieblingswerkzeuge",\n    "favorites.reset": "Favoriten zurücksetzen",\n    "favorites.confirm_reset": "Sind Sie sicher, dass Sie alle Ihre Lieblingswerkzeuge löschen möchten?",',
  '"fr": {': '"fr": {\n    "favorites.title": "Outils Favoris",\n    "favorites.reset": "Réinitialiser les Favoris",\n    "favorites.confirm_reset": "Êtes-vous sûr de vouloir effacer tous vos outils favoris ?",'
};

for (const [key, val] of Object.entries(additions)) {
  content = content.replace(key, val);
}

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log('Translations inserted successfully!');
