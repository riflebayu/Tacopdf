const fs = require('fs');

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

// The exact texts from the object
const replacements = [
  // English
  [
    /or compress large files, /g,
    'or '
  ],
  // Indonesian
  [
    /, atau mengompresi file besar,/g,
    ' atau'
  ],
  // Spanish
  [
    /, o comprimir archivos grandes,/g,
    ' o'
  ],
  // Japanese
  [
    /、または大きなファイルの圧縮/g,
    ''
  ],
  // Portuguese
  [
    /, ou compactar arquivos grandes,/g,
    ' ou'
  ],
  // German
  [
    / oder große Dateien komprimieren/g,
    ''
  ],
  // French
  [
    /, ou de compresser des fichiers volumineux,/g,
    ' ou'
  ]
];

for (const [pattern, replacement] of replacements) {
  content = content.replace(pattern, replacement);
}

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log('Fixed how.step1.text strings in translations.ts');
