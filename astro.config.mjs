import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tacopdf.com',
  output: 'static',
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  // 301 Permanent Redirects: short/old URLs → canonical SEO URLs
  redirects: {
    // English (root)
    '/merge':       { status: 301, destination: '/merge-pdf' },
    '/split':       { status: 301, destination: '/split-pdf' },
    '/rotate':      { status: 301, destination: '/rotate-pdf' },
    '/protect':     { status: 301, destination: '/protect-pdf' },
    '/unlock':      { status: 301, destination: '/unlock-pdf' },
    '/sign-pdf':    { status: 301, destination: '/sign' },
    '/redact-pdf':  { status: 301, destination: '/redact' },

    // Indonesian
    '/id/merge':      { status: 301, destination: '/id/merge-pdf' },
    '/id/split':      { status: 301, destination: '/id/split-pdf' },
    '/id/rotate':     { status: 301, destination: '/id/rotate-pdf' },
    '/id/protect':    { status: 301, destination: '/id/protect-pdf' },
    '/id/unlock':     { status: 301, destination: '/id/unlock-pdf' },
    '/id/sign-pdf':   { status: 301, destination: '/id/sign' },
    '/id/redact-pdf': { status: 301, destination: '/id/redact' },

    // Spanish
    '/es/merge':      { status: 301, destination: '/es/merge-pdf' },
    '/es/split':      { status: 301, destination: '/es/split-pdf' },
    '/es/rotate':     { status: 301, destination: '/es/rotate-pdf' },
    '/es/protect':    { status: 301, destination: '/es/protect-pdf' },
    '/es/unlock':     { status: 301, destination: '/es/unlock-pdf' },
    '/es/sign-pdf':   { status: 301, destination: '/es/sign' },
    '/es/redact-pdf': { status: 301, destination: '/es/redact' },

    // French
    '/fr/merge':      { status: 301, destination: '/fr/merge-pdf' },
    '/fr/split':      { status: 301, destination: '/fr/split-pdf' },
    '/fr/rotate':     { status: 301, destination: '/fr/rotate-pdf' },
    '/fr/protect':    { status: 301, destination: '/fr/protect-pdf' },
    '/fr/unlock':     { status: 301, destination: '/fr/unlock-pdf' },
    '/fr/sign-pdf':   { status: 301, destination: '/fr/sign' },
    '/fr/redact-pdf': { status: 301, destination: '/fr/redact' },

    // German
    '/de/merge':      { status: 301, destination: '/de/merge-pdf' },
    '/de/split':      { status: 301, destination: '/de/split-pdf' },
    '/de/rotate':     { status: 301, destination: '/de/rotate-pdf' },
    '/de/protect':    { status: 301, destination: '/de/protect-pdf' },
    '/de/unlock':     { status: 301, destination: '/de/unlock-pdf' },
    '/de/sign-pdf':   { status: 301, destination: '/de/sign' },
    '/de/redact-pdf': { status: 301, destination: '/de/redact' },

    // Portuguese
    '/pt/merge':      { status: 301, destination: '/pt/merge-pdf' },
    '/pt/split':      { status: 301, destination: '/pt/split-pdf' },
    '/pt/rotate':     { status: 301, destination: '/pt/rotate-pdf' },
    '/pt/protect':    { status: 301, destination: '/pt/protect-pdf' },
    '/pt/unlock':     { status: 301, destination: '/pt/unlock-pdf' },
    '/pt/sign-pdf':   { status: 301, destination: '/pt/sign' },
    '/pt/redact-pdf': { status: 301, destination: '/pt/redact' },

    // Japanese
    '/ja/merge':      { status: 301, destination: '/ja/merge-pdf' },
    '/ja/split':      { status: 301, destination: '/ja/split-pdf' },
    '/ja/rotate':     { status: 301, destination: '/ja/rotate-pdf' },
    '/ja/protect':    { status: 301, destination: '/ja/protect-pdf' },
    '/ja/unlock':     { status: 301, destination: '/ja/unlock-pdf' },
    '/ja/sign-pdf':   { status: 301, destination: '/ja/sign' },
    '/ja/redact-pdf': { status: 301, destination: '/ja/redact' },
  },
});

