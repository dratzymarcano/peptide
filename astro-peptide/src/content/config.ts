import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'content', // v2.5.0+
  schema: z.object({
    id: z.string(),
    title: z.string(),
    primary_keyword: z.string(),
    search_volume: z.union([z.number(), z.string()]),
    // slug is reserved by Astro
    aliases: z.array(z.string()).optional(),
    cas: z.string().nullable(),
    molecular_weight: z.string().nullable(),
    purity: z.string(),
    storage: z.string(),
    package_sizes: z.array(z.string()),
    moq: z.number(),
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
  }),
});

export const collections = {
  'products': productsCollection,
};
