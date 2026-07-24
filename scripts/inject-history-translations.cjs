const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = [
  // 1. en
  `\n    "history.title": "Recent Activity",\n    "history.clear": "Clear History",\n    "history.empty": "No recent activity yet.",\n    "history.privacy": "History is stored locally on your device.",`,
  // 2. id
  `\n    "history.title": "Aktivitas Terakhir",\n    "history.clear": "Hapus Riwayat",\n    "history.empty": "Belum ada aktivitas.",\n    "history.privacy": "Riwayat hanya disimpan di perangkat Anda.",`,
  // 3. es
  `\n    "history.title": "Actividad Reciente",\n    "history.clear": "Borrar Historial",\n    "history.empty": "No hay actividad reciente.",\n    "history.privacy": "El historial se almacena localmente en su dispositivo.",`,
  // 4. ja
  `\n    "history.title": "最近のアクティビティ",\n    "history.clear": "履歴を消去",\n    "history.empty": "最近のアクティビティはありません。",\n    "history.privacy": "履歴はデバイスのローカルにのみ保存されます。",`,
  // 5. pt
  `\n    "history.title": "Atividade Recente",\n    "history.clear": "Limpar Histórico",\n    "history.empty": "Nenhuma atividade recente.",\n    "history.privacy": "O histórico é armazenado localmente no seu dispositivo.",`,
  // 6. de
  `\n    "history.title": "Letzte Aktivität",\n    "history.clear": "Verlauf Löschen",\n    "history.empty": "Noch keine letzte Aktivität.",\n    "history.privacy": "Der Verlauf wird lokal auf Ihrem Gerät gespeichert.",`,
  // 7. fr
  `\n    "history.title": "Activité Récente",\n    "history.clear": "Effacer l'historique",\n    "history.empty": "Aucune activité récente.",\n    "history.privacy": "L'historique est stocké localement sur votre appareil.",`
];

let counter = 0;
file = file.replace(/("tool\.action\.undo":\s*".*?"),/g, (match) => {
  const replacement = match + additions[counter];
  counter++;
  return replacement;
});

fs.writeFileSync('src/data/translations.ts', file, 'utf8');
console.log('Injected ' + counter + ' translations!');
