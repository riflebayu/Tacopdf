const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const matches = content.match(/"privacy\.doc_title"[\s\S]*?"privacy\.p6\.text":\s*"[^"]*"/g);
console.log(matches ? matches.length : 0);
