# UPDATE_PLAN.md — Actionable Upgrade Roadmap

This is the executable plan that turns [FINDINGS.md](FINDINGS.md), [DESIGN_SPEC.md](DESIGN_SPEC.md) and [SEO_PLAN.md](SEO_PLAN.md) into shipped work. Tasks are labelled by track (T = technical, D = design/UI, S = SEO/content), prioritised P0 → P3, and grouped into four phases. Each task lists **owner**, **dependencies**, **acceptance criteria**, and **measurable indicator**.

Severity mapping: **P0** = blocks launch / regulatory risk · **P1** = critical for ranking & CWV · **P2** = important uplift · **P3** = polish.

## Implementation status — May 1, 2026

Core implementation is complete in the Astro app under `astro-peptide/`:

- Phase 0 stabilisation is implemented: noindex handling, RUO messaging, search route, functional shop controls, robots/sitemap exclusions and legacy redirects are in place.
- Phase 1 front-end foundation is implemented: legacy Bootstrap/jQuery/plugin assets were removed, self-hosted fonts and the global design system are active, and generated build/cache outputs are ignored.
- Phase 2 IA, templates, schema and content rebuild are implemented: `/catalog/`, 12 research-area hubs, 5 use-case hubs, product pages, shop, search, blog, learn, commerce/account pages, secondary pages, 404 and structured data are live in source.
- Header/cart/account/search islands hydrate with `client:load` for reliable commerce interaction while SSR/prerendered page content remains intact for SEO.
- Product COA CTAs now point to `/coa-policy/`; direct PDF metadata was removed until approved PDF assets exist.
- CI is at `.github/workflows/astro-ci.yml`. The `validate` job runs `npm run check:i18n`, `npm run check`, and `npm run build`. The new `quality-gates` job runs `pa11y-ci`, `lighthouse-ci`, and `playwright test` (axe-core a11y suite + visual-regression baselines) against the built preview.

Verified locally on 2026-05-01:

- `npm run check:i18n`: 835 keys covered across 6 locales.
- `npm run check` (`astro check`): 0 errors, 0 warnings, 0 hints across 73 files.
- `npm run extract:i18n`: scaffolding scan completes; report at `scripts/i18n-extract-report.json`.

Remaining before public launch: deploy to a Node-capable host, verify redirects on the deployed domain, run Lighthouse/PageSpeed against production output, add real COA PDFs if direct downloads are required, capture initial Playwright visual baselines on the target environment, and retain legal/compliance sign-off for RUO, terms, privacy, shipping and product claims.

---

## Phase 0 — Stabilisation (Week 1)

Fix actively harmful issues before any rebuild work.

| ID | Track | P | Task | Owner | Acceptance criteria |
|---|---|---|---|---|---|
| 0-1 | T | P0 | Add `<meta name="robots" content="noindex,follow">` to `/cart`, `/checkout`, `/account/**`, `/api/**` | Dev | View-source confirms; GSC re-crawl shows excluded |
| 0-2 | T | P0 | Remove duplicate self-pointing `hreflang` from `Layout.astro` (lines 38–40); leave only `<html lang="en-GB">` | Dev | No hreflang errors in GSC International Targeting |
| 0-3 | S | P0 | Add visible **"For research use only — not for human consumption"** banner above the fold on every product page; full disclaimer in footer | Content + Dev | Banner present on all 24 product pages; legal review signed off |
| 0-4 | S | P0 | Audit and remove or verify the home-page testimonials in `index.astro`; replace with real, attributable quotes or remove entirely | Content + Legal | No unattributed quotes on `/`; ASA/CAP compliance confirmed |
| 0-5 | T | P0 | Fix `WebSite.SearchAction` schema in `index.astro` — either build `/search` or remove the action | Dev | GSC Rich Results test passes for `WebSite` |
| 0-6 | T | P1 | Wire the `/shop` sort `<select>` to actually re-order the grid (or remove it) | Dev | Selecting an option re-orders cards; adds `aria-label` |
| 0-7 | T | P1 | Replace the mobile filter `display:none` with an off-canvas drawer (button: "Filters (n)") | Dev + Design | Mobile users can apply ≥ 1 filter; axe = 0 critical |
| 0-8 | T | P1 | Add `noindex` headers to legacy `/peptides/{category}` pages that will be redirected in Phase 2 (avoid double indexation during migration) | Dev | GSC URL-Inspect returns "Excluded by noindex" |
| 0-9 | S | P1 | Fix social `href="#"` placeholders in `Footer.astro` (real URLs or remove the icons) | Content | No `href="#"` remains in footer |
| 0-10 | T | P1 | Add `Sitemap:` line + `Disallow: /cart, /checkout, /account, /api` to `robots.txt`; install `@astrojs/sitemap` and exclude the same paths | Dev | `robots.txt` valid in GSC; sitemap submitted; 0 disallowed URLs in sitemap |

