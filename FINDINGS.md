# FINDINGS.md — Comparative Audit: peptide-shop.net vs. eurogentec.com/en/catalog-peptides

> Benchmark: **Eurogentec — Catalog Peptides** (Kaneka group). A B2B, research‑grade peptide catalog with a 12‑research‑area hub‑and‑spoke information architecture, ~1000+ catalog SKUs, and a clean clinical/scientific brand voice.
>
> Subject: **peptide-shop.net** (Astro 4 + React islands + Bootstrap 4 + Raleway), B2C‑styled research‑peptide shop with ~24 product MD files, blog, learn hub, account/cart flows.

The audit uses the four pillars from the brief: UI/UX, Front‑end Engineering, SEO/IA, and Content. Severity legend: 🟥 Critical · 🟧 High · 🟨 Medium · 🟩 Low.

---

## A. UI / UX Design

### A1. Visual hierarchy & layout
| # | Finding | Benchmark behavior | Our site | Severity |
|---|---|---|---|---|
| A1.1 | **Catalog hub is a 12‑tile research‑area grid** (Neuroscience, Cardiovascular, Diabetes, …). One H1, short intro (“1000+ peptides across 12 research areas, 95% purity”), then equal‑weight category cards. | Grid of category hubs, each linking to a sub‑hub. | We have **one flat shop grid** (`/shop`) plus a 5‑item dropdown (Weight Loss, Muscle, GH, Tanning, Cognitive). No mid‑level "research area" hub page. | 🟧 |
| A1.2 | Hero region is restrained, single value statement, single CTA. | Minimal hero, mostly white, no gradients. | Home uses a **green→teal gradient hero**, multiple stacked sections, decorative SVG triangles, testimonials, gradients on category cards (`from-purple-500 to-pink-500`, etc.). Reads as consumer/lifestyle, not lab‑grade. | 🟧 |
| A1.3 | Consistent `inner-container` (~1280–1400 px) and even vertical rhythm on every template. | Consistent. | Mixed: home uses `.inner-container { max-width: 1400px }` + `.section-padding 80px 60px`; shop uses Bootstrap `.container` (~1140 px). Breakpoints differ between pages. | 🟨 |
| A1.4 | Breadcrumbs above H1 on every interior page (e.g. `PEPTIDES > Neuroscience peptides`). | Yes, plain text, small caps. | We render breadcrumbs inside `PageTitle.astro` and inject `BreadcrumbList` JSON‑LD (good), but they are absent on `/`, `/shop` ordering is `Home > Shop` only — no category mid‑level. | 🟨 |

### A2. Typography
| # | Finding | Benchmark | Our site | Severity |
|---|---|---|---|---|
| A2.1 | Single sans (humanist, ≈ Source Sans / Open Sans family), ~16 px body, generous line‑height (~1.6), short measure (~70ch). | Conservative scientific typography. | **Raleway** loaded with 6 weights (300–800) — geometric display face used as body text, harder to read at long measures. | 🟧 |
| A2.2 | H1 ≈ 32–40 px, H2 ≈ 22–26 px, ratio ~1.25 (minor‑third). | Restrained scale. | Mixed; hero text + utility classes from Bootstrap 4 + ad‑hoc inline `font-size`. No documented type scale. | 🟨 |
| A2.3 | Letter‑spacing tight on body, slight tracking on small caps eyebrows (`PEPTIDES`). | Yes. | No eyebrow / kicker convention. | 🟩 |

