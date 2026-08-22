const fs = require('fs');
const content = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.match(/^\s*\"?(ms|ar)\"?\s*:/)) {
    console.log(i + ': ' + l);
  }
});