**Phase 0 success indicator:** 0 critical Lighthouse SEO/A11y violations on home, shop, and a sampled product page; GSC Coverage shows no `/cart` or `/account` URLs indexed within 14 days.

---

## Phase 1 — Performance & front-end foundation (Weeks 2–4)

Strip the legacy stack so Phase 2 design work lands on a fast base.

| ID | Track | P | Task | Dependencies | Acceptance criteria |
|---|---|---|---|---|---|
| 1-1 | T | P1 | **Remove jQuery, jQuery Form, jQuery Validate, Magnific Popup, Slick Carousel, Bootstrap JS** from `Layout.astro` | — | None of these scripts ship in the production bundle (verify via Network tab) |
| 1-2 | T | P1 | Audit `/public/js/script.js` and `/public/css/style.css`; delete dead jQuery code, keep only what runs | 1-1 | Page works without 1-1 dependencies; `script.js` ≤ 5 KB |
| 1-3 | T | P1 | Choose **Tailwind v3** as the single styling system (config already exists). Migrate `index.astro` global CSS into Tailwind utility + `@layer` rules. Bootstrap CSS removed in 1-5. | — | One CSS file ≤ 50 KB gz; no Bootstrap classes in new code |
| 1-4 | T | P1 | Implement **DESIGN_SPEC § 13** tokens as Tailwind theme extension (`tailwind.config.mjs`) | 1-3 | All colors/spacings reachable via utilities (e.g. `bg-primary`, `text-ink`) |
| 1-5 | T | P1 | Remove Bootstrap 4 CSS link from `Layout.astro`; replace `.container`, `.row`, `.col-*` usages on `/shop`, `Footer.astro`, etc. with Tailwind grid | 1-3, 1-4 | `bootstrap.min.css` no longer requested |
| 1-6 | T | P1 | **Self-host Inter** (variable, latin subset only). Remove Google Fonts `<link>`. Use `font-display: swap`, `preload` woff2. Drop Raleway. | 1-3 | No request to fonts.googleapis.com; FOUT < 100 ms |
| 1-7 | T | P1 | Replace UMD Lucide CDN script with **per-component SVG imports** (Astro icons or hand-rolled SVG sprite) | — | No `unpkg.com` request; lucide global script removed |
| 1-8 | T | P1 | Convert always-hydrated header islands (`SearchBar`, `AccountButton`, `CartIcon`) from `client:load` to `client:idle`; cart count uses event-based update | — | No JS executes before idle on first paint; cart still updates correctly |
| 1-9 | T | P1 | Make `ProductCard` an **Astro component**. Hydrate only the inner `AddToCartButton` with `client:visible` | — | Shop page hydrates ≤ 2 islands instead of 24 |
| 1-10 | T | P1 | Image discipline: `<img loading="lazy" decoding="async">` on all non-hero; `fetchpriority="high"` on hero LCP image; use `<picture>` with AVIF + WebP | — | Lighthouse "Properly size images" + "Serve next-gen formats" pass |
| 1-11 | T | P2 | Remove placeholder Google Maps CDN script from `Layout.astro` | — | No `maps.googleapis.com` request anywhere it's not used |
| 1-12 | T | P2 | Inline critical CSS (above-the-fold) per template; defer the rest | 1-3 | First paint not blocked by external CSS |
| 1-13 | T | P2 | Add `<meta name="theme-color">`, `apple-touch-icon`, web manifest | — | Lighthouse PWA install criteria partially met |

**Checkpoint 1:** Lighthouse Mobile Performance ≥ 85 on home, shop, product. Total transferred ≤ 350 KB on first page view.

---

## Phase 2 — IA, design system, content rebuild (Weeks 4–10)

Land the design spec and the new hub-and-spoke architecture in parallel with content rewrites.

### 2A. Information architecture (SEO_PLAN § 2–3)

