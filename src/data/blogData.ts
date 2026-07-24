export interface ArticleTranslation {
  title: string;
  metaDescription: string;
  slug: string;
  content: string;
}

export interface ArticleData {
  id: string; // Internal unique identifier for the article
  author: string;
  lastUpdated: string;
  featuredImage: string;
  translations: {
    [key: string]: ArticleTranslation; // 'en', 'id', 'es', 'ja', 'pt', 'de', 'fr'
  };
}
