const fs = require('fs');

const newFooter = `<footer class="bg-surface border-t border-outline-variant py-12 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">\${t('footer.support') || 'Support'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/faq')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('nav.faq') || 'FAQ'}</a></li>
              <li><a href="\${getHref('/sitemap')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.sitemap') || 'Sitemap'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">\${t('footer.features') || 'Features'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/#manipulation')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.manipulation') || 'Manipulation'}</a></li>
              <li><a href="\${getHref('/#security')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.security') || 'Security'}</a></li>
              <li><a href="\${getHref('/#conversion')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.conversion') || 'Conversion'}</a></li>
              <li><a href="\${getHref('/#editing')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('cat.editing') || 'Editing'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">\${t('footer.popular') || 'Popular Tools'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/merge-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.merge') || 'Merge PDF'}</a></li>
              <li><a href="\${getHref('/image-to-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.image_to_pdf') || 'Image to PDF'}</a></li>
              <li><a href="\${getHref('/delete-pages')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.delete_pages') || 'Delete Pages'}</a></li>
              <li><a href="\${getHref('/split-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.split') || 'Split PDF'}</a></li>
              <li><a href="\${getHref('/protect-pdf')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('tool_name.protect') || 'Protect PDF'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">\${t('footer.company') || 'Company'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/how-it-works')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.howItWorks') || 'How It Works'}</a></li>
              <li><a href="\${getHref('/about')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.about') || 'About Us'}</a></li>
              <li><a href="\${getHref('/blog')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.blog') || 'Blog'}</a></li>
              <li><a href="\${getHref('/contact')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.contact') || 'Contact Support'}</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-on-surface mb-4 uppercase text-sm tracking-wider">\${t('footer.legal') || 'Legal'}</h3>
            <ul class="space-y-2">
              <li><a href="\${getHref('/privacy')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.privacy') || 'Privacy Policy'}</a></li>
              <li><a href="\${getHref('/terms')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.terms') || 'Terms of Service'}</a></li>
              <li><a href="\${getHref('/cookie')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.cookie') || 'Cookie Policy'}</a></li>
              <li><a href="\${getHref('/disclaimer')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.disclaimer') || 'Disclaimer'}</a></li>
              <li><a href="\${getHref('/retention')}" class="text-on-surface-variant hover:text-primary transition-colors">\${t('footer.retention') || 'Data Retention'}</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <p class="text-on-surface-variant text-sm font-semibold">&copy; 2026 TacoPDF. \${t('footer.desc') || 'Privacy-first PDF utility.'}</p>
          <div class="flex gap-4">
            <span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              \${t('footer.local') || 'Local Processing'}
            </span>
            <span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M19.5 15a5.25 5.25 0 00-7.5-7.5l-3.356-3.356a7.501 7.501 0 0110.856 10.856zM8.25 12a3.75 3.75 0 005.5 5.5l-5.5-5.5z" /></svg>
              \${t('footer.storage') || 'No File Storage'}
            </span>
          </div>
        </div>
      </footer>`;

['api/renderBlogIndex.ts', 'api/renderArticle.ts'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<footer class="bg-surface border-t border-outline-variant py-12 px-6">[\s\S]*?<\/footer>/i, newFooter);
  fs.writeFileSync(file, content);
});
