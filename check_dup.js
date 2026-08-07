const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const idObj = content.substring(content.indexOf('"id": {'), content.indexOf('"es": {'));
console.log("Matches:", idObj.match(/"about.founder.text"/g).length);
