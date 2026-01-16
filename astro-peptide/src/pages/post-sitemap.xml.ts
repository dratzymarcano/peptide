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

  const slugify = (s: string) => s.toLowerCase().trim().replace(/\s+/g, '-');
  
  // Get all blog posts
  const blogPosts = await getCollection('blog');
  
  // 1. Blog Index Page
  const blogAlternates = buildAlternates(
    supportedLanguages,
    (lang) => `${SITE_URL}${getLocalizedPath('/blog/', lang)}`,
    `${SITE_URL}/blog/`
  );

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
    sitemapUrls.push({
      loc: `${SITE_URL}${getLocalizedPath('/blog/', lang)}`,
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
    const postPath = `/blog/${post.slug}/`;
    const postAlternates = buildAlternates(
      supportedLanguages,
      (lang) => `${SITE_URL}${getLocalizedPath(postPath, lang)}`,
      `${SITE_URL}${postPath}`
    );

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
      sitemapUrls.push({
        loc: `${SITE_URL}${getLocalizedPath(postPath, lang)}`,
        lastmod: postDate,
        changefreq: 'monthly',
        priority: '0.7',
        alternates: postAlternates
      });
    }
  }
  
  // 3. Blog Categories
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.data.category).filter(Boolean) as string[])
  );
  for (const category of categories) {
    const categorySlug = slugify(category);
    const latestInCategory = blogPosts
      .filter((post) => slugify(post.data.category || '') === categorySlug)
      .sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime())[0];
    const categoryLastmod = latestInCategory?.data.publishDate
      ? new Date(latestInCategory.data.publishDate).toISOString().split('T')[0]
      : today;

    sitemapUrls.push({
      loc: `${SITE_URL}/blog/category/${categorySlug}/`,
      lastmod: categoryLastmod,
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
