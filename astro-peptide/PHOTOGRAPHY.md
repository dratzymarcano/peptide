# Product photography specification

Real photographs of the vials you actually ship. This document is the brief you
hand to a photographer, or follow yourself.

## Why this matters

Three separate things depend on it:

- **Google Merchant Center** rejects SVG outright and its image policy states
  *"Don't use a placeholder or an image that doesn't show your product."*
  Renders of a vial that does not exist fail this. Products without a compliant
  photo are held out of the feed by `scripts/generate-merchant-feeds.mjs`.
- **Trust.** The current renders carry a `PeptideShop` wordmark and molecule
  logo that do not match the actual brand mark in `public/brand/`. Anyone
  comparing the site header to the product shot sees the mismatch.
- **Returns and disputes.** A photograph of the real label is the reference
  when a customer questions what arrived.

## What to shoot

Per product, in this order — filenames set the order, so use the numeric prefix:

| File | Shot | Purpose |
|---|---|---|
| `01-front.jpg` | Vial upright, label square to camera | Primary. Cards, product page, OG image, Merchant feed |
| `02-label.jpg` | Label filled to frame, lot number legible | Proves the batch matches the CoA |
| `03-angle.jpg` | Three-quarter view showing cap and crimp | Depth, seal condition |
| `04-scale.jpg` | Vial beside a common reference object | Conveys actual size |

Only `01-front.jpg` is mandatory. Additional shots are published as
`<slug>-2.webp`, `<slug>-3.webp` and so on.

## Technical requirements

- **Resolution:** minimum 1500 px on the short edge. The ingest script rejects
  anything smaller. Shoot 3000 px+ so crops stay sharp.
- **Format in:** JPEG, PNG, TIFF, WebP or AVIF. Shoot RAW and export to JPEG at
  maximum quality; the pipeline handles compression.
- **Aspect:** frame for a square crop. Leave headroom — output is centre-cropped
  to 1:1.
- **Background:** plain white or very light neutral grey (#F2F4F6 or lighter),
  seamless, no visible horizon line, no props competing with the vial.
- **Lighting:** soft, two-source, no blown highlights on the glass and no hard
  specular streak across the label text. A diffused softbox each side with a
  white bounce card underneath works.
- **Focus:** label text must be legible at 100%. Stop down enough that the full
  label depth is sharp.
- **Colour:** shoot a grey card, set white balance from it. The cap colour must
  be true — customers use cap colour to tell products apart.
- **No retouching that changes the product.** Dust removal and exposure
  correction are fine. Do not composite labels, change cap colours, or clone in
  vials that were not on set.

## Naming and drop-off

Create one folder per product slug — the filename in `src/content/products/`
without the `.md`:

```
photo-intake/
  bpc-157/
    01-front.jpg
    02-label.jpg
  tirzepatide/
    01-front.jpg
```

Slugs currently awaiting photography: run `npm run photos:check`.

## Processing

```bash
npm run photos:ingest -- --dry   # report what would be written, change nothing
npm run photos:ingest            # write variants and update frontmatter
npm run photos:check             # list products still lacking a real photo
```

The ingest script writes, per shot, into `public/images/products/`:

- `<slug>.webp` — 1600×1600, primary
- `<slug>-800.webp` — 800×800
- `<slug>-400.webp` — 400×400

and rewrites the `images:` list in the product's frontmatter. Re-running is
safe: it regenerates from source and re-points frontmatter.

After ingesting, regenerate the Merchant Center feeds so newly photographed
products enter the feed:

```bash
npm run seo:feeds
```

## Sequencing

The 22 consumer products carry AI renders today; the other 26 catalogue items
carry SVG placeholders and are excluded from the feed entirely. Shoot the 22
first — those are the pages that rank and convert.
