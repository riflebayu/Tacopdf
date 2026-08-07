const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

// Replace "privacy.p7.text": "..."\r\n with "privacy.p7.text": "...",\r\n if the comma is missing.
// The regex finds the end of the line for privacy.p7.text.
content = content.replace(/("privacy\.p7\.text":\s*".*?")(\s*\n)/g, (match, p1, p2) => {
    return p1 + ',' + p2;
});

// Also there could be `privacy.p7.text` ending with `,` already, but my regex matches `"` followed by whitespace and newline, so it won't add a comma if it's already there (because `.*?"` stops at the last quote). Wait, it might add duplicate commas if the comma is before the whitespace.
// Let's refine it: replace only if there is NO comma before the whitespace/newline.
content = content.replace(/("privacy\.p7\.text":\s*".*?")(?!\s*,)(\s*\n)/g, (match, p1, p2) => {
    return p1 + ',' + p2;
});

fs.writeFileSync('src/data/translations.ts', content, 'utf8');
console.log("Commas added.");
