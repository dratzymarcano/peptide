import { defineMiddleware } from 'astro:middleware';
import { stripLocaleFromPathname } from './i18n/config';

// Content Security Policy. Tightened where possible while keeping inline JSON-LD,
// inline critical CSS in <style is:inline>, and Astro's hydration runtime working.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.zohopublic.com https://*.zoho.com https://*.zohocdn.com https://*.zohostatic.com",
  "style-src 'self' 'unsafe-inline' https://*.zohopublic.com https://*.zoho.com https://*.zohocdn.com https://*.zohostatic.com",
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://salesiq.zohopublic.com https://*.zohopublic.com https://*.zoho.com https://*.zoho.eu https://*.zohocdn.com https://*.zohostatic.com",
  "connect-src 'self' https://api.resend.com https://cloudflareinsights.com https://static.cloudflareinsights.com https://*.zohopublic.com https://*.zoho.com https://*.zoho.eu wss://*.zohopublic.com wss://*.zoho.com wss://*.zoho.eu",
  "frame-src 'self' https://*.zohopublic.com https://*.zoho.com https://*.zoho.eu blob:",
  "media-src 'self' https://*.zohopublic.com https://*.zoho.com https://*.zohocdn.com blob: data:",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join('; ');

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(self)',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

function applySecurityHeaders(response: Response): Response {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  }
  return response;
}

function applyLocaleHeaders(response: Response): Response {
  if (!response.headers.has('Content-Language')) {
    response.headers.set('Content-Language', 'de-DE');
  }
  return response;
}

const legacyPrefixes = ['de', 'nl', 'fr', 'it', 'es', 'en'];

function legacyLocaleRedirect(url: URL): Response | null {
  const { pathname } = url;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && legacyPrefixes.includes(segments[0])) {
    const stripped = stripLocaleFromPathname(pathname);
    const target = stripped + (url.search || '');
    return new Response(null, {
      status: 301,
      headers: {
        Location: target,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  return null;
}

function legacyProductBuyRedirect(url: URL): Response | null {
  const match = url.pathname.match(/^\/peptides\/buy-([a-z0-9-]+)\/?$/);
  if (match) {
    const slug = match[1];
    return new Response(null, {
      status: 301,
      headers: {
        Location: `/peptides/${slug}/`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  return null;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const buyRedirect = legacyProductBuyRedirect(context.url);
  if (buyRedirect) return applySecurityHeaders(buyRedirect);

  const redirect = legacyLocaleRedirect(context.url);
  if (redirect) return applySecurityHeaders(redirect);

  context.locals.locale = 'de';

  const response = await next();
  return applyLocaleHeaders(applySecurityHeaders(response));
});