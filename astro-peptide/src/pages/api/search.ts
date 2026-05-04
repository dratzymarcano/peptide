import type { APIRoute } from 'astro';
import { getCanonicalCollection } from '../../lib/collections';
import { getLocalizedBlogPost } from '../../i18n/blogContent';
import { defaultLocale, isLocale, type Locale } from '../../i18n/config';
import { getLocalizedProduct } from '../../i18n/productContent';
import { useTranslations } from '../../i18n/ui';

// Helper to clean slug - removes /peptides/ prefix and leading slashes
const cleanSlug = (slug: string) => slug.replace(/^\/peptides\//, '').replace(/^\//, '');

// Static pages with their searchable content
const staticPages: Array<{ titleKey: string; slug: string; keywords: string[] }> = [
  { titleKey: 'nav.about', slug: '/about/', keywords: ['about', 'company', 'team', 'history', 'mission', 'peptide research', 'who we are'] },
  { titleKey: 'nav.quality', slug: '/quality/', keywords: ['quality', 'purity', 'testing', 'lab', 'hplc', 'mass spectrometry', 'certificate', 'coa'] },
  { titleKey: 'footer.shippingDelivery', slug: '/shipping/', keywords: ['shipping', 'delivery', 'dispatch', 'tracking', 'international', 'europe', 'eu'] },
  { titleKey: 'nav.contact', slug: '/contact/', keywords: ['contact', 'email', 'phone', 'support', 'help', 'enquiry', 'question'] },
  { titleKey: 'footer.faq', slug: '/faq/', keywords: ['faq', 'frequently asked', 'questions', 'help', 'answers', 'common'] },
  { titleKey: 'footer.terms', slug: '/terms/', keywords: ['terms', 'conditions', 'legal', 'agreement', 'policy'] },
  { titleKey: 'footer.privacy', slug: '/privacy/', keywords: ['privacy', 'data', 'gdpr', 'cookies', 'personal information'] },
  { titleKey: 'footer.disclaimer', slug: '/disclaimer/', keywords: ['disclaimer', 'research', 'not for human', 'legal'] },
  { titleKey: 'footer.coaPolicy', slug: '/coa-policy/', keywords: ['coa', 'certificate', 'analysis', 'testing', 'purity'] },
  { titleKey: 'shopSidebar.bundles', slug: '/bundles/', keywords: ['bundle', 'bundles', 'kit', 'combo', 'package', 'discount'] },
  { titleKey: 'nav.shop', slug: '/shop/', keywords: ['shop', 'all', 'peptides', 'products', 'browse', 'catalog'] },
];

function getRequestLocale(url: URL): Locale {
  const lang = url.searchParams.get('lang');
  return isLocale(lang) ? lang : defaultLocale;
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.toLowerCase() || '';
  const locale = getRequestLocale(url);
  const t = useTranslations(locale);
  
  if (query.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Search products
    const products = await getCanonicalCollection('products');
    const productResults = products
      .filter(product => {
        const localizedProduct = getLocalizedProduct(product, locale);
        const title = localizedProduct.title.toLowerCase();
        const shortDesc = localizedProduct.shortDescription.toLowerCase();
        const category = product.data.category?.toLowerCase() || '';
        const cas = product.data.cas?.toLowerCase() || '';
        
        return title.includes(query) || 
               shortDesc.includes(query) || 
               category.includes(query) ||
               cas.includes(query);
      })
      .slice(0, 6)
      .map(product => {
        const localizedProduct = getLocalizedProduct(product, locale);
        const area = product.data.researchArea;
        return {
          id: `product-${product.data.id}`,
          title: localizedProduct.title,
          slug: `/peptides/${cleanSlug(product.slug)}`,
          category: area ? t(`taxonomy.researchAreas.${area}.name`) : t('searchPage.products'),
          type: 'product' as const
        };
      });

    // Search blog posts
    const posts = await getCanonicalCollection('blog');
    const blogResults = posts
      .filter(post => {
        const localizedPost = getLocalizedBlogPost(post.slug, locale, post.data);
        const title = localizedPost.title.toLowerCase();
        const description = localizedPost.description.toLowerCase();
        const category = localizedPost.category.toLowerCase();
        const tags = localizedPost.tags.map((tag) => tag.toLowerCase()).join(' ');
        
        return title.includes(query) || 
               description.includes(query) || 
               category.includes(query) ||
               tags.includes(query);
      })
      .slice(0, 3)
      .map(post => {
        const localizedPost = getLocalizedBlogPost(post.slug, locale, post.data);
        return {
          id: `blog-${post.slug}`,
          title: localizedPost.title,
          slug: `/blog/${post.slug}/`,
          category: localizedPost.category || t('searchPage.researchNotes'),
          type: 'blog' as const
        };
      });

    // Search static pages
    const pageResults = staticPages
      .filter(page => {
        const titleMatch = t(page.titleKey).toLowerCase().includes(query);
        const keywordMatch = page.keywords.some(kw => kw.includes(query));
        return titleMatch || keywordMatch;
      })
      .slice(0, 3)
      .map(page => ({
        id: `page-${page.slug}`,
        title: t(page.titleKey),
        slug: page.slug,
        category: t('searchPage.pages'),
        type: 'page' as const
      }));

    // Combine and prioritize results: products first, then blog, then pages
    const results = [...productResults, ...blogResults, ...pageResults].slice(0, 10);

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ results: [], code: 'search_failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
