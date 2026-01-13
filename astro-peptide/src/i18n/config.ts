// i18n Configuration
// Site: peptide-shop.net (EN default), /fr, /de, /nl, /es, /it

import { productSlugTranslations } from './translations';

export type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'it';

export const defaultLang: SupportedLanguage = 'en';

export const languages: Record<SupportedLanguage, { name: string; flag: string; locale: string; region: string; hreflang: string }> = {
  en: { name: 'English', flag: '🇬🇧', locale: 'en-GB', region: 'United Kingdom', hreflang: 'en' },
  nl: { name: 'Nederlands', flag: '🇳🇱', locale: 'nl-NL', region: 'Nederland', hreflang: 'nl' },
  de: { name: 'Deutsch', flag: '🇩🇪', locale: 'de-DE', region: 'Deutschland', hreflang: 'de' },
  fr: { name: 'Français', flag: '🇫🇷', locale: 'fr-FR', region: 'France', hreflang: 'fr' },
  es: { name: 'Español', flag: '🇪🇸', locale: 'es-ES', region: 'España', hreflang: 'es' },
  it: { name: 'Italiano', flag: '🇮🇹', locale: 'it-IT', region: 'Italia', hreflang: 'it' },
};

export const supportedLanguages = Object.keys(languages) as SupportedLanguage[];

// Get language from URL path
export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && supportedLanguages.includes(lang as SupportedLanguage)) {
    return lang as SupportedLanguage;
  }
  return defaultLang;
}

// Build localized path
export function getLocalizedPath(path: string, lang: SupportedLanguage): string {
  // Strip any existing language prefix.
  // Keep query/hash intact for client-side switching.
  const withoutLocale = path.replace(/^\/(en|nl|de|fr|es|it)(\/|$)/, '/');

  // Separate pathname from query/hash so slug/category logic never sees "?" or "#".
  const match = withoutLocale.match(/^([^?#]*)(.*)$/);
  const pathname = (match?.[1] ?? withoutLocale) || '/';
  const suffix = match?.[2] ?? '';

  // Canonicalize product slugs: if a localized slug is passed in (e.g. from language switcher
  // on a localized product page), map it back to the English slug key so we can safely map to
  // the requested target language.
  const getCanonicalProductSlug = (slug: string): string => {
    const clean = slug.replace(/^\/peptides\//, '').replace(/^\//, '').replace(/\/$/, '');

    // If it's already an English slug key, return as-is.
    for (const l of supportedLanguages) {
      const table = (productSlugTranslations as Record<string, Record<string, string>>)[l];
      if (table && Object.prototype.hasOwnProperty.call(table, clean)) {
        return clean;
      }
    }

    // Otherwise, try reverse lookup from any localized slug value.
    for (const l of supportedLanguages) {
      const table = (productSlugTranslations as Record<string, Record<string, string>>)[l];
      if (!table) continue;
      for (const [englishSlug, localizedSlug] of Object.entries(table)) {
        if (localizedSlug === clean) return englishSlug;
      }
    }

    return clean;
  };

  let resolvedPathname = pathname;
  if (pathname.startsWith('/peptides/')) {
    const rawSlug = pathname.replace('/peptides/', '').replace(/\/$/, '');
    const canonicalSlug = getCanonicalProductSlug(rawSlug);
    const table = (productSlugTranslations as Record<string, Record<string, string>>)[lang];
    if (lang !== defaultLang && table && table[canonicalSlug]) {
      resolvedPathname = `/peptides/${table[canonicalSlug]}`;
    } else {
      resolvedPathname = `/peptides/${canonicalSlug}`;
    }
  }

  if (lang === defaultLang) {
    return `${resolvedPathname || '/'}${suffix}`;
  }

  // Only prefix locale for routes that actually exist under `src/pages/[lang]/...`.
  // This prevents broken links like `/de/blog/` when the blog isn't localized.
  const localizedRoots: Array<string> = [
    '/',
    '/about',
    '/contact',
    '/faq',
    '/shop',
    '/cart',
    '/checkout',
    '/peptides'
  ];
  const isLocalizedRoute =
    resolvedPathname === '/' ||
    localizedRoots.some((root) =>
      root === '/'
        ? false
        : resolvedPathname === root || resolvedPathname.startsWith(`${root}/`)
    );
  if (!isLocalizedRoute) {
    return `${resolvedPathname || '/'}${suffix}`;
  }

  const normalizedPath = resolvedPathname.startsWith('/') ? resolvedPathname : `/${resolvedPathname}`;
  return `/${lang}${normalizedPath === '/' ? '' : normalizedPath}${suffix}`;
}

// Build alternate URLs for hreflang
export function getAlternateUrls(path: string, siteUrl: string): Record<SupportedLanguage, string> {
  const result: Partial<Record<SupportedLanguage, string>> = {};
  
  for (const lang of supportedLanguages) {
    const localizedPath = getLocalizedPath(path, lang);
    result[lang] = `${siteUrl}${localizedPath}`;
  }
  
  return result as Record<SupportedLanguage, string>;
}
