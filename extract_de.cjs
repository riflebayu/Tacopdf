const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf-8');
const start = content.indexOf('"de": {');
const end = content.indexOf('"fr": {', start);
const deStr = content.substring(start, end);
fs.writeFileSync('de_translations.json', deStr);
