const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

// The missing comma is before "tool.watermark.text":
file = file.replace(/"workspace\.file\.remove":\s*"([^"]*)"\s*\n\s*"tool\.watermark\.text"/g, '"workspace.file.remove": "$1",\n    "tool.watermark.text"');

fs.writeFileSync('src/data/translations.ts', file);
console.log('Fixed missing comma');
