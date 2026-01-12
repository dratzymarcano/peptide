import type { APIRoute } from 'astro';
import { supportedLanguages, pageSlugTranslations } from '../i18n/translations';

const site = 'https://peptide-shop.net';

// Define all static pages
const pages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/shop/', priority: '0.9', changefreq: 'daily' },
  { path: '/about/', priority: '0.8', changefreq: 'monthly' },
  { path: '/quality/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq/', priority: '0.7', changefreq: 'monthly' },
  { path: '/bundles/', priority: '0.8', changefreq: 'weekly' },
  { path: '/wholesale/', priority: '0.7', changefreq: 'monthly' },
  { path: '/shipping/', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms/', priority: '0.5', changefreq: 'yearly' },
  { path: '/privacy/', priority: '0.5', changefreq: 'yearly' },
  { path: '/disclaimer/', priority: '0.5', changefreq: 'yearly' },
  { path: '/coa-policy/', priority: '0.5', changefreq: 'yearly' },
  { path: '/sitemap/', priority: '0.4', changefreq: 'monthly' },
  { path: '/cart/', priority: '0.3', changefreq: 'monthly' },
  { path: '/checkout/', priority: '0.3', changefreq: 'monthly' },
];

// Page key to path mapping for localization
const pageKeyMap: Record<string, string> = {
  '/shop/': 'shop',
  '/about/': 'about',
  '/quality/': 'quality',
  '/contact/': 'contact',
  '/faq/': 'faq',
  '/bundles/': 'bundles',
  '/wholesale/': 'wholesale',
  '/shipping/': 'shipping',
  '/terms/': 'terms',
  '/privacy/': 'privacy',
  '/disclaimer/': 'disclaimer',
  '/coa-policy/': 'coa-policy',
  '/sitemap/': 'sitemap',
  '/cart/': 'cart',
  '/checkout/': 'checkout',
};

// Category pages
const categories = [
  '/peptides/',
  '/peptides/weight-loss/',
  '/peptides/muscle-recovery/',
  '/peptides/growth-hormone/',
  '/peptides/cognitive/',
  '/peptides/tanning/',
  '/peptides/supplies/',
];

function getLocalizedPagePath(path: string, lang: string): string {
  if (lang === 'en') return path;
  
  const pageKey = pageKeyMap[path];
  if (pageKey && pageSlugTranslations[lang as keyof typeof pageSlugTranslations]?.[pageKey]) {
    return `/${lang}/${pageSlugTranslations[lang as keyof typeof pageSlugTranslations][pageKey]}/`;
  }
  
  // For home page
  if (path === '/') return `/${lang}/`;
  
  // Default: just prefix with language
  return `/${lang}${path}`;
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  
  let urls = '';
  
  // Generate URLs for all pages in all languages
  for (const page of pages) {
    // English (default)
    const enUrl = `${site}${page.path}`;
    const alternates = supportedLanguages.map(lang => {
      const localPath = getLocalizedPagePath(page.path, lang);
      return `      <xhtml:link rel="alternate" hreflang="${lang}" href="${site}${localPath}" />`;
    }).join('\n');
    
    urls += `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>\n`;
    
    // Other languages
    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      const localPath = getLocalizedPagePath(page.path, lang);
      const localUrl = `${site}${localPath}`;
      
      urls += `  <url>
    <loc>${localUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${alternates}
  </url>\n`;
    }
  }
  
  // Add category pages
  for (const category of categories) {
    const enUrl = `${site}${category}`;
    urls += `  <url>
    <loc>${enUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    
    // Other languages for categories
    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      urls += `  <url>
    <loc>${site}/${lang}${category}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
