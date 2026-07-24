
const fs = require('fs');
const p = 'src/data/translations.ts';
let content = fs.readFileSync(p, 'utf-8');
const lines = content.split('\n');
const newLines = [];
const seenKeys = new Set();
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export const TRANSLATIONS')) {
     newLines.push(line); continue;
  }
  if (line.match(/^\s*'[a-z]{2}':\s*\{/)) {
    seenKeys.clear();
    newLines.push(line); continue;
  }
  const match = line.match(/^\s*"([^"]+)"\s*:/);
  if (match) {
    const key = match[1];
    if (seenKeys.has(key)) {
      continue;
    } else {
      seenKeys.add(key);
      newLines.push(line);
    }
  } else {
    newLines.push(line);
  }
}
fs.writeFileSync(p, newLines.join('\n'));
console.log('Deduplication done.');

