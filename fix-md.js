const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/blog/index.astro',
  'src/pages/blog/[slug].astro',
  'src/pages/[lang]/blog/index.astro',
  'src/pages/[lang]/blog/[slug].astro'
];

for (const file of filesToFix) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add replace('.md', '') just in case Astro 6 includes extension in glob id
    content = content.replace(/post\.id\.split\(\/\[\\\\\/\\\\\\\\\]\/\)\[1\]/g, `post.id.split(/[\\\\/\\\\\\\\]/)[1].replace('.md', '')`);
    
    // Also fix the slug destructuring in [slug].astro
    content = content.replace(/const slug = slugParts\.join\('\/'\);/g, `const slug = slugParts.join('/').replace('.md', '');`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
