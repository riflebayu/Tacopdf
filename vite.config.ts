import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
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
            // Core React
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor';
            }
            // Markdown Editor and its utilities
            if (id.includes('node_modules/@uiw/react-md-editor')) {
              return 'editor';
            }
            if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark') || id.includes('node_modules/rehype')) {
              return 'markdown';
            }
            // Firebase
            if (id.includes('node_modules/firebase')) {
              return 'firebase';
            }
            // PDF libraries
            if (id.includes('node_modules/pdf-lib') || id.includes('node_modules/qpdf')) {
              return 'pdf';
            }
            // AI libraries
            if (id.includes('node_modules/@google/generative-ai') || id.includes('node_modules/groq-sdk')) {
              return 'ai';
            }
            // Tesseract OCR
            if (id.includes('node_modules/tesseract.js')) {
              return 'tesseract';
            }
            // Icons
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            // Motion/Framer
            if (id.includes('node_modules/motion')) {
              return 'motion';
            }
          }
        }
      }
    }
  };
});
