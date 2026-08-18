const fs = require('fs');
const content = fs.readFileSync('d:/Tacopdf/src/data/translations.ts', 'utf8');
const langs = [...content.matchAll(/\"([a-z]{2})\":\s*\{/g)].map(m => m[1]);
console.log(langs);
