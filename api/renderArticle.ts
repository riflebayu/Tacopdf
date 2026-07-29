import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Note: Inisialisasi app akan dilakukan di dalam handler untuk mencegah module-level crash 
// akibat environment variables yang belum siap di runtime tertentu.
let cachedDb: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. Inisialisasi Firebase aman di dalam try/catch
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
    
    let lang = 'en';
    let slug = '';
    
    const blogIndex = segments.indexOf('blog');
    if (blogIndex !== -1 && blogIndex < segments.length - 1) {
      slug = segments[blogIndex + 1];
      if (blogIndex === 1) {
        lang = segments[0];
      }
    } else {
      return serveFallback(res);
    }

    if (!slug) {
      return serveFallback(res);
    }

    // Ambil data dari Firestore
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where(`translations.${lang}.slug`, '==', slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return serveFallback(res);
    }

    const articleDoc = snapshot.docs[0];
    const data = articleDoc.data();
    
    const translationData = data.translations?.[lang];
    if (!translationData) {
      return serveFallback(res);
    }

    // Baca HTML Fallback
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

    // Metadata
    const title = translationData.title || 'TacoPDF Blog';
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
    
    // Injeksi Semantic Layout Penuh (Header, Main, Footer)
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
          <article>
            <header>
              <h1>${title}</h1>
              <p>By ${author} on <time datetime="${publishedDate}">${publishedDate}</time></p>
              <p>Category: ${category}</p>
            </header>
            <figure>
              <img src="${featuredImage}" alt="${imageAltText}" />
            </figure>
            <div class="article-content">
              ${rawContentHtml}
            </div>
          </article>
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
    console.error("Terjadi kesalahan pada renderArticle:", error);
    // 500 CRASH FIX: Return valid fallback HTML string instead of crashing!
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
    // If fallback is missing, return a minimal valid HTML
    const minimalHtml = `<!DOCTYPE html><html><head><title>TacoPDF Blog</title></head><body><div id="root"></div><script src="/assets/index.js"></script></body></html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(minimalHtml);
  }
}
