const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const idMatch = content.match(/"id": \{([\s\S]*?)\}/);
if (idMatch) {
    const faqMatch = idMatch[1].match(/"faq\.\d\.[qa]": ".*?"/g);
    console.log(faqMatch);
}
