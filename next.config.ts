import type { NextConfig } from "next";

const LANGS = ['en', 'id', 'es', 'fr', 'de', 'pt', 'ja'];

// Legacy short URLs that were indexed by Google on the old Vite site
const LEGACY_REDIRECTS = [
  { from: 'split',    to: 'split-pdf' },
  { from: 'rotate',  to: 'rotate-pdf' },
  { from: 'protect', to: 'protect-pdf' },
  { from: 'unlock',  to: 'unlock-pdf' },
];

function buildRedirects() {
  const redirects: Array<{ source: string; destination: string; permanent: boolean }> = [];

  for (const { from, to } of LEGACY_REDIRECTS) {
    // Root English path: /split → /split-pdf
    redirects.push({
      source: `/${from}`,
      destination: `/${to}`,
      permanent: true,
    });
    // Other languages: /id/split → /id/split-pdf
    for (const lang of LANGS.filter(l => l !== 'en')) {
      redirects.push({
        source: `/${lang}/${from}`,
        destination: `/${lang}/${to}`,
        permanent: true,
      });
    }
  }

  return redirects;
}

const nextConfig: NextConfig = {
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