| ID | Track | P | Task | Dependencies | Acceptance criteria |
|---|---|---|---|---|---|
| 2A-1 | S+T | P1 | Create the **`/catalog/` hub page** (12 research-area cards) — mirrors Eurogentec's `/catalog-peptides` | 1-3..1-6 | Page live, indexed, all 12 cards link to live or stub hubs |
| 2A-2 | S+T | P1 | Create **12 research-area hub pages** under `/catalog/{area}/` with template from DESIGN_SPEC § 7.3. Stubs OK initially with intro + product list | 2A-1, 2D-1..6 | All 12 pages return 200, have unique H1/title/meta, list at least 1 product or "Coming soon" |
| 2A-3 | S+T | P1 | Create **5 use-case hub pages** under `/use-case/` (weight-loss, muscle-recovery, cognitive, anti-aging, tanning) with 301s from `/peptides/{category}/` | 2A-1 | 301s in place; canonical points to new URL |
| 2A-4 | T | P1 | Implement **301 redirect map** from SEO_PLAN § 3.3 in `astro.config.mjs` `redirects:` and hosting `_redirects` | 2A-2, 2A-3 | curl -I returns 301 to the right target on every legacy URL |
| 2A-5 | T | P2 | Update content collection so each product MD has `researchArea: "neuroscience" \| ...` and `useCases: []` arrays. Use these to render hub product lists | 2A-2 | All 24 MD files updated; hubs render automatically |
| 2A-6 | S | P2 | Add **breadcrumbs** with the new IA on every page (Home › Catalog › Area › Product) | 2A-2, 2A-5 | Breadcrumbs visible + JSON-LD valid in GSC |

### 2B. Header / footer / global components

| ID | Track | P | Task | Dependencies | Acceptance criteria |
|---|---|---|---|---|---|
| 2B-1 | D+T | P1 | Rebuild `Header.astro` per DESIGN_SPEC § 8.1 with **mega-menu** by research area; keyboard accessible (`Esc`, `↓`, focus trap) | 1-1..1-7 | axe = 0 critical; keyboard navigation tested; CLS = 0 |
| 2B-2 | D+T | P1 | Rebuild `Footer.astro` with **6-column** sitemap from DESIGN_SPEC § 8.2; add newsletter capture with GDPR consent | 2A-2 | Footer present on every page; mailto / form posts to ESP |
| 2B-3 | T | P1 | Add `<meta name="robots">`, `og:site_name`, `og:locale`, `twitter:site`, per-page in `SEO.astro` | — | Meta tags appear correctly on view-source |
| 2B-4 | T | P2 | Implement actual `/search` page (server-rendered fuzzy search across product collection) and re-enable the `WebSite.SearchAction` schema | 0-5 | `?q=bpc` returns relevant results; schema valid |

### 2C. Component library

| ID | Track | P | Task | Acceptance criteria |
|---|---|---|---|
| 2C-1 | D+T | P1 | Build **Button** primitive (variants from DESIGN_SPEC § 6.1) | All buttons site-wide use this component; Storybook entry exists |
| 2C-2 | D+T | P1 | Build **Card** primitives (CategoryCard, ProductCard, ArticleCard) | Same 3 components used on hub, shop, learn |
| 2C-3 | D+T | P1 | Build **Form** primitives (Input, Select, Checkbox, Radio, FilterChip) | All forms site-wide refactored to use them |
| 2C-4 | D+T | P1 | Build **Tabs** for product detail (Description / Sequence / COA / FAQs / Reviews) | Keyboard accessible, deep-linkable via hash |
| 2C-5 | D+T | P2 | Build **Table** for catalog list view (sortable, sticky header) with `aria-sort` | Toggling sort updates `aria-sort` and order |
| 2C-6 | D+T | P2 | Build **off-canvas Drawer** used by mobile filters and cart | Focus trap, scroll lock, `Esc` closes |

### 2D. Page templates

| ID | Track | P | Task | Acceptance criteria |
|---|---|---|---|
| 2D-1 | D+T | P1 | Rebuild `index.astro` per DESIGN_SPEC § 7.1 — remove gradients, simplify hero, add trust band, research-area grid | Lighthouse home ≥ 90 mobile; 0 axe criticals |
| 2D-2 | D+T | P1 | Rebuild `shop.astro` per § 7.5 with grid+table toggle, real sort, mobile drawer filters, URL-driven facets | All filters reachable on mobile; URL is the source of truth |
| 2D-3 | D+T | P1 | Rebuild `peptides/[slug].astro` per § 7.6 with tabs, related-products by `researchArea` not "newest" | 24 product pages match design; related grid is contextually correct |
| 2D-4 | D+T | P2 | Rebuild Learn hub + post template per § 7.7 with sticky TOC and inline product callouts | Articles include ≥ 2 product links with exact-match anchors |
| 2D-5 | D+T | P2 | Rebuild cart drawer + checkout per § 7.8 | 3-step checkout; no surprise fees; analytics events emitted |
| 2D-6 | D+T | P3 | Custom branded `404.astro` with search + top categories | 404 returns correct status code |

