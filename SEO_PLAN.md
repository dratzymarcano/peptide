# SEO_PLAN.md — Technical & Content SEO Strategy

Target market: **United Kingdom** (primary), EU (secondary). Search intent: research / scientific buyer. The strategy mirrors Eurogentec's hub-and-spoke topical model, layered onto our existing Astro + content-collections stack.

---

## 1. Strategy at a glance

| Pillar | Goal | Primary KPI |
|---|---|---|
| Topical authority | Build hub pages for **12 research areas** + **5 use-case** clusters | Indexed pages, internal links per cluster |
| On-page | Per-page title/meta/header rewrite, schema enrichment | CTR, rich-result eligibility |
| Technical | Fix hreflang, canonicals, robots, sitemap, performance | CWV passing, crawl errors = 0 |
| Off-page | Earn citations from research blogs / Reddit / preprints | Referring domains |
| Content | 24 product pages → templated; +12 hub pages, +12 cluster pages, +20 Learn articles | Organic sessions, assisted conversions |

---

## 2. Information architecture (target)

```
/                                               (home)
/catalog/                                       (NEW – research-area hub of hubs)
  /catalog/neuroscience/                        (NEW – research-area hub)
    /catalog/neuroscience/cognitive/            (NEW – cluster, optional)
      /peptides/semax/                          (existing product, re-canonicalised)
      /peptides/selank/
  /catalog/cardiovascular/
  /catalog/diabetes/
    /peptides/semaglutide/
    /peptides/tirzepatide/
    /peptides/retatrutide/
  /catalog/cancer-apoptosis/
  /catalog/adhesion-ecm/
  /catalog/cell-tissue/
    /peptides/bpc-157/
    /peptides/tb-500/
  /catalog/immunology/
  /catalog/epigenetics/
  /catalog/hormones/
    /peptides/cjc-1295-no-dac/
    /peptides/ipamorelin/
    /peptides/ghrp-2/
    /peptides/ghrp-6/
  /catalog/cell-signaling/
  /catalog/protein-analysis/
  /catalog/cell-permeable/
/use-case/                                      (NEW – B2C use-case hubs)
  /use-case/weight-loss/
  /use-case/muscle-recovery/
  /use-case/cognitive/
  /use-case/anti-aging/
  /use-case/tanning/
/learn/                                         (existing)
  /learn/what-are-peptides/
  /learn/glossary/                              (NEW)
  /learn/storage-handling/                      (move from /blog)
  /learn/coa-explained/                         (NEW)
/blog/                                          (news, time-sensitive)
/about/  /quality/  /shipping/  /coa-policy/  /wholesale/  /contact/
/cart/  /checkout/                              (noindex)
```

**Rule:** every product is reachable from **at least two** hubs (research area + use case) and at most **3 clicks** from the home page.

---

## 3. URL architecture

### 3.1 Slug rules
- All lowercase, kebab-case, ASCII only.
- No trailing slashes inconsistency — pick one (recommend **with trailing slash**, matches current `/peptides/`).
- No dates, no IDs, no query strings as the canonical URL.
- Product slug: `/peptides/{compound-name-or-cas}/` — keep current. Do not include "buy" or geo in the slug.

### 3.2 Canonicalization
- Every page emits `<link rel="canonical">` to its own clean URL (already done in `SEO.astro`).
- `/shop?area=neuroscience` canonicalizes to `/catalog/neuroscience/`.
- `/shop?page=2` canonicalizes to itself; pagination handled with `<link rel="next/prev">` (deprecated by Google but useful for Bing).
- HTTP → HTTPS, `www` ↔ apex: pick one and 301 the other.

### 3.3 Redirect map (initial)

