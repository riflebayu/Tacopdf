import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { TRANSLATIONS } from '../src/data/translations';

let cachedDb: any = null;

async function getFallbackHtml(req: VercelRequest): Promise<string> {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    if (host && !host.includes('vercel.app')) { 
      // fetch from host directly if available
      const response = await fetch(`${protocol}://${host}/fallback.html`);
      if (response.ok) return await response.text();
    } else if (host && host.includes('vercel.app')) {
      const response = await fetch(`https://${host}/fallback.html`);
      if (response.ok) return await response.text();
    }
  } catch (e) {
    console.error("Failed to fetch fallback.html from host:", e);
  }

  let htmlPath = path.join(process.cwd(), 'fallback.html');
  if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), 'dist', 'fallback.html');
  }
  if (fs.existsSync(htmlPath)) {
    return fs.readFileSync(htmlPath, 'utf8');
  }
  return `<!DOCTYPE html><html><head><title>TacoPDF Blog</title></head><body><div id="root"></div><script src="/assets/index.js"></script></body></html>`;
}

function generateFooterHtml(t: any): string {
  return `
    <footer>
      <div>
        <h3>${t('footer.support')}</h3>
        <ul>
          <li><a href="/faq">${t('nav.faq')}</a></li>
          <li><a href="/sitemap">${t('footer.sitemap')}</a></li>
        </ul>
      </div>
      <div>
        <h3>${t('footer.features')}</h3>
        <ul>
          <li><a href="/#manipulation">${t('cat.manipulation')}</a></li>
          <li><a href="/#security">${t('cat.security')}</a></li>
          <li><a href="/#conversion">${t('cat.conversion')}</a></li>
          <li><a href="/#editing">${t('cat.editing')}</a></li>
        </ul>
      </div>
      <div>
        <h3>${t('footer.popular')}</h3>
        <ul>
          <li><a href="/merge-pdf">${t('tools.merge.name')}</a></li>
          <li><a href="/image-to-pdf">${t('tools.image-to-pdf.name')}</a></li>
          <li><a href="/delete-pages">${t('tools.delete-pages.name')}</a></li>
          <li><a href="/split-pdf">${t('tools.split.name')}</a></li>
          <li><a href="/protect-pdf">${t('tools.protect.name')}</a></li>
        </ul>
      </div>
      <div>
        <h3>${t('footer.company')}</h3>
        <ul>
          <li><a href="/about">${t('nav.about')}</a></li>
          <li><a href="/contact">${t('nav.contact')}</a></li>
          <li><a href="/blog">${t('nav.blog')}</a></li>
        </ul>
      </div>
      <div>
        <h3>${t('footer.legal')}</h3>
        <ul>
          <li><a href="/privacy">${t('nav.privacy')}</a></li>
          <li><a href="/terms">${t('nav.terms')}</a></li>
          <li><a href="/cookie">${t('nav.cookie')}</a></li>
          <li><a href="/retention">${t('nav.retention')}</a></li>
        </ul>
      </div>
      <p>&copy; ${new Date().getFullYear()} TacoPDF. ${t('footer.rights') || 'All rights reserved.'}</p>
      <p>${t('footer.tagline') || 'TacoPDF provides privacy-first, secure PDF tools directly in your browser using WebAssembly.'}</p>
    </footer>
  `;
}

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

    const t = (key: string) => {
      // @ts-ignore
      return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
    };

    let html = await getFallbackHtml(req);

    // Ambil artikel
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);

    const articles: any[] = [];
    const now = new Date();

    snapshot.forEach(doc => {
      const data = doc.data();
      const translation = data.translations?.[lang] || data.translations?.['en'];
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

    const title = t('blog.title');
    const description = t('blog.desc');
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

    const emptyState = articlesHtml === '' ? `<p>${t('blog.empty')}</p>` : '';

    const crawlerContent = `
      <div id="seo-crawler-content" style="position: absolute; pointer-events: none; opacity: 0; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0);">
        <header>
          <nav>
            <a href="https://tacopdf.com">TacoPDF</a>
            <a href="https://tacopdf.com/blog">${t('nav.blog')}</a>
            <a href="https://tacopdf.com/about">${t('nav.about')}</a>
            <a href="https://tacopdf.com/contact">${t('nav.contact')}</a>
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
        ${generateFooterHtml(t)}
      </div>
    `;
    
    html = html.replace('</body>', `\n${crawlerContent}\n</body>`);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);

  } catch (error) {
    console.error("Terjadi kesalahan pada renderBlogIndex:", error);
    let html = await getFallbackHtml(req);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }
}