### 2E. Content rewrites (SEO_PLAN § 4–6)

| ID | Track | P | Task | Acceptance criteria |
|---|---|---|---|
| 2E-1 | S | P1 | Rewrite **all 24 product titles, meta descriptions, H1s** per SEO_PLAN § 4.3 | Each ≤ 60 char title, ≤ 155 char meta; primary keyword present |
| 2E-2 | S | P1 | Standardise product MD body to template: Mechanism · Research use · Sequence (mono) · CAS · Reconstitution · Storage · References | All 24 product MDs follow template; min 600 words |
| 2E-3 | S | P1 | Add **per-batch COA download** field to product schema; expose as button on product page (placeholder PDF if not yet linked to LIMS) | Every product page has a "Download COA" button (working or queued state) |
| 2E-4 | S | P1 | Write all **12 research-area hub** intros (80–120 words, includes head term, ends with internal links) | Each hub ≥ 250 words total; 0 thin-content warnings in Sitebulb |
| 2E-5 | S | P2 | Write the **12 Learn articles** from SEO_PLAN § 4.4 in priority order: glossary → COA → reconstitution → storage → GLP-1 overview | Each ≥ target word count; ≥ 2 internal links to product pages |
| 2E-6 | S | P2 | Add **Quality / Certifications** page block listing real certifications (ISO 9001, GMP, lab accreditation) — only what is verifiable | Page lists real, dated certificates with PDF links |
| 2E-7 | S | P3 | Build glossary page with 60+ terms, anchor-linked, schema `DefinedTermSet` | 60+ terms; sitelinks searchbox eligible |

### 2F. Schema enrichment

| ID | Track | P | Task | Acceptance criteria |
|---|---|---|---|
| 2F-1 | T+S | P1 | Enrich `Product` schema with `priceValidUntil`, `itemCondition`, `hasMerchantReturnPolicy`, `shippingDetails`, `gtin`/`mpn` (if assigned) | GSC "Product snippets" report = 0 errors, 0 warnings |
| 2F-2 | T+S | P2 | Add `CollectionPage` + `ItemList` schema to all hub and use-case pages | GSC valid; rich-results test passes |
| 2F-3 | T+S | P2 | Add `Article` schema with `author`, `datePublished`, `dateModified` to all `/learn/` and `/blog/` posts | GSC Article report valid |
| 2F-4 | T+S | P3 | Add `FAQPage` schema only where Q&A is rendered to user (avoid hidden-FAQ penalty) | GSC FAQ report valid |

**Checkpoint 2:** All 12 research-area hubs + 5 use-case hubs live; 24 product pages on new template with valid `Product` schema; GSC Coverage shows ≥ 60 indexed pages; no Soft-404s; LCP ≤ 2.5 s p75 on mobile.

---

## Phase 3 — Authority, expansion, polish (Weeks 10–18)

| ID | Track | P | Task | Acceptance criteria |
|---|---|---|---|
| 3-1 | S | P2 | Off-page outreach plan (SEO_PLAN § 9): 10 referring-domain targets / month, no paid links | ≥ 15 new RDs at day 90 |
| 3-2 | S | P2 | Internal-link audit pass with Screaming Frog: every product has ≥ 3 incoming internal links from non-nav pages | Crawl report attached |
| 3-3 | T | P2 | Add `pa11y-ci` + `lighthouse-ci` + `astro check` + `tsc --noEmit` to CI; block merge on regression | **Done (2026-05-01)** — `quality-gates` job in `.github/workflows/astro-ci.yml` runs `pa11y-ci` (`.pa11yci.json`) and `lhci autorun` (`lighthouserc.cjs`) after `astro check` and `astro build`. |
| 3-4 | T | P2 | Set up CrUX + GA4 + GSC dashboards reporting weekly to a single Looker Studio | Dashboard shared with stakeholders |
| 3-5 | S | P3 | Plan i18n (`/de/`, `/fr/`) once English content base is stable; **don't** ship duplicate hreflang until translations exist | i18n decision documented; hreflang re-enabled correctly |
| 3-6 | D | P3 | Visual regression suite (Playwright + axe) for the 8 key templates | **Done (2026-05-01)** — Playwright config at `playwright.config.ts`, axe-core suite at `tests/e2e/a11y.spec.ts`, visual-regression suite at `tests/e2e/visual.spec.ts`. Run `npm run test:e2e` locally; baselines must be captured on the target environment with `npm run test:e2e:update` before enforcement. |
| 3-7 | S | P3 | Quarterly content refresh cycle (re-evaluate top 20 pages, update `dateModified`, refresh stats / references) | First refresh shipped at month 4 |

