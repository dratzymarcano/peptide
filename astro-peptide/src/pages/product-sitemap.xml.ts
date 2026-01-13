import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { supportedLanguages, getLocalizedProductSlug } from '../i18n/translations';
import { 
  SITE_URL, 
  generateSitemapXml, 
  generateUrlEntry, 
  type SitemapURL 
} from '../utils/sitemap';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls: SitemapURL[] = [];
  
  // Get all English products (base products)
  const allProducts = await getCollection('products');
  const englishProducts = allProducts.filter(p => p.slug.startsWith('en/'));
  
  for (const product of englishProducts) {
    const baseSlug = product.slug.replace('en/', '');
    const buySlug = `buy-${baseSlug}`;
    
    // Generate alternates
    const alternates = supportedLanguages.map(lang => {
      let href = '';
      if (lang === 'en') {
        href = `${SITE_URL}/peptides/${buySlug}/`;
      } else {
        const localizedSlug = getLocalizedProductSlug(buySlug, lang);
        href = `${SITE_URL}/${lang}/peptides/${localizedSlug}/`;
      }
      return { lang, href };
    });
    
    // English URL
    const enUrl = `${SITE_URL}/peptides/${buySlug}/`;
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
      
      const localizedSlug = getLocalizedProductSlug(buySlug, lang);
      const localUrl = `${SITE_URL}/${lang}/peptides/${localizedSlug}/`;
      
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
