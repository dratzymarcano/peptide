import type { APIRoute } from 'astro';
import { getUserFromCookies } from '../../../lib/auth/session';

export const GET: APIRoute = async ({ cookies }) => {
  const user = await getUserFromCookies(cookies);
  return new Response(JSON.stringify({ user }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
