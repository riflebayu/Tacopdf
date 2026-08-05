import type { APIRoute } from 'astro';
import { getApiKeyStatuses, resetApiKeyStatuses, setActiveApiKey } from '../../utils/ai';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const statuses = getApiKeyStatuses();
    return new Response(JSON.stringify({ keys: statuses }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === 'reset') {
      const statuses = resetApiKeyStatuses();
      return new Response(JSON.stringify({ message: 'All limits reset', keys: statuses }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (body.action === 'set-active' && body.id) {
      const statuses = setActiveApiKey(body.id);
      return new Response(JSON.stringify({ keys: statuses }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
