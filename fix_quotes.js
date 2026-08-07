const fs = require('fs');
let data = fs.readFileSync('src/data/translations.ts', 'utf8');

// Replace <a href="..." class="..."> with <a href='...' class='...'> in about.p4.text2
data = data.replace(/<a href="([^"]+)" class="([^"]+)">/g, "<a href='$1' class='$2'>");

fs.writeFileSync('src/data/translations.ts', data, 'utf8');
console.log("Fixed double quotes in translations.ts!");