### A3. Color palette & accessibility
| # | Finding | Benchmark | Our site | Severity |
|---|---|---|---|---|
| A3.1 | Near‑monochrome: white background, dark slate ink (~#1a1a1a), one cool accent (Kaneka blue/teal), red used only for alerts. | Clinical. | Single primary `#0077b6` is fine, **but** home injects multi‑color category gradients (purple→pink, blue→cyan, green→emerald, orange→red). Conflicts with B2B trust positioning. | 🟧 |
| A3.2 | Body text contrast ≥ 7:1 on white. | AAA. | `--shop-text-muted: #6b7280` on white = **4.83 : 1** (passes AA normal, fails AA small ≤ 14 px). Some SVG strokes use `#1e293b` on `#0077b6` background (~3.6 : 1, fails). | 🟨 |
| A3.3 | Focus styles always visible. | Visible outline. | Custom dropdowns and nav links rely on default Bootstrap; account/search/cart React islands have no documented `:focus-visible` style. | 🟧 |

### A4. Components (buttons, cards, forms, nav)
| # | Finding | Benchmark | Our site | Severity |
|---|---|---|---|---|
| A4.1 | Two button variants (filled + ghost), 4 px / 6 px radius, no shadow, hover = 8% darken. | Consistent across site. | We have `.btn` from Bootstrap 4 + custom buttons in hero + `AddToCartButton.tsx` styled separately; multiple radii (4 / 8 / 12 px), drop shadows mixed. No documented states. | 🟧 |
| A4.2 | Cards = white surface, 1 px `#e5e7eb` border, **no** shadow, image left or top, title link, short summary, CTA "View collection". | Library‑card pattern. | `ProductCard.tsx` mixes shadow, hover lift, badges (purity, reviews), price, "Add to cart" — closer to Amazon than Eurogentec. Acceptable for B2C, but inconsistent with science branding. | 🟨 |
| A4.3 | Forms (search, filters) are single column, label above input, 40 px input height, no fancy outlines. | Plain. | Shop sort is a Bootstrap `<select class="form-control">` inline with text — not styled like Eurogentec; sidebar filters hidden on mobile via `display:none` (not collapsible). | 🟧 |
| A4.4 | Mega‑menu by product family, with sub‑columns. Persistent utility row (Support / Account / Cart). | Yes. | Single dropdown of 5 categories, no mega‑menu, no sub‑hubs. Top bar has phone/email/Telegram. | 🟧 |
| A4.5 | Sticky search; live autocomplete by SKU/sequence. | Yes. | `SearchBar.tsx` exists but no documented behavior (need verification — see A4.5 note in UPDATE_PLAN). | 🟨 |

### A5. Global sections (header, footer, utility)
| # | Finding | Benchmark | Our site | Severity |
|---|---|---|---|---|
| A5.1 | Footer = 6 columns (PRODUCTS, GMP SERVICES, COMPANY, SUPPORT, ORDER, LEGAL) + newsletter. Strong outbound link equity to category hubs. | Yes. | Footer has 4 columns (Brand, Products[5], Company[~5], …). Far fewer footer links → weaker internal link distribution. | 🟧 |
| A5.2 | Newsletter capture, social, parent‑company line, telephone in footer. | Yes. | Social icons present but `href="#"` placeholders. No newsletter capture in footer. Phone shown in top bar only. | 🟨 |
| A5.3 | Top‑bar utility: Support · Account · Cart count. Two languages (en/fr/de). | Multilingual ready. | Top bar has phone/trust line; no language switcher. `Layout.astro` hard‑codes `lang="en-GB"` and `geo.region=GB` and uses both `hreflang="en"` and `x-default` pointing to **the same URL** — not actually internationalized. | 🟨 |

---

## B. Technical / Front‑end Implementation

| # | Finding | Severity |
|---|---|---|
| B1 | **Mixed CSS systems on the same page.** Bootstrap 4.3.1 (legacy, EOL) + custom global tokens (`--shop-primary`) + per‑page `<style is:global>` in `index.astro` + Tailwind config present (`tailwind.config.mjs`) but Tailwind classes used in JS strings only (e.g. `gradient: 'from-purple-500 to-pink-500'` is dead text — Tailwind likely not actually processing them). Decide on **one** system. | 🟥 |
| B2 | jQuery 1.x + jQuery Form + jQuery Validate + Magnific Popup + Slick + Bootstrap JS loaded **on every page** via `Layout.astro` regardless of need (~250 KB pre‑gzip of legacy JS). Big LCP/TBT regression. | 🟥 |
| B3 | Lucide icons loaded as a **UMD bundle from unpkg** on every page with `defer`, then re‑initialized on `DOMContentLoaded`. Render is correct but ships ~80 KB of icons; SVG is also inlined inside `Header.astro` and `Footer.astro`. Pick one approach. | 🟧 |
| B4 | Google Fonts loaded with `<link>` for 6 weights of Raleway. No `font-display:swap` guarantee from Google's CSS for current variant, and no self‑hosting → extra DNS + render delay. | 🟧 |
| B5 | Heavy use of `client:load` on header islands (`SearchBar`, `AccountButton`, `CartIcon`, `CartModal`, `CartNotification`). Five always‑hydrated islands at top of every page; should be `client:idle` or `client:visible` where possible. | 🟧 |
| B6 | Semantic HTML mostly present (good `<header>`, `<nav>`, `<main>` via `id="main-content"`, skip‑link). But `Header.astro` uses `<ul class="nav-links">` then a non‑accessible custom dropdown without `aria-expanded`/`aria-haspopup` and the mobile `<button class="mobile-toggle">` lacks `aria-controls`/`aria-expanded`. | 🟧 |
| B7 | `Layout.astro` always sets `<html lang="en-GB">` and emits **both** `hreflang="en"` and `hreflang="x-default"` pointing to `Astro.url.href` — duplicate alternates pointing to self with no real translations. Either remove or wire to actual locales. | 🟨 |
| B8 | `SEO.astro` does not emit `<meta name="robots">` per‑page (only the global `index, follow`), and there is no `og:site_name`, no `og:locale`, no Twitter `@site/@creator` handles. | 🟨 |
| B9 | `shop.astro` hides the entire filter sidebar with `display:none` under 992 px instead of converting to off‑canvas/drawer. Mobile users have **no filtering**. | 🟧 |
| B10 | Sort `<select>` on `/shop` is decorative only — no `onchange` handler, options don't actually sort. | 🟧 |
| B11 | `ProductCard` is hydrated with `client:load` for **every** product card on the shop grid. ~24 hydrations per page. Make the card a static Astro component and only hydrate the “Add to cart” button. | 🟧 |
| B12 | No `loading="lazy"`/`decoding="async"`/`fetchpriority` discipline on product imagery; hero in `index.astro` likely candidate for `fetchpriority="high"` LCP. | 🟧 |
| B13 | No `<meta name="theme-color">`, no PWA manifest, no `apple-touch-icon`, only an SVG favicon. | 🟩 |
| B14 | `script.js` loaded on every page; includes legacy jQuery initializers — likely dead code on the Astro stack. Audit/remove. | 🟨 |
| B15 | Bootstrap 4 → no CSS variables, no logical properties; future RTL/locale work is blocked. | 🟨 |

### Performance heuristics (estimated, pre‑optimization)
- LCP at risk: hero gradient image + Slick + Magnific JS + Bootstrap JS + Raleway 6 weights.
- CLS risks: lucide icons replaced after `DOMContentLoaded`; cart count React island re‑renders top‑bar.
- TBT inflated by jQuery + Bootstrap collapse JS executed on pages that don’t use it.

---

## C. SEO & Site Structure

| # | Finding | Benchmark | Our site | Severity |
|---|---|---|---|---|
| C1 | **Hub‑and‑spoke IA**: `/catalog-peptides` → `/{research-area}-peptides` → `/{family}-peptides` → `/catalog/{product}~{uuid}`. Every product is two clicks from the category hub and four hops from home. | Yes. | We have flat `/peptides/` + `/peptides/[category]` + `/peptides/[slug]`. **No research‑area hubs**, no family clusters → topical authority is diluted. | 🟥 |
| C2 | URL slugs are descriptive, kebab‑case, no trailing dates, language prefix `/en/`. | Yes. | Mostly good (`/peptides/bpc-157`). But **mixed slug rules** in content collection: some pages live under `/peptides/`, others appear at root (`/shop`, `/bundles`, `/wholesale`). The collection helper strips `/peptides/` then re‑adds it — fragile. | 🟨 |
| C3 | Anchor text is descriptive (“View our collection”, full peptide name). No "click here". | Yes. | Mixed; footer uses category names (good), but home category cards link with ambiguous CTAs ("Explore"). | 🟨 |
| C4 | Internal linking density: each category hub links to ~10–25 child pages; each child links back up to the hub and laterally to siblings. | Strong link equity flow. | Product pages do **not** link laterally to sibling peptides in the same use‑case (we have `RelatedProducts.astro` — verify it links by category, not just newest). Category hubs link only to a flat product grid. No cross‑linking from `/learn/` and `/blog/` into product pages. | 🟧 |
| C5 | Title tags are templated: `{Page} \| Eurogentec`. | Consistent. | Templated by `Layout.astro` but **per‑page titles are inconsistent length and include both brand and category** (e.g. "Buy BPC‑157 UK | Peptide Shop"). Many pages exceed 60 chars and get truncated in SERPs. | 🟨 |
| C6 | Canonicals correct, hreflang correct (en/fr/de), JSON‑LD `Organization` + `Product` + `BreadcrumbList`. | Comprehensive. | We emit `Product`, `BreadcrumbList`, `WebSite` (search action), `Organization`. Good. **But** `WebSite.potentialAction.target` points to `/search?q=…` and **there is no `/search` route** — Google may flag this. | 🟧 |
| C7 | No duplicate canonicals, no `noindex` on commercial pages, paginated archives use `rel=prev/next` heritage but with self‑canonicals. | Clean. | Need to verify `/cart`, `/checkout`, `/account/dashboard` are `noindex` (they are not — they inherit the global `index, follow`). Account/cart pages will leak into the index. | 🟧 |
| C8 | Sitemap.xml present, segmented by content type. | Yes. | `astro.config.mjs` sitemap integration status not verified — see UPDATE_PLAN B-A1. `robots.txt` present in `public/` but contents not audited. | 🟨 |
| C9 | International: real `hreflang` cluster (en, fr, de, en‑US, x‑default). | Yes. | Self‑pointing duplicate `hreflang` (see B7) — actively harmful. | 🟧 |
| C10 | Crawl depth: every product reachable in ≤ 4 clicks, with persistent footer links to top hubs. | Yes. | Long‑tail products only reachable via `/shop` filters that **don’t exist on mobile** (B9). Crawlers + mobile users see the same flat list. | 🟧 |
| C11 | Schema: `Product` includes `mpn`, `gtin`, `brand`, `aggregateRating`, `offers.priceValidUntil`, `offers.itemCondition`. | Rich. | Our `Product` schema lacks `gtin`/`mpn`, `priceValidUntil`, `itemCondition`, `hasMerchantReturnPolicy`, `shippingDetails`. Google’s Merchant Listings now require return + shipping. | 🟧 |
| C12 | Blog → product internal links use exact‑match anchor text (`BPC‑157`). | Yes. | `/blog/peptide-storage-handling-best-practices` etc. exist but linking density into product pages is minimal. | 🟨 |

---

## D. Content & Copy

| # | Finding | Severity |
|---|---|---|
| D1 | Eurogentec hub text is short, factual, citation‑oriented ("1000+ catalog peptides across 12 research areas, 95% purity, ready for immediate shipment"). Our shop hero copy is marketing‑heavy and lacks specificity (purity %, batch QC, COA, lead time). | 🟧 |
| D2 | Product MD files contain `faqs`, `reviews`, but copy length / structure varies wildly between SKUs. No template for Mechanism / Research Use / Storage / Reconstitution / References. | 🟧 |
| D3 | No glossary / scientific reference layer. Eurogentec deep‑links to scientific publications from each catalog page. | 🟨 |
| D4 | Trust signals: Eurogentec leans on Kaneka parentage, ISO certifications, GMP. Our site mentions "Trusted by Researchers Across Europe" but **no third‑party certifications shown** (e.g. ISO 9001, GMP, accredited lab). | 🟧 |
| D5 | No COA download per SKU on the product page itself. We have a `/coa-policy` page but no per‑batch link. | 🟧 |
| D6 | Disclaimer / "for research use only" is in `/disclaimer` but **not visible on product pages above the fold**. Regulatory risk in UK/EU. | 🟥 |
| D7 | Testimonials on home are unverified ("Dr. Sarah Mitchell, Cambridge Bio Labs"). If fictional, remove (UK ASA/CAP code violation). | 🟥 |

---

## E. Accessibility (WCAG 2.2 AA)

| # | Finding | Severity |
|---|---|---|
| E1 | Skip‑to‑content link present and focusable — good. | 🟩 |
| E2 | Mobile menu toggle missing `aria-expanded` / `aria-controls`. | 🟧 |
| E3 | Custom dropdown in `Header.astro` is `<ul class="dropdown-menu">` shown on hover; no keyboard support documented. | 🟧 |
| E4 | Decorative SVGs in header/footer not marked `aria-hidden="true"`. | 🟨 |
| E5 | Color‑only state indication on category gradient cards. | 🟨 |
| E6 | No documented focus ring; Bootstrap 4 default outlines often suppressed. | 🟧 |
| E7 | Top‑bar font‑size 11 px below WCAG min recommendation; phone/email row hidden on mobile. | 🟩 |
| E8 | Form `<select>` on `/shop` has no `<label>`. | 🟧 |

---

## F. Summary scorecard

| Pillar | Eurogentec (benchmark) | peptide-shop.net | Gap |
|---|---:|---:|---:|
| Information architecture (hub/spoke depth) | 9 / 10 | 4 / 10 | **−5** |
| Visual consistency / brand discipline | 9 / 10 | 5 / 10 | **−4** |
| Front‑end performance budget | 8 / 10 | 4 / 10 | **−4** |
| Accessibility | 8 / 10 | 5 / 10 | **−3** |
| Technical SEO baseline | 9 / 10 | 6 / 10 | **−3** |
| Content depth & trust signals | 8 / 10 | 5 / 10 | **−3** |
| E‑commerce / conversion UX (shop, cart) | 6 / 10 (B2B quote) | 7 / 10 | **+1** |

**Headline conclusion.** The single largest competitive gap is **information architecture**: Eurogentec's hub‑and‑spoke topical authority cannot be matched while our catalog is a flat 24‑item grid. The second gap is **brand discipline**: gradients, mixed CSS systems and Bootstrap 4 + jQuery legacy undermine both performance and the scientific trust signal. The third gap is **content depth & regulatory framing** (COA per batch, RUO disclaimer, certifications). Fixes are sequenced in [UPDATE_PLAN.md](UPDATE_PLAN.md).
