const fs = require('fs');

let transContent = fs.readFileSync('src/data/translations.ts', 'utf8');

const replacements = [
  {
    oldTitle: `"home.title": "TacoPDF - Free & Secure Online PDF Tools"`,
    newTitle: `"home.title": "Manage PDF Files Fast, Free & Secure"`,
    oldSub: `"home.subtitle": "Process PDFs locally in your browser. Maximum privacy and security."`,
    newSub: `"home.subtitle": "Process documents directly in your browser. Total privacy with zero file storage."`
  },
  {
    oldTitle: `"home.title": "TacoPDF - Alat PDF Online Gratis & Aman"`,
    newTitle: `"home.title": "Kelola File PDF Cepat, Gratis & Aman"`,
    oldSub: `"home.subtitle": "Proses PDF langsung di browser Anda. Privasi dan keamanan maksimal."`,
    newSub: `"home.subtitle": "Proses dokumen langsung di browser Anda. Privasi total tanpa penyimpanan file."`
  },
  {
    oldTitle: `"home.title": "TacoPDF - Herramientas PDF Online Gratuitas y Seguras"`,
    newTitle: `"home.title": "Gestiona Archivos PDF Rápido, Gratis y Seguro"`,
    oldSub: `"home.subtitle": "Procesa PDFs localmente en tu navegador. Máxima privacidad y seguridad."`,
    newSub: `"home.subtitle": "Procesa documentos directamente en tu navegador. Privacidad total sin almacenamiento."`
  },
  {
    oldTitle: `"home.title": "TacoPDF - 無料・安全なオンラインPDFツール"`,
    newTitle: `"home.title": "高速・無料・安全なPDFファイル管理"`,
    oldSub: `"home.subtitle": "ブラウザで直接PDFを処理。最高のプライバシーとセキュリティ。"`,
    newSub: `"home.subtitle": "ブラウザで直接ファイルを処理。完全なプライバシーとデータ非保存。"`
  },
  {
    oldTitle: `"home.title": "TacoPDF - Ferramentas PDF Online Grátis e Seguras"`,
    newTitle: `"home.title": "Gerencie Arquivos PDF Rápido, Grátis e Seguro"`,
    oldSub: `"home.subtitle": "Processe PDFs localmente no seu navegador. Máxima privacidade e segurança."`,
    newSub: `"home.subtitle": "Processe documentos diretamente no seu navegador. Privacidade total sem armazenamento."`
  },
  {
    oldTitle: `"home.title": "TacoPDF - Kostenlose & Sichere Online-PDF-Tools"`,
    newTitle: `"home.title": "PDF-Dateien schnell, kostenlos & sicher verwalten"`,
    oldSub: `"home.subtitle": "Verarbeite PDFs lokal in deinem Browser. Maximale Privatsphäre und Sicherheit."`,
    newSub: `"home.subtitle": "Verarbeiten Sie Dokumente direkt in Ihrem Browser. Volle Privatsphäre ohne Speicherung."`
  },
  {
    oldTitle: `"home.title": "TacoPDF - Outils PDF En Ligne Gratuits et Sécurisés"`,
    newTitle: `"home.title": "Gérez vos fichiers PDF rapidement, gratuitement et en toute sécurité"`,
    oldSub: `"home.subtitle": "Traitez vos PDFs localement dans votre navigateur. Confidentialité et sécurité maximales."`,
    newSub: `"home.subtitle": "Traitez vos documents directement dans votre navigateur. Confidentialité totale sans stockage."`
  }
];

for (const rep of replacements) {
  transContent = transContent.replace(rep.oldTitle, rep.newTitle);
  transContent = transContent.replace(rep.oldSub, rep.newSub);
}

fs.writeFileSync('src/data/translations.ts', transContent, 'utf8');
console.log('Hero sections updated!');