| From | To | Code |
|---|---|---|
| `/shop` (no params) | keep, retitle "Catalog" | 200 |
| `/peptides/` | `/catalog/` | 301 |
| `/peptides/weight-loss/` | `/use-case/weight-loss/` | 301 |
| `/peptides/muscle-recovery/` | `/use-case/muscle-recovery/` | 301 |
| `/peptides/growth-hormone/` | `/use-case/anti-aging/` | 301 |
| `/peptides/tanning/` | `/use-case/tanning/` | 301 |
| `/peptides/cognitive/` | `/use-case/cognitive/` | 301 |

Implement via `astro.config.mjs` `redirects:` map plus a Netlify/Cloudflare `_redirects` file.

---

## 4. Keyword map

Head → mid → long-tail per cluster. Volumes are illustrative (validate in Ahrefs/SEMrush before launch).

### 4.1 Research-area hubs

| Page | Primary keyword | Supporting | Intent |
|---|---|---|---|
| `/catalog/` | research peptides catalog | catalog peptides, buy peptides UK | Commercial nav |
| `/catalog/neuroscience/` | neuroscience peptides | tau peptide, beta amyloid peptide, MOG peptide | Commercial / informational |
| `/catalog/cardiovascular/` | cardiovascular peptides | ANP peptide, BNP peptide | Commercial |
| `/catalog/diabetes/` | diabetes peptides | GLP-1 peptide, glucagon peptide | Commercial |
| `/catalog/cancer-apoptosis/` | cancer apoptosis peptides | bax peptide, p53 peptide | Commercial |
| `/catalog/hormones/` | hormone peptides | growth hormone secretagogue, GHRP | Commercial |
| `/catalog/cell-signaling/` | cell signaling peptides | mapk peptide, akt substrate | Commercial |
| `/catalog/cell-permeable/` | cell penetrating peptides | TAT peptide, CPP peptide | Commercial |
| (… one row per remaining hub) | | | |

### 4.2 Use-case hubs (B2C / wellness research)

| Page | Primary | Supporting |
|---|---|---|
| `/use-case/weight-loss/` | weight loss peptides UK | semaglutide research, tirzepatide research, retatrutide |
| `/use-case/muscle-recovery/` | muscle recovery peptides | BPC-157, TB-500, body protective compound |
| `/use-case/cognitive/` | nootropic peptides | semax, selank, dihexa |
| `/use-case/anti-aging/` | anti-aging peptides | epitalon, GHK-Cu, NAD+ |
| `/use-case/tanning/` | tanning peptides | melanotan-2, MT-II |

### 4.3 Product pages (24 existing)

Pattern: `{compound} | {one differentiator} — Peptide Shop UK` (≤ 60 chars).

