# Peptide-Shop.net — International SEO / AEO / Merchant Strategy

> Site: `https://peptide-shop.net` · German legal entity · English default (unprefixed) · Locales: en, de, nl, fr, it, es · Stack: Astro 5.18 + Cloudflare Workers · YMYL / regulated-industry e-commerce.
>
> This document is the master implementation plan. Every section identifies (a) **current state** in this repo, (b) **the gap**, and (c) **the action**. Treat each phase as a parallel workstream, not a sequence.

---

## Phase 0 — Baseline Snapshot (what's already correct)

| Area | Current state | Verdict |
|---|---|---|
| URL architecture | Subdirectories: `/`, `/de/`, `/nl/`, `/fr/`, `/it/`, `/es/` (en unprefixed as default) on a single apex domain | ✅ Correct — keep |
| Hreflang | All 6 locales emitted in `<head>` from [SEO.astro](astro-peptide/src/components/SEO.astro#L32-L40) with `x-default → /en` | ✅ Correct — needs validation only |
| Canonical | Self-referencing per locale via `localizePath()` | ✅ Correct |
| Sitemap | `@astrojs/sitemap` with `i18n` config and `customPages` listing every locale × path in [astro.config.mjs](astro-peptide/astro.config.mjs#L97-L115) | ⚠️ Lacks `xhtml:link` annotations — fix below |
| Age gate | `AgeGate.tsx` enforces § 9 JuSchG, localized in all 6 dictionaries | ✅ Correct |
| Min order banner | €200 site-wide topbar, localized | ✅ Correct |
| Adapter | Cloudflare Workers (edge, global) | ✅ Correct for international latency |
| Regulatory disclaimers | Partially per-locale | ⚠️ Audit per-jurisdiction (see Phase 10) |

**The foundation is sound. The work is depth, structured data, content parity, and Merchant Center.**

---

# PHASE 1 — Multilingual Architecture & International Foundation

## 1.1 URL Structure — Decision: **KEEP subdirectories**

- **Final structure**: `peptide-shop.net/` (en, x-default), `/de/`, `/nl/`, `/fr/`, `/it/`, `/es/`.
- **Rationale**: Single domain authority pool; mandatory for a Cloudflare-Workers single-origin deploy; matches Google's preferred pattern for global-English+localized markets; `.de` ccTLD would fragment the German entity's authority across two properties.
- **Localized path segments** (recommended next iteration — currently English slugs are reused across locales):
  - `/de/peptide/bpc-157/` (vs current `/de/peptides/bpc-157/`)
  - `/de/ratgeber/` (vs `/de/learn/`), `/fr/guides/`, `/es/guias/`, `/it/guide/`, `/nl/gids/`
  - **Defer** until after content parity hits 80% per locale — slug churn before then forces redirect debt.
- **Trailing slashes**: keep current Astro default (always-with-slash) — already enforced by sitemap output.

## 1.2 Hreflang Blueprint

**Current (correct) implementation** in [SEO.astro](astro-peptide/src/components/SEO.astro#L36-L40):

```html
<link rel="canonical" href="https://peptide-shop.net/de/peptides/bpc-157/" />
<link rel="alternate" hreflang="en" href="https://peptide-shop.net/peptides/bpc-157/" />
<link rel="alternate" hreflang="de-DE" href="https://peptide-shop.net/de/peptides/bpc-157/" />
<link rel="alternate" hreflang="nl-NL" href="https://peptide-shop.net/nl/peptides/bpc-157/" />
<link rel="alternate" hreflang="fr-FR" href="https://peptide-shop.net/fr/peptides/bpc-157/" />
<link rel="alternate" hreflang="it-IT" href="https://peptide-shop.net/it/peptides/bpc-157/" />
<link rel="alternate" hreflang="es-ES" href="https://peptide-shop.net/es/peptides/bpc-157/" />
<link rel="alternate" hreflang="x-default" href="https://peptide-shop.net/peptides/bpc-157/" />
```

**Gaps to close:**

1. **Add `hreflang` to XML sitemap** (mission-critical at scale; HTML tags become unreliable past ~10k URLs). Fix in [astro.config.mjs](astro-peptide/astro.config.mjs#L107-L114) — extend the `serialize` callback so each `<url>` emits sibling `<xhtml:link>` for every locale + `x-default`. `@astrojs/sitemap` supports this natively via `i18n` already, but verify the rendered XML; if missing, write a custom serializer.
2. **Multi-region English**: `hreflang="en"` is region-less (catch-all), correct. **Do not** also emit `en-US`/`en-GB` unless you publish region-specific variants. Adding regional EN without regional content **causes** cannibalization.
3. **Language-only fallbacks**: emit BOTH `en` and `en-DE`-style if you ever add German-shipping English landing pages. Today: stick to language-only for de/nl/fr/it/es plus `x-default=en`.
4. **Bidirectional check** is automatic since every page renders the same loop — but add a CI check (Phase 9.1).
5. **Never** emit hreflang to non-existent localized variants. When `localizedEntry.ts` falls back to English, **suppress** that locale's hreflang link — emit only locales with a real translated entry. Currently you emit hreflang for all 6 even when the underlying content is English-passthrough → **this is a quiet cannibalization risk**. Fix: pass an `availableLocales: string[]` prop into `SEO.astro` from each page.

## 1.3 Routing & Detection

- ✅ No IP/UA-based redirects (good — keep).
- **Add** a dismissible language suggestion banner: detect `navigator.language` client-side after first paint, show one-line non-blocking strip ("This page is also available in Deutsch →"). Persist dismissal in `localStorage` (`peptide-lang-suggested`). Implement as a sibling React island to `AgeGate.tsx`.
- **Language switcher**: must link to the same path in the target locale (already done via `localizePath()`). Verify it does NOT collapse to homepage when target page is missing — instead disable that locale option for that route.

## 1.4 Search Console Configuration

Create the following GSC properties on day 1:

- `sc-domain:peptide-shop.net` (master domain property — primary)
- URL prefix: `https://peptide-shop.net/de/` → International Targeting: **Germany**
- URL prefix: `https://peptide-shop.net/nl/` → **Netherlands**
- URL prefix: `https://peptide-shop.net/fr/` → **France**
- URL prefix: `https://peptide-shop.net/it/` → **Italy**
- URL prefix: `https://peptide-shop.net/es/` → **Spain**
- URL prefix: `https://peptide-shop.net/` → **no country target** (global English; do NOT set to Germany — that fights the `/de/` property)

Submit each locale sitemap separately (Phase 4.1).

## 1.5 Localization vs Translation — Editorial Contract

| Surface | Strategy | Owner |
|---|---|---|
| Product titles & descriptions | Independent copy per locale (not MT). German formal "Sie", uses Reinheit/HPLC-geprüft idioms | Native copywriter per locale |
| Category intros | Localized + locally-keyword-targeted | Native copywriter |
| Pillar guides (`/learn/*`) | Adapted, not translated; German guide must address AMG/HWG explicitly | SME + native editor |
| Blog | Selective: high-value evergreen → all locales; news → en + de only | Editorial |
| Legal (`/privacy/`, `/terms/`, `/disclaimer/`) | Per-jurisdiction rewrite by local counsel (NOT translated). German `/de/impressum/` mandatory | Legal |
| FAQ | Researched per locale via PAA + forums (Phase 2) | SEO + native editor |
| UI strings | Already localized in `src/i18n/dictionaries/*.json` — keep parity | Engineering |
| Schema | Language-specific `name`/`description` + `inLanguage` (Phase 4.2) | Engineering |
| CoA PDFs | Scientific data language-neutral; surrounding HTML labels localized | Engineering |

**Rule**: No machine translation as final output. MT is allowed as a draft only; native review mandatory before publish for YMYL pages.

---

# PHASE 2 — Keyword Research & Semantic Intelligence (per-locale, independent)

## 2.1 Discovery framework (apply identically per locale)

Inputs per locale:
- Google Keyword Planner scoped to target country
- Google Trends (country)
- Google Autocomplete + "People also ask" scrape (country TLD: google.de, google.nl, google.fr, google.it, google.es)
- AlsoAsked / AnswerThePublic (country + language)
- Reddit (English: r/Peptides, r/Nootropics, r/PeptideStack, r/Biohackers; German: r/de, r/Fitness_de)
- Local forums: **DE** team-andro.com, bodybuilding.de, peptidehead-forum.de · **NL** bodybuilding.nl · **FR** all-musculation.com · **IT** bodyweb.com · **ES** mundoculturista.com
- Marketplaces: Amazon DE/NL/FR/IT/ES autocomplete (terminology validation)
- PubMed / Google Scholar trending compound names

## 2.2 Per-locale keyword pillars (seed list — expand to 500+ terms each)

### English (global, unprefixed) — primary intent buckets

| Intent | Examples |
|---|---|
| Transactional | `buy bpc-157`, `bpc 157 5mg for sale`, `tirzepatide buy europe`, `peptides eu shipping`, `research peptides shop` |
| Commercial investigation | `best bpc-157 brand`, `bpc 157 reviews`, `most pure peptides supplier`, `peptide vendor reddit 2025` |
| Informational (top funnel) | `what is bpc-157`, `peptide reconstitution calculator`, `peptide half life chart`, `hplc purity meaning` |
| Long-tail / scientific | `bpc-157 dosage research`, `tb-500 mechanism action`, `cjc-1295 vs ipamorelin study` |
| Conversational / AEO | `is bpc-157 legal in eu`, `how to store peptides at home`, `do peptides expire` |

### German — independent, **not translated**

| Intent | Examples |
|---|---|
| Transactional | `BPC-157 kaufen`, `Forschungspeptide kaufen Deutschland`, `Peptide Shop Deutschland`, `Tirzepatid Deutschland bestellen` |
| Commercial investigation | `BPC-157 Erfahrungen`, `bestes Peptid Anbieter`, `Peptide Testsieger`, `Peptide Reinheit HPLC vergleich` |
| Informational | `Was sind Peptide`, `Peptide Wirkung Studien`, `Peptide rekonstituieren Anleitung`, `BPC-157 Halbwertszeit` |
| Regulatory (uniquely DE) | `Peptide legal Deutschland`, `BPC-157 Rechtslage`, `Forschungspeptide Gesetz AMG`, `Peptide Apotheke verschreibungspflichtig` |
| German query patterns | `Peptide für Forschung`, `Peptid Reinheitsanalyse`, `Peptidpulver Lagerung` |

> ⚠️ **DE-only concept**: "Testsieger", "Stiftung Warentest", "Apotheke" — no English equivalents. Build dedicated DE pages.

### Dutch — country: NL

| Intent | Examples |
|---|---|
| Transactional | `peptiden kopen`, `BPC-157 kopen Nederland`, `onderzoekspeptiden Nederland` |
| Informational | `wat zijn peptiden`, `peptide reconstitueren`, `BPC-157 ervaringen` |
| Regulatory | `peptiden legaal Nederland`, `peptiden CBG` |

### French — country: FR

| Intent | Examples |
|---|---|
| Transactional | `acheter BPC-157`, `peptides recherche France`, `tirzépatide France` |
| Informational | `qu'est-ce que les peptides`, `reconstituer peptide`, `pureté HPLC peptide` |
| Regulatory | `peptides légal France`, `ANSM peptides` |

### Italian — country: IT

| Intent | Examples |
|---|---|
| Transactional | `comprare BPC-157`, `peptidi ricerca Italia`, `acquistare peptidi` |
| Informational | `cosa sono i peptidi`, `ricostituire peptidi`, `purezza HPLC` |
| Regulatory | `peptidi legali Italia`, `AIFA peptidi` |

### Spanish — country: ES (NOT LATAM — different intent & shipping)

| Intent | Examples |
|---|---|
| Transactional | `comprar BPC-157 España`, `péptidos investigación`, `tirzepatida comprar` |
| Informational | `qué son los péptidos`, `reconstituir péptidos`, `pureza HPLC péptidos` |
| Regulatory | `péptidos legales España`, `AEMPS péptidos` |

## 2.3 Cross-language entity map

Build one row per peptide compound; columns = canonical scientific identifier + per-locale label set. Store as `src/data/entities.json`:

```json
{
  "bpc-157": {
    "cas": "137525-51-0",
    "molecularFormula": "C62H98N16O22",
    "wikidata": "Q4836570",
    "pubchem": "CID 9941957",
    "labels": {
      "en": ["BPC-157", "Body Protection Compound 157", "PL 14736"],
      "de": ["BPC-157", "Körperschutzverbindung 157"],
      "nl": ["BPC-157"],
      "fr": ["BPC-157"],
      "it": ["BPC-157"],
      "es": ["BPC-157"]
    }
  }
}
```

This file feeds: structured data `sameAs` arrays, alt-text generation, and the FAQ schema generator.

## 2.4 Competitive gap audit (per market)

Run quarterly. Capture top 20 ranking domains for the top 50 transactional queries per locale. Track:
- Domain Rating (Ahrefs) / DR delta vs us
- Content gap: queries where competitor ranks top-10 and we don't rank top-50
- SERP feature presence per query (FS, PAA, AI Overview, Shopping pack, video)
- Backlink referring-domains gap

Markets where we are likely **first mover**: NL, IT, ES (under-served vs DE/FR which are crowded). Prioritize content velocity here.

---

# PHASE 3 — On-Page Specifications (per page type, per locale)

## 3.1 Title / Meta templates

| Page type | EN template | DE template |
|---|---|---|
| Product | `Buy {Compound} {Dose} \| {Purity}%+ HPLC \| Peptide Shop` | `{Compound} {Dose} kaufen \| {Purity}%+ Reinheit HPLC \| Peptide Shop` |
| Category | `{Category} Peptides \| Research-Grade, HPLC-Tested \| Peptide Shop` | `{Category} Peptide \| Forschungsqualität, HPLC-geprüft \| Peptide Shop` |
| Use-case | `Peptides for {UseCase} \| Evidence Review & Comparison` | `Peptide für {UseCase} \| Studienlage & Vergleich` |
| Pillar guide | `{Topic}: Complete {Year} Guide \| Peptide Shop` | `{Topic}: Vollständiger Leitfaden {Year} \| Peptide Shop` |
| Blog post | `{Title} \| Peptide Shop` | `{Title} \| Peptide Shop` |
| Homepage | `Peptide Shop — Research-Grade Peptides, HPLC Verified, EU Shipping` | `Peptide Shop — Forschungspeptide aus Deutschland, HPLC-geprüft` |

Meta descriptions: 150-160 chars, include 1 primary keyword, 1 trust signal (HPLC/CoA/99%), 1 CTA. Localized voice — DE more formal/detail-heavy, EN punchier.

## 3.2 Heading hierarchy (product page reference)

```
H1: Compound name + form + dose
  H2: Why this compound (educational summary)
  H2: Specifications (table: purity, mass, CAS, lot)
  H2: Certificate of Analysis
  H2: Storage & reconstitution
  H2: Research summary (linked studies)
  H2: FAQ
  H2: Related compounds
```

Same outline mirrored in every locale (1:1 H2 set → enables hreflang clusters).

## 3.3 Internal linking

- Every product → 3 related products (same target system / same category)
- Every product → 1 pillar guide + 1 use-case page
- Every category → all products + 1 pillar guide
- Every blog post → 2 related blog posts + 1 product/category
- Cross-language: language switcher only (do NOT cross-link in body — sends conflicting language signals)

## 3.4 Image SEO

- Filenames: language-neutral (`bpc-157-vial-5mg.webp`)
- `alt` text: language-specific, generated per locale from product name + descriptor (`{LocalName} {Dose} vial — HPLC tested` / `{LocalName} {Dose} Durchstechflasche — HPLC-geprüft`)
- Same WebP/AVIF assets across all locales (CDN efficiency — Cloudflare Images)
- LCP image: `loading="eager"` + `fetchpriority="high"` only on hero

---

# PHASE 4 — Technical SEO Checklist

## 4.1 Crawl & Sitemap

**Action items:**

- [ ] Generate per-locale sitemaps: `sitemap-en.xml`, `sitemap-de.xml`, `sitemap-nl.xml`, `sitemap-fr.xml`, `sitemap-it.xml`, `sitemap-es.xml`, plus `sitemap-index.xml`. The current `@astrojs/sitemap` config emits one combined file — split by extending `serialize` and writing 6 files, OR submit the single file and rely on the `<xhtml:link>` annotations.
- [ ] Verify sitemap output contains `<xhtml:link rel="alternate" hreflang="…" />` siblings inside each `<url>`. If missing, the `i18n` config block in [astro.config.mjs](astro-peptide/astro.config.mjs#L107-L114) is not generating them — debug.
- [ ] `robots.txt`: ensure `Allow: /` on all locales; `Disallow: /api/`, `/cart/`, `/checkout/`. Add `Sitemap: https://peptide-shop.net/sitemap-index.xml`.
- [ ] Cloudflare Worker: ensure no geo-routing (Workers shouldn't serve different responses to Googlebot regardless of edge location).
- [ ] Add `Content-Language` HTTP header per response (set in [middleware.ts](astro-peptide/src/middleware.ts) based on detected locale).
- [ ] Crawl budget: `noindex` thin filter pages, search results, paginated tail (page 5+).

## 4.2 Canonicals — verified rules

- ✅ Self-referencing per locale (already done).
- ❌ NEVER cross-language canonical (e.g., `/de/...` canonical → `/peptides/...`). Audit for none.
- Pagination: canonical = page itself (not page 1). Use `rel="next"`/`"prev"` is deprecated — use natural internal linking instead.

## 4.3 Mirror structure

Every `/peptides/{slug}/` MUST exist as `/de/peptides/{slug}/`, `/nl/...`, etc. Where the localized MD doesn't exist, `localizedEntry.ts` falls back to English copy — this is acceptable transitionally **but** suppress hreflang for the missing locale (Phase 1.2 fix).

## 4.4 Core Web Vitals (test per locale via PageSpeed Insights)

| Metric | Target | Risk |
|---|---|---|
| LCP | <2.5s | Hero image; ensure WebP + correct `sizes` |
| INP | <200ms | React island hydration (AgeGate, CartModal, LanguageSwitcher) — already `client:idle` ✅ |
| CLS | <0.1 | German text 15-30% longer → reserve min-heights on cards/buttons |
| FID/TTFB | <600ms | Cloudflare Workers edge cache — ensure `Cache-Control: public, max-age=…` on static product pages |

DE-specific: long compound nouns can break button widths. Audit `.topbar__min-order` and CTAs in DE/NL.

## 4.5 Schema infrastructure

Create one schema generator per type at `src/lib/schema/`:
- `product.ts(entity, locale, offer)` → returns `Product` JSON-LD
- `breadcrumb.ts(crumbs, locale)`
- `faq.ts(items, locale)`
- `article.ts(post, author, locale)`
- `organization.ts(locale)` — single source of truth, render once on homepage
- `localBusiness.ts()` — render once on `/contact/` and `/de/kontakt/`
- `website.ts(locale)` — with `SearchAction` per locale

Inject via `<script type="application/ld+json" set:html={JSON.stringify(schema)} />` in page templates.

---

# PHASE 5 — AEO / AI Overview / Voice (per locale)

## 5.1 Featured snippet & PAA targets

For each locale, build 50 `/learn/` pages that each:
- Open with a 40-60 word direct answer (snippet bait) immediately under H1
- Use definition-list HTML (`<dl><dt><dd>`) for "X is …" patterns
- Include a structured table when the query implies comparison
- End with a `FAQPage` schema block of 3-7 PAA questions

**EN PAA seeds**: see Phase 2.1 list. **DE PAA seeds**: see Phase 2.1.2 list. Replicate for nl/fr/it/es.

## 5.2 AI Overview / SGE citation strategy

LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) cite content that:
1. Has clear authorship + credentials (E-E-A-T signal — Phase 3.2 / 8.x)
2. Is structured (H2/H3 outline + tables + lists, not prose walls)
3. Cites primary sources (PubMed links)
4. Uses precise scientific naming + CAS/PubChem identifiers
5. Has high topical density on a single entity

**Action**: every product page should include a "Research summary" H2 with 3-5 PubMed-cited sentences. Every pillar guide should include "Sources" footer with DOI links. **Allow** GPTBot, ClaudeBot, PerplexityBot, Google-Extended in `robots.txt` (do NOT disallow — that removes you from training corpora and AI Overviews).

## 5.3 Voice search

- Optimize for full-question queries in each locale ("Sind Peptide in Deutschland legal?" — not "Peptide legal").
- DE: write answers in formal Sie-form on FAQ.
- Markup with `Speakable` schema on the answer paragraph (where supported).

---

# PHASE 6 — Google Merchant Center (multi-feed free listings)

## 6.1 Merchant Center architecture

**Single Merchant Center profile** (Germany business), Multi-Client structure NOT needed. Create feeds:

| Feed name | Country | Language | Currency | URL pattern |
|---|---|---|---|---|
| `feed-de-de` | DE | de | EUR | `/de/peptides/...` |
| `feed-de-en` | DE | en | EUR | `/peptides/...` |
| `feed-nl-nl` | NL | nl | EUR | `/nl/peptides/...` |
| `feed-fr-fr` | FR | fr | EUR | `/fr/peptides/...` |
| `feed-it-it` | IT | it | EUR | `/it/peptides/...` |
| `feed-es-es` | ES | es | EUR | `/es/peptides/...` |
| `feed-eu-en` | AT, BE, IE, LU, FI, PT (EN-acceptable EU) | en | EUR | `/peptides/...` |
| `feed-uk-en` | GB | en | GBP | `/peptides/...` (with GBP price override) |

Enable **Free Product Listings (Surfaces across Google)** for every feed. Enable Promotions feed if running discounts.

## 6.2 Feed automation

Build a script `scripts/generate-merchant-feed.mjs`:

```js
// Pseudocode
for (const locale of ['en','de','nl','fr','it','es']) {
  for (const product of products) {
    const entry = await loadLocalizedEntry(product, locale);
    feed[locale].push({
      id: product.sku,                    // SAME id across feeds
      title: entry.merchantTitle,         // localized, ≤150 chars, includes brand+compound+dose+purity
      description: entry.merchantDesc,    // localized, ≤5000 chars, no HTML
      link: localizeUrl(product.url, locale),
      image_link: product.heroImage,      // CDN URL, ≥800x800
      additional_image_link: product.gallery,
      availability: stock > 0 ? 'in_stock' : 'out_of_stock',
      price: `${product.price.toFixed(2)} EUR`,
      brand: 'Peptide Shop',
      gtin: product.gtin || '',           // empty allowed if MPN+brand provided
      mpn: product.sku,
      condition: 'new',
      google_product_category: '517',     // Health & Beauty > Health Care
      product_type: localizedTaxonomy(product.category, locale),
      identifier_exists: product.gtin ? 'yes' : 'no',
      content_language: locale,
      target_country: countryFor(locale),
      shipping: shippingRowsFor(locale),
      tax: taxRowsFor(locale),
      // Custom labels for campaign segmentation
      custom_label_0: product.category,
      custom_label_1: product.useCase,
    });
  }
  writeXml(`public/feeds/feed-${locale}.xml`, feed[locale]);
}
```

Schedule via Cloudflare Cron Trigger every 6h. Submit feed URLs to MC via "Scheduled fetch".

## 6.3 Per-market compliance gates

⚠️ **Peptides are heavily restricted in MC**. For each feed:

1. Classify each product:
   - **Cosmetic** (e.g., GHK-Cu, Argireline) → "Health & Beauty > Personal Care > Cosmetics" — generally approved
   - **Research / not for human consumption** → MC will reject in most countries. Do NOT include in feed unless you have a compliant product page that makes the research-only positioning unambiguous and you've obtained MC pre-approval.
   - **Supplement-grade** (collagen) → "Food & Beverages > Dietary Supplements" — country-specific rules.

2. Per-country adjustments:
   - **DE**: HWG forbids therapeutic claims; titles/descriptions must contain zero `behandeln/heilen/lindern` verbs.
   - **FR**: ANSES restrictions on supplements; some compounds banned for sale to consumers.
   - **IT, ES, NL**: similar EU directives; lighter enforcement but follow EU baseline.
   - **UK**: post-Brexit MHRA — separate compliance check.

3. Maintain feed health ≥95% per feed. Set GSC + MC email alerts.

---

# PHASE 7 — Content Roadmap (12-month, per locale)

## 7.1 Pillar architecture

Per locale, the canonical pillar set:

1. **What are peptides** (`/learn/what-are-peptides/`)
2. **Peptide purity & HPLC** (`/learn/hplc-peptide-purity/`)
3. **How to read a Certificate of Analysis** (`/learn/coa-guide/`)
4. **Peptide reconstitution** (`/learn/peptide-reconstitution/`)
5. **Storage & stability** (`/learn/peptide-storage/`)
6. **Legal status [country]** ← uniquely per locale (DE: AMG/HWG; FR: ANSM; etc.)
7. **Buying guide [country]** ← per locale
8. **Top peptide compounds [year]** (overview)
9. **Use-case directory** (links to all `/use-case/*` hubs)
10. **Glossary**

Each pillar links to all relevant products + supporting blog posts. Each product page links back to ≥2 pillars.

## 7.2 12-month publishing cadence (per locale)

| Month | EN | DE | NL/FR/IT/ES (pooled) |
|---|---|---|---|
| 1-3 | Pillars 1-5 + 6 product deep-dives | Pillars 1-5 + 6 product deep-dives | Pillar 1 + top-3 product deep-dives |
| 4-6 | Pillars 6-10 + 6 use-case explainers | Pillars 6-10 + 6 use-case explainers | Pillars 2-4 + 3 product deep-dives |
| 7-9 | 12 blog posts (research news, comparisons) | 12 blog posts | Pillars 5-7 + 3 use-case explainers |
| 10-12 | 12 blog posts + 6 product launches | 12 blog posts + 6 product launches | Pillars 8-10 + 6 blog posts |

**Parity matrix**: maintain `docs/content-parity.csv` with columns `slug, en, de, nl, fr, it, es, priority, status`. Review monthly.

## 7.3 Editorial standards

- Every YMYL page: named author (with credentials) + scientifically reviewed by (separate person, MD/PhD/PharmD).
- Sources cited inline (PubMed/DOI links).
- Last-updated date visible + machine-readable in `Article` schema.
- Native speaker review mandatory before publish.
- Word counts: pillars 2,500-4,000; product pages 800-1,200; blog 1,200-2,000.

---

# PHASE 8 — Off-Page & Authority

## 8.1 Per-market link targets

| Market | Target domains (illustrative) | Tactic |
|---|---|---|
| DE | apotheken-umschau.de, netdoktor.de, spektrum.de, pharmazeutische-zeitung.de, .uni-*.de | German-language guest posts, expert quotes, university-collab studies |
| EN (global) | examine.com, peptidesciences.com (peer mentions), reddit /r/Peptides AMAs, healthline.com (mentions only — no link buys) | Original research publishing, Reddit AMAs, podcast appearances |
| NL | gezondheidsnet.nl, voedingscentrum.nl | Dutch-language explainers, local PR |
| FR | santemagazine.fr, doctissimo.fr | French scientific PR |
| IT | starbene.it, fondazioneveronesi.it | Italian medical PR |
| ES | dsalud.com, infosalus.com | Spanish health PR |

## 8.2 Local SEO (DE base)

- Google Business Profile in German + English secondary
- Address, phone, hours consistent everywhere
- `LocalBusiness` schema on `/contact/` and `/de/kontakt/`
- NAP consistency: Handelsregister entry, Impressum, GBP, MC business info, social profiles all identical

## 8.3 Brand & entity signals

- **Wikidata entry** for "Peptide Shop" with multilingual labels + `sameAs` to all official social profiles → seeds Knowledge Graph.
- LinkedIn DE + global, Xing (DE), YouTube (subtitled per locale), Instagram (visual content), Twitter/X.
- Press release distribution per market launch milestone.

---

# PHASE 9 — Analytics, Monitoring, Continuous Improvement

## 9.1 Stack

| Tool | Purpose | Multi-locale config |
|---|---|---|
| GSC | Indexation, CWV, hreflang errors | 1 domain property + 6 prefix properties |
| GA4 | Behavior, conversion | Custom dimension `locale` (set in [middleware.ts](astro-peptide/src/middleware.ts)); separate exploration per locale |
| Looker Studio | Dashboard | Stitched GSC + GA4 + MC; locale dimension on every chart |
| Ahrefs / SEMrush | Rank tracking, backlink monitoring | Per locale × per country TLD project |
| Screaming Frog (CI) | Hreflang validation, broken links | Crawl per release; fail build on hreflang errors |
| Cloudflare Web Analytics | Real user CWV | Per-locale segmentation via URL filter |
| Merchant Center diagnostics | Feed health | Per-feed alert routing |

## 9.2 Cannibalization detection

Monthly: pull GSC "Pages" report filtered by country. If `/peptides/bpc-157/` (EN) gets ≥10% of impressions on **google.de**, that's cannibalization. Diagnosis tree:

1. Check hreflang return tags for that URL pair (Screaming Frog).
2. Check DE page word count + uniqueness vs EN (DE must be ≥80% as long, fully translated, not stub).
3. Check internal links to DE page (DE page should have ≥10 inbound internal links from other DE pages).
4. Check DE page backlinks (low → invest in DE off-page).
5. If still ranking wrong: temporarily reduce EN page's `og:locale` signals + reinforce `Content-Language: de` header on DE.

## 9.3 Cadence

- **Weekly**: GSC International Targeting report; MC feed health.
- **Monthly**: Per-locale audit (technical health, top-10 query drift, cannibalization scan, content publishing tracker).
- **Quarterly**: Backlink gap, CWV regression, schema validity full crawl, content parity matrix review, language-expansion ROI review.
- **After every Google core update**: per-locale impact diff (impressions/clicks 14d pre/post per locale).

---

# PHASE 10 — Legal & Regulatory Compliance Matrix

## 10.1 Per-jurisdiction matrix

| Jurisdiction | Key statutes | Site implementation |
|---|---|---|
| DE | AMG, HWG, LFGB, NemV, EU Novel Food, REACH, Cosmetics Reg, DSGVO, TMG/DDG, PAngV, VerpackG, UWG, JuSchG | ✅ AgeGate (§ 9 JuSchG); ⚠️ need: Impressum on all locales (legal entity duty), HWG-compliant copy review for DE product descriptions, MwSt-inclusive prices |
| NL | EU baseline + Warenwet, AVG (GDPR-NL), Geneesmiddelenwet | Dutch privacy + cookie banner; CBG-compliant disclaimers |
| FR | EU baseline + Code de la santé publique, RGPD, Loi Informatique et Libertés | French Mentions légales + CGV; ANSM-compliant disclaimers |
| IT | EU baseline + GDPR-IT, Codice del Consumo | Italian Note Legali + Privacy; AIFA-compliant |
| ES | EU baseline + LSSI-CE, RGPD, LOPDGDD | Spanish Aviso Legal + Política de Privacidad; AEMPS-compliant |
| EN (global) | Per visitor jurisdiction — universal disclaimer | Generic disclaimer + "Check your local laws" notice; explicit "research use only" framing where applicable |
| US (if shipping) | FDA, FTC, state-by-state peptide laws | If shipping US: FDA-required disclaimers, no medical claims; very high risk — recommend NOT shipping research peptides to US |
| UK | MHRA, UK GDPR | Post-Brexit separate compliance |

## 10.2 Universal Google policy gates

- No therapeutic / medical / disease claims anywhere in title/description/body for any compound (HWG + Google MC + FTC).
- No bodybuilding / performance enhancement claims.
- "For research purposes only" framing for non-cosmetic peptides (where applicable).
- Age verification (18+) gate before checkout — already implemented ✅.
- Clear shipping restrictions per country on PDP.

## 10.3 Disclaimer template strings (add to dictionaries)

Add per-locale: `disclaimer.researchOnly`, `disclaimer.notMedical`, `disclaimer.consultHCP`, `disclaimer.regulatoryStatus`. Render under H1 on every product page.

---

# PHASE 11 — Cross-Language Cannibalization Prevention Playbook

| Symptom | Cause | Fix |
|---|---|---|
| EN page ranking in google.de | Weak DE content + missing/broken hreflang | (1) Audit hreflang return tags; (2) Strengthen DE copy to ≥80% EN length + native uniqueness; (3) Add DE-only internal links; (4) Build DE backlinks |
| Two of our URLs both ranking for same query in same country | Self-competition (e.g., `/use-case/weight-loss/` + `/peptides/semaglutide/`) | Differentiate intent: use-case page = informational/comparative; product page = transactional. Ensure title tags reflect that |
| `/de/peptides/x/` not indexed despite hreflang | x-default outranking + thin DE content | Submit DE URL via GSC "Request indexing"; expand DE copy; add DE backlinks |
| DE product ranking lower than EN on google.de | Domain authority concentration in EN | Build DE-locale backlinks (priority); make DE the linked target in DE-language outreach |
| Hreflang validator (Sitebulb/Ahrefs) flags missing return tag | Suppression logic dropped a locale | Audit `availableLocales` prop in [SEO.astro](astro-peptide/src/components/SEO.astro) — must be symmetric across the cluster |

CI check: extend [check-i18n-coverage.mjs](astro-peptide/scripts/check-i18n-coverage.mjs) (or add new script) that crawls built `dist/` HTML, parses hreflang sets per page, asserts bidirectional symmetry. Fail CI on mismatch.

---

# PHASE 12 — Production-Ready Code Snippets

## 12.1 Localized Product JSON-LD (drop into `src/lib/schema/product.ts`)

```ts
// src/lib/schema/product.ts
import type { Locale } from '../../i18n/config';

interface Args {
  product: { sku: string; gtin?: string; price: number; image: string; url: string; inStock: boolean };
  entity: { localName: string; localDescription: string; cas: string; sameAs: string[] };
  locale: Locale;
}

const langMap: Record<Locale, string> = {
  en: 'en', de: 'de', nl: 'nl', fr: 'fr', it: 'it', es: 'es',
};

export function productSchema({ product, entity, locale }: Args) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: entity.localName,
    description: entity.localDescription,
    inLanguage: langMap[locale],
    sku: product.sku,
    ...(product.gtin && { gtin13: product.gtin }),
    brand: { '@type': 'Brand', name: 'Peptide Shop' },
    image: product.image,
    sameAs: entity.sameAs, // Wikidata, PubChem, ChEMBL
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'CAS Number', value: entity.cas },
      { '@type': 'PropertyValue', name: 'Purity', value: '≥99% (HPLC)' },
    ],
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: 'EUR',
      price: product.price.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: 'Peptide Shop' },
    },
  };
}
```

## 12.2 FAQPage schema (per locale)

```ts
export function faqSchema(items: { q: string; a: string }[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: langMap[locale],
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
```

## 12.3 Sitemap with hreflang annotations

If `@astrojs/sitemap`'s `i18n` block is not emitting `<xhtml:link>`, replace `customPages` with a custom integration:

```js
// scripts/generate-sitemaps.mjs (post-build)
import { writeFileSync } from 'node:fs';
const SITE = 'https://peptide-shop.net';
const LOCALES = ['en', 'de', 'nl', 'fr', 'it', 'es'];

function urlBlock(path) {
  const lines = [`  <url>`, `    <loc>${SITE}${path === '/' ? '' : path}</loc>`];
  for (const l of LOCALES) {
    const href = l === 'en' ? `${SITE}${path}` : `${SITE}/${l}${path}`;
    const hl = l === 'en' ? 'en' : `${l}-${l.toUpperCase()}`;
    lines.push(`    <xhtml:link rel="alternate" hreflang="${hl}" href="${href}" />`);
  }
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${path}" />`);
  lines.push(`  </url>`);
  return lines.join('\n');
}
// ...iterate paths, write per-locale files + sitemap-index.xml
```

## 12.4 Content-Language header (extend middleware.ts)

```ts
// in src/middleware.ts onRequest handler
const locale = detectLocale(context.url.pathname); // already exists
context.locals.locale = locale;
const response = await next();
response.headers.set('Content-Language', locale);
return response;
```

## 12.5 Robots.txt (with AI crawler allowances)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /cart/
Disallow: /checkout/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://peptide-shop.net/sitemap-index.xml
```

---

# PHASE 13 — Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MC feed rejection (peptides as restricted) | High | Critical (loss of free listings) | Per-product compliance review; cosmetic/supplement products only in feed initially; appeal with documentation per market |
| HWG enforcement action (DE) | Medium | Critical | Native German legal review of every DE product description; remove all therapeutic verbs |
| Hreflang misimplementation → mass cannibalization | Medium | High | CI validation; quarterly Sitebulb audit |
| Google YMYL core update demotion | Medium | High | Real authors + reviewers per locale; cite primary sources; freshness updates |
| Cloudflare Workers serving wrong locale (cache-key bug) | Medium | High | Include locale in cache key; e2e test per locale on every deploy |
| Thin localized content seen as "auto-translated low quality" by Helpful Content System | High | Critical | Hard rule: no MT in production; native reviewer signoff |
| Apex/EU regulatory change (e.g., EU peptide reclassification) | Low | Critical | Legal monitoring subscription; quarterly regulatory review |
| Loss of GBP property after Brexit drift | Low | Medium | Maintain UK-specific feed + monitoring |
| Cross-language canonical bug (someone hand-edits) | Low | High | CI assertion: canonical host+path locale must match page locale |

---

# PHASE 14 — Language Expansion Framework

When adding a new locale (e.g., Polish, Portuguese, Czech):

1. **Demand validation**: 4-week keyword research + competitor audit before code changes.
2. **Add locale code** to `locales` array in [astro.config.mjs](astro-peptide/astro.config.mjs#L12) + `localeMeta` (hreflang, ogLocale).
3. **Add dictionary** `src/i18n/dictionaries/{xx}.json` with full UI string parity.
4. **Translate (native, not MT)** the top-20 product pages + 5 pillar guides BEFORE publishing the locale.
5. **Pre-launch hreflang test**: build, crawl, validate symmetry.
6. **Add MC feed** + GSC URL prefix property + analytics dimension.
7. **Off-page kickoff**: 3-month native PR campaign in target market.
8. **Soft launch**: Submit to GSC, monitor for 8 weeks before promoting.

---

# Immediate Action Queue (next 30 days)

Ranked by ROI vs effort:

1. **[P0] Suppress hreflang for non-translated locales** — fix in [SEO.astro](astro-peptide/src/components/SEO.astro) by passing `availableLocales` from each page. Quiet cannibalization fix.
2. **[P0] Verify sitemap emits `<xhtml:link>`** — inspect built `dist/sitemap-*.xml`; if missing, add custom serializer (Phase 12.3).
3. **[P0] Set `Content-Language` HTTP header** — 5-line middleware change (Phase 12.4).
4. **[P0] Robots.txt update** — explicit AI crawler allowance + sitemap reference.
5. **[P1] Schema generators** — `product`, `breadcrumb`, `faq`, `organization`, `localBusiness` with `inLanguage` (Phase 12.1-12.2). Roll into product/category/learn templates.
6. **[P1] Add Impressum to all locales** — German legal duty applies regardless of page language.
7. **[P1] Build entity map** `src/data/entities.json` with CAS + Wikidata + multilingual labels.
8. **[P1] German-locale legal-status pillar page** `/de/learn/peptide-rechtslage-deutschland/` — captures uniquely German regulatory queries.
9. **[P2] Merchant Center DE feed** (cosmetic + supplement products only initially) — revenue unlock.
10. **[P2] Content parity tracker** `docs/content-parity.csv` + monthly review cadence.
11. **[P2] CI hreflang validator** extending [check-i18n-coverage.mjs](astro-peptide/scripts/check-i18n-coverage.mjs).
12. **[P3] Localized URL slugs** for DE (`/de/peptide/...`, `/de/ratgeber/...`) — defer until content parity ≥80%.

---

*This plan is the living source of truth. Update the parity matrix monthly, the risk register quarterly, and re-baseline keyword research per locale every 6 months.*
