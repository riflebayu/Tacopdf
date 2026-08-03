const fs = require('fs');

let transContent = fs.readFileSync('src/data/translations.ts', 'utf8');

const replacements = [
  {
    lang: '"en"',
    old: `"blog.description": "Read the latest news, guides, and tips on document management, PDF security, and paperless business operations."`,
    new: `"blog.description": "Global document news, smart guides, and practical tips for a seamless PDF workflow"`
  },
  {
    lang: '"id"',
    old: `"blog.description": "Baca berita, panduan, dan tips terbaru tentang manajemen dokumen, keamanan PDF, dan operasi bisnis tanpa kertas."`,
    new: `"blog.description": "Berita dokumen global, panduan cerdas, dan tips praktis untuk alur kerja PDF yang mulus"`
  },
  {
    lang: '"es"',
    old: `"blog.description": "Lea las últimas noticias, guías y consejos sobre gestión de documentos, seguridad de PDF y operaciones comerciales sin papel."`,
    new: `"blog.description": "Noticias globales sobre documentos, guías inteligentes y consejos prácticos para un flujo de trabajo de PDF fluido"`
  },
  {
    lang: '"ja"',
    old: `"blog.description": "ドキュメント管理、PDFセキュリティ、ペーパーレス業務に関する最新のニュース、ガイド、ヒントをお読みください。"`,
    new: `"blog.description": "グローバルなドキュメントニュース、スマートなガイド、シームレスなPDFワークフローのための実践的なヒント"`
  },
  {
    lang: '"pt"',
    old: `"blog.description": "Leia as últimas notícias, guias e dicas sobre gerenciamento de documentos, segurança de PDF e operações comerciais sem papel."`,
    new: `"blog.description": "Notícias globais de documentos, guias inteligentes e dicas práticas para um fluxo de trabalho PDF perfeito"`
  },
  {
    lang: '"de"',
    old: `"blog.description": "Lesen Sie die neuesten Nachrichten, Anleitungen und Tipps zu Dokumentenmanagement, PDF-Sicherheit und papierlosen Geschäftsabläufen."`,
    new: `"blog.description": "Globale Dokumenten-News, smarte Anleitungen und praktische Tipps für einen reibungslosen PDF-Workflow"`
  },
  {
    lang: '"fr"',
    old: `"blog.description": "Lisez les dernières nouvelles, guides et conseils sur la gestion des documents, la sécurité des PDF et les opérations commerciales sans papier."`,
    new: `"blog.description": "Actualités mondiales sur les documents, guides intelligents et conseils pratiques pour un flux de travail PDF fluide"`
  }
];

for (const rep of replacements) {
  transContent = transContent.replace(rep.old, rep.new);
}

fs.writeFileSync('src/data/translations.ts', transContent, 'utf8');
console.log('Descriptions updated!');
