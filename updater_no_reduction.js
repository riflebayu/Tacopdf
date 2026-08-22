const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const newStrings = {
  en: `    "tool.compress.no_reduction": "No significant reduction (Output: {size} MB)",`,
  id: `    "tool.compress.no_reduction": "Tidak ada pengurangan signifikan (Output: {size} MB)",`,
  es: `    "tool.compress.no_reduction": "Sin reducción significativa (Salida: {size} MB)",`,
  pt: `    "tool.compress.no_reduction": "Nenhuma redução significativa (Saída: {size} MB)",`,
  fr: `    "tool.compress.no_reduction": "Pas de réduction significative (Sortie : {size} MB)",`,
  ja: `    "tool.compress.no_reduction": "大幅な削減はありません (出力: {size} MB)",`,
  de: `    "tool.compress.no_reduction": "Keine wesentliche Reduzierung (Ausgabe: {size} MB)",`
};

Object.keys(newStrings).forEach(lang => {
  const regex = new RegExp(`"\\b${lang}\\b":\\s*\\{`);
  const match = content.match(regex);
  if (match) {
    const insertIdx = match.index + match[0].length;
    content = content.slice(0, insertIdx) + '\n' + newStrings[lang] + content.slice(insertIdx);
    console.log('Injected for', lang);
  } else {
    console.log('Failed to find', lang);
  }
});

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log('Done!');
