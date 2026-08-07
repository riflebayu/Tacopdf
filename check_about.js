const fs = require('fs');
const data = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = data.split('\n');
const aboutLines = lines.filter(l => l.includes('"about.'));
console.log(`Found ${aboutLines.length} lines with "about."`);
if (aboutLines.length > 0) {
    console.log(aboutLines.slice(0, 5).join('\n'));
}
