const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

// Find all language keys
const matches = [...file.matchAll(/\n  ([a-z]{2}): \{/g)];
console.log("Found languages:", matches.map(m => m[1]).join(', '));
