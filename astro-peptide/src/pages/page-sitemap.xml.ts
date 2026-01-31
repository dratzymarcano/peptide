import type { APIRoute } from 'astro';
import { supportedLanguages, getLocalizedPath } from '../i18n/translations';
import { 
  SITE_URL, 
  generateSitemapXml, 
  STATIC_PAGES_CONFIG, 
  CATEGORIES, 
  buildAlternates,
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
    const alternates = buildAlternates(
      supportedLanguages,
      (lang) => `${SITE_URL}${getLocalizedPath(pageConfig.path, lang)}`,
      enUrl
    );

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
      
      const localUrl = `${SITE_URL}${getLocalizedPath(pageConfig.path, lang)}`;
      
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
    const categoryPath = `/peptides/${category}/`;
    const enCatUrl = `${SITE_URL}${categoryPath}`;
    
    const catAlternates = buildAlternates(
      supportedLanguages,
      (lang) => `${SITE_URL}${getLocalizedPath(categoryPath, lang)}`,
      enCatUrl
    );

    sitemapUrls.push({
      loc: enCatUrl,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
      alternates: catAlternates
    });

    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      
      const localCatUrl = `${SITE_URL}${getLocalizedPath(categoryPath, lang)}`;
      
      sitemapUrls.push({
        loc: localCatUrl,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        alternates: catAlternates
      });
    }
  }

  // 3. Learn Articles
  const learnPages = [
    '/learn/what-are-peptides/',
  ];

  for (const learnPath of learnPages) {
    const enLearnUrl = `${SITE_URL}${learnPath}`;
    const learnAlternates = buildAlternates(
      supportedLanguages,
      (lang) => `${SITE_URL}${getLocalizedPath(learnPath, lang)}`,
      enLearnUrl
    );

    sitemapUrls.push({
      loc: enLearnUrl,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.5',
      alternates: learnAlternates
    });

    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      const localLearnUrl = `${SITE_URL}${getLocalizedPath(learnPath, lang)}`;
      sitemapUrls.push({
        loc: localLearnUrl,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.5',
        alternates: learnAlternates
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
