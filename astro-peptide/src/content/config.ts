import { defineCollection, z } from 'astro:content';

// FAQ schema for product pages
const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// Review schema for product pages
const reviewSchema = z.object({
  author: z.string(),
  rating: z.number().min(1).max(5),
  date: z.string(),
  title: z.string(),
  content: z.string(),
  verified: z.boolean().default(true),
});

const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    primary_keyword: z.string(),
    search_volume: z.union([z.number(), z.string()]),
    urlPath: z.string().optional(), // URL path for the product page (renamed from 'slug' to avoid Astro collision)
    lang: z.enum(['en', 'nl', 'de', 'fr', 'es', 'it']).optional(), // Language identifier
    aliases: z.array(z.string()).optional(),
    cas: z.string().nullable(),
    molecular_weight: z.string().nullable(),
    purity: z.string(),
    storage: z.string(),
    package_sizes: z.array(z.string()),
    moq: z.number(),
    price: z.number().optional(),
    price_range: z.string(),
    coa_url: z.string().optional(),
    short_description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    faqs: z.array(faqSchema).optional(),
    reviews: z.array(reviewSchema).optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string().default('Peptide Shop Team'),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

const siteCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'nl', 'de', 'fr', 'es', 'it']),
    phone: z.string(),
    email: z.string(),
    telegram: z.string(),
    seo: z.object({
      homeName: z.string(),
      homeDescription: z.string(),
      organizationDescription: z.string(),
    }),
  }),
});

const pageCopyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    lang: z.enum(['en', 'nl', 'de', 'fr', 'es', 'it']),
    page: z.string(),
    copy: z.record(z.any()),
  }),
});

export const collections = {
  'products': productsCollection,
  'blog': blogCollection,
  'site': siteCollection,
  'pageCopy': pageCopyCollection,
};
