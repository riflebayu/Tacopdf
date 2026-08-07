const fs = require('fs');
let data = fs.readFileSync('src/data/translations.ts', 'utf8');

const insertions = {
    'en': {
        'header.badge.noRegistration': 'No Registration',
        'header.badge.noWatermark': 'No Watermark',
        'header.badge.offline': '100% Offline',
        'header.badge.fastSecure': 'Fast & Highly Secure'
    },
    'id': {
        'header.badge.noRegistration': 'Tanpa Registrasi',
        'header.badge.noWatermark': 'Tanpa Watermark',
        'header.badge.offline': '100% Offline',
        'header.badge.fastSecure': 'Sangat Aman & Cepat'
    },
    'es': {
        'header.badge.noRegistration': 'Sin Registro',
        'header.badge.noWatermark': 'Sin Marca de Agua',
        'header.badge.offline': '100% Fuera de Línea',
        'header.badge.fastSecure': 'Rápido y Muy Seguro'
    },
    'fr': {
        'header.badge.noRegistration': 'Sans Inscription',
        'header.badge.noWatermark': 'Sans Filigrane',
        'header.badge.offline': '100% Hors Ligne',
        'header.badge.fastSecure': 'Rapide et Très Sécurisé'
    },
    'de': {
        'header.badge.noRegistration': 'Keine Registrierung',
        'header.badge.noWatermark': 'Kein Wasserzeichen',
        'header.badge.offline': '100% Offline',
        'header.badge.fastSecure': 'Schnell & Sehr Sicher'
    },
    'pt': {
        'header.badge.noRegistration': 'Sem Registro',
        'header.badge.noWatermark': "Sem Marca d'Água",
        'header.badge.offline': '100% Offline',
        'header.badge.fastSecure': 'Rápido e Muito Seguro'
    },
    'ja': {
        'header.badge.noRegistration': '登録不要',
        'header.badge.noWatermark': '透かしなし',
        'header.badge.offline': '完全オフライン',
        'header.badge.fastSecure': '高速＆超安全'
    }
};

let lines = data.split('\n');
let newLines = [];
let currentLang = 'en';

for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    
    // track current language block
    const langMatch = lines[i].match(/^\s*"([a-z]{2})":\s*\{/);
    if (langMatch) {
        currentLang = langMatch[1];
    }
    
    if (lines[i].includes('"footer.storage"')) {
        const ins = insertions[currentLang];
        if (ins) {
            // Check if it already has comma or not
            if (!lines[i].trim().endsWith(',')) {
                newLines[newLines.length - 1] = lines[i] + ',';
            }
            newLines.push(`    "header.badge.noRegistration": "${ins['header.badge.noRegistration']}",`);
            newLines.push(`    "header.badge.noWatermark": "${ins['header.badge.noWatermark']}",`);
            newLines.push(`    "header.badge.offline": "${ins['header.badge.offline']}",`);
            newLines.push(`    "header.badge.fastSecure": "${ins['header.badge.fastSecure']}"${currentLang === 'ja' ? '' : ','}`); 
        }
    }
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\n'), 'utf8');
console.log("Translations added successfully!");
