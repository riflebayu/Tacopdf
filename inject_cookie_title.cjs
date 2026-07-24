const fs = require('fs');

const keys = {
  en: { "page.cookie.title": "Cookie Policy" },
  id: { "page.cookie.title": "Kebijakan Cookie" },
  es: { "page.cookie.title": "Pol\u00edtica de Cookies" },
  ja: { "page.cookie.title": "\u30af\u30c3\u30ad\u30fc\u30dd\u30ea\u30b7\u30fc" },
  pt: { "page.cookie.title": "Pol\u00edtica de Cookies" },
  de: { "page.cookie.title": "Cookie-Richtlinie" },
  fr: { "page.cookie.title": "Politique relative aux cookies" }
};

let content = fs.readFileSync('src/data/translations.ts', 'utf8');

for (const lang of Object.keys(keys)) {
  const dict = keys[lang];
  let dictStr = '';
  for (const key of Object.keys(dict)) {
    dictStr += `    "${key}": ${JSON.stringify(dict[key])},\n`;
  }
  const regex = new RegExp(`("${lang}": \\{)`);
  content = content.replace(regex, "$1\n" + dictStr);
}

fs.writeFileSync('src/data/translations.ts', content);
console.log('Successfully injected page.cookie.title translations!');
