import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import { TRANSLATIONS } from './_translations.js';

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
  const prefix = lang === 'en' ? '' : '/' + lang;
  const getHref = (pathStr: string) => {
    if (pathStr === '/') return prefix || '/';
    return prefix + pathStr;
  };

  const langNames: Record<string, string> = {
    'en': 'English',
    'id': 'Bahasa Indonesia',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'ja': '日本語',
    'pt': 'Português'
  };

  const toolsDropdown = `
    <div class="relative group cursor-pointer">
      <div class="text-on-surface-variant hover:text-primary-container font-semibold text-sm flex items-center gap-1 py-4">
        ${t('nav.tools') || 'Tools'} ▾
      </div>
      <div class="absolute top-[80%] right-1/2 translate-x-1/2 z-50 w-[520px] bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-4 mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
        <div class="grid grid-cols-2 gap-x-5 gap-y-4">
          <div class="space-y-1.5">
            <h3 class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/35 pb-1">${t('cat.manipulation') || 'Manipulation'}</h3>
            <ul class="space-y-0.5">
              <li><a href="${getHref('/merge-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tools.merge.name') || 'Merge PDF'}</a></li>
              <li><a href="${getHref('/split-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tools.split.name') || 'Split PDF'}</a></li>
              <li><a href="${getHref('/rotate-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.rotate') || 'Rotate PDF'}</a></li>
              <li><a href="${getHref('/delete-pages')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.delete_pages') || 'Delete Pages'}</a></li>
              <li><a href="${getHref('/extract-pages')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.extract_pages') || 'Extract Pages'}</a></li>
            </ul>
          </div>
          <div class="space-y-1.5">
            <h3 class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/35 pb-1">${t('cat.security') || 'Security'}</h3>
            <ul class="space-y-0.5">
              <li><a href="${getHref('/protect-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.protect') || 'Protect PDF'}</a></li>
              <li><a href="${getHref('/unlock-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.unlock') || 'Unlock PDF'}</a></li>
              <li><a href="${getHref('/sign-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.sign') || 'Sign PDF'}</a></li>
              <li><a href="${getHref('/redact-pdf')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.redact') || 'Redact PDF'}</a></li>
              <li><a href="${getHref('/add-watermark')}" class="block py-1 text-xs text-primary hover:underline">${t('tool_name.add_watermark') || 'Add Watermark'}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  const langDropdown = `
    <div class="relative group cursor-pointer">
      <div class="text-on-surface-variant hover:text-primary-container font-semibold text-sm flex items-center gap-1 py-4">
        🌐 ${langNames[lang] || 'English'} ▾
      </div>
      <div class="absolute top-[80%] right-0 z-50 w-40 bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-2 mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
        <a href="/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'en' ? 'text-primary font-bold' : 'text-on-surface'}">English</a>
        <a href="/id/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'id' ? 'text-primary font-bold' : 'text-on-surface'}">Bahasa Indonesia</a>
        <a href="/es/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'es' ? 'text-primary font-bold' : 'text-on-surface'}">Español</a>
        <a href="/fr/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'fr' ? 'text-primary font-bold' : 'text-on-surface'}">Français</a>
        <a href="/de/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'de' ? 'text-primary font-bold' : 'text-on-surface'}">Deutsch</a>
        <a href="/ja/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'ja' ? 'text-primary font-bold' : 'text-on-surface'}">日本語</a>
        <a href="/pt/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md ${lang === 'pt' ? 'text-primary font-bold' : 'text-on-surface'}">Português</a>
      </div>
    </div>
  `;

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
            <a href="${getHref('/all-tools')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">${t('nav.all_tools') || 'All Tools'}</a>
            ${toolsDropdown}
            <a href="${getHref('/blog')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">${t('nav.blog') || 'Blog'}</a>
            <a href="${getHref('/faq')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">${t('nav.faq') || 'FAQ'}</a>
            ${langDropdown}
          </div>
        </div>
      </header>

      <main class="flex-grow">
        ${pageHtml}
      </main>

      <footer class="bg-surface border-t border-outline-variant py-12 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">${t('footer.support') || 'Support'}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/faq')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('nav.faq') || 'FAQ'}</a></li>
              <li><a href="${getHref('/sitemap')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.sitemap') || 'Sitemap'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">${t('footer.features') || 'Features'}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/#manipulation')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.manipulation') || 'Manipulation'}</a></li>
              <li><a href="${getHref('/#security')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.security') || 'Security'}</a></li>
              <li><a href="${getHref('/#conversion')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.conversion') || 'Conversion'}</a></li>
              <li><a href="${getHref('/#editing')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('cat.editing') || 'Editing'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">${t('footer.popular') || 'Popular Tools'}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/merge-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tool_name.merge') || 'Merge PDF'}</a></li>
              <li><a href="${getHref('/image-to-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tool_name.image_to_pdf') || 'Image to PDF'}</a></li>
              <li><a href="${getHref('/delete-pages')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tool_name.delete_pages') || 'Delete Pages'}</a></li>
              <li><a href="${getHref('/split-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tool_name.split') || 'Split PDF'}</a></li>
              <li><a href="${getHref('/protect-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('tool_name.protect') || 'Protect PDF'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">${t('footer.company') || 'Company'}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/how-it-works')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.howItWorks') || 'How It Works'}</a></li>
              <li><a href="${getHref('/about')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.about') || 'About Us'}</a></li>
              <li><a href="${getHref('/blog')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.blog') || 'Blog'}</a></li>
              <li><a href="${getHref('/contact')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.contact') || 'Contact Support'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">${t('footer.legal') || 'Legal'}</h3>
            <ul class="space-y-2">
              <li><a href="${getHref('/privacy')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.privacy') || 'Privacy Policy'}</a></li>
              <li><a href="${getHref('/terms')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.terms') || 'Terms of Service'}</a></li>
              <li><a href="${getHref('/cookie')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.cookie') || 'Cookie Policy'}</a></li>
              <li><a href="${getHref('/disclaimer')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.disclaimer') || 'Disclaimer'}</a></li>
              <li><a href="${getHref('/retention')}" class="text-on-surface-variant hover:text-primary transition-colors">${t('footer.retention') || 'Data Retention'}</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <p class="text-on-surface-variant text-sm font-semibold">&copy; 2026 TacoPDF. ${t('footer.desc') || 'Privacy-first PDF utility.'}</p>
          <div class="flex gap-4">
            <span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              ${t('footer.local') || 'Local Processing'}
            </span>
            <span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M19.5 15a5.25 5.25 0 00-7.5-7.5l-3.356-3.356a7.501 7.501 0 0110.856 10.856zM8.25 12a3.75 3.75 0 005.5 5.5l-5.5-5.5z" /></svg>
              ${t('footer.storage') || 'No File Storage'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const urlPath = req.url?.split('?')[0] || '';
    const segments = urlPath.split('/').filter(Boolean);
    
    let lang = 'en';
    let slug = '';
    
    const blogIndex = segments.indexOf('blog');
    if (blogIndex !== -1 && blogIndex < segments.length - 1) {
      slug = segments[blogIndex + 1];
      if (blogIndex === 1) {
        lang = segments[0];
      }
    } else {
      const html = await getFallbackHtml(req);
      return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    }

    if (!slug) {
      const html = await getFallbackHtml(req);
      return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    }

    const t = (key: string) => {
      // @ts-ignore
      return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) || key;
    };

    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
    let documents: any[] = [];
    if (projectId) {
      const apiUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
      const apiRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          structuredQuery: {
            from: [{collectionId: 'articles'}],
            where: {
              fieldFilter: {
                field: {fieldPath: `translations.${lang}.slug`},
                op: 'EQUAL',
                value: {stringValue: slug}
              }
            },
            limit: 1
          }
        })
      });
      if (apiRes.ok) {
        documents = await apiRes.json();
      }
    }

    const validDocs = documents.filter((d: any) => d.document);

    if (validDocs.length === 0) {
      const html = await getFallbackHtml(req);
      return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    }

    const data = parseFirestoreValue({ mapValue: { fields: validDocs[0].document.fields } });
    
    const translationData = data.translations?.[lang] || data.translations?.['en'];
    if (!translationData) {
      const html = await getFallbackHtml(req);
      return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);
    }

    let html = await getFallbackHtml(req);

    const title = translationData.title || t('blog.title');
    const description = translationData.metaDescription || '';
    const category = translationData.category || 'Blog';
    const featuredImage = data.featuredImage || data.featuredImageUrl || 'https://tacopdf.com/default-og.jpg';
    const imageAltText = data.imageAltText || title;
    const pageUrl = `https://tacopdf.com${urlPath}`;
    const author = data.author || 'TacoPDF Team';
    const publishedDate = data.createdAt && typeof data.createdAt === 'string' 
        ? data.createdAt
        : new Date().toISOString();
        
    const formattedDate = new Date(publishedDate).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });

    let rawContentHtml = (translationData.content || '')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, '<br />')
      .split('\n')
      .map((line: string) => line.trim() ? `<p>${line.trim()}</p>` : '')
      .join('\n');

    const seoTags = `
    <title>${title} | TacoPDF</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title} | TacoPDF">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${featuredImage}">
    <meta property="og:image:alt" content="${imageAltText}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="${publishedDate}">
    <meta property="article:author" content="${author}">
    <meta property="article:section" content="${category}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | TacoPDF">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${featuredImage}">
    <meta name="twitter:image:alt" content="${imageAltText}">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${pageUrl}"
      },
      "headline": "${title}",
      "description": "${description}",
      "image": {
        "@type": "ImageObject",
        "url": "${featuredImage}",
        "caption": "${imageAltText}"
      },
      "author": {
        "@type": "Organization",
        "name": "${author}"
      },  
      "publisher": {
        "@type": "Organization",
        "name": "TacoPDF",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tacopdf.com/logo-favicon.png"
        }
      },
      "datePublished": "${publishedDate}"
    }
    </script>
    `;

    html = html.replace('</head>', `\n${seoTags}\n</head>`);
    
    const prefix = lang === 'en' ? '' : `/${lang}`;

    const pageHtml = `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
          <a href="${prefix || '/'}" class="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <a href="${prefix}/blog" class="hover:text-primary transition-colors">Blog</a>
          <span>/</span>
          <span class="text-on-surface line-clamp-1">${title}</span>
        </nav>
      
        <div class="mb-8 overflow-hidden rounded-[2rem] bg-surface-container relative group h-[400px]">
          <img src="${featuredImage}" alt="${imageAltText}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <span class="inline-block px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full mb-4 shadow-sm">${category}</span>
            <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight font-display drop-shadow-md">${title}</h1>
            <div class="flex flex-wrap items-center gap-4 text-sm font-semibold text-white/90">
              <span class="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">👤 ${author}</span>
              <span class="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">📅 ${formattedDate}</span>
            </div>
          </div>
        </div>
        <div class="bg-surface-container-lowest rounded-[2rem] p-6 md:p-10 shadow-sm border border-outline-variant">
          <div class="prose prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md text-on-surface">
            ${rawContentHtml}
          </div>
        </div>
      </div>
    `;

    const fullAppShellHtml = generateAppShellHtml(lang, t, pageHtml);
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${fullAppShellHtml}</div>`);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');
    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(html);

  } catch (error) {
    console.error("SSR CRITICAL ERROR in renderArticle:", error);

    // GRACEFUL FALLBACK: Mengembalikan kerangka SPA Vite agar tidak terjadi Blank Page / Error 500.
    // Client-side React akan mengambil alih rendering (CSR fallback).
    const fallbackHtml = await getFallbackHtml(req);
    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(fallbackHtml);
  }
}
