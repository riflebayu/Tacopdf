import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import { TRANSLATIONS } from '../src/data/translations';

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
      let html = await getFallbackHtml(req);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }

    if (!slug) {
      let html = await getFallbackHtml(req);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
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

    // Filter out readTime only results (empty array effectively if no doc)
    const validDocs = documents.filter((d: any) => d.document);

    if (validDocs.length === 0) {
      let html = await getFallbackHtml(req);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }

    const data = parseFirestoreValue({ mapValue: { fields: validDocs[0].document.fields } });
    
    const translationData = data.translations?.[lang] || data.translations?.['en'];
    if (!translationData) {
      let html = await getFallbackHtml(req);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }

    let html = await getFallbackHtml(req);

    const title = translationData.title || t('blog.title');
    const description = translationData.metaDescription || '';
    const category = translationData.category || 'Blog';
    const featuredImage = data.featuredImage || data.featuredImageUrl || 'https://tacopdf.com/default-og.jpg';
    const imageAltText = data.imageAltText || title;
    const pageUrl = `https://tacopdf.com${urlPath}`;
    const author = data.author || 'TacoPDF Team';
    const publishedDate = data.createdAt && typeof data.createdAt.toDate === 'function' 
        ? data.createdAt.toDate().toISOString() 
        : new Date().toISOString();

    let rawContentHtml = (translationData.content || '')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, '<br />')
      .split('\n')
      .map(line => line.trim() ? `<p>${line.trim()}</p>` : '')
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
      "datePublished": "${publishedDate}",
      "dateModified": "${publishedDate}"
    }
    </script>
    `;

    html = html.replace('</head>', `\n${seoTags}\n</head>`);
    
    const tags = translationData.tags || [];
    const tagsHtml = tags.length > 0 
      ? `<div class="article-tags">${tags.map((t: string) => `<span class="seo-tag">#${t}</span>`).join(' ')}</div>` 
      : '';

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
          <article>
            <header>
              <h1>${title}</h1>
              <p>${t('article.writtenBy')} <a href="/about">${author}</a> on <time datetime="${publishedDate}">${publishedDate}</time></p>
              <p>${category}</p>
            </header>
            <figure>
              <img src="${featuredImage}" alt="${imageAltText}" />
            </figure>
            <div class="article-content">
              ${rawContentHtml}
            </div>
            ${tagsHtml}
          </article>
        </main>
        ${generateFooterHtml(t)}
      </div>
    `;
    
    html = html.replace('</body>', `\n${crawlerContent}\n</body>`);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);

  } catch (error) {
    console.error("Terjadi kesalahan pada renderArticle:", error);
    let html = await getFallbackHtml(req);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }
}