---

## Dependencies graph (high level)

```
0-* (stabilise)  →  1-1..1-10 (perf strip)  →  2C-* (component library)
                                              ↘  2B-* (header/footer)  →  2D-* (templates)
                                              ↘  2A-* (IA + redirects) →  2E-* (content rewrites) → 2F-* (schema)
                                                                                                   → 3-* (authority/polish)
```

A page template (`2D-*`) cannot be considered done until its content rewrite (`2E-*`) and schema enrichment (`2F-*`) for the same page-type are merged.

---

## Acceptance & launch criteria (cumulative gate)

A change set is releasable to production when **all** of the following hold:

1. `npm run build` succeeds; `astro check` returns 0 errors; `tsc --noEmit` passes.
2. Lighthouse Mobile (median of 3 runs, throttled): **Perf ≥ 90, A11y ≥ 100, Best Practices ≥ 95, SEO ≥ 100** on home, shop, one product, one hub.
3. axe-core: 0 critical, 0 serious on the same four pages.
4. GSC URL-Inspect: live test indexable, canonical correct, structured data valid for affected templates.
5. Visual regression: 0 unintended diffs.
6. CWV field data (CrUX) trending in the right direction at the next 28-day window.
7. Legal sign-off retained for any product-page copy or claim changes.

---

## Measurable success indicators (90 / 180 days post-launch)

| Indicator | Source | 90-day target | 180-day target |
|---|---|---|---|
| Indexed pages | GSC | + 35 | + 80 |
| Organic clicks / month | GSC | + 50 % | + 150 % |
| Avg position, top-10 head terms | GSC | < 25 | < 12 |
| LCP p75 (mobile) | CrUX | ≤ 2.5 s | ≤ 2.0 s |
| INP p75 | CrUX | ≤ 200 ms | ≤ 200 ms |
| CLS p75 | CrUX | ≤ 0.05 | ≤ 0.05 |
| Lighthouse Performance (mobile, lab) | LH-CI | ≥ 90 | ≥ 95 |
| Rich-result valid product pages | GSC | 100 % | 100 % |
| Conversion rate (cart → purchase) | GA4 | + 20 % | + 40 % |
| New referring domains | Ahrefs | + 15 | + 40 |

---

## Sample copy snippets

### Home hero (replaces gradient hero in `index.astro`)
> **Eyebrow:** RESEARCH PEPTIDES · UK
> **H1:** Lab-verified peptides for research
> **Sub:** Every batch HPLC-tested to ≥ 99 % purity, mass-spec verified, with a lot-specific COA included. Dispatched from our UK facility within 24 h. For research use only.
> **CTAs:** [ Browse the catalog ] [ Download a sample COA ]
> **Trust row:** ISO 9001 · UK lab · 24 h dispatch · COA per batch

### Research-area hub intro (Neuroscience)
> Our neuroscience catalog covers peptides used across Alzheimer's, multiple sclerosis, Parkinson's and broader CNS research — including β‑amyloid fragments, tau, MOG, MBP, humanin and bioactive analogues. All are ≥ 99 % HPLC-pure, supplied lyophilised, with lot-specific COA. Browse by sub-topic below or [view the full catalog](/catalog/).

### Product page badge row (BPC-157)
> ✓ HPLC ≥ 99.2 % · ✓ Mass-spec verified · ✓ Lot COA included · ✓ UK dispatch within 24 h · For research use only.

### RUO disclaimer (footer + above-the-fold on product pages)
> **For research use only.** Products sold by Peptide Shop are intended for in-vitro research and laboratory use. They are not for human or veterinary diagnostic, therapeutic, or consumption purposes.
