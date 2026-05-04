export const locales = ['en', 'de', 'nl', 'fr', 'it', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, { name: string; flag: string; dir: 'ltr'; og: string; hreflang: string }> = {
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr', og: 'en_GB', hreflang: 'en' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr', og: 'de_DE', hreflang: 'de' },
  nl: { name: 'Nederlands', flag: '🇳🇱', dir: 'ltr', og: 'nl_NL', hreflang: 'nl' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr', og: 'fr_FR', hreflang: 'fr' },
  it: { name: 'Italiano', flag: '🇮🇹', dir: 'ltr', og: 'it_IT', hreflang: 'it' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr', og: 'es_ES', hreflang: 'es' },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  const stripped = `/${segments.join('/')}`;
  return stripped === '/' ? '/' : `${stripped.replace(/\/$/, '')}/`;
}

export function localizePath(pathname: string, locale: Locale): string {
  const basePath = stripLocaleFromPathname(pathname);
  if (locale === defaultLocale) return basePath;
  return basePath === '/' ? `/${locale}/` : `/${locale}${basePath}`;
}
