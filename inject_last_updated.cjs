const fs = require('fs');

const en = { "legal.last_updated": "Last updated:" };
const id = { "legal.last_updated": "Terakhir diperbarui:" };
const es = { "legal.last_updated": "\u00daltima actualizaci\u00f3n:" };
const ja = { "legal.last_updated": "\u6700\u7d42\u66f4\u65b0\u65e5:" };
const pt = { "legal.last_updated": "\u00daltima atualiza\u00e7\u00e3o:" };
const de = { "legal.last_updated": "Zuletzt aktualisiert:" };
const fr = { "legal.last_updated": "Derni\u00e8re mise \u00e0 jour:" };

const langs = { en, id, es, ja, pt, de, fr };
let raw = fs.readFileSync('src/data/translations.ts', 'utf8');

for (const lang of Object.keys(langs)) {
  const dict = langs[lang];
  let dictStr = '';
  for (const key of Object.keys(dict)) {
    dictStr += `    "${key}": ${JSON.stringify(dict[key])},\n`;
  }
  
  const regex = new RegExp(`("${lang}": \\{)`);
  raw = raw.replace(regex, "$1\n" + dictStr);
}

fs.writeFileSync('src/data/translations.ts', raw);
console.log('Successfully injected legal.last_updated translations!');
