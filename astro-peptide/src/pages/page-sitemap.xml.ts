import type { APIRoute } from 'astro';
import { supportedLanguages } from '../i18n/translations';
import { 
  SITE_URL, 
  generateSitemapXml, 
  generateUrlEntry, 
  STATIC_PAGES_CONFIG, 
  CATEGORIES, 
  getLocalizedPath, 
  getLocalizedCategoryPath,
  type SitemapURL 
} from '../utils/sitemap';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls: SitemapURL[] = [];

  // 1. Static Pages
  for (const pageConfig of STATIC_PAGES_CONFIG) {
    // English URL config
    const enUrl = `${SITE_URL}${pageConfig.path}`;
    
    // Generate alternates
    const alternates = supportedLanguages.map(lang => {
      const href = `${SITE_URL}${getLocalizedPath(pageConfig.key, lang)}`;
      return { lang, href };
    });

    // Add English entry with alternates
    sitemapUrls.push({
      loc: enUrl,
      lastmod: today,
      changefreq: pageConfig.changefreq as any,
      priority: pageConfig.priority,
      alternates
    });

    // Add entries for other languages
    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      
      const localUrl = `${SITE_URL}${getLocalizedPath(pageConfig.key, lang)}`;
      
      sitemapUrls.push({
        loc: localUrl,
        lastmod: today,
        changefreq: pageConfig.changefreq as any,
        priority: pageConfig.priority,
        alternates
      });
    }
  }

  // 2. Category Pages
  for (const category of CATEGORIES) {
    // English Category URL
    const enCatUrl = `${SITE_URL}/peptides/${category}/`;
    
    const catAlternates = supportedLanguages.map(lang => {
       const href = `${SITE_URL}${getLocalizedCategoryPath(category, lang)}`;
       return { lang, href };
    });

    sitemapUrls.push({
      loc: enCatUrl,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
      alternates: catAlternates
    });

    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      
      const localCatUrl = `${SITE_URL}${getLocalizedCategoryPath(category, lang)}`;
      
      sitemapUrls.push({
        loc: localCatUrl,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        alternates: catAlternates
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
