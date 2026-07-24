import fs from 'fs';
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = content.split('\n');
const langs = [];
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/^  "([a-z]{2,3})": \{/);
  if (match) {
    langs.push({ lang: match[1], line: i });
  }
}
console.log('Languages:', langs);

const result = [];
lines.forEach((l, i) => {
  if (l.includes('"file.locked"')) {
    result.push(`${i}: ${l.trim()}`);
  }
});
console.log('file.locked lines:', result);
