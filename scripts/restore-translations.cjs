const fs = require('fs');

const content = fs.readFileSync('dist/assets/index-BGb2QTe0.js', 'utf8');

const startIdx = content.indexOf('{en:{"tool.action.extract"');
if (startIdx === -1) {
  console.log('Could not find object start!');
  process.exit(1);
}

let braceCount = 0;
let endIdx = -1;

for (let i = startIdx; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  else if (content[i] === '}') braceCount--;
  
  if (braceCount === 0) {
    endIdx = i + 1;
    break;
  }
}

if (endIdx !== -1) {
  const objStr = content.substring(startIdx, endIdx);
  const tsContent = `export const translations = ${objStr};\n`;
  fs.writeFileSync('src/data/translations.ts', tsContent);
  console.log('Successfully restored translations.ts!');
} else {
  console.log('Failed to match braces!');
}
