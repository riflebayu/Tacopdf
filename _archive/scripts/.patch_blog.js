const fs = require('fs');

// 1. Update translations.ts
let transContent = fs.readFileSync('src/data/translations.ts', 'utf8');

const additions = {
  '"en": {': `"en": {
    "blog.header.latest": "Latest ",
    "blog.header.insights": "Insights",
    "blog.read_article": "Read Article",
    "blog.no_articles": "No articles found yet. Please check back later!",`,
  '"id": {': `"id": {
    "blog.header.latest": "Wawasan ",
    "blog.header.insights": "Terbaru",
    "blog.read_article": "Baca Artikel",
    "blog.no_articles": "Belum ada artikel ditemukan. Silakan periksa kembali nanti!",`,
  '"es": {': `"es": {
    "blog.header.latest": "Últimas ",
    "blog.header.insights": "Perspectivas",
    "blog.read_article": "Leer Artículo",
    "blog.no_articles": "Aún no se han encontrado artículos. ¡Vuelve más tarde!",`,
  '"ja": {': `"ja": {
    "blog.header.latest": "最新の",
    "blog.header.insights": "洞察",
    "blog.read_article": "記事を読む",
    "blog.no_articles": "記事がまだ見つかりません。後でもう一度確認してください！",`,
  '"pt": {': `"pt": {
    "blog.header.latest": "Últimas ",
    "blog.header.insights": "Ideias",
    "blog.read_article": "Ler Artigo",
    "blog.no_articles": "Nenhum artigo encontrado ainda. Por favor, volte mais tarde!",`,
  '"de": {': `"de": {
    "blog.header.latest": "Neueste ",
    "blog.header.insights": "Einblicke",
    "blog.read_article": "Artikel lesen",
    "blog.no_articles": "Noch keine Artikel gefunden. Bitte schauen Sie später wieder vorbei!",`,
  '"fr": {': `"fr": {
    "blog.header.latest": "Dernières ",
    "blog.header.insights": "Perspectives",
    "blog.read_article": "Lire l'article",
    "blog.no_articles": "Aucun article trouvé pour l'instant. Veuillez revenir plus tard !",`
};

for (const [key, val] of Object.entries(additions)) {
  transContent = transContent.replace(key, val);
}
fs.writeFileSync('src/data/translations.ts', transContent, 'utf8');

// 2. Update src/pages/[lang]/blog/index.astro
let astroContent = fs.readFileSync('src/pages/[lang]/blog/index.astro', 'utf8');
astroContent = astroContent.replace(
  `Latest <span class="text-primary">Insights</span>`,
  `{dict['blog.header.latest' as keyof typeof dict]} <span class="text-primary">{dict['blog.header.insights' as keyof typeof dict]}</span>`
);
astroContent = astroContent.replace(
  `No articles found yet. Please check back later!`,
  `{dict['blog.no_articles' as keyof typeof dict]}`
);
astroContent = astroContent.replace(
  `Read Article <ChevronRight class="w-4 h-4" />`,
  `{dict['blog.read_article' as keyof typeof dict]} <ChevronRight class="w-4 h-4" />`
);
fs.writeFileSync('src/pages/[lang]/blog/index.astro', astroContent, 'utf8');

console.log('Blog translations applied!');
