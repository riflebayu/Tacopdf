const fs = require('fs');

const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const keys = new Set(content.match(/"terms\..*?":/g));
console.log(Array.from(keys));
