const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const match = content.match(/"tos\..*?":/g);
if (match) {
    console.log(Array.from(new Set(match)).sort());
}
