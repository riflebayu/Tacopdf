const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = content.split('\n');
const langs = [];
lines.forEach(l => {
  const match = l.match(/^  \"([a-z]{2,3})\": \{/);
  if (match) {
    langs.push(match[1]);
  }
});
console.log(langs.join(', '));
