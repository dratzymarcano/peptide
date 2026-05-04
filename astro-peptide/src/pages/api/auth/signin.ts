import type { APIRoute } from 'astro';
import { getSupabaseAnon, isSupabaseConfigured } from '../../../lib/supabase/server';
import { setSessionCookie } from '../../../lib/auth/session';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isSupabaseConfigured()) {
    return json({ success: false, code: 'auth_not_configured' }, 503);
  }
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ success: false, code: 'invalid_json' }, 400);
  }
  const { email, password } = body;
  if (!email || !password) return json({ success: false, code: 'missing_fields' }, 400);
  const supa = getSupabaseAnon();
  if (!supa) return json({ success: false, code: 'auth_unavailable' }, 503);
  const { data, error } = await supa.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return json({ success: false, code: 'invalid_credentials' }, 401);
  }
  setSessionCookie(cookies, {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
  const meta = (data.user?.user_metadata ?? {}) as Record<string, unknown>;
  return json({
    success: true,
    user: {
      id: data.user?.id,
      email: data.user?.email,
      firstName: String(meta.firstName ?? meta.first_name ?? ''),
      lastName: String(meta.lastName ?? meta.last_name ?? ''),
    },
  });
};
