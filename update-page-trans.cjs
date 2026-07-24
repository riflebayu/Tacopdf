const fs = require('fs');
let content = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  en: {
    'page.about.title': 'About Us',
    'page.privacy.title': 'Privacy Policy',
    'page.terms.title': 'Terms of Service',
    'page.contact.title': 'Contact Us'
  },
  id: {
    'page.about.title': 'Tentang Kami',
    'page.privacy.title': 'Kebijakan Privasi',
    'page.terms.title': 'Syarat & Ketentuan',
    'page.contact.title': 'Hubungi Kami'
  },
  es: {
    'page.about.title': 'Sobre Nosotros',
    'page.privacy.title': 'Política de Privacidad',
    'page.terms.title': 'Términos de Servicio',
    'page.contact.title': 'Contáctenos'
  },
  ja: {
    'page.about.title': '私たちについて',
    'page.privacy.title': 'プライバシーポリシー',
    'page.terms.title': '利用規約',
    'page.contact.title': 'お問い合わせ'
  },
  pt: {
    'page.about.title': 'Sobre Nós',
    'page.privacy.title': 'Política de Privacidade',
    'page.terms.title': 'Termos de Serviço',
    'page.contact.title': 'Contate-nos'
  },
  de: {
    'page.about.title': 'Über Uns',
    'page.privacy.title': 'Datenschutzerklärung',
    'page.terms.title': 'Nutzungsbedingungen',
    'page.contact.title': 'Kontaktieren Sie Uns'
  },
  fr: {
    'page.about.title': 'À Propos',
    'page.privacy.title': 'Politique de Confidentialité',
    'page.terms.title': 'Conditions de Service',
    'page.contact.title': 'Nous Contacter'
  }
};

for (const lang in additions) {
  if (content.includes(`  ${lang}: {`)) {
    let toAdd = '';
    for (const key in additions[lang]) {
      toAdd += `    "${key}": "${additions[lang][key]}",\n`;
    }
    content = content.replace(`  ${lang}: {`, `  ${lang}: {\n${toAdd}`);
  }
}

fs.writeFileSync('src/data/translations.ts', content);
console.log("Updated page titles in translations.ts successfully");
