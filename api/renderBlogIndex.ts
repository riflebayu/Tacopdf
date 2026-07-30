import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import { TRANSLATIONS } from './translations';

function parseFirestoreValue(value: any): any {
  if (!value) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return parseInt(value.integerValue, 10);
  if ('booleanValue' in value) return value.booleanValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('mapValue' in value) {
    const res: any = {};
    const fields = value.mapValue.fields || {};
    for (const key of Object.keys(fields)) {
      res[key] = parseFirestoreValue(fields[key]);
    }
    return res;
  }
  if ('arrayValue' in value) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  if ('nullValue' in value) return null;
  return value;
}

async function getFallbackHtml(req: VercelRequest): Promise<string> {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    if (host && !host.includes('vercel.app')) { 
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
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>TacoPDF</title><script type="module" src="/assets/index.js"></script></head><body><div id="root"></div></body></html>`;
}

function generateAppShellHtml(lang: string, t: any, pageHtml: string): string {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const getHref = (pathStr: string) => `${prefix}${pathStr}`;

  return `
    <div class="bg-background text-on-surface min-h-screen flex flex-col font-sans selection:bg-primary-container/35 selection:text-primary relative">
      <header class="bg-background border-b border-outline-variant docked full-width top-0 sticky z-50">
        <div class="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-20">
          <div class="flex items-center gap-2">
            <a href="${getHref('/')}" aria-label="Home" class="flex items-center justify-center p-2 rounded-xl transition-all cursor-pointer group">
              <span class="text-xl md:text-3xl filter saturate-150 drop-shadow-sm group-hover:scale-110 transition-transform">🌮</span>
              <span class="font-extrabold text-lg md:text-2xl tracking-tighter text-on-surface ml-2 hidden sm:block">TacoPDF</span>
            </a>
          </div>
          <div class="hidden md:flex items-center gap-6 relative">
            <a href="${getHref('/')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">${t('nav.all_tools')}</a>
            <a href="${getHref('/blog')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">${t('nav.blog')}</a>
            <a href="${getHref('/faq')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">${t('nav.faq')}</a>
          </div>
        </div>
      </header>

      <main class="flex-grow">
        ${pageHtml}
      </main>

      <footer class="bg-surface border-t border-outline-variant py-12 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 class="font-bold text-on-surface mb-4">${t('footer.support')}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/faq')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.faq')}</a></li>
              <li><a href="${getHref('/sitemap')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.sitemap')}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">${t('footer.features')}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/#manipulation')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.manipulation')}</a></li>
              <li><a href="${getHref('/#security')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.security')}</a></li>
              <li><a href="${getHref('/#conversion')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.conversion')}</a></li>
              <li><a href="${getHref('/#editing')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.editing')}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">${t('footer.popular')}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/merge-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tools.merge.name')}</a></li>
              <li><a href="${getHref('/image-to-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tools.image-to-pdf.name')}</a></li>
              <li><a href="${getHref('/delete-pages')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tools.delete-pages.name')}</a></li>
              <li><a href="${getHref('/split-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tools.split.name')}</a></li>
              <li><a href="${getHref('/protect-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tools.protect.name')}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">${t('footer.company')}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/about')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.about')}</a></li>
              <li><a href="${getHref('/contact')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.contact')}</a></li>
              <li><a href="${getHref('/blog')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.blog')}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">${t('footer.legal')}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/privacy')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.privacy')}</a></li>
              <li><a href="${getHref('/terms')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.terms')}</a></li>
              <li><a href="${getHref('/cookie')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.cookie')}</a></li>
              <li><a href="${getHref('/retention')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.retention')}</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <p class="text-on-surface-variant text-sm font-semibold">&copy; ${new Date().getFullYear()} TacoPDF. ${t('footer.rights') || 'All rights reserved.'}</p>
          <p class="text-on-surface-variant text-sm font-semibold">${t('footer.tagline') || 'TacoPDF provides privacy-first, secure PDF tools directly in your browser using WebAssembly.'}</p>
        </div>
      </footer>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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

    // Ambil artikel via REST API
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
    let documents: any[] = [];
    if (projectId) {
      const apiUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/articles`;
      const apiRes = await fetch(apiUrl);
      if (apiRes.ok) {
        const data = await apiRes.json();
        documents = data.documents || [];
      }
    }

    const articles: any[] = [];
    const now = new Date();

    documents.forEach((doc: any) => {
      const data = parseFirestoreValue({ mapValue: { fields: doc.fields } });
      const docId = doc.name.split('/').pop();
      const translation = data.translations?.[lang] || data.translations?.['en'];
      if (!translation) return;

      const isPublished = data.status === 'published';
      const isScheduledPassed = data.status === 'scheduled' && data.scheduledAt && new Date(data.scheduledAt) <= now;
      if (!isPublished && !isScheduledPassed) return;

      articles.push({
        ...data,
        id: docId,
        translation
      });
    });
    
    // Sort articles by createdAt desc
    articles.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
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
    
    const prefix = lang === 'en' ? '' : `/${lang}`;
    
    const articlesHtml = articles.map(a => {
      const dateStr = a.createdAt && typeof a.createdAt === 'string' 
        ? new Date(a.createdAt).toLocaleDateString(lang, { day: 'numeric', month: 'short', year: 'numeric' }) 
        : '';
      const cat = a.translation.category || 'Blog';
      const img = a.featuredImage || a.featuredImageUrl ? `<div class="h-56 w-full overflow-hidden bg-surface"><img src="${a.featuredImage || a.featuredImageUrl}" alt="${a.translation.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>` : '';
      
      return `
      <a href="${prefix}/blog/${a.translation.slug}" class="group bg-surface-container hover:bg-surface-container-high border border-outline-variant hover:border-primary/50 transition-all duration-300 rounded-[2rem] overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5">
        ${img}
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 text-xs font-bold text-on-surface-variant mb-4 opacity-75">
              <span class="flex items-center gap-1">👤 ${a.author || 'TacoPDF Team'}</span>
              <span>•</span>
              <span class="flex items-center gap-1">📅 ${dateStr}</span>
            </div>
            <span class="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4">${cat}</span>
            <h3 class="text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-tight">${a.translation.title}</h3>
            <p class="text-on-surface-variant text-sm line-clamp-3 mb-6 opacity-90">${a.translation.metaDescription}</p>
          </div>
          <div class="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
            ${t('blog.read_more') || 'Read More'} <span class="text-lg">→</span>
          </div>
        </div>
      </a>`;
    }).join('');

    const pageHtml = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div class="text-center mb-16 relative">
          <h1 class="text-4xl md:text-5xl font-extrabold text-on-surface mb-6 font-display tracking-tight">${title}</h1>
          <p class="text-xl text-on-surface-variant max-w-3xl mx-auto font-medium">${description}</p>
        </div>
        ${articlesHtml ? `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${articlesHtml}</div>` : `<div class="text-center py-20 bg-surface-container rounded-3xl border border-outline-variant max-w-3xl mx-auto"><h3 class="text-2xl font-bold text-on-surface mb-2">${t('blog.empty')}</h3></div>`}
      </div>
    `;

    const fullAppShellHtml = generateAppShellHtml(lang, t, pageHtml);
    
    // Pasang (inject) full app shell menggantikan root kosongan
    html = html.replace('<div id="root"></div>', `<div id="root">${fullAppShellHtml}</div>`);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');
    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);

  } catch (error) {
    console.error("SSR CRITICAL ERROR in renderBlogIndex:", error);

    // GRACEFUL FALLBACK: Mengembalikan kerangka SPA Vite agar tidak terjadi Blank Page / Error 500.
    // Client-side React akan mengambil alih rendering (CSR fallback).
    const fallbackHtml = await getFallbackHtml(req);
    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(fallbackHtml);
  }
}
