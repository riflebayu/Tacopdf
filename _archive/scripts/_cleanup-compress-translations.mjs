import fs from 'fs';

const path = 'src/data/translations.ts';
const lines = fs.readFileSync(path, 'utf8').split('\n');
const filtered = lines.filter((line) => !/^\s*"[^"]*compress[^"]*":/.test(line));
const removed = lines.length - filtered.length;
fs.writeFileSync(path, filtered.join('\n'));
console.log(`Removed ${removed} compress translation lines`);
