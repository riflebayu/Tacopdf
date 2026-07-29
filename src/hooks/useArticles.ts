import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { ArticleData } from '../data/blogData';

// Global cache to prevent refetching during navigation
export let cachedArticles: ArticleData[] | null = null;

export const getArticleTranslationBySlug = (activeSlug: string): ArticleData | undefined => {
  if (!cachedArticles) return undefined;
  return cachedArticles.find(article => {
    return Object.values(article.translations).some(translation => translation.slug === activeSlug);
  });
};

export const useArticles = () => {
  const [articles, setArticles] = useState<ArticleData[]>(cachedArticles || []);
  const [loading, setLoading] = useState<boolean>(!cachedArticles);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (cachedArticles) {
        setArticles(cachedArticles);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedArticles: ArticleData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Safely parse Firestore timestamp to ISO string for rendering
          let lastUpdatedStr = new Date().toISOString();
          if (data.createdAt) {
            lastUpdatedStr = data.createdAt.toDate().toISOString();
          }

          const status = data.status || 'published';
          let scheduledAtStr: string | undefined = undefined;
          if (data.scheduledAt) {
            // Check if it's a Firestore timestamp or a string
            scheduledAtStr = typeof data.scheduledAt.toDate === 'function' 
              ? data.scheduledAt.toDate().toISOString() 
              : new Date(data.scheduledAt).toISOString();
          }
          
          let isPublic = true;
          if (status === 'scheduled' && scheduledAtStr) {
            isPublic = new Date(scheduledAtStr) <= new Date();
          }

          fetchedArticles.push({
            id: doc.id,
            author: data.author || 'TacoPDF Team',
            lastUpdated: lastUpdatedStr,
            featuredImage: data.featuredImage || '',
            imageAltText: data.imageAltText,
            translations: data.translations || {},
            status,
            scheduledAt: scheduledAtStr,
            isPublic
          });
        });

        // Filter out non-published if we eventually add draft status, but for now we only publish
        // Cache the results
        cachedArticles = fetchedArticles;
        
        setArticles(fetchedArticles);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Helper function to find article by ANY slug (useful for language fallback and resolution)
  const getArticleByAnySlug = (slug: string): ArticleData | undefined => {
    return articles.find(article => {
      return Object.values(article.translations).some(t => t.slug === slug);
    });
  };

  return { articles, loading, error, getArticleByAnySlug };
};
