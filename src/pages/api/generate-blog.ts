import type { APIRoute } from 'astro';
import { generateArticle, generateArticleOpenRouter } from '../../utils/ai';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export const prerender = false;

/**
 * Robust, SEO-compliant slug normalization function.
 * Converts accents/umlauts and guarantees strict ASCII kebab-case URLs.
 */
function normalizeSlug(rawString: string, lang: string = 'en'): string {
  if (!rawString) return '';
  let str = rawString.trim();

  // 1. German Umlaut expansion (ä -> ae, ö -> oe, ü -> ue, ß -> ss)
  if (lang === 'de') {
    str = str
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/Ä/g, 'ae')
      .replace(/Ö/g, 'oe')
      .replace(/Ü/g, 'ue');
  }

  // 2. Unicode Normalization (decompose accents: é -> e, ñ -> n, ç -> c)
  str = str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  // 3. Keep only alphanumeric ASCII and hyphens
  str = str
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return str;
}

/**
 * Resolves the final slug using a hierarchy:
 * 1. manualSlug (if provided by user in CMS)
 * 2. AI-generated slug (from JSON response, especially English slug for Japanese)
 * 3. Title-based normalized slug
 * 4. Topic-based fallback
 * 5. Safe timestamp fallback
 */
function resolveFinalSlug(
  manualSlug: string | undefined,
  aiSlug: string | undefined,
  title: string,
  topic: string,
  lang: string
): string {
  // 1. Check manual override
  if (manualSlug) {
    const cleaned = normalizeSlug(manualSlug, lang);
    if (cleaned) return cleaned;
  }

  // 2. Check AI-generated slug (critical for non-Latin/Japanese)
  if (aiSlug) {
    const cleaned = normalizeSlug(aiSlug, lang);
    if (cleaned && cleaned.length >= 3) return cleaned;
  }

  // 3. Check Title slug
  const titleSlug = normalizeSlug(title, lang);
  if (titleSlug && titleSlug.length >= 3) {
    return titleSlug;
  }

  // 4. Fallback to topic slug (Latin/English basis)
  const topicSlug = normalizeSlug(topic, 'en');
  if (topicSlug && topicSlug.length >= 3) {
    return `${topicSlug}-${lang}`;
  }

  // 5. Ultimate safe fallback
  return `post-${Date.now().toString(36)}`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const topic = formData.get('topic') as string;
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const language = formData.get('language') as string;
    const manualSlug = (formData.get('slug') || formData.get('manualSlug')) as string | undefined;
    const provider = formData.get('provider') as string || 'gemini';
    const openrouterModel = formData.get('openrouterModel') as string || 'openai/gpt-4o-mini';

    if (!topic || !image || !language) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Process Image
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Generate SEO friendly image filename based on topic and language
    const safeTopic = normalizeSlug(topic, 'en') || 'tacopdf';
    const imageFilename = `${safeTopic}-${language}-${Date.now()}.webp`;
    
    // public/images/blog
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
    await fs.mkdir(imagesDir, { recursive: true });
    
    const imagePath = path.join(imagesDir, imageFilename);
    await sharp(buffer).webp({ quality: 80 }).toFile(imagePath);
    
    const imageWebPath = `/images/blog/${imageFilename}`;

    // 2. Generate Content via AI
    let articleData;
    if (provider === 'openrouter') {
      articleData = await generateArticleOpenRouter(topic, language, prompt, openrouterModel);
    } else {
      articleData = await generateArticle(topic, language, prompt);
    }
    
    if (!articleData || !articleData.title || !articleData.content) {
       throw new Error('AI returned invalid format.');
    }

    // Strip out double titles if AI accidentally included H1 at the very beginning of content
    let cleanContent = articleData.content;
    const titleRegex = new RegExp(`^#\\s+${articleData.title.replace(/[.*+?^$\{}()|[\]\\]/g, '\\$&')}\\s*\\n+`, 'i');
    cleanContent = cleanContent.replace(titleRegex, '');
    // Also catch any generic # Title at the beginning
    cleanContent = cleanContent.replace(/^#\s+.*\n+/, '');

    // 3. Resolve Final SEO-Optimized Slug
    const slug = resolveFinalSlug(
      manualSlug,
      articleData.slug,
      articleData.title,
      topic,
      language
    );
    const clusterKey = normalizeSlug(topic, 'en') || 'tacopdf-cluster';

    // 4. Assemble Markdown with Frontmatter
    const imageAltText = (articleData.imageAlt || articleData.title).replace(/"/g, '\\"');
    const frontmatter = `---
title: "${articleData.title.replace(/"/g, '\\"')}"
description: "${articleData.description.replace(/"/g, '\\"')}"
pubDate: "${new Date().toISOString()}"
featuredImage: "${imageWebPath}"
imageAlt: "${imageAltText}"
author: "Muhammad Bayu Edi"
tags: ${JSON.stringify(articleData.tags || [])}
translationKey: "${clusterKey}"
---

`;

    const fullMarkdown = frontmatter + cleanContent;

    // 5. Save to File System
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog', language);
    await fs.mkdir(blogDir, { recursive: true });
    
    const filePath = path.join(blogDir, `${slug}.md`);
    await fs.writeFile(filePath, fullMarkdown, 'utf-8');

    return new Response(JSON.stringify({ success: true, slug, path: filePath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(`Generate Blog API Error (${error.message}):`, error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