| URL | Title | Meta description (≤ 155 chars) | Primary keyword |
|---|---|---|---|
| `/peptides/bpc-157/` | BPC-157 5 mg — ≥99 % HPLC, COA included | Research-grade BPC-157 (5 mg vial), ≥99 % HPLC purity, lot COA, UK dispatch within 24 h. For research use only. | bpc-157 uk |
| `/peptides/tb-500/` | TB-500 (Thymosin β4 frag.) — ≥99 % HPLC | Research TB-500 / TMSB4X frag., HPLC ≥99 %, mass-spec verified, COA per batch, UK lab. RUO. | tb-500 uk |
| `/peptides/semaglutide/` | Semaglutide 5 mg — research grade, COA | Semaglutide for in-vitro research, ≥99 % HPLC, sealed vial, UK dispatch. RUO. | semaglutide research |
| `/peptides/tirzepatide/` | Tirzepatide 10 mg — ≥99 % HPLC, COA | Research-grade tirzepatide, dual GIP/GLP-1 agonist, lot COA, UK lab. RUO. | tirzepatide research |
| `/peptides/retatrutide/` | Retatrutide 10 mg — research grade | Triple agonist research peptide, ≥99 % HPLC, COA, UK dispatch. RUO. | retatrutide research |
| `/peptides/cagrilintide/` | Cagrilintide 5 mg — ≥99 % HPLC | Amylin analogue research peptide, lot COA, UK lab. RUO. | cagrilintide research |
| `/peptides/cjc-1295-no-dac/` | CJC-1295 No DAC 2 mg — ≥99 % HPLC | GHRH analogue (no DAC), HPLC ≥99 %, COA, UK lab. RUO. | cjc-1295 no dac |
| `/peptides/ipamorelin/` | Ipamorelin 5 mg — ≥99 % HPLC, COA | Selective GHRP, lot COA, UK dispatch within 24 h. RUO. | ipamorelin uk |
| `/peptides/ghrp-2/` | GHRP-2 5 mg — research grade | Growth-hormone-releasing peptide-2, ≥99 % HPLC, COA, UK lab. RUO. | ghrp-2 |
| `/peptides/ghrp-6/` | GHRP-6 5 mg — research grade | Growth-hormone-releasing peptide-6, ≥99 % HPLC, COA, UK lab. RUO. | ghrp-6 |
| `/peptides/melanotan-2/` | Melanotan-2 10 mg — ≥99 %, COA | MT-II research peptide, alpha-MSH analogue, lot COA, UK dispatch. RUO. | melanotan 2 uk |
| `/peptides/semax/` | Semax 30 mg — research grade | ACTH(4-10) heptapeptide research compound, lot COA, UK lab. RUO. | semax uk |
| `/peptides/selank/` | Selank 10 mg — research grade | Anxiolytic research peptide, lot COA, UK lab. RUO. | selank uk |
| `/peptides/epitalon/` | Epitalon 50 mg — research grade | Telomerase research peptide, lot COA, UK dispatch. RUO. | epitalon |
| `/peptides/ghk-cu/` | GHK-Cu 50 mg — copper-peptide, COA | Copper tripeptide research compound, lot COA, UK lab. RUO. | ghk-cu uk |
| `/peptides/nad-plus/` | NAD+ 500 mg — research grade | Research-grade NAD⁺, lot COA, UK dispatch. RUO. | nad+ research |
| `/peptides/aod-9604/` | AOD-9604 5 mg — hGH frag. 177-191 | Lipolytic hGH fragment research peptide, lot COA, UK lab. RUO. | aod-9604 |
| `/peptides/gh-frag-176-191/` | hGH Frag 176-191 5 mg — research | hGH fragment research peptide, lot COA, UK dispatch. RUO. | hgh fragment 176 191 |
| `/peptides/dsip/` | DSIP 5 mg — research grade | Delta sleep-inducing peptide, lot COA, UK lab. RUO. | dsip research |
| `/peptides/o-304/` | O-304 25 mg — research compound | AMPK activator research compound, lot COA, UK lab. RUO. | o-304 |
| `/peptides/tesofensine/` | Tesofensine 5 mg — research compound | Triple monoamine reuptake inhibitor, lot COA, UK lab. RUO. | tesofensine |
| `/peptides/5-amino-1mq/` | 5-Amino-1MQ 50 mg — NNMT inhibitor | NNMT inhibitor research compound, lot COA, UK lab. RUO. | 5-amino-1mq |
| `/peptides/bacteriostatic-water/` | Bacteriostatic water 30 ml — UK | 0.9 % benzyl-alcohol BAC water for reconstitution, UK dispatch. RUO. | bacteriostatic water uk |

### 4.4 Content gaps to create (Learn hub)

