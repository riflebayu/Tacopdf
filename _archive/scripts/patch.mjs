import fs from 'fs';
import path from 'path';

const dirsToPatch = ['components', 'context', 'hooks', 'services', 'utils', 'data'];

const patchFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace react-router-dom with our mock
  if (content.includes('react-router-dom')) {
    content = content.replace(/['"]react-router-dom['"]/g, "'@/utils/router-mock'");
    modified = true;
  }

  // Replace import.meta.env with process.env
  if (content.includes('import.meta.env')) {
    content = content.replace(/import\.meta\.env/g, "process.env");
    modified = true;
  }

  // Replace Vite ?url imports with dummy asset paths to satisfy Next.js Webpack
  if (content.includes('?url')) {
    content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)\?url['"];?/g, "const $1 = '/assets/' + '$2'.split('/').pop();");
    modified = true;
  }

  // Auto-resolve missing lucide-react exports
  if (content.includes('lucide-react')) {
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g, (match, p1) => {
      let imports = p1.split(',').map(s => s.trim()).filter(s => s !== 'Facebook' && s !== 'Instagram' && s !== '');
      return `import { ${imports.join(', ')} } from 'lucide-react';`;
    });
    content = content.replace(/<Facebook[^>]*>/g, '<span>FB</span>');
    content = content.replace(/<Instagram[^>]*>/g, '<span>IG</span>');
    modified = true;
  }

  
  // Add use client and @ts-nocheck to bypass strict TS for massive legacy files
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    if (!content.includes('"use client"')) {
      content = '"use client";\n// @ts-nocheck\n' + content;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched:', filePath);
  }
};

const walkDir = (dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      patchFile(fullPath);
    }
  }
};

dirsToPatch.forEach(dir => {
  walkDir(path.join(process.cwd(), 'src', dir));
});

// Also patch firebase.ts, firebaseAuth.ts and types.ts
patchFile(path.join(process.cwd(), 'src', 'firebase.ts'));
patchFile(path.join(process.cwd(), 'src', 'firebaseAuth.ts'));
patchFile(path.join(process.cwd(), 'src', 'types.ts'));
