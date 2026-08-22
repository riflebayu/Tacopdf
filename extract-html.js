const fs = require('fs');
const html = fs.readFileSync('d:/bentopdf/src/pages/edit-pdf-text.html', 'utf8');
const start = html.indexOf('<div id="text-editor-app"');
const end = html.indexOf('<div id="loader-modal"');
const extracted = html.substring(start, end).trim();
const tsContent = 'export const editorHtml = `' + extracted.replace(/`/g, '\\`') + '`;';
fs.writeFileSync('d:/Tacopdf/src/utils/edit-pdf-html.ts', tsContent);
