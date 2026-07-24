const fs = require('fs');

const tsFile = fs.readFileSync('src/data/translations.ts', 'utf8');
const objStr = tsFile.replace('export const TRANSLATIONS = ', '');

fs.writeFileSync('scripts/temp-history.cjs', `module.exports = ${objStr}`);

const TRANSLATIONS = require('../scripts/temp-history.cjs');

const historyTranslations = {
  en: {
    'history.title': 'Recent Activity',
    'history.clear': 'Clear',
    'history.empty': 'No recent activity yet.',
    'history.privacy': 'History is only stored locally on your device.'
  },
  id: {
    'history.title': 'Aktivitas Terkini',
    'history.clear': 'Bersihkan',
    'history.empty': 'Belum ada aktivitas.',
    'history.privacy': 'Riwayat hanya disimpan secara lokal di perangkat Anda.'
  },
  es: {
    'history.title': 'Actividad Reciente',
    'history.clear': 'Borrar',
    'history.empty': 'Aún no hay actividad.',
    'history.privacy': 'El historial solo se almacena localmente en su dispositivo.'
  },
  ja: {
    'history.title': '最近の活動',
    'history.clear': 'クリア',
    'history.empty': '最近の活動はまだありません。',
    'history.privacy': '履歴はデバイス上にローカルにのみ保存されます。'
  },
  fr: {
    'history.title': 'Activité Récente',
    'history.clear': 'Effacer',
    'history.empty': 'Aucune activité récente.',
    'history.privacy': "L'historique n'est stocké que localement sur votre appareil."
  },
  de: {
    'history.title': 'Letzte Aktivität',
    'history.clear': 'Löschen',
    'history.empty': 'Noch keine letzte Aktivität.',
    'history.privacy': 'Der Verlauf wird nur lokal auf Ihrem Gerät gespeichert.'
  },
  pt: {
    'history.title': 'Atividade Recente',
    'history.clear': 'Limpar',
    'history.empty': 'Nenhuma atividade recente ainda.',
    'history.privacy': 'O histórico é armazenado apenas localmente no seu dispositivo.'
  }
};

for (const lang in historyTranslations) {
  if (TRANSLATIONS[lang]) {
    Object.assign(TRANSLATIONS[lang], historyTranslations[lang]);
  }
}

const outContent = 'export const TRANSLATIONS = ' + JSON.stringify(TRANSLATIONS, null, 2) + ';';
fs.writeFileSync('src/data/translations.ts', outContent);
console.log('Successfully added history translations');
