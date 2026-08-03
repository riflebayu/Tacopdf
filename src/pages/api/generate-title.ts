import type { APIRoute } from 'astro';
import { generateTitles } from '../../utils/ai';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { topic } = await request.json();
    
    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const titles = await generateTitles(topic);
    
    return new Response(JSON.stringify({ titles }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Generate Title API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
