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
            // Core React — tiny, always needed
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor';
            }
            // Motion/Framer kept separate so it can be tree-shaken better
            if (id.includes('node_modules/motion')) {
              return 'motion';
            }
            if (id.includes('firebaseAuth') || id.includes('AdminContainer') || id.includes('AdminDashboard') || id.includes('AdminLogin') || id.includes('RealAnalytics')) {
              return 'AdminContainer';
            }
            if (id.includes('firebase/auth')) {
              return 'AdminContainer';
            }
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('pdf-lib')) {
              return 'pdf';
            }
            if (id.includes('lucide-react')) {
              return 'ui';
            }
          }
        }
      }
    }
  };
});
