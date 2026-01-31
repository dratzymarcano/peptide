import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { supportedLanguages, getLocalizedPath } from '../i18n/translations';
import { 
  SITE_URL, 
  generateSitemapXml, 
  buildAlternates,
  type SitemapURL 
} from '../utils/sitemap';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls: SitemapURL[] = [];

  const normalizePath = (path: string) => {
    const withSlash = path.startsWith('/') ? path : `/${path}`;
    return withSlash.endsWith('/') ? withSlash : `${withSlash}/`;
  };
  
  // Get all English products (base products)
  const allProducts = await getCollection('products');
  const englishProducts = allProducts.filter(p => p.slug.startsWith('en/'));
  
  for (const product of englishProducts) {
    const baseSlug = product.slug.replace('en/', '');
    const englishPath = normalizePath(`/peptides/${baseSlug}/`);
    
    const alternates = buildAlternates(
      supportedLanguages,
      (lang) => `${SITE_URL}${getLocalizedPath(englishPath, lang)}`,
      `${SITE_URL}${englishPath}`
    );
    
    // English URL
    const enUrl = `${SITE_URL}${englishPath}`;
    sitemapUrls.push({
      loc: enUrl,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
      alternates
    });
    
    // Other language URLs
    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      
      const localUrl = `${SITE_URL}${getLocalizedPath(englishPath, lang)}`;
      
      sitemapUrls.push({
        loc: localUrl,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.9',
        alternates
      });
    }
  }

  return new Response(generateSitemapXml(sitemapUrls), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
