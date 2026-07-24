const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = 'public/images/tools';

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.png')) {
    sharp(path.join(dir, file))
      .resize(150, 150, { fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(path.join(dir, file.replace('.png', '.webp')))
      .then(() => {
        fs.unlinkSync(path.join(dir, file));
        console.log(`Converted ${file}`);
      })
      .catch(err => console.error(err));
  }
});
