const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/VITE_FIREBASE_PROJECT_ID=[\"']?(.*?)[\"']?$/m);
if (match) {
  const pid = match[1].trim();
  const lang = 'id';
  const slug = 'cara-merge-compress-pdf-gratis-taco-pdf';
  
  fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents:runQuery`, {
    method: 'POST',
    body: JSON.stringify({
      structuredQuery: {
        from: [{collectionId: 'articles'}],
        where: {
          fieldFilter: {
            field: {fieldPath: `translations.${lang}.slug`},
            op: 'EQUAL',
            value: {stringValue: slug}
          }
        },
        limit: 1
      }
    })
  })
    .then(res => res.json())
    .then(data => {
       console.log(JSON.stringify(data).substring(0, 500));
    })
    .catch(console.error);
}
