const fs = require('fs');
let trans = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = [
  {
    lang: '// --- English ---',
    key: `"tool.merge.tip.mobile.desc": "Set the order by dragging the preview boxes above.",`
  },
  {
    lang: '// --- Indonesian ---',
    key: `"tool.merge.tip.mobile.desc": "Atur urutannya dengan menyeret kotak pratinjau di atas.",`
  },
  {
    lang: '// --- Spanish ---',
    key: `"tool.merge.tip.mobile.desc": "Ajuste el orden arrastrando los cuadros de vista previa arriba.",`
  },
  {
    lang: '// --- Japanese ---',
    key: `"tool.merge.tip.mobile.desc": "上のプレビューボックスをドラッグして順序を調整してください。",`
  },
  {
    lang: '// --- Portuguese ---',
    key: `"tool.merge.tip.mobile.desc": "Ajuste a ordem arrastrando as caixas de visualização acima.",`
  },
  {
    lang: '// --- German ---',
    key: `"tool.merge.tip.mobile.desc": "Legen Sie die Reihenfolge fest, indem Sie die Vorschaufelder oben ziehen.",`
  },
  {
    lang: '// --- French ---',
    key: `"tool.merge.tip.mobile.desc": "Réglez l'ordre en faisant glisser les boîtes d'aperçu ci-dessus.",`
  }
];

// We will find `"tool.merge.tip.desc": ...` and insert our new key right after it.
// Wait, to be safe, I'll just regex replace `"tool.merge.tip.desc": "...",` with `"tool.merge.tip.desc": "...",\n    "tool.merge.tip.mobile.desc": "...",`

for (const add of additions) {
  // Let's find the tool.merge.tip.desc line inside each block.
  // Actually, a simpler way is to just append the keys at the end of each language block.
  // But each block is an object. Let's find `    "tool.merge.tip.desc": ` and insert after.
}

// A better way in JS:
const lines = trans.split('\n');
const newLines = [];
let currentLang = 'en'; // default

// map of language to key
const keyMap = {
  'en': `"tool.merge.tip.mobile.desc": "Set the order by dragging the preview boxes above.",`,
  'id': `"tool.merge.tip.mobile.desc": "Atur urutannya dengan menyeret kotak pratinjau di atas.",`,
  'es': `"tool.merge.tip.mobile.desc": "Ajuste el orden arrastrando los cuadros de vista previa arriba.",`,
  'ja': `"tool.merge.tip.mobile.desc": "上のプレビューボックスをドラッグして順序を調整してください。",`,
  'pt': `"tool.merge.tip.mobile.desc": "Ajuste a ordem arrastrando as caixas de visualização acima.",`,
  'de': `"tool.merge.tip.mobile.desc": "Legen Sie die Reihenfolge fest, indem Sie die Vorschaufelder oben ziehen.",`,
  'fr': `"tool.merge.tip.mobile.desc": "Réglez l'ordre en faisant glisser les boîtes d'aperçu ci-dessus.",`
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  newLines.push(line);
  
  if (line.includes('// --- English ---')) currentLang = 'en';
  else if (line.includes('// --- Indonesian ---')) currentLang = 'id';
  else if (line.includes('// --- Spanish ---')) currentLang = 'es';
  else if (line.includes('// --- Japanese ---')) currentLang = 'ja';
  else if (line.includes('// --- Portuguese ---')) currentLang = 'pt';
  else if (line.includes('// --- German ---')) currentLang = 'de';
  else if (line.includes('// --- French ---')) currentLang = 'fr';
  
  if (line.includes('"tool.merge.tip.desc":')) {
    newLines.push('    ' + keyMap[currentLang]);
  }
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\n'), 'utf8');
console.log('Translations updated!');
