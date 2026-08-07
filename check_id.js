const fs = require('fs');
const data = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = data.split('\n');
const idIndex = lines.findIndex(l => l.includes('"id": {'));
console.log(lines.slice(idIndex, idIndex + 15).join('\n'));
