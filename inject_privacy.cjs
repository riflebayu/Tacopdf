const fs = require('fs');
const https = require('https');

const EN_PRIVACY = {
  "privacy.doc_title": "Privacy Policy & AdSense Compliance",
  "privacy.intro": "TacoPDF is strongly committed to user privacy. Our tools run locally in your browser, ensuring maximum security for your documents.",
  "privacy.p1.title": "1. Local Processing (No Server Uploads)",
  "privacy.p1.text": "Your files are processed entirely on your device using client-side WebAssembly and JavaScript. We never upload, store, read, or share your PDF documents. Your files never touch our servers.",
  "privacy.p2.title": "2. Cookies and Tracking",
  "privacy.p2.text": "We use cookies to save your language preferences and tool settings locally. By using our site, you consent to our use of these essential cookies for a better user experience.",
  "privacy.p3.title": "3. Third-Party Advertising (Google AdSense)",
  "privacy.p3.text": "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve relevant ads to our users to support this free service.",
  "privacy.p4.title": "4. Opting Out of Personalized Ads",
  "privacy.p4.text": "Users may opt out of personalized advertising by visiting Google Ads Settings. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.",
  "privacy.p5.title": "5. Analytics (Log Files)",
  "privacy.p5.text": "We may collect standard analytics data such as IP address, browser type, and time of visit. This data is completely anonymous, not linked to any personally identifiable information, and used solely to analyze website traffic and improve our services.",
  "privacy.p6.title": "6. Contact Us",
  "privacy.p6.text": "If you have any questions regarding our privacy practices, please do not hesitate to contact us through our Contact Support page."
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
  const allLangs = { en: EN_PRIVACY };
  
  for (const lang of LANGS) {
    allLangs[lang] = {};
    for (const key of Object.keys(EN_PRIVACY)) {
      const original = EN_PRIVACY[key];
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
  console.log('Successfully injected all Privacy Policy translations!');
}

main();
