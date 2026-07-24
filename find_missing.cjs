const fs = require('fs');

// We have to extract the object from translations.ts
const content = fs.readFileSync('src/data/translations.ts', 'utf8');

// We will use a regex approach to extract keys for 'en' and 'de'
function extractKeysAndValues(lang) {
  const startStr = `"${lang}": {`;
  const start = content.indexOf(startStr);
  if (start === -1) return {};
  
  // Find the next language block to define the end
  const nextLangIndex = content.indexOf('": {', start + startStr.length);
  const end = nextLangIndex !== -1 ? content.lastIndexOf('}', nextLangIndex) : content.lastIndexOf('}');
  
  const block = content.substring(start + startStr.length, end);
  
  const obj = {};
  const lines = block.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*"([^"]+)":\s*"(.*)",?$/);
    if (match) {
      obj[match[1]] = match[2];
    }
  }
  return obj;
}

const en = extractKeysAndValues('en');
const de = extractKeysAndValues('de');

console.log(`Total EN keys: ${Object.keys(en).length}`);
console.log(`Total DE keys: ${Object.keys(de).length}`);

let missing = 0;
let same = 0;
let keysToTranslate = [];

for (const key in en) {
  if (!de[key]) {
    missing++;
    keysToTranslate.push(key);
  } else if (de[key] === en[key]) {
    same++;
    keysToTranslate.push(key);
  }
}

console.log(`Missing in DE: ${missing}`);
console.log(`Same as EN in DE: ${same}`);

const missingObj = {};
for (const key of keysToTranslate) {
  missingObj[key] = en[key];
}
fs.writeFileSync('missing_de.json', JSON.stringify(missingObj, null, 2));
console.log('Saved to missing_de.json');
