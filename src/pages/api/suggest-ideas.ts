import type { APIRoute } from 'astro';
import { suggestTopics } from '../../utils/ai';

export const prerender = false;

export const POST: APIRoute = async () => {
  try {
    const ideas = await suggestTopics();
    return new Response(JSON.stringify({ ideas }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Suggest Ideas API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
