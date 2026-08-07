const fs = require('fs');
let data = fs.readFileSync('src/data/translations.ts', 'utf8');
data = data.replace(/"高速＆超安全"\r?\n/g, '"高速＆超安全",\n');
fs.writeFileSync('src/data/translations.ts', data, 'utf8');
console.log('Fixed comma');
