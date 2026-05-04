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
    aliases: z.array(z.string()).optional(),
    cas: z.string().nullable(),
    molecular_weight: z.string().nullable(),
    purity: z.string(),
    storage: z.string(),
    package_sizes: z.array(z.string()),
    moq: z.number(),
    price: z.number().optional(),
    price_range: z.string(),
    short_description: z.string(),
    category: z.string(),
    // Commerce metadata (all optional — safe defaults applied at runtime)
    availability: z.enum(['in_stock', 'low_stock', 'out_of_stock', 'preorder']).optional(),
    stock_qty: z.number().int().nonnegative().optional(),
    compare_at_price: z.number().positive().optional(), // crossed-out reference price
    promo: z.object({
      label: z.string(),                                  // e.g. "Spring −15%"
      discount_pct: z.number().min(0).max(95).optional(), // optional auto-discount
      expires: z.string().optional(),                     // ISO date
    }).optional(),
    // NEW — IA mapping (Phase 2A). Optional during migration.
    researchArea: z.enum([
      'neuroscience',
      'cardiovascular',
      'diabetes',
      'cancer-apoptosis',
      'adhesion-ecm',
      'cell-tissue',
      'immunology',
      'epigenetics',
      'hormones',
      'cell-signaling',
      'protein-analysis',
      'cell-permeable',
    ]).optional(),
    useCases: z.array(z.enum([
      'weight-loss',
      'muscle-recovery',
      'cognitive',
      'anti-aging',
      'tanning',
    ])).optional(),
    sequence: z.string().optional(),
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

const learnCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string().default('Peptide Shop Editorial'),
    category: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()).optional(),
    order: z.number().default(0),
    primaryKeyword: z.string().optional(),
    howTo: z.boolean().default(false),
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const collections = {
  'products': productsCollection,
  'blog': blogCollection,
  'learn': learnCollection,
};
