const fs = require('fs');

const content = fs.readFileSync('dist/assets/index-BGb2QTe0.js', 'utf8');

// Find the start of the English translations object. It usually starts with "en:{"seo.header.title":"
const searchStr = 'en:{"seo.header.title":"';
const enIndex = content.indexOf(searchStr);

if (enIndex === -1) {
  console.log('Could not find translation object');
  process.exit(1);
}

// The object probably starts with `{en:{"seo.header.title"...`
// Let's find the opening brace for the whole object.
let start = enIndex;
while (start > 0 && content[start] !== '{') {
  start--;
}

let braceCount = 0;
let end = -1;

for (let i = start; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  else if (content[i] === '}') braceCount--;
  
  if (braceCount === 0) {
    end = i + 1;
    break;
  }
}

if (end !== -1) {
  const objStr = content.substring(start, end);
  // It's a JS object, not strict JSON (keys might not be quoted, though in minified they often are, or aren't).
  // Actually, we can just write this object literal out as a TypeScript module!
  const tsContent = `export const translations = ${objStr};\n`;
  fs.writeFileSync('src/data/translations.ts', tsContent);
  console.log('Restored translations.ts successfully!');
} else {
  console.log('Failed to parse object bounds');
}
