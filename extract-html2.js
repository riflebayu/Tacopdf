const fs = require('fs');
const html = fs.readFileSync('d:/bentopdf/src/pages/edit-pdf-text.html', 'utf8');
const startMatch = '<div id="text-editor-app"';
const endMatch = '<div id="loader-modal"';
const start = html.indexOf(startMatch);
const end = html.indexOf(endMatch);
console.log({ start, end });
if (start !== -1 && end !== -1) {
  let extracted = html.substring(start, end).trim();
  // Remove the 'hidden' attribute from the wrapper so it shows immediately when mounted
  extracted = extracted.replace('<div id="text-editor-app" hidden>', '<div id="text-editor-app">');
  const tsContent = 'export const editorHtml = `' + extracted.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`;';
  fs.writeFileSync('d:/Tacopdf/src/utils/edit-pdf-html.ts', tsContent);
  console.log("Successfully extracted HTML!");
} else {
  console.error("Failed to find start or end bounds.");
}
