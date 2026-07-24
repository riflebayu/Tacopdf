const fs = require('fs');

const en = { "contact.back": "Back to Home" };
const id = { "contact.back": "Kembali ke Beranda" };
const es = { "contact.back": "Volver al Inicio" };
const ja = { "contact.back": "ホームに戻る" };
const pt = { "contact.back": "Voltar ao Início" };
const de = { "contact.back": "Zurück zur Startseite" };
const fr = { "contact.back": "Retour à l'accueil" };

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
console.log('Successfully injected contact.back translations!');
