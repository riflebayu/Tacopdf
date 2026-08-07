const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const keys = content.match(/"faq\..*?":/g);
if (keys) {
    console.log(Array.from(new Set(keys)).sort());
}
