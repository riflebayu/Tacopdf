const fs = require('fs');

const content = fs.readFileSync('src/data/translations.ts', 'utf8');

function extractKeysAndValues(lang) {
  const startStr = `"${lang}": {`;
  const start = content.indexOf(startStr);
  if (start === -1) return {};
  
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

const langs = ['en', 'id', 'es', 'ja', 'pt', 'de', 'fr'];
const data = {};
for (const lang of langs) {
  data[lang] = extractKeysAndValues(lang);
  console.log(`${lang} keys: ${Object.keys(data[lang]).length}`);
}
