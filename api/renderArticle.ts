import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Pastikan inisialisasi Firebase App hanya dilakukan sekali (singleton) di lingkungan serverless
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // Catch already initialized error if function is warm
}

const db = getFirestore(app);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Vercel memasukkan named regex groups ke dalam req.query
    // Namun kita bisa menggunakan path mentah untuk memparsing
    const urlPath = req.url?.split('?')[0] || '';
    
    // Parse lang and slug dari format /blog/:slug atau /:lang/blog/:slug
    const segments = urlPath.split('/').filter(Boolean); // ['id', 'blog', 'slug'] atau ['blog', 'slug']
    
    let lang = 'en'; // Default
    let slug = '';
    
    const blogIndex = segments.indexOf('blog');
    if (blogIndex !== -1 && blogIndex < segments.length - 1) {
      slug = segments[blogIndex + 1];
      if (blogIndex === 1) {
        lang = segments[0]; // ada kode bahasa di depannya
      }
    } else {
      // Jika format tidak dikenali, kembalikan fallback murni
      return serveFallback(res);
    }

    if (!slug) {
      return serveFallback(res);
    }

    // Ambil data dari Firestore
    const articlesRef = collection(db, 'articles');
    // Karena translations adalah map, kita mencari di mana terjemahan bahasa spesifik slug-nya sama dengan slug di URL
    // Format struktur: translations.id.slug == 'slug-nya'
    const q = query(articlesRef, where(`translations.${lang}.slug`, '==', slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Artikel tidak ditemukan
      return serveFallback(res);
    }

    const articleDoc = snapshot.docs[0];
    const data = articleDoc.data();
    
    const translationData = data.translations?.[lang];
    if (!translationData) {
      return serveFallback(res);
    }

    // Ambil fallback.html dari root
    // Vercel Serverless Function berjalan pada '/var/task/api', namun file statis tersedia sesuai output build
    // Jika Vercel mendeploy output Vite (di 'dist'), fallback.html akan ada di sana.
    // Tetapi secara standar kita akan mencoba path root
    let htmlPath = path.join(process.cwd(), 'fallback.html');
    if (!fs.existsSync(htmlPath)) {
        htmlPath = path.join(process.cwd(), 'dist', 'fallback.html'); // Jika di dalam folder dist
    }
    
    let html = '';
    try {
      html = fs.readFileSync(htmlPath, 'utf8');
    } catch (e) {
      console.error("Gagal membaca fallback.html:", e);
      return res.status(500).send("Server Error: Missing SPA shell");
    }

    // Persiapkan tag SEO
    const title = translationData.title || 'TacoPDF Blog';
    const description = translationData.metaDescription || '';
    const category = translationData.category || 'Blog';
    const featuredImage = data.featuredImage || 'https://tacopdf.com/default-og.jpg'; // Ganti dengan URL default jika ada
    const pageUrl = `https://tacopdf.com${urlPath}`;
    const author = data.author || 'TacoPDF Team';

    const publishedDate = data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString();

    const seoTags = `
    <title>${title} | TacoPDF</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title} | TacoPDF">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${featuredImage}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="${publishedDate}">
    <meta property="article:author" content="${author}">
    <meta property="article:section" content="${category}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | TacoPDF">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${featuredImage}">
    
    <!-- JSON-LD Structured Data untuk SEO -->
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
      "image": "${featuredImage}",  
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

    // Injeksi: Ganti blok SEO standar di fallback.html dengan seoTags baru kita.
    // Kita bisa menyuntikkannya tepat sebelum tag </head>
    html = html.replace('</head>', `\n${seoTags}\n</head>`);

    // Edge Cache: Simpan halaman ini di Vercel Edge Cache selama 1 jam, gunakan cache basi selama 12 jam sambil *revalidate* di *background*
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=43200');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    return res.status(200).send(html);

  } catch (error) {
    console.error("Terjadi kesalahan pada renderArticle:", error);
    // Selalu *fail-safe* ke SPA shell agar halaman tidak benar-benar blank
    return serveFallback(res);
  }
}

// Fungsi helper untuk merender fallback SPA
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
    return res.status(404).send("Not Found");
  }
}
