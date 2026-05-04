import type { APIRoute } from 'astro';
import { getSupabaseAnon, isSupabaseConfigured } from '../../../lib/supabase/server';
import { setSessionCookie } from '../../../lib/auth/session';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!isSupabaseConfigured()) {
    return json({ success: false, code: 'auth_not_configured' }, 503);
  }
  let body: { email?: string; password?: string; firstName?: string; lastName?: string };
  try {
    body = await request.json();
  } catch {
    return json({ success: false, code: 'invalid_json' }, 400);
  }
  const { email, password, firstName, lastName } = body;
  if (!email || !password || !firstName || !lastName) {
    return json({ success: false, code: 'missing_fields' }, 400);
  }
  const supa = getSupabaseAnon();
  if (!supa) return json({ success: false, code: 'auth_unavailable' }, 503);
  const { data, error } = await supa.auth.signUp({
    email,
    password,
    options: { data: { firstName, lastName, provider: 'email' } },
  });
  if (error) {
    const code = /already.*registered/i.test(error.message) ? 'account_exists' : 'signup_failed';
    return json({ success: false, code, message: error.message }, 400);
  }
  if (data.session) {
    setSessionCookie(cookies, {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  }
  return json({
    success: true,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          firstName,
          lastName,
        }
      : null,
    requiresEmailConfirmation: !data.session,
  });
};
