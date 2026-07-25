const fs = require('fs');
const path = 'd:/Tacopdf/src/data/toolSeoData.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Copy the perfectly translated content from our dummy keys to the CORRECT keys
data['image-to-pdf'] = data['img-to-pdf'];
data['pdf-to-image'] = data['pdf-to-img'];

// Make sure html-to-pdf is good too
// (It was already updated correctly since the key 'html-to-pdf' was right)

// Delete the typo keys created by mistake earlier
delete data['img-to-pdf'];
delete data['pdf-to-img'];

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Successfully migrated translations to the correct keys 'image-to-pdf' and 'pdf-to-image' and removed typos.");
