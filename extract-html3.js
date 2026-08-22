const fs = require('fs');
const html = fs.readFileSync('d:/bentopdf/src/pages/edit-pdf-text.html', 'utf8');

const startStr = '<div id="text-editor-app" hidden>';
// The loader modal is right after the text-editor-app closes.
const endStr = '<div id="loader-modal"'; 

const start = html.indexOf(startStr);
const end = html.indexOf(endStr);

if (start !== -1 && end !== -1) {
  let extracted = html.substring(start, end).trim();
  // Remove the hidden attribute so we can control visibility using CSS or React later
  extracted = extracted.replace('<div id="text-editor-app" hidden>', '<div id="text-editor-app">');
  const tsContent = 'export const editorHtml = `' + extracted.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`;';
  fs.writeFileSync('d:/Tacopdf/src/utils/edit-pdf-html.ts', tsContent);
  console.log('Successfully extracted HTML! Start:', start, 'End:', end);
} else {
  console.log('Failed to find markers. Start:', start, 'End:', end);
}
