const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const start = content.indexOf('"tos.p6.text":');
if (start !== -1) {
    console.log(content.substring(start, start + 300));
}
