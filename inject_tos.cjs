const fs = require('fs');
const https = require('https');

const EN_TOS = {
  "tos.doc_title": "Terms of Service",
  "tos.intro": "Welcome to TacoPDF. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.",
  "tos.p1.title": "1. Acceptance of Terms & Acceptable Use",
  "tos.p1.text": "You agree to use our tools responsibly and legally. You must not use TacoPDF to forge legal documents, manipulate contracts for fraudulent purposes, or infringe upon the copyright of others.",
  "tos.p2.title": "2. Intellectual Property Rights",
  "tos.p2.text": "The TacoPDF branding, user interface, and frontend codebase are our intellectual property. However, we claim no ownership over the PDF documents you process. All copyrights and intellectual property rights in your files remain solely yours.",
  "tos.p3.title": "3. Disclaimer of Warranties",
  "tos.p3.text": "TacoPDF is provided on an \"as is\" and \"as available\" basis without warranties of any kind. While we strive for perfection using client-side processing technology, we do not guarantee that the tools will be completely error-free or that your files will never be corrupted during processing.",
  "tos.p4.title": "4. Limitation of Liability",
  "tos.p4.text": "Under no circumstances shall TacoPDF or its creator be held liable for any direct, indirect, incidental, or consequential damages—including but not limited to loss of data, loss of business, or file corruption—arising from the use or inability to use our services.",
  "tos.p5.title": "5. Modifications to the Service",
  "tos.p5.text": "We reserve the right to modify, suspend, or discontinue any feature of TacoPDF at any time without prior notice. We may also revise these Terms of Service periodically. Your continued use of the site constitutes acceptance of the updated terms.",
  "tos.p6.title": "6. Contact Information",
  "tos.p6.text": "If you have any questions, concerns, or legal inquiries regarding these Terms of Service, please contact us via our Contact Support page."
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
  const allLangs = { en: EN_TOS };
  
  for (const lang of LANGS) {
    allLangs[lang] = {};
    for (const key of Object.keys(EN_TOS)) {
      const original = EN_TOS[key];
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
  console.log('Successfully injected all Terms of Service translations!');
}

main();
