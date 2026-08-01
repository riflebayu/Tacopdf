// @ts-nocheck
"use client";
export interface ArticleTranslation {
  title: string;
  metaDescription: string;
  slug: string;
  category?: string;
  tags?: string[];
  content: string;
}

export interface ArticleData {
  id: string; // Internal unique identifier for the article
  author: string;
  lastUpdated: string;
  featuredImage: string;
  imageAltText?: string;
  translations: {
    [key: string]: ArticleTranslation; // 'en', 'id', 'es', 'ja', 'pt', 'de', 'fr'
  };
  status?: string; // 'published' | 'scheduled'
  scheduledAt?: string; // ISO string representing scheduled publish time
  isPublic?: boolean; // Derived field: true if published or (scheduled and time has passed)
}
