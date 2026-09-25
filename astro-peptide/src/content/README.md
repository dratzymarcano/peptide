# Per-locale markdown drop folders

These folders mirror the canonical English files in `src/content/products/`
and `src/content/blog/`. Translators may add `<slug>.md` files under the
matching locale subfolder to override or replace the runtime translation
provided by:

- `src/i18n/productContent.ts`
- `src/i18n/blogContent.ts`

The loader at [`src/lib/localizedEntry.ts`](src/lib/localizedEntry.ts) prefers
`<locale>/<slug>.md` when present and falls back to the English canonical file
otherwise. Slugs must remain identical to the English filename to preserve link
equity and the redirect map in `astro.config.mjs`.

Routing covers every locale today through the runtime helpers — adding files
here is only required for posts/products that need a fully rewritten body for
the target market beyond what the typed helper exposes.

`.gitkeep` files are placeholders so the folder structure stays in version
control while the per-locale catalogue is being filled in. They are ignored by
the Astro content loader.

## Package-size variants

A product may be sold in several sizes from one page. Add a `variants` block to
the frontmatter, cheapest first or in any order — the site sorts by price:

```yaml
price: 32                 # kept for backward compatibility; ignored when
                          # `variants` is present
variants:
  - size: 1 × 5 mg vial
    price: 32
  - size: 1 × 10 mg vial
    price: 56
  - size: 3 × 10 mg vials
    price: 149
    compare_at_price: 179 # optional; renders a struck-through reference price
```

Omit the block entirely for a single-size product: `price` plus
`package_sizes[0]` then derives the one variant and no size selector renders,
which is how every product behaves today.

What follows automatically from adding sizes:

- a size selector in the buy box, with a per-mg saving badge on any size that
  genuinely costs less per unit than the smallest one;
- `AggregateOffer` JSON-LD with `lowPrice`/`highPrice` instead of a single
  `Offer`, so the price range Google shows matches the page;
- `from €X` on listing cards, priced from the cheapest size;
- one Merchant Center feed entry per size, tied together by `item_group_id`;
- a separate cart line per size, keyed by the variant SKU.

Two rules the tooling enforces:

- **Sizes must be unique within a product.** The SKU is derived from the label
  (`<product-id>--<slugified-size>`), so duplicates would collapse onto one
  cart line. `npm run check` fails on a duplicate.
- **Prices are read from here, never from the browser.** `src/lib/pricing.ts`
  re-resolves the size server-side and rejects an unrecognised one, so a
  crafted request cannot order a large vial at a small vial's price.

The resolver is `src/lib/variants.ts`; the buy box, the cart, the card, the
JSON-LD and the invoice all go through it.
