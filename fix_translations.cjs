const fs = require('fs');
const file = 'src/data/translations.ts';
let content = fs.readFileSync(file, 'utf8');

// Fix Japanese: inject file.locked after file.locked.notice
const jaMarker = '"file.locked.notice": ';
const jaIdx = content.indexOf(jaMarker, content.indexOf('"ja": {'));
if (jaIdx > -1) {
  const lineEnd = content.indexOf('\n', jaIdx);
  const before = content.substring(0, lineEnd + 1);
  const after = content.substring(lineEnd + 1);
  if (!before.includes('"file.locked": "ロック"')) {
    content = before + '    "file.locked": "ロック",\n' + after;
  }
}

// Fix French and German
const frMarker = '    "tool.extract.mode_all": "Extraire toutes les pages",';
const ptMarker = '    "tool.page_num.top_right": "Superior Direita",';

if (content.includes(ptMarker) && content.includes(frMarker)) {
  const replacement = `    "tool.page_num.top_right": "Superior Direita"
  },
  "de": {
    "file.locked": "Gesperrt"
  },
  "fr": {
    "tool.extract.mode_all": "Extraire toutes les pages",`;
  content = content.replace(ptMarker + '\n' + frMarker, replacement);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Translations fixed successfully.');
