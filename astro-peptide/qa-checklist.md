# QA Checklist

## Pre-Launch

- [ ] **Accessibility:** Run `npm run build` and check for a11y warnings. Use Chrome DevTools Lighthouse to audit the homepage and a product page. Target score > 90.
- [ ] **SEO Structure:**
    - [ ] Verify `robots.txt` exists and blocks `/api/`.
    - [ ] Verify `sitemap-index.xml` or `sitemap-0.xml` is generated in `dist/`.
    - [ ] Check a product page source for `<link rel="canonical">`.
    - [ ] Validate JSON-LD using [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] **Functionality:**
    - [ ] "Add to Cart" works and updates the counter.
    - [ ] Cart modal opens and closes.
    - [ ] Form validation prevents submission without "Research Use" checkbox.
    - [ ] Form submission successfully posts to `/api/enquiry` and clears the cart.
- [ ] **Content Safety:**
    - [ ] Review all product descriptions for "human use" claims. Ensure "Research Use Only" is prominent.
    - [ ] Check that no medical advice is given in the FAQ.
- [ ] **Performance:**
    - [ ] Images are loading lazily (Astro default behavior for `<img>` if configured, or use `astro:assets`).
    - [ ] Mobile layout is responsive (no horizontal scroll).

## Post-Launch

- [ ] **Analytics:** Configure Cloudflare Web Analytics or Google Analytics.
- [ ] **Indexing:** Submit sitemap to Google Search Console.
- [ ] **Backups:** Enable database backups in Supabase.
