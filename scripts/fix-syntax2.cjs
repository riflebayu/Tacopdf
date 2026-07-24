const fs = require('fs');
let file = fs.readFileSync('src/data/translations.ts', 'utf8');

// Replace any occurrence of `lang1: {, \n lang2: {` with `lang2: {`
file = file.replace(/[a-z]{2}:\s*\{,\s*([a-z]{2}:\s*\{)/g, '$1');

// Let's also check for any dangling `[a-z]{2}: {,` just in case
file = file.replace(/([a-z]{2}:\s*\{),/g, '$1');

fs.writeFileSync('src/data/translations.ts', file);
console.log("Syntax cleaned!");
