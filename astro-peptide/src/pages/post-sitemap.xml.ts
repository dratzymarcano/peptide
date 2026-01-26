import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { supportedLanguages, getLocalizedPath } from '../i18n/translations';
import { 
  SITE_URL, 
  generateSitemapXml, 
  buildAlternates,
  type SitemapURL,
  type SitemapAlternate
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
  // Helper function to strip language prefix from blog slugs
  const stripLangPrefix = (slug: string): string => {
    return slug
      .replace(/^(en|nl|de|fr|es|it|ru)\//, '')
      .replace(/^(nl|de|fr|es|it|ru)-/, '');
  };

  // Group posts by their base slug to find translations
  const postsByBaseSlug = new Map<string, typeof blogPosts>();
  for (const post of blogPosts) {
    const postLang = post.data.lang || 'en';
    const baseSlug = stripLangPrefix(post.slug);
    if (!postsByBaseSlug.has(baseSlug)) {
      postsByBaseSlug.set(baseSlug, []);
    }
    postsByBaseSlug.get(baseSlug)!.push(post);
  }

  for (const [baseSlug, posts] of postsByBaseSlug) {
    const postDate = posts[0].data.publishDate 
      ? new Date(posts[0].data.publishDate).toISOString().split('T')[0]
      : today;
    
    // Build alternates only for languages where the post exists
    const availableLangs = posts.map(p => p.data.lang || 'en');
    const postAlternates: SitemapAlternate[] = availableLangs.map(lang => {
      const langPath = lang === 'en' ? `/blog/${baseSlug}/` : `/${lang}/blog/${baseSlug}/`;
      return {
        lang: lang,
        hreflang: lang === 'en' ? 'en-GB' : lang,
        href: `${SITE_URL}${langPath}`
      };
    });

    // Add x-default pointing to English
    if (availableLangs.includes('en')) {
      postAlternates.push({
        lang: 'x-default',
        hreflang: 'x-default',
        href: `${SITE_URL}/blog/${baseSlug}/`
      });
    }

    // Generate sitemap entries only for existing posts
    for (const post of posts) {
      const postLang = post.data.lang || 'en';
      const url = postLang === 'en' 
        ? `${SITE_URL}/blog/${baseSlug}/` 
        : `${SITE_URL}/${postLang}/blog/${baseSlug}/`;
      
      sitemapUrls.push({
        loc: url,
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
