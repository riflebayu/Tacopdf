import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Cleanup: Hapus raw HTML yang disuntikkan serverless untuk Google Crawler
// Ini mencegah Hydration Mismatch dan duplikasi visual
const crawlerContent = document.getElementById('seo-crawler-content');
if (crawlerContent) {
  crawlerContent.remove();
}

if (rootElement.firstElementChild) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
