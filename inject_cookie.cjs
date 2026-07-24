const fs = require('fs');
const https = require('https');

const EN_COOKIE = {
  "cookie.doc_title": "Cookie Policy",
  "cookie.intro": "This Cookie Policy explains what cookies are and how TacoPDF uses them. By continuing to use our website, you agree to the use of cookies as described in this policy.",
  "cookie.p1.title": "1. What Are Cookies?",
  "cookie.p1.text": "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide reporting information and personalized experiences.",
  "cookie.p2.title": "2. How TacoPDF Uses Cookies (Essential)",
  "cookie.p2.text": "Because TacoPDF processes files locally on your device without server uploads, we do not use cookies to track your document contents. We only use essential local storage and cookies to remember your interface settings, such as your preferred language or chosen PDF tools, ensuring a seamless experience when you return.",
  "cookie.p3.title": "3. Third-Party Cookies (Google AdSense)",
  "cookie.p3.text": "To keep our PDF tools completely free, we use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use advertising cookies to collect non-personally identifiable information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.",
  "cookie.p4.title": "4. Managing and Deleting Cookies",
  "cookie.p4.text": "You have the right to accept or reject cookies. You can exercise your cookie rights by setting or amending your web browser controls to accept or refuse cookies. Since browser settings vary, please visit your browser's help menu for more information on how to manage cookies.",
  "cookie.p5.title": "5. Opting Out of Targeted Advertising",
  "cookie.p5.text": "If you prefer not to see personalized ads, you can opt out of Google's use of cookies for personalized advertising by visiting Google Ads Settings. You can also opt out of some third-party vendor's use of cookies by visiting www.aboutads.info."
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
  const allLangs = { en: EN_COOKIE };
  
  for (const lang of LANGS) {
    allLangs[lang] = {};
    for (const key of Object.keys(EN_COOKIE)) {
      const original = EN_COOKIE[key];
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
  console.log('Successfully injected all Cookie Policy translations!');
}

main();
