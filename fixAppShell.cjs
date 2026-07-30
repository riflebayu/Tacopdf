const fs = require('fs');
const oldFn = fs.readFileSync('tmp_target.txt', 'utf8');
const newFn = `function generateAppShellHtml(lang: string, t: any, pageHtml: string): string {
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

  const toolsDropdown = \`
    <div class="relative group cursor-pointer">
      <div class="text-on-surface-variant hover:text-primary-container font-semibold text-sm flex items-center gap-1 py-4">
        \${t('nav.tools') || 'Tools'} ▾
      </div>
      <div class="absolute top-[80%] right-1/2 translate-x-1/2 z-50 w-[520px] bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-4 mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
        <div class="grid grid-cols-2 gap-x-5 gap-y-4">
          <div class="space-y-1.5">
            <h3 class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/35 pb-1">\${t('cat.manipulation') || 'Manipulation'}</h3>
            <ul class="space-y-0.5">
              <li><a href="\${getHref('/merge-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tools.merge.name') || 'Merge PDF'}</a></li>
              <li><a href="\${getHref('/split-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tools.split.name') || 'Split PDF'}</a></li>
              <li><a href="\${getHref('/rotate-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.rotate') || 'Rotate PDF'}</a></li>
              <li><a href="\${getHref('/delete-pages')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.delete_pages') || 'Delete Pages'}</a></li>
              <li><a href="\${getHref('/extract-pages')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.extract_pages') || 'Extract Pages'}</a></li>
            </ul>
          </div>
          <div class="space-y-1.5">
            <h3 class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/35 pb-1">\${t('cat.security') || 'Security'}</h3>
            <ul class="space-y-0.5">
              <li><a href="\${getHref('/protect-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.protect') || 'Protect PDF'}</a></li>
              <li><a href="\${getHref('/unlock-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.unlock') || 'Unlock PDF'}</a></li>
              <li><a href="\${getHref('/sign-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.sign') || 'Sign PDF'}</a></li>
              <li><a href="\${getHref('/redact-pdf')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.redact') || 'Redact PDF'}</a></li>
              <li><a href="\${getHref('/add-watermark')}" class="block py-1 text-xs text-primary hover:underline">\${t('tool_name.add_watermark') || 'Add Watermark'}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  \`;

  const langDropdown = \`
    <div class="relative group cursor-pointer">
      <div class="text-on-surface-variant hover:text-primary-container font-semibold text-sm flex items-center gap-1 py-4">
        🌐 \${langNames[lang] || 'English'} ▾
      </div>
      <div class="absolute top-[80%] right-0 z-50 w-40 bg-surface-container border border-outline-variant rounded-xl shadow-2xl p-2 mt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
        <a href="/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'en' ? 'text-primary font-bold' : 'text-on-surface'}">English</a>
        <a href="/id/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'id' ? 'text-primary font-bold' : 'text-on-surface'}">Bahasa Indonesia</a>
        <a href="/es/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'es' ? 'text-primary font-bold' : 'text-on-surface'}">Español</a>
        <a href="/fr/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'fr' ? 'text-primary font-bold' : 'text-on-surface'}">Français</a>
        <a href="/de/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'de' ? 'text-primary font-bold' : 'text-on-surface'}">Deutsch</a>
        <a href="/ja/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'ja' ? 'text-primary font-bold' : 'text-on-surface'}">日本語</a>
        <a href="/pt/blog" class="block px-3 py-2 text-sm hover:bg-surface-container-high rounded-md \${lang === 'pt' ? 'text-primary font-bold' : 'text-on-surface'}">Português</a>
      </div>
    </div>
  \`;

  return \`
    <div class="bg-background text-on-surface min-h-screen flex flex-col font-sans selection:bg-primary-container/35 selection:text-primary relative">
      <header class="bg-background border-b border-outline-variant docked full-width top-0 sticky z-50">
        <div class="flex justify-between items-center w-full px-4 md:px-8 h-14 md:h-20">
          <div class="flex items-center gap-2">
            <a href="\${getHref('/')}" aria-label="Home" class="flex items-center justify-center p-2 rounded-xl transition-all cursor-pointer group">
              <span class="text-xl md:text-3xl filter saturate-150 drop-shadow-sm group-hover:scale-110 transition-transform">🌮</span>
              <span class="font-extrabold text-lg md:text-2xl tracking-tighter text-on-surface ml-2 hidden sm:block">TacoPDF</span>
            </a>
          </div>
          <div class="hidden md:flex items-center gap-6 relative">
            <a href="\${getHref('/all-tools')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">\${t('nav.all_tools') || 'All Tools'}</a>
            \${toolsDropdown}
            <a href="\${getHref('/blog')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">\${t('nav.blog') || 'Blog'}</a>
            <a href="\${getHref('/faq')}" class="text-on-surface-variant hover:text-primary-container hover:underline transition-all text-sm font-semibold cursor-pointer">\${t('nav.faq') || 'FAQ'}</a>
            \${langDropdown}
          </div>
        </div>
      </header>

      <main class="flex-grow">
        \${pageHtml}
      </main>

      <footer class="bg-surface border-t border-outline-variant py-12 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 class="font-bold text-on-surface mb-4">\${t('footer.support') || 'Support'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/faq')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('nav.faq') || 'FAQ'}</a></li>
              <li><a href="\${getHref('/sitemap')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.sitemap') || 'Sitemap'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">\${t('footer.features') || 'Features'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/#manipulation')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.manipulation') || 'Manipulation'}</a></li>
              <li><a href="\${getHref('/#security')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.security') || 'Security'}</a></li>
              <li><a href="\${getHref('/#conversion')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.conversion') || 'Conversion'}</a></li>
              <li><a href="\${getHref('/#editing')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.editing') || 'Editing'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">\${t('footer.popular') || 'Popular Tools'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/merge-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.merge') || 'Merge PDF'}</a></li>
              <li><a href="\${getHref('/image-to-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.image_to_pdf') || 'Image to PDF'}</a></li>
              <li><a href="\${getHref('/delete-pages')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.delete_pages') || 'Delete Pages'}</a></li>
              <li><a href="\${getHref('/split-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.split') || 'Split PDF'}</a></li>
              <li><a href="\${getHref('/protect-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.protect') || 'Protect PDF'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">\${t('footer.company') || 'Company'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/about')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.about') || 'About Us'}</a></li>
              <li><a href="\${getHref('/contact')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.contact') || 'Contact Support'}</a></li>
              <li><a href="\${getHref('/blog')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('nav.blog') || 'Blog'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4">\${t('footer.legal') || 'Legal'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/privacy')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.privacy') || 'Privacy Policy'}</a></li>
              <li><a href="\${getHref('/terms')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.terms') || 'Terms of Service'}</a></li>
              <li><a href="\${getHref('/cookie')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.cookie') || 'Cookie Policy'}</a></li>
              <li><a href="\${getHref('/retention')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.retention') || 'Data Retention'}</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <p class="text-on-surface-variant text-sm font-semibold">&copy; \${new Date().getFullYear()} TacoPDF. \${t('footer.desc') || 'Privacy-first PDF utility.'}</p>
          <div class="flex gap-4">
            <span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">✅ \${t('footer.local') || 'Local Processing'}</span>
            <span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">🔒 \${t('footer.storage') || 'No File Storage'}</span>
          </div>
        </div>
      </footer>
    </div>
  \`;
}`;

['api/renderBlogIndex.ts', 'api/renderArticle.ts'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(oldFn, newFn);
  fs.writeFileSync(file, content);
});
