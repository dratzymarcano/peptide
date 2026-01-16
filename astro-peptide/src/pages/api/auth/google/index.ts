import type { APIRoute } from 'astro';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
const SITE_URL = import.meta.env.SITE || 'https://peptide-shop.net';

export const GET: APIRoute = async ({ redirect, url }) => {
  if (!GOOGLE_CLIENT_ID) {
    return new Response('Google OAuth not configured', { status: 500 });
  }

  // Get the return URL from query params (for language-aware redirects)
  const returnUrl = url.searchParams.get('returnUrl') || '/account/dashboard/';
  const lang = url.searchParams.get('lang') || 'en';

  // Build Google OAuth URL
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${SITE_URL}/api/auth/google/callback`);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', JSON.stringify({ returnUrl, lang }));
  authUrl.searchParams.set('prompt', 'select_account');

  return redirect(authUrl.toString());
};
