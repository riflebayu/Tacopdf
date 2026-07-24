const fs = require('fs');
const https = require('https');

const EN_HOW = {
  "page.how.title": "How It Works",
  "how.intro.title": "The Magic of Client-Side Processing",
  "how.intro.text": "TacoPDF is not your average PDF utility. We leverage cutting-edge WebAssembly (WASM) technology to bring the power of desktop software directly into your web browser. This means unparalleled speed, security, and zero server uploads.",
  
  "how.step1.title": "1. Select Your Tool",
  "how.step1.text": "Choose from our comprehensive suite of PDF tools. Whether you need to merge multiple reports, split pages, extract specific images, redact sensitive information, or compress large files, we have a specialized tool ready for the job.",
  
  "how.step2.title": "2. Load Your Files Locally",
  "how.step2.text": "Select your PDF files from your device. Unlike traditional web converters, your files are NEVER uploaded to an external server. They are instantly loaded into your browser's local memory, completely eliminating upload wait times and bandwidth limits.",
  
  "how.step3.title": "3. Instant Processing",
  "how.step3.text": "Configure your settings (like drag-and-drop reordering, setting passwords, or drawing signatures) on our intuitive visual workspace. When you click process, our client-side engine executes the heavy lifting directly on your device's CPU in milliseconds.",
  
  "how.step4.title": "4. Secure Download",
  "how.step4.text": "Because the processed file is generated directly on your machine, it is available for download instantly. No download queues, no tracking, and no residual files left on any server. Once you close the tab, the data ceases to exist.",
  
  "how.benefits.title": "Why This Architecture Matters",
  "how.benefit1.title": "🔒 Uncompromised Privacy",
  "how.benefit1.text": "Your confidential contracts and private documents remain strictly on your hard drive. No one else can ever see them.",
  "how.benefit2.title": "⚡ Lightning Speed",
  "how.benefit2.text": "Bypass the internet bottleneck. Processing happens at the speed of your device, not the speed of your internet connection.",
  "how.benefit3.title": "🆓 Truly Free & Unlimited",
  "how.benefit3.text": "Serverless architecture means we have virtually zero backend computing costs. We pass those savings directly to you by keeping all features 100% free with no hidden limits or watermarks."
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
  const allLangs = { en: EN_HOW };
  
  for (const lang of LANGS) {
    allLangs[lang] = {};
    for (const key of Object.keys(EN_HOW)) {
      const original = EN_HOW[key];
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
  console.log('Successfully injected all How It Works translations!');
}

main();