| New URL | Working title | Primary keyword | Word count |
|---|---|---|---|
| `/learn/glossary/` | Peptide research glossary (A–Z) | peptide glossary | 2 500 |
| `/learn/coa-explained/` | How to read a peptide COA | how to read coa hplc | 1 200 |
| `/learn/hplc-purity/` | What ≥ 99 % HPLC purity actually means | hplc purity peptides | 1 000 |
| `/learn/reconstitution-guide/` | Peptide reconstitution & dilution guide | reconstitute peptides | 1 500 |
| `/learn/storage-handling/` | Peptide storage & handling best practices | peptide storage | 1 200 |
| `/learn/lyophilized-peptides/` | Lyophilized vs liquid peptides | lyophilized peptide | 800 |
| `/learn/glp1-agonists-overview/` | GLP-1 agonists in metabolic research | glp-1 agonist research | 2 000 |
| `/learn/cpp-overview/` | Cell-penetrating peptides explained | cell penetrating peptide | 1 500 |
| `/learn/cas-numbers-explained/` | CAS numbers for peptides | peptide cas number | 600 |
| `/learn/dispatch-and-customs-uk/` | UK dispatch, customs and research peptides | peptides uk customs | 800 |
| `/learn/ruo-disclaimer/` | What "for research use only" means | research use only peptides | 600 |
| `/learn/buying-peptides-uk-checklist/` | Buying research peptides in the UK: a checklist | buy research peptides uk | 1 800 |

---

## 5. Internal link strategy

### 5.1 Hub-and-spoke rules

- **Home → 12 research-area hubs + 5 use-case hubs** (footer + mega-menu).
- **Research-area hub → all child product pages** (≤ 25) + sibling hubs (3 contextual links).
- **Product page → parent research-area hub + use-case hub + 4 sibling products + 1 Learn article**.
- **Learn article → ≥ 2 product pages with exact-match anchors** + parent hub.

### 5.2 Anchor-text guidelines

| Context | Anchor pattern | Example |
|---|---|---|
| Home → hub | "{Area} peptides" | "Neuroscience peptides" |
| Product → hub | "Browse {area} peptides" | "Browse hormone peptides" |
| Product → sibling | "{Compound name}" | "TB-500" |
| Learn → product | exact compound + variant | "BPC-157 5 mg" |
| Footer global | category title only | "Cardiovascular" |

**Forbid:** "click here", "read more", "learn more" without a noun.

### 5.3 Sitewide link slots (counts)

| Slot | Min outbound internal links |
|---|---|
| Mega-menu | 17 (12 areas + 5 use cases) |
| Footer | 24 |
| Product page body | 8 (3 sibling + 1 hub + 1 use case + 1 Learn + 1 COA + 1 quality) |
| Hub body | 1 link per child + 3 sibling-hub links |

---

## 6. On-page templates

### 6.1 Title tag formulas

| Template | Pattern |
|---|---|
| Home | `Research peptides UK — Lab-verified, COA included \| Peptide Shop` |
| Catalog hub | `Research peptides catalog — 12 areas, ≥99 % purity \| Peptide Shop` |
| Research-area hub | `{Area} peptides — research grade, lot COA \| Peptide Shop` |
| Use-case hub | `{Use case} peptides for research \| Peptide Shop` |
| Product | `{Compound} {size} — ≥99 % HPLC, COA \| Peptide Shop` (≤ 60) |
| Learn | `{Topic} — Peptide Shop Learn` |
| Blog | `{Title}` (≤ 60) |

### 6.2 Meta-description formula
- 140–155 chars
- Front-load primary keyword
- Include one differentiator (purity / COA / UK dispatch)
- End with `RUO.` for product pages

### 6.3 H1 / H2 outline (research-area hub example: Neuroscience)

```
H1: Neuroscience peptides
H2: Sub-topics in our neuroscience catalog
  H3: Alzheimer's disease (β-amyloid, tau, humanin)
  H3: Multiple sclerosis (MOG, MBP, PLP)
  H3: Parkinson's & synucleinopathies
H2: Why researchers choose Peptide Shop
H2: Recently published with our peptides
H2: FAQs about neuroscience peptides
```

---

## 7. Schema / structured data

Per page-type, emit:

| Page | Schema |
|---|---|
| All | `Organization`, `WebSite` (with valid `SearchAction`), `BreadcrumbList` |
| Home | + `ItemList` of featured products |
| Research-area hub | `CollectionPage` + `ItemList` of products |
| Product | `Product` with `offers` incl. `priceValidUntil`, `itemCondition`, `hasMerchantReturnPolicy`, `shippingDetails`, `aggregateRating`, `review[]`, `gtin`/`mpn` if assigned, `brand` |
| Learn / Blog | `Article` with `author`, `datePublished`, `dateModified`, `image`, `mainEntityOfPage` |
| FAQ-bearing pages | `FAQPage` (only if Q&A is visible to user) |
| Contact | `LocalBusiness` if a UK address is shown |

