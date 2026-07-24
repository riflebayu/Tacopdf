const fs = require('fs');
const https = require('https');

async function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    // Basic encoding
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodedText}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          let translated = '';
          if (parsed && parsed[0]) {
            parsed[0].forEach(item => {
              if (item[0]) translated += item[0];
            });
          }
          resolve(translated || text);
        } catch (e) {
          resolve(text);
        }
      });
    }).on('error', (e) => {
      resolve(text); // fallback to original
    });
  });
}

async function main() {
  const missingDe = JSON.parse(fs.readFileSync('missing_de.json', 'utf8'));
  const keys = Object.keys(missingDe);
  const translatedDe = {};
  
  console.log(`Translating ${keys.length} keys to German...`);
  
  let i = 0;
  for (const key of keys) {
    const originalText = missingDe[key];
    const translatedText = await translateText(originalText, 'de');
    translatedDe[key] = translatedText;
    
    i++;
    if (i % 20 === 0) {
      console.log(`Progress: ${i} / ${keys.length}`);
    }
    
    // Add small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }
  
  fs.writeFileSync('translated_de.json', JSON.stringify(translatedDe, null, 2));
  console.log('Finished translating to German. Saved to translated_de.json');
}

main();
