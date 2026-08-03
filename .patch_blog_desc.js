const fs = require('fs');

let transContent = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  '"blog.header.latest": "Latest ",': `"blog.title": "Blog | TacoPDF",\n    "blog.description": "Read the latest news, guides, and tips on document management, PDF security, and paperless business operations.",\n    "blog.header.latest": "Latest ",`,
  '"blog.header.latest": "Wawasan ",': `"blog.title": "Blog | TacoPDF",\n    "blog.description": "Baca berita, panduan, dan tips terbaru tentang manajemen dokumen, keamanan PDF, dan operasi bisnis tanpa kertas.",\n    "blog.header.latest": "Wawasan ",`,
  '"blog.header.latest": "Últimas ",': `"blog.title": "Blog | TacoPDF",\n    "blog.description": "Lea las últimas noticias, guías y consejos sobre gestión de documentos, seguridad de PDF y operaciones comerciales sin papel.",\n    "blog.header.latest": "Últimas ",`,
  '"blog.header.latest": "最新の",': `"blog.title": "ブログ | TacoPDF",\n    "blog.description": "ドキュメント管理、PDFセキュリティ、ペーパーレス業務に関する最新のニュース、ガイド、ヒントをお読みください。",\n    "blog.header.latest": "最新の",`,
  '"blog.header.latest": "Últimas ",': `"blog.title": "Blog | TacoPDF",\n    "blog.description": "Leia as últimas notícias, guias e dicas sobre gerenciamento de documentos, segurança de PDF e operações comerciais sem papel.",\n    "blog.header.latest": "Últimas ",`, // Wait, both Spanish and Portuguese use "Últimas ". Using replace might hit Spanish twice.
  '"blog.header.latest": "Neueste ",': `"blog.title": "Blog | TacoPDF",\n    "blog.description": "Lesen Sie die neuesten Nachrichten, Anleitungen und Tipps zu Dokumentenmanagement, PDF-Sicherheit und papierlosen Geschäftsabläufen.",\n    "blog.header.latest": "Neueste ",`,
  '"blog.header.latest": "Dernières ",': `"blog.title": "Blog | TacoPDF",\n    "blog.description": "Lisez les dernières nouvelles, guides et conseils sur la gestion des documents, la sécurité des PDF et les opérations commerciales sans papier.",\n    "blog.header.latest": "Dernières ",`
};

// Because Spanish and Portuguese both start with "Últimas ", I will use the specific language blocks.
const languages = {
  '"en": {': `"en": {\n    "blog.title": "Blog | TacoPDF",\n    "blog.description": "Read the latest news, guides, and tips on document management, PDF security, and paperless business operations.",`,
  '"id": {': `"id": {\n    "blog.title": "Blog | TacoPDF",\n    "blog.description": "Baca berita, panduan, dan tips terbaru tentang manajemen dokumen, keamanan PDF, dan operasi bisnis tanpa kertas.",`,
  '"es": {': `"es": {\n    "blog.title": "Blog | TacoPDF",\n    "blog.description": "Lea las últimas noticias, guías y consejos sobre gestión de documentos, seguridad de PDF y operaciones comerciales sin papel.",`,
  '"ja": {': `"ja": {\n    "blog.title": "ブログ | TacoPDF",\n    "blog.description": "ドキュメント管理、PDFセキュリティ、ペーパーレス業務に関する最新のニュース、ガイド、ヒントをお読みください。",`,
  '"pt": {': `"pt": {\n    "blog.title": "Blog | TacoPDF",\n    "blog.description": "Leia as últimas notícias, guias e dicas sobre gerenciamento de documentos, segurança de PDF e operações comerciais sem papel.",`,
  '"de": {': `"de": {\n    "blog.title": "Blog | TacoPDF",\n    "blog.description": "Lesen Sie die neuesten Nachrichten, Anleitungen und Tipps zu Dokumentenmanagement, PDF-Sicherheit und papierlosen Geschäftsabläufen.",`,
  '"fr": {': `"fr": {\n    "blog.title": "Blog | TacoPDF",\n    "blog.description": "Lisez les dernières nouvelles, guides et conseils sur la gestion des documents, la sécurité des PDF et les opérations commerciales sans papier.",`
};

for (const [key, val] of Object.entries(languages)) {
  transContent = transContent.replace(key, val);
}

fs.writeFileSync('src/data/translations.ts', transContent, 'utf8');
console.log('Blog title and desc applied!');