**Fix existing:** `WebSite.SearchAction` currently points to `/search?q=…` which doesn't exist. Either build the search route or remove the action.

---

## 8. Technical SEO checklist

| # | Item | Status (current) | Action |
|---|---|---|---|
| T1 | XML sitemap auto-generated | unverified | Use `@astrojs/sitemap`, exclude `/cart`, `/checkout`, `/api/**` |
| T2 | `robots.txt` | exists | Add `Sitemap:` line, disallow `/api/`, `/cart`, `/checkout` |
| T3 | hreflang | broken (self-loop) | Remove self-loop until real translations exist; keep only `<html lang="en-GB">` |
| T4 | Canonical | OK | Audit for trailing slash consistency |
| T5 | `noindex` on commerce flow | missing | Add `<meta name="robots" content="noindex,follow">` to `/cart`, `/checkout` |
| T6 | 404 page | unverified | Custom branded 404 with search + top categories |
| T7 | 301 redirect map (§ 3.3) | not in place | Implement |
| T8 | Image alt text | inconsistent | Audit all `<img>`, enforce via lint rule |
| T9 | Core Web Vitals | likely failing on mobile | Remove jQuery/Bootstrap JS, self-host fonts, lazy-load images, inline critical CSS |
| T10 | Mobile usability | filters hidden | Implement off-canvas filter drawer (DESIGN_SPEC § 7.5) |
| T11 | HTTPS | assumed | Force HSTS preload |
| T12 | Structured data | partial | Enrich `Product` (§ 7) |
| T13 | Open Graph / Twitter | partial | Add `og:site_name`, `og:locale`, `twitter:site` |
| T14 | Pagination | not implemented | Add `?page=` with `link rel=next/prev` and self-canonical |
| T15 | International expansion | none | Plan `/de/`, `/fr/` only when content exists |

---

## 9. Off-page / authority

- **Citations:** target peptide research subreddits (r/Peptides, r/PeptidesUK), Reddit AMA with QC scientist.
- **Press:** pitch to UK research-blog circuit (Drug Target Review, Genetic Engineering & Biotechnology News).
- **Scholarly:** offer free sample to authors of preprints citing similar peptides → earn methods-section mentions and DOI-anchored backlinks.
- **Directory:** Crunchbase, OpenCorporates, UK Trustpilot (verified reviews).
- **Avoid:** PBNs, paid blog networks, exact-match-anchor link buying.

---

## 10. Measurement plan

| KPI | Tool | Baseline measurement | 90-day target | 180-day target |
|---|---|---|---|---|
| Indexed pages | GSC | TBD (audit week 1) | + 35 | + 80 |
| Avg position (top-10 head terms) | GSC | TBD | < 25 | < 12 |
| Organic clicks / month | GSC | TBD | + 50 % | + 150 % |
| LCP (mobile, p75) | CrUX / PSI | TBD | ≤ 2.5 s | ≤ 2.0 s |
| INP (p75) | CrUX | TBD | ≤ 200 ms | ≤ 200 ms |
| Crawl errors | GSC | TBD | 0 | 0 |
| Rich results valid | GSC | partial | 100 % product | 100 % product + Article |
| Referring domains | Ahrefs | TBD | + 15 | + 40 |

Reporting cadence: weekly GSC + monthly executive summary.

---

## 11. Governance

- **Single source of truth** for keywords: `/seo/keywords.csv` (to be created).
- Every new page PR must include: title, meta, H1, primary keyword, internal links list, schema block.
- A11y + SEO checks gated in CI (`pa11y-ci`, `lighthouse-ci`, `astro check`).
