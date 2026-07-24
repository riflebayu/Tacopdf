const fs = require('fs');
const https = require('https');

const EN_DISCLAIMER = {
  "page.disclaimer.title": "Disclaimer",
  "disclaimer.intro": "The information provided by TacoPDF on this website is for general informational and utility purposes only. All tools and information on the site are provided in good faith.",
  "disclaimer.p1.title": "1. General Information Disclaimer",
  "disclaimer.p1.text": "While we strive to provide the best client-side PDF utilities, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any tools or information on the site.",
  "disclaimer.p2.title": "2. Use at Your Own Risk",
  "disclaimer.p2.text": "UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION OR TOOL PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY FEATURE IS SOLELY AT YOUR OWN RISK.",
  "disclaimer.p3.title": "3. Local Processing & Security Disclaimer",
  "disclaimer.p3.text": "TacoPDF processes your documents locally within your web browser. We do not upload your files to our servers. However, we are not responsible for any pre-existing malware, viruses, or security vulnerabilities on your personal device that may compromise your files before, during, or after using our tools.",
  "disclaimer.p4.title": "4. External Links Disclaimer",
  "disclaimer.p4.text": "The site may contain links to other websites (including Google AdSense advertisements) or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.",
  "disclaimer.p5.title": "5. Errors and Omissions",
  "disclaimer.p5.text": "While we use WebAssembly for highly accurate PDF manipulation, errors can occasionally occur depending on the complexity of your original document. We cannot guarantee that the resulting files will be perfectly formatted or error-free in every possible scenario."
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
  const allLangs = { en: EN_DISCLAIMER };
  
  for (const lang of LANGS) {
    allLangs[lang] = {};
    for (const key of Object.keys(EN_DISCLAIMER)) {
      const original = EN_DISCLAIMER[key];
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
  console.log('Successfully injected all Disclaimer translations!');
}

main();
