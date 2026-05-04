import { defineMiddleware } from 'astro:middleware';
import { getLocaleFromPathname, stripLocaleFromPathname, defaultLocale } from './i18n/config';

// Content Security Policy. Tightened where possible while keeping inline JSON-LD,
// inline critical CSS in <style is:inline>, and Astro's hydration runtime working.
//
// 'unsafe-inline' is required for Astro's inline <script> hydration islands and
// for the inline JSON-LD blocks emitted by <JsonLd />. Once a strict-dynamic /
// nonce strategy is in place this can be tightened further.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.resend.com",
  "frame-src 'self' https://btcpay.peptide-shop.net",
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

// BCP 47 language tags emitted as Content-Language to reinforce hreflang signals.
// Region-less for English (global default); region-qualified for the localized markets.
const contentLanguageMap: Record<string, string> = {
  en: 'en',
  de: 'de-DE',
  nl: 'nl-NL',
  fr: 'fr-FR',
  it: 'it-IT',
  es: 'es-ES',
};

function applyLocaleHeaders(response: Response, locale: string): Response {
  const tag = contentLanguageMap[locale] ?? locale;
  if (!response.headers.has('Content-Language')) {
    response.headers.set('Content-Language', tag);
  }
  // Vary on Accept-Language so any future language-aware caching is correct.
  const existingVary = response.headers.get('Vary');
  if (!existingVary) {
    response.headers.set('Vary', 'Accept-Language');
  } else if (!/\baccept-language\b/i.test(existingVary)) {
    response.headers.set('Vary', `${existingVary}, Accept-Language`);
  }
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  // After a rewrite (second middleware pass), the original locale is preserved
  // through Astro.locals so pages can render the correct translation even though
  // context.url.pathname has been stripped of the locale prefix.
  if (context.locals.locale) {
    const response = await next();
    return applyLocaleHeaders(applySecurityHeaders(response), context.locals.locale);
  }

  const locale = getLocaleFromPathname(context.url.pathname);
  context.locals.locale = locale;

  if (locale === defaultLocale) {
    const response = await next();
    return applyLocaleHeaders(applySecurityHeaders(response), locale);
  }

  const rewrittenPath = stripLocaleFromPathname(context.url.pathname);
  const target = rewrittenPath + (context.url.search || '');

  const response = await context.rewrite(target);
  return applyLocaleHeaders(applySecurityHeaders(response), locale);
});