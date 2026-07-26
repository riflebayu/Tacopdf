import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const tools = [
  'merge-pdf', 'split-pdf', 'rotate-pdf', 'delete-pages', 'extract-pages', 
  'protect-pdf', 'unlock-pdf', 'sign-pdf', 'redact-pdf', 'image-to-pdf', 
  'pdf-to-image', 'html-to-pdf', 'add-watermark', 'add-page-numbers'
];
const staticPages = ['about', 'privacy', 'terms', 'cookie', 'retention', 'disclaimer', 'sitemap', 'contact', 'how-it-works'];
const langs = ['', '/id', '/es', '/ja', '/de', '/fr', '/pt'];

// Menghasilkan 98+ rute secara dinamis (termasuk root '/')
const prerenderRoutes = langs.flatMap(lang => 
  [...tools, ...staticPages].map(path => `${lang}/${path}`)
).concat(langs.map(lang => lang === '' ? '/' : `${lang}/`));

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      // Prerender dibungkus agar berjalan POST-BUILD (hanya saat npm run build)
      {
        ...prerender({
          // WAJIB: Tentukan folder output Vite
          staticDir: path.join(__dirname, 'dist'),
          routes: prerenderRoutes,
          renderer: new PuppeteerRenderer({
            // Jeda 5 detik per rute untuk memastikan react-helmet-async & rendering selesai
            renderAfterTime: 5000, 
            maxConcurrentRoutes: 4,
            headless: true,
            // Skip request Analytics/Ads agar tidak mengganggu proses rendering Puppeteer
            skipThirdPartyRequests: true,
            // Mencegah Puppeteer silent crash di environment tertentu
            puppeteer: {
              args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
          }),
        }),
        apply: 'build',
        enforce: 'post'
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      chunkSizeWarningLimit: 1200,
      modulePreload: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug', 'console.warn']
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor';
            if (id.includes('node_modules/@uiw/react-md-editor')) return 'editor';
            if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark') || id.includes('node_modules/rehype')) return 'markdown';
            if (id.includes('node_modules/firebase')) return 'firebase';
            if (id.includes('node_modules/pdf-lib') || id.includes('node_modules/qpdf')) return 'pdf';
            if (id.includes('node_modules/@google/generative-ai') || id.includes('node_modules/groq-sdk')) return 'ai';
            if (id.includes('node_modules/tesseract.js')) return 'tesseract';
            if (id.includes('node_modules/lucide-react')) return 'icons';
            if (id.includes('node_modules/motion')) return 'motion';
          }
        }
      }
    }
  };
});
