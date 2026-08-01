import fs from 'fs';
import path from 'path';

const walk = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('"use client";') && c.includes('@ts-nocheck')) {
        // Swap so @ts-nocheck is the absolute first line
        c = c.replace(/"use client";[\s\r\n]*\/\/\s*@ts-nocheck/, '// @ts-nocheck\n"use client";');
        fs.writeFileSync(p, c, 'utf8');
      }
    }
  }
};

walk(path.join(process.cwd(), 'src'));
console.log('Fixed @ts-nocheck placement!');
