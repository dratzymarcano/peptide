import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { supportedLanguages, pageSlugTranslations } from '../i18n/translations';
import { 
  SITE_URL, 
  generateSitemapXml, 
  generateUrlEntry, 
  type SitemapURL 
} from '../utils/sitemap';

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls: SitemapURL[] = [];
  
  // Get all blog posts
  const blogPosts = await getCollection('blog');
  
  // 1. Blog Index Page
  const blogAlternates = supportedLanguages.map(lang => {
    if (lang === 'en') {
      return { lang, href: `${SITE_URL}/blog/` };
    }
    const blogSlug = pageSlugTranslations[lang]?.['blog'] || 'blog';
    return { lang, href: `${SITE_URL}/${lang}/${blogSlug}/` };
  });

  // English Blog Index
  sitemapUrls.push({
    loc: `${SITE_URL}/blog/`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.8',
    alternates: blogAlternates
  });

  // Localized Blog Indices
  for (const lang of supportedLanguages) {
    if (lang === 'en') continue;
    const blogSlug = pageSlugTranslations[lang]?.['blog'] || 'blog';
    sitemapUrls.push({
      loc: `${SITE_URL}/${lang}/${blogSlug}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '0.8',
      alternates: blogAlternates
    });
  }
  
  // 2. Individual Blog Posts
  for (const post of blogPosts) {
    const postDate = post.data.publishDate 
      ? new Date(post.data.publishDate).toISOString().split('T')[0]
      : today;
    
    // Generate alternates for this post
    const postAlternates = supportedLanguages.map(lang => {
      if (lang === 'en') {
        return { lang, href: `${SITE_URL}/blog/${post.slug}/` };
      }
      const blogSlug = pageSlugTranslations[lang]?.['blog'] || 'blog';
      return { lang, href: `${SITE_URL}/${lang}/${blogSlug}/${post.slug}/` };
    });

    // English Post
    sitemapUrls.push({
      loc: `${SITE_URL}/blog/${post.slug}/`,
      lastmod: postDate,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: postAlternates
    });

    // Localized Posts
    for (const lang of supportedLanguages) {
      if (lang === 'en') continue;
      const blogSlug = pageSlugTranslations[lang]?.['blog'] || 'blog';
      sitemapUrls.push({
        loc: `${SITE_URL}/${lang}/${blogSlug}/${post.slug}/`,
        lastmod: postDate,
        changefreq: 'monthly',
        priority: '0.7',
        alternates: postAlternates
      });
    }
  }
  
  // 3. Blog Categories
  const categories = ['research-insights', 'lab-techniques', 'quality-control'];
  for (const category of categories) {
    // Note: Assuming blog categories are handled similarly to blog posts or static pages.
    // However, I don't see dynamic route for blog categories in [lang] folder in the file list I gathered earlier.
    // I only saw `src/pages/blog/category/` for English.
    // Let's assume there are NO localized blog categories unless proven otherwise.
    // If I add them without routes existing, they are broken links.
    // I see `src/pages/blog/category/` but no `src/pages/[lang]/blog/category/` or similar.
    // The previous sitemap had them hardcoded for English.
    // I will include English ones only for now, or check if they route via [blogSlug]?
    // `pageSlugTranslations` has 'blog' but not 'category'.
    // `src/pages/[lang]/[blogSlug]/[postSlug].astro` matches 2 params.
    // `src/pages/[lang]/[blogSlug]/index.astro` matches 1 param.
    // Maybe categories are query params or not localized?
    // I'll stick to English categories to be safe, or include simple pattern if I'm sure.
    // Actually, safest is to leave English categories in.
    
     sitemapUrls.push({
      loc: `${SITE_URL}/blog/category/${category}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.6'
      // No alternates if no localized pages exist
    });
  }

  return new Response(generateSitemapXml(sitemapUrls), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
