import type { APIRoute } from 'astro';

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
const SITE_URL = import.meta.env.SITE || 'https://peptide-shop.net';

export const GET: APIRoute = async ({ url, redirect, cookies }) => {
  const code = url.searchParams.get('code');
  const stateParam = url.searchParams.get('state');
  
  let returnUrl = '/account/dashboard/';
  let lang = 'en';
  
  if (stateParam) {
    try {
      const state = JSON.parse(stateParam);
      returnUrl = state.returnUrl || returnUrl;
      lang = state.lang || lang;
    } catch (e) {
      // Ignore parse errors
    }
  }

  if (!code) {
    return redirect(`${lang === 'en' ? '' : `/${lang}`}/checkout/?error=auth_failed`);
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return new Response('Google OAuth not configured', { status: 500 });
  }

  try {
    // Exchange code for tokens
    // Must match the redirect_uri used in the initial request
    const redirectUri = `${url.origin}/api/auth/google/callback`;
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', await tokenResponse.text());
      return redirect(`${lang === 'en' ? '' : `/${lang}`}/checkout/?error=token_failed`);
    }

    const tokens = await tokenResponse.json();

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    if (!userResponse.ok) {
      return redirect(`${lang === 'en' ? '' : `/${lang}`}/checkout/?error=userinfo_failed`);
    }

    const googleUser = await userResponse.json();

    // Create user object
    const user = {
      id: `google_${googleUser.id}`,
      email: googleUser.email,
      firstName: googleUser.given_name || googleUser.name?.split(' ')[0] || 'User',
      lastName: googleUser.family_name || googleUser.name?.split(' ').slice(1).join(' ') || '',
      createdAt: new Date().toISOString(),
      provider: 'google',
      avatar: googleUser.picture
    };

    // Store user in cookie (will be picked up by client-side auth store)
    cookies.set('peptide-google-auth', JSON.stringify(user), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false, // Needs to be accessible by client JS
      secure: url.protocol === 'https:',
      sameSite: 'lax'
    });

    // Redirect to the return URL
    const finalUrl = lang === 'en' ? returnUrl : `/${lang}${returnUrl}`;
    return redirect(finalUrl);

  } catch (error) {
    console.error('Google OAuth error:', error);
    return redirect(`${lang === 'en' ? '' : `/${lang}`}/checkout/?error=oauth_error`);
  }
};
