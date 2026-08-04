import fs from 'fs';

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const replacements = [
  { target: '"tool.rotate.right": "Rotate Right",', add: '    "tool.rotate.select_hint": "Select a page above to rotate",' },
  { target: '"tool.rotate.right": "Putar Kanan",', add: '    "tool.rotate.select_hint": "Pilih halaman di atas untuk diputar",' },
  { target: '"tool.rotate.right": "Girar Direita",', add: '    "tool.rotate.select_hint": "Selecciona una página arriba para girarla",' },
  { target: '"tool.rotate.right": "右回転",', add: '    "tool.rotate.select_hint": "回転するページを上で選択してください",' },
  { target: '"tool.rotate.right": "Girar para a direita",', add: '    "tool.rotate.select_hint": "Selecione uma página acima para girar",' },
  { target: '"tool.rotate.right": "Nach rechts drehen",', add: '    "tool.rotate.select_hint": "Wählen Sie oben eine Seite zum Drehen aus",' },
  { target: '"tool.rotate.right": "Pivoter à Droite",', add: '    "tool.rotate.select_hint": "Sélectionnez une page ci-dessus pour la faire pivoter",' }
];

let replacedCount = 0;
for (const r of replacements) {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.target + '\n' + r.add);
    replacedCount++;
  } else {
    console.error('Target not found:', r.target);
  }
}

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log(`Successfully added ${replacedCount} translations to translations.ts`);
