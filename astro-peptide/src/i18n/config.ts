export const locales = ['de'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';
export const sourceLocale: Locale = 'de';

export const localeMeta: Record<string, { name: string; flag: string; dir: 'ltr'; og: string; hreflang: string }> = {
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr', og: 'de_DE', hreflang: 'de' },
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr', og: 'en_GB', hreflang: 'en' },
  nl: { name: 'Nederlands', flag: '🇳🇱', dir: 'ltr', og: 'nl_NL', hreflang: 'nl' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr', og: 'fr_FR', hreflang: 'fr' },
  it: { name: 'Italiano', flag: '🇮🇹', dir: 'ltr', og: 'it_IT', hreflang: 'it' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr', og: 'es_ES', hreflang: 'es' },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'de';
}

export function getLocaleFromPathname(_pathname: string): Locale {
  return 'de';
}

const knownPrefixes = ['de', 'nl', 'fr', 'it', 'es', 'en'];

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (knownPrefixes.includes(segments[0])) segments.shift();
  const stripped = `/${segments.join('/')}`;
  return stripped === '/' ? '/' : `${stripped.replace(/\/$/, '')}/`;
}

export function localizePath(pathname: string, _locale?: string): string {
  return stripLocaleFromPathname(pathname);
}
