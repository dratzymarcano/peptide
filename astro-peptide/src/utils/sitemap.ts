import type { SupportedLanguage } from '../i18n/translations';
import { getMarket } from '../i18n/market';

export const SITE_URL = 'https://peptide-shop.net';

export interface SitemapAlternate {
  lang: SupportedLanguage | 'x-default' | string;
  href: string;
  hreflang?: string;
}

export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number | string;
  alternates?: SitemapAlternate[];
}

/**
 * Generates an XML string for a single URL entry with alternates
 */
export function generateUrlEntry(url: SitemapURL): string {
  const alternates = url.alternates
    ? url.alternates
        .map(alt => {
          const hreflang = alt.hreflang ?? (alt.lang === 'x-default' ? 'x-default' : alt.lang);
          return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${alt.href}" />`;
        })
        .join('\n')
    : '';

  return `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
${alternates}
  </url>`;
}

/**
 * Generates the complete XML sitemap content
 */
export function generateSitemapXml(urls: SitemapURL[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(generateUrlEntry).join('\n')}
</urlset>`.trim();
}

export function buildAlternates(
  languages: SupportedLanguage[],
  hrefForLang: (lang: SupportedLanguage) => string,
  xDefaultHref?: string
): SitemapAlternate[] {
  const alternates: SitemapAlternate[] = languages.map(lang => ({
    lang,
    hreflang: getMarket(lang).hreflang,
    href: hrefForLang(lang)
  }));

  const defaultHref = xDefaultHref ?? hrefForLang('en');
  if (defaultHref) {
    alternates.unshift({ lang: 'x-default', hreflang: 'x-default', href: defaultHref });
  }

  return alternates;
}

/**
 * Constants for common pages config
 */
export const STATIC_PAGES_CONFIG = [
  { key: 'home', path: '/', priority: '1.0', changefreq: 'daily' },
  { key: 'shop', path: '/shop/', priority: '0.9', changefreq: 'daily' },
  { key: 'peptides', path: '/peptides/', priority: '0.9', changefreq: 'daily' },
  { key: 'learn', path: '/learn/', priority: '0.6', changefreq: 'monthly' },
  { key: 'about', path: '/about/', priority: '0.8', changefreq: 'monthly' },
  { key: 'quality', path: '/quality/', priority: '0.8', changefreq: 'monthly' },
  { key: 'contact', path: '/contact/', priority: '0.7', changefreq: 'monthly' },
  { key: 'faq', path: '/faq/', priority: '0.7', changefreq: 'monthly' },
  { key: 'bundles', path: '/bundles/', priority: '0.8', changefreq: 'weekly' },
  { key: 'wholesale', path: '/wholesale/', priority: '0.7', changefreq: 'monthly' },
  { key: 'shipping', path: '/shipping/', priority: '0.6', changefreq: 'monthly' },
  { key: 'terms', path: '/terms/', priority: '0.5', changefreq: 'yearly' },
  { key: 'privacy', path: '/privacy/', priority: '0.5', changefreq: 'yearly' },
  { key: 'disclaimer', path: '/disclaimer/', priority: '0.5', changefreq: 'yearly' },
  { key: 'coa-policy', path: '/coa-policy/', priority: '0.5', changefreq: 'yearly' },
  { key: 'sitemap', path: '/sitemap/', priority: '0.4', changefreq: 'monthly' },
] as const;

export const CATEGORIES = [
  'weight-loss',
  'muscle-recovery',
  'growth-hormone',
  'cognitive',
  'tanning',
  'supplies',
];

/**
 * Helpers for localized paths
 */
    // I need to check how categories are handled in routing.
