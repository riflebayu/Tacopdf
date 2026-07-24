const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

// The faulty injection did this:
// It replaced the `\n  },\n  es: {` with `\n    "workspace.file.remove": "Remove PDF",\n  },\n  id: {`
// Wait, no. Look at the file:
// 472:     "workspace.file.remove": "Remove PDF",
// 473:   },
// 474:   id: {
// 475:     "tool.action.extract": "Ekstrak",
// So `splits[0]` was up to line 471. Then additions[0] was inserted.
// But what about additions[1]?
// Let's just fix the syntax error directly:
file = file.replace(/id: \{,\s*id: \{/g, 'id: {');
file = file.replace(/es: \{,\s*es: \{/g, 'es: {');
file = file.replace(/hi: \{,\s*hi: \{/g, 'hi: {');
file = file.replace(/ar: \{,\s*ar: \{/g, 'ar: {');
file = file.replace(/zh: \{,\s*zh: \{/g, 'zh: {');
file = file.replace(/pt: \{,\s*pt: \{/g, 'pt: {');

// We also need to add the missing translations. Let's do it safely using replace.
if (!file.includes('"workspace.file.remove": "Hapus PDF"')) {
  file = file.replace(/\n  \},\n  es: \{/, ',\n    "workspace.file.remove": "Hapus PDF"\n  },\n  es: {');
}
if (!file.includes('"workspace.file.remove": "Eliminar PDF"')) {
  file = file.replace(/\n  \},\n  hi: \{/, ',\n    "workspace.file.remove": "Eliminar PDF"\n  },\n  hi: {');
}
if (!file.includes('"workspace.file.remove": "पीडीएफ हटाएं"')) {
  file = file.replace(/\n  \},\n  ar: \{/, ',\n    "workspace.file.remove": "पीडीएफ हटाएं"\n  },\n  ar: {');
}
if (!file.includes('"workspace.file.remove": "إزالة PDF"')) {
  file = file.replace(/\n  \},\n  zh: \{/, ',\n    "workspace.file.remove": "إزالة PDF"\n  },\n  zh: {');
}
if (!file.includes('"workspace.file.remove": "删除 PDF"')) {
  file = file.replace(/\n  \},\n  pt: \{/, ',\n    "workspace.file.remove": "删除 PDF"\n  },\n  pt: {');
}
if (!file.includes('"workspace.file.remove": "Remover PDF"')) {
  file = file.replace(/\n  \}\n\};/, ',\n    "workspace.file.remove": "Remover PDF"\n  }\n};');
}

fs.writeFileSync('src/data/translations.ts', file);
console.log("Syntax fixed and translations added safely.");
