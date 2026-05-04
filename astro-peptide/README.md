# Peptide Shop Astro Website

SEO-focused Astro storefront for research-use-only peptide catalogue content. The site keeps product, blog, catalogue, use-case and learn pages server-rendered or prerendered where possible, with React islands only for interactive search, cart, checkout and account UI.

## Stack

- Astro 5 with `@astrojs/node` standalone adapter
- React islands for cart, checkout, account, search and product options
- Astro content collections for products and blog articles
- Nano Stores for browser cart/auth state
- Global design system in `public/css/design-system.css`
- Sitemap generation with `@astrojs/sitemap`

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run validate
```

`npm run validate` runs `astro check` followed by a production build. CI runs the same check/build gate on pushes and pull requests.

## Key Routes

- `/` homepage
- `/shop/` product listing with filters and sort
- `/catalog/` research-area hub
- `/catalog/[area]/` research-area pages
- `/use-case/[slug]/` use-case pages
- `/peptides/[slug]/` product detail pages
- `/search/?q=...` server-rendered search results
- `/blog/` and `/blog/[slug]/`
- `/learn/` and `/learn/what-are-peptides/`
- `/cart/`, `/checkout/`, `/account/dashboard/` noindex commerce/account pages

## Content Editing

Products live in `src/content/products/*.md`. Product slugs are filename-based, so do not add a `slug` frontmatter field. Required product taxonomy fields are:

- `researchArea`: one of the research-area slugs from `src/data/taxonomy.ts`
- `useCases`: zero or more use-case slugs from `src/data/taxonomy.ts`
- `images`: use `/images/products/research-vial.svg` unless a final approved product image exists

Product copy must stay research-use-only. Avoid claims about human use, treatment, dosage, consumption, cosmetic outcomes or veterinary use.

Blog articles live in `src/content/blog/*.md`. Use existing images in `public/images/blog/` unless new approved assets are added.

## COA Flow

Product pages currently link to `/coa-policy/` for COA policy and request guidance. Do not add direct `/coa/*.pdf` product links unless the corresponding PDF exists in `public/coa/` and has been approved for publication.

## Compliance Notes

- RUO banner appears on product pages and footer.
- `/cart/`, `/checkout/`, `/account/**` and `/api/**` are excluded from sitemap and marked noindex where rendered.
- Legacy peptide category/product-buy URLs are redirected in `astro.config.mjs`.
- Keep legal review on product, shipping, terms, privacy and disclaimer updates before launch.

## Deployment Notes

This project uses Astro server output with the Node standalone adapter. Deploy to a Node-capable host, or update the adapter before deploying to a static-only platform.

Production gate before launch:

1. `npm run validate`
2. Smoke test `/`, `/shop/`, `/catalog/`, one `/catalog/[area]/`, one `/use-case/[slug]/`, one product, `/cart/`, `/checkout/`, `/blog/`, one blog post, `/learn/what-are-peptides/`, and `/quality/`
3. Verify redirects on the deployed host
4. Run Lighthouse/PageSpeed on production output
5. Confirm legal/compliance sign-off