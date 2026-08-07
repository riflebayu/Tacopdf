const fs = require('fs');
let data = fs.readFileSync('src/data/translations.ts', 'utf8');
const lines = data.split('\n');
const newLines = [];

let currentLang = null;
let seenKeys = new Set();

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we are entering a new language block (e.g. "en": { )
    const langMatch = line.match(/^  "([a-z]{2})": \{/);
    if (langMatch) {
        currentLang = langMatch[1];
        seenKeys = new Set();
        newLines.push(line);
        continue;
    }
    
    // Check if we are exiting a block
    if (line.match(/^  \},/)) {
        currentLang = null;
        newLines.push(line);
        continue;
    }
    
    // If inside a block, check for keys
    if (currentLang) {
        const keyMatch = line.match(/^    "([^"]+)":/);
        if (keyMatch) {
            const key = keyMatch[1];
            if (seenKeys.has(key)) {
                // Duplicate key! Delete the older one (which is the one we are on right now, since my injection was at the top)
                console.log(`Deleting duplicate key ${key} in lang ${currentLang}`);
                continue; 
            } else {
                seenKeys.add(key);
                newLines.push(line);
                continue;
            }
        }
    }
    
    // Default: just keep the line
    newLines.push(line);
}

fs.writeFileSync('src/data/translations.ts', newLines.join('\n'), 'utf8');
console.log("Cleanup complete!");
