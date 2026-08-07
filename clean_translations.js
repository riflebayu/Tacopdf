const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const exportStr1 = '// @ts-nocheck\\nexport const TRANSLATIONS = {';
const exportStr2 = '// @ts-nocheck\\r\\nexport const TRANSLATIONS = {';

let exportIndex = content.indexOf(exportStr1);
if (exportIndex === -1) {
    exportIndex = content.indexOf(exportStr2);
}

if (exportIndex > 0) {
    content = content.substring(exportIndex);
    fs.writeFileSync('src/data/translations.ts', content, 'utf8');
    console.log("File cleaned. Stripped garbage before " + exportIndex);
} else {
    console.log("Not found or already clean.");
}
