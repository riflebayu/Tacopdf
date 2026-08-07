const fs = require('fs');

let data = fs.readFileSync('src/data/translations.ts', 'utf8');

const languages = ['en', 'id', 'es', 'fr', 'de', 'pt', 'ja'];

const replacements = {
    'en': {
        old: 'Contact Support page',
        new: '<a href="/en/contact" class="text-primary hover:underline font-bold">Contact Support</a> page'
    },
    'id': {
        old: 'halaman Hubungi Dukungan',
        new: 'halaman <a href="/id/contact" class="text-primary hover:underline font-bold">Hubungi Dukungan</a>'
    },
    'es': {
        old: 'página de Contacto de Soporte',
        new: 'página de <a href="/es/contact" class="text-primary hover:underline font-bold">Soporte de Contacto</a>'
    },
    'fr': {
        old: 'page Contacter l\'assistance',
        new: 'page <a href="/fr/contact" class="text-primary hover:underline font-bold">Contacter l\'assistance</a>'
    },
    'de': {
        old: 'Seite Support kontaktieren',
        new: 'Seite <a href="/de/contact" class="text-primary hover:underline font-bold">Support kontaktieren</a>'
    },
    'pt': {
        old: 'página Entrar em Contato com o Suporte',
        new: 'página <a href="/pt/contact" class="text-primary hover:underline font-bold">Entrar em Contato com o Suporte</a>'
    },
    'ja': {
        old: 'サポートに連絡ページ',
        new: '<a href="/ja/contact" class="text-primary hover:underline font-bold">サポートに連絡</a>ページ'
    }
};

for (const lang of languages) {
    const repl = replacements[lang];
    if (repl) {
        // Find the about.p4.text2 line for this language
        // Since my injection was formatted like "about.p4.text2": "..."
        // I will just use string replacement on the whole file, but carefully.
        // It's safer to just replace the exact substring in the file.
        const regex = new RegExp(`("about.p4.text2": ".*?)(${repl.old.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})(.*?")`, 'g');
        data = data.replace(regex, `$1${repl.new}$3`);
    }
}

// Now we need to completely remove about.p5 keys
const lines = data.split('\n');
const newLines = lines.filter(line => !line.includes('"about.p5.'));

fs.writeFileSync('src/data/translations.ts', newLines.join('\n'), 'utf8');
console.log("Updated about.p4 links and removed about.p5!");
