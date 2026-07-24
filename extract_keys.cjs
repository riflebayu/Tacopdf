const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = content.split('\n');
const langs = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/^\s*"[a-zA-Z-]+": \{/)) {
    langs.push(lines[i].trim());
  }
}
console.log(langs);
