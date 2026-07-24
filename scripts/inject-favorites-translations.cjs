const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = [
  // 1. en
  `\n    "favorites.reset": "Reset Favorites",\n    "favorites.confirm_reset": "Are you sure you want to clear all your favorite tools?",`,
  // 2. id
  `\n    "favorites.reset": "Reset Favorit",\n    "favorites.confirm_reset": "Apakah Anda yakin ingin menghapus semua daftar alat favorit Anda?",`,
  // 3. es
  `\n    "favorites.reset": "Restablecer Favoritos",\n    "favorites.confirm_reset": "¿Estás seguro de que deseas borrar todas tus herramientas favoritas?",`,
  // 4. ja
  `\n    "favorites.reset": "お気に入りをリセット",\n    "favorites.confirm_reset": "すべてのお気に入りツールをクリアしてもよろしいですか？",`,
  // 5. pt
  `\n    "favorites.reset": "Redefinir Favoritos",\n    "favorites.confirm_reset": "Tem certeza de que deseja limpar todas as suas ferramentas favoritas?",`,
  // 6. de
  `\n    "favorites.reset": "Favoriten Zurücksetzen",\n    "favorites.confirm_reset": "Sind Sie sicher, dass Sie alle Ihre bevorzugten Werkzeuge löschen möchten?",`,
  // 7. fr
  `\n    "favorites.reset": "Réinitialiser les favoris",\n    "favorites.confirm_reset": "Êtes-vous sûr de vouloir effacer tous vos outils favoris ?",`
];

let counter = 0;
file = file.replace(/("history\.privacy":\s*".*?"),/g, (match) => {
  const replacement = match + additions[counter];
  counter++;
  return replacement;
});

fs.writeFileSync('src/data/translations.ts', file, 'utf8');
console.log('Injected ' + counter + ' translations!');
