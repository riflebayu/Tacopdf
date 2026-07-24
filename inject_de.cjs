const fs = require('fs');

let content = fs.readFileSync('src/data/translations.ts', 'utf8');
const translatedDe = JSON.parse(fs.readFileSync('translated_de.json', 'utf8'));

// Format new translations
let newDictStr = '';
for (const key of Object.keys(translatedDe)) {
  newDictStr += `    "${key}": ${JSON.stringify(translatedDe[key])},\n`;
}

// Inject into "de" block
const regex = new RegExp(`("de": \\{)`);
content = content.replace(regex, "$1\n" + newDictStr);

fs.writeFileSync('src/data/translations.ts', content);
console.log('Successfully injected translated German keys!');
