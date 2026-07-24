const fs = require('fs');
const file = 'src/data/translations.ts';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
const langs = [];
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/^  "([a-z]{2,3})": \{/);
  if (match) {
    langs.push(match[1]);
  }
}
console.log(langs);
