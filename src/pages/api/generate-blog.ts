import type { APIRoute } from 'astro';
import { generateArticle, generateArticleOpenRouter } from '../../utils/ai';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export const prerender = false;

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const topic = formData.get('topic') as string;
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const language = formData.get('language') as string;
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
    const safeTopic = generateSlug(topic);
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

    const slug = generateSlug(articleData.title);

    // 3. Assemble Markdown with Frontmatter
    const frontmatter = `---
title: "${articleData.title.replace(/"/g, '\\"')}"
description: "${articleData.description.replace(/"/g, '\\"')}"
pubDate: "${new Date().toISOString()}"
featuredImage: "${imageWebPath}"
author: "TacoPDF Team"
tags: ${JSON.stringify(articleData.tags || [])}
---

`;

    const fullMarkdown = frontmatter + cleanContent;

    // 4. Save to File System
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
