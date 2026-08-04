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
    
    // Fix className -> class
    content = content.replace(/className=/g, 'class=');
    
    // Fix id filtering in index.astro (English)
    if (file.includes('blog/index.astro') && !file.includes('[lang]')) {
      content = content.replace(/id\.startsWith\('en\/'\)/g, `id.startsWith('en/') || id.startsWith('en\\\\')`);
      content = content.replace(/post\.id\.replace\('en\/'\,\s*''\)/g, `post.id.split(/[\\/\\\\]/)[1]`);
    }
    
    // Fix id filtering in [slug].astro (English)
    if (file.includes('blog/[slug].astro') && !file.includes('[lang]')) {
      content = content.replace(/id\.startsWith\('en\/'\)/g, `id.startsWith('en/') || id.startsWith('en\\\\')`);
      content = content.replace(/post\.id\.replace\('en\/'\,\s*''\)/g, `post.id.split(/[\\/\\\\]/)[1]`);
    }
    
    // Fix id filtering in index.astro (Multi-lang)
    if (file.includes('[lang]/blog/index.astro')) {
      content = content.replace(/id\.startsWith\(\`\$\{lang\}\/\`\)/g, `id.startsWith(\`\${lang}/\`) || id.startsWith(\`\${lang}\\\\\`)`);
      content = content.replace(/post\.id\.replace\(\`\$\{lang\}\/\`\,\s*''\)/g, `post.id.split(/[\\/\\\\]/)[1]`);
    }
    
    // Fix id filtering in [slug].astro (Multi-lang)
    if (file.includes('[lang]/blog/[slug].astro')) {
      content = content.replace(/post\.id\.startsWith\('en\/'\)/g, `(post.id.startsWith('en/') || post.id.startsWith('en\\\\'))`);
      content = content.replace(/post\.id\.split\('\/'\)/g, `post.id.split(/[\\/\\\\]/)`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
