import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();

    if (!id || typeof id !== 'string') {
      return new Response(JSON.stringify({ error: 'Article ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Secure the path to prevent directory traversal
    const safeId = path.normalize(id).replace(/^(\.\.(\/|\\|$))+/, '');
    
    if (safeId.includes('..')) {
      return new Response(JSON.stringify({ error: 'Invalid article ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    const filePath = path.join(blogDir, safeId);

    // Ensure the file is actually inside the blog directory
    if (!filePath.startsWith(blogDir)) {
      return new Response(JSON.stringify({ error: 'Invalid article ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if it exists and delete
    try {
      const stat = await fs.stat(filePath);
      if (stat.isFile() && filePath.endsWith('.md')) {
        await fs.unlink(filePath);
      } else {
        throw new Error('Not a markdown file');
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Delete Article API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
