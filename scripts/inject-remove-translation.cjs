const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = [
  // 1. en
  `\n    "workspace.file.remove": "Remove PDF",\n  },
  id: {`,
  // 2. id
  `\n    "workspace.file.remove": "Hapus PDF",\n  },
  es: {`,
  // 3. es
  `\n    "workspace.file.remove": "Eliminar PDF",\n  },
  hi: {`,
  // 4. hi
  `\n    "workspace.file.remove": "पीडीएफ हटाएं",\n  },
  ar: {`,
  // 5. ar
  `\n    "workspace.file.remove": "إزالة PDF",\n  },
  zh: {`,
  // 6. zh
  `\n    "workspace.file.remove": "删除 PDF",\n  },
  pt: {`,
  // 7. pt
  `\n    "workspace.file.remove": "Remover PDF",\n  }`
];

const splits = file.split(/\n  \},\n  [a-z]{2}: \{|\n  \}/g);
if (splits.length >= 8) {
  let newFile = splits[0] + additions[0] + splits[1] + additions[1] + splits[2] + additions[2] + splits[3] + additions[3] + splits[4] + additions[4] + splits[5] + additions[5] + splits[6] + additions[6] + splits[7] + "\n  }\n};\n";
  fs.writeFileSync('src/data/translations.ts', newFile);
  console.log("Translations injected successfully.");
} else {
  console.log("Could not parse file correctly. Splits:", splits.length);
}
