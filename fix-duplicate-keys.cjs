const fs = require('fs');

const filePath = 'src/data/translations.ts';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const result = [];
// Track keys per object depth level
const keyStacks = []; // stack of Sets, one per object nesting level
let depth = 0;
let removedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Count braces to track object depth
  const openBraces = (line.match(/\{/g) || []).length;
  const closeBraces = (line.match(/\}/g) || []).length;
  
  // Before processing this line, handle depth for key tracking
  // Open brace increases depth - push new key set
  for (let j = 0; j < openBraces; j++) {
    keyStacks.push(new Set());
    depth++;
  }
  
  // Check if this line is a key-value pair at depth >= 2 (inside a language object)
  const keyMatch = line.match(/^\s+"([^"]+)"\s*:/);
  if (keyMatch && depth >= 2) {
    const key = keyMatch[1];
    const currentSet = keyStacks[keyStacks.length - 1];
    
    if (currentSet.has(key)) {
      // Duplicate found - skip this line and the next non-empty lines until we get the full value
      removedCount++;
      console.log(`Removed duplicate key: "${key}" at line ${i + 1}`);
      
      // Skip the line - but we need to handle multi-line values
      // Check if this line has a complete value (ends with comma after the value)
      // Simple check: if line ends with , after the value, it's a single line
      const trimmed = line.trim();
      if (!trimmed.endsWith(',') && !trimmed.endsWith('"')) {
        // Multi-line value, skip until we find the closing
        // For safety, just skip this line only (translation values are single-line strings)
      }
      // Skip the close brace tracking for this line since we're skipping it
      for (let j = 0; j < closeBraces; j++) {
        if (keyStacks.length > 0) keyStacks.pop();
        depth--;
      }
      continue;
    } else {
      currentSet.add(key);
    }
  }
  
  result.push(line);
  
  // Close brace decreases depth - pop key set
  for (let j = 0; j < closeBraces; j++) {
    if (keyStacks.length > 0) keyStacks.pop();
    depth--;
  }
}

fs.writeFileSync(filePath, result.join('\n'), 'utf8');
console.log(`\nDone! Removed ${removedCount} duplicate keys from translations.ts`);
