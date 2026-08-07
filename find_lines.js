const fs = require('fs');
const lines = fs.readFileSync('src/data/translations.ts', 'utf8').split('\n');
const langs = ['en','id','es','fr','de','pt','ja'];
langs.forEach(l => {
  const start = lines.findIndex(line => line.includes(`"${l}": {`));
  const pStart = lines.findIndex((line, i) => i > start && line.includes('"privacy.doc_title":'));
  const pEnd = lines.findIndex((line, i) => i > pStart && line.includes('"contact.back":'));
  console.log(`${l}: ${pStart + 1} to ${pEnd}`);
});
