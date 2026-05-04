import type { APIRoute } from 'astro';
import { getSupabaseAnon, isSupabaseConfigured } from '../../../../lib/supabase/server';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const SITE_URL = import.meta.env.SITE_URL ?? 'http://localhost:4321';

export const POST: APIRoute = async ({ request, params }) => {
  const provider = String(params.provider ?? '');
  if (provider !== 'google' && provider !== 'facebook') {
    return json({ success: false, code: 'unsupported_provider' }, 400);
  }
  if (!isSupabaseConfigured()) {
    return json({ success: false, code: 'auth_not_configured' }, 503);
  }
  const supa = getSupabaseAnon();
  if (!supa) return json({ success: false, code: 'auth_unavailable' }, 503);
  let redirectTo = `${SITE_URL}/account`;
  try {
    const body = await request.json();
    if (typeof body?.redirectTo === 'string') redirectTo = body.redirectTo;
  } catch {
    /* optional body */
  }
  const { data, error } = await supa.auth.signInWithOAuth({
    provider,
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error || !data?.url) {
    return json({ success: false, code: 'oauth_init_failed' }, 500);
  }
  return json({ success: true, url: data.url });
};
