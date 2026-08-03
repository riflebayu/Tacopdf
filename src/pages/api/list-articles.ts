import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

async function walk(dir: string, fileList: string[] = []): Promise<string[]> {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filepath = path.join(dir, file);
      const stat = await fs.stat(filepath);
      if (stat.isDirectory()) {
        fileList = await walk(filepath, fileList);
      } else if (file.endsWith('.md')) {
        fileList.push(filepath);
      }
    }
  } catch (e) {
    // Directory might not exist yet
  }
  return fileList;
}

export const GET: APIRoute = async () => {
  try {
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    const mdFiles = await walk(blogDir);
    
    const articles = await Promise.all(mdFiles.map(async (filepath) => {
      const content = await fs.readFile(filepath, 'utf-8');
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : path.basename(filepath, '.md');
      
      // Calculate relative path for frontend to use in deletion
      const relativePath = path.relative(blogDir, filepath);
      // Determine language from the first folder of relative path
      const lang = relativePath.split(path.sep)[0];
      const slug = path.basename(filepath, '.md');
      
      // Use posix path separator for the ID/relative path returned to frontend
      const posixPath = relativePath.split(path.sep).join('/');
      
      return {
        id: posixPath,
        lang,
        slug,
        title,
      };
    }));
    
    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('List Articles API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
