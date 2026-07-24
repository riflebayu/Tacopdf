const fs = require('fs');
const https = require('https');

const EN_RETENTION = {
  "page.retention.title": "Data Retention & File Deletion Policy",
  "retention.intro": "TacoPDF processes your documents locally to ensure maximum privacy. This policy outlines exactly how long your data and files exist within our system.",
  "retention.p1.title": "1. Zero Server Retention",
  "retention.p1.text": "We do not store, host, or archive your PDF files. Because our tools utilize client-side WebAssembly, all document processing occurs inside your device's memory (RAM).",
  "retention.p2.title": "2. Immediate Automatic Deletion",
  "retention.p2.text": "Your files are automatically \"deleted\" and completely purged from our application the moment you close your browser tab or refresh the page. We have no way to recover your files after this occurs.",
  "retention.p3.title": "3. Local Browser Storage",
  "retention.p3.text": "We may save non-sensitive settings (like language choice or your recent tools history) securely in your browser's Local Storage. This data never leaves your device.",
  "retention.p4.title": "4. User Control & Clearing Data",
  "retention.p4.text": "You have absolute control over your data. You can clear any saved settings and history at any time simply by clearing your web browser's cache and local storage data.",
  "retention.p5.title": "5. Anonymous Analytics Data",
  "retention.p5.text": "While we do not retain your documents, third-party services like Google Analytics and Google AdSense may retain anonymous usage data (e.g., page views) according to their respective policies to help us maintain and improve our free service."
};

const LANGS = ['id', 'es', 'ja', 'pt', 'de', 'fr'];

async function translateText(text, targetLang) {
  return new Promise((resolve) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
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
    }).on('error', () => resolve(text));
  });
}

async function main() {
  const allLangs = { en: EN_RETENTION };
  
  for (const lang of LANGS) {
    allLangs[lang] = {};
    for (const key of Object.keys(EN_RETENTION)) {
      const original = EN_RETENTION[key];
      const translated = await translateText(original, lang);
      allLangs[lang][key] = translated;
      await new Promise(r => setTimeout(r, 100)); // rate limit
    }
    console.log(`Translated to ${lang}`);
  }

  let content = fs.readFileSync('src/data/translations.ts', 'utf8');

  for (const lang of Object.keys(allLangs)) {
    const dict = allLangs[lang];
    let dictStr = '';
    for (const key of Object.keys(dict)) {
      dictStr += `    "${key}": ${JSON.stringify(dict[key])},\n`;
    }
    const regex = new RegExp(`("${lang}": \\{)`);
    content = content.replace(regex, "$1\n" + dictStr);
  }

  fs.writeFileSync('src/data/translations.ts', content);
  console.log('Successfully injected all Retention translations!');
}

main();
