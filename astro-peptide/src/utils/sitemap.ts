import { supportedLanguages, type SupportedLanguage, pageSlugTranslations, getLocalizedProductSlug } from '../i18n/translations';

export const SITE_URL = 'https://peptide-shop.net';

export interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number | string;
  alternates?: { lang: string; href: string }[];
}

/**
 * Generates an XML string for a single URL entry with alternates
 */
export function generateUrlEntry(url: SitemapURL): string {
  const alternates = url.alternates
    ? url.alternates
        .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />`)
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
</urlset>`;
}

/**
 * Constants for common pages config
 */
export const STATIC_PAGES_CONFIG = [
  { key: 'home', path: '/', priority: '1.0', changefreq: 'daily' },
  { key: 'shop', path: '/shop/', priority: '0.9', changefreq: 'daily' },
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
  // Cart and checkout are technically pages but often excluded from search results or set to noindex. 
  // However if the user had them in the sitemap before, we can keep them but maybe with lower priority.
  // Generally checkout/cart should be noindex. Leaving them out might be safer for SEO unless requested otherwise.
  // The previous file included them:
  { key: 'cart', path: '/cart/', priority: '0.3', changefreq: 'monthly' },
  { key: 'checkout', path: '/checkout/', priority: '0.3', changefreq: 'monthly' },
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
export function getLocalizedPath(key: string, lang: SupportedLanguage): string {
    if (lang === 'en') {
        // Special mapping for keys to English paths if they differ from pure key
        // But for most, it's just the key.
        // The config above uses slashes, e.g. /about/.
        // If key is 'about', English is /about/.
        // If key is 'home', English is /.
        if (key === 'home') return '/';
        
        // Check if manual mapping needed, otherwise default to /key/
        const match = STATIC_PAGES_CONFIG.find(p => p.key === key);
        if (match) return match.path;
        
        return `/${key}/`;
    }

    const translatedSlug = pageSlugTranslations[lang]?.[key] || key;
    if (key === 'home') return `/${lang}/`;
    return `/${lang}/${translatedSlug}/`;
}

export function getLocalizedCategoryPath(category: string, lang: SupportedLanguage): string {
    if (lang === 'en') return `/peptides/${category}/`;
    // Categories don't seem to be translated in the same map?
    // Looking at navigation translations: 'weightLoss', 'muscleRecovery' etc are translated in 'nav'.
    // But `src/pages/[lang]/peptides/[category].astro` might use English slugs or translated ones?
    // I need to check how categories are handled in routing.
    // For now assuming: /lang/peptides/category-slug/
    return `/${lang}/peptides/${category}/`;
}
