import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

let cachedDb: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedDb) {
      const firebaseConfig = {
        apiKey: process.env.VITE_FIREBASE_API_KEY,
        authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_FIREBASE_APP_ID,
        measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
      };
      const app = initializeApp(firebaseConfig);
      cachedDb = getFirestore(app);
    }
    const db = cachedDb;

    const urlPath = req.url?.split('?')[0] || '';
    const segments = urlPath.split('/').filter(Boolean);
    
    // Default lang
    let lang = 'en';
    if (segments.length > 0 && segments[0] !== 'blog') {
      lang = segments[0]; // e.g. /id/blog
    }

    // Ambil fallback.html
    let htmlPath = path.join(process.cwd(), 'fallback.html');
    if (!fs.existsSync(htmlPath)) {
        htmlPath = path.join(process.cwd(), 'dist', 'fallback.html');
    }
    
    let html = '';
    try {
      html = fs.readFileSync(htmlPath, 'utf8');
    } catch (e) {
      console.error("Gagal membaca fallback.html:", e);
      return res.status(500).send("Server Error: Missing SPA shell");
    }

    // Ambil artikel
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);

    const articles: any[] = [];
    const now = new Date();

    snapshot.forEach(doc => {
      const data = doc.data();
      const translation = data.translations?.[lang];
      if (!translation) return;

      const isPublished = data.status === 'published';
      const isScheduledPassed = data.status === 'scheduled' && data.scheduledAt && new Date(data.scheduledAt) <= now;
      if (!isPublished && !isScheduledPassed) return;

      articles.push({
        ...data,
        id: doc.id,
        translation
      });
    });

    const title = 'TacoPDF Blog';
    const description = 'Insights, updates, and guides on privacy-first PDF processing, client-side WebAssembly, and secure document management.';
    const pageUrl = `https://tacopdf.com${urlPath}`;

    const seoTags = `
    <title>${title} | TacoPDF</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title} | TacoPDF">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | TacoPDF">
    <meta name="twitter:description" content="${description}">
    `;

    html = html.replace('</head>', `\n${seoTags}\n</head>`);
    
    const articlesHtml = articles.map(a => `
      <li>
        <a href="https://tacopdf.com/${lang === 'en' ? '' : lang + '/'}blog/${a.translation.slug}">
          <img src="${a.featuredImage || a.featuredImageUrl || ''}" alt="${a.translation.title}" />
          <h2>${a.translation.title}</h2>
          <p>${a.translation.metaDescription}</p>
        </a>
      </li>
    `).join('');

    const emptyState = articlesHtml === '' ? '<p>No articles published yet. Check back soon!</p>' : '';

    const crawlerContent = `
      <div id="seo-crawler-content" style="position: absolute; pointer-events: none; opacity: 0; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);">
        <header>
          <nav>
            <a href="https://tacopdf.com">TacoPDF Logo</a>
            <a href="https://tacopdf.com/blog">Blog</a>
            <a href="https://tacopdf.com/about">About Us</a>
            <a href="https://tacopdf.com/contact">Contact</a>
          </nav>
        </header>
        <main>
          <h1>${title}</h1>
          <p>${description}</p>
          <ul>
            ${articlesHtml}
          </ul>
          ${emptyState}
        </main>
        <footer>
          <p>&copy; ${new Date().getFullYear()} TacoPDF. All rights reserved.</p>
          <p>TacoPDF provides privacy-first, secure PDF tools directly in your browser using WebAssembly.</p>
        </footer>
      </div>
    `;
    
    html = html.replace('</body>', `\n${crawlerContent}\n</body>`);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);

  } catch (error) {
    console.error("Terjadi kesalahan pada renderBlogIndex:", error);
    return serveFallback(res);
  }
}

function serveFallback(res: VercelResponse) {
  let htmlPath = path.join(process.cwd(), 'fallback.html');
  if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), 'dist', 'fallback.html');
  }
  
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } else {
    const minimalHtml = `<!DOCTYPE html><html><head><title>TacoPDF Blog</title></head><body><div id="root"></div><script src="/assets/index.js"></script></body></html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(minimalHtml);
  }
}
