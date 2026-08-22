const fs = require('fs');

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const enAdditions = `
    "beta.title": "Beta Tools Playground",
    "beta.desc": "Help us test these upcoming features! These tools are fully local but might still have some bugs. Do not use for highly sensitive production documents.",`;

const idAdditions = `
    "beta.title": "Taman Bermain Alat Beta",
    "beta.desc": "Bantu kami menguji fitur-fitur mendatang ini! Alat-alat ini sepenuhnya lokal tetapi mungkin masih memiliki beberapa bug. Jangan gunakan untuk dokumen produksi yang sangat sensitif.",`;

content = content.replace(/("workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + enAdditions);

content = content.replace(/(  "id": \{[\s\S]*?"workspace\.merge\.upload_more": "Upload more\?"\s*\n\s*\},)/g, '$1\n' + idAdditions);

fs.writeFileSync('src/data/translations.ts', content);
console.log('done!');
