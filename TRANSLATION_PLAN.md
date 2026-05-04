# Peptide Shop — Multilingual Translation Plan

> **Scope:** Translate the entire Astro 5 storefront from English (default) into German, Dutch, French, Italian, and Spanish, with SEO-correct routing, a floating language switcher, and a sustainable content workflow.
>
> **Target locales (6):** `en` (default) · `de` · `nl` · `fr` · `it` · `es`
>
> **Stack reference:** Astro 5.16 SSR (Node adapter, standalone), React islands, content collections (Zod), Tailwind, sitemap integration, prerendered product/COA routes.

---

## Current Implementation Status (2026-05-01)

Implemented in code:

- Custom locale layer for `en`, `de`, `nl`, `fr`, `it`, `es`, with default English unprefixed and non-default locale prefixes.
- Locale-aware `Layout`, SEO metadata, language switcher, header/footer navigation, cart/checkout React islands, shop/product pages, support/legal pages, bundles, catalog and use-case hubs, search, 404, learn pages, and blog page chrome.
- Blog index/detail metadata, categories, tags, structured data, and article bodies are localized through `src/i18n/blogContent.ts` while preserving the current English markdown collection as the canonical slug/date source.
- Product detail pages, product cards, shop tables, catalog/use-case listings, search-visible product data, product FAQ text, generated product body copy, and product SEO/schema fields are localized at runtime through `src/i18n/productContent.ts` while preserving the current English product markdown files as canonical technical records.
- Search API results now accept a locale and return localized product, blog, and static-page titles/categories; API failure responses now use stable machine-readable `code` fields instead of English UI strings for search, enquiry, Bitcoin invoice, webhook, and COA PDF error paths.
- Sitemap generation now includes locale-prefixed virtual URLs with `@astrojs/sitemap` i18n alternate grouping for public pages, product detail routes, blog posts, catalog hubs, use-case hubs, and learn pages.
- Checkout validation and order-payment errors use stable client-side codes rendered through localized checkout labels, and Bitcoin invoice creation now goes through the server API with the active locale passed to BTCPay checkout language settings.
- COA HTML/PDF output now supports all six target locales (`en/de/nl/fr/it/es`), including Dutch and Italian strings, generated static HTML variants, product-page language links, localized footer policy links, and homepage COA language counts.
- Per-locale markdown drop folders exist at `src/content/products/<locale>/` and `src/content/blog/<locale>/` (`.gitkeep` placeholders). The loader at `src/lib/localizedEntry.ts` prefers `<locale>/<slug>.md` when present and falls back to the English canonical file. See `src/content/README.md`.
- Translator tooling is scaffolded: locked-term glossary at `src/i18n/glossary.csv` and a hard-coded-string scanner at `scripts/extract-i18n.mjs` (`npm run extract:i18n` → `scripts/i18n-extract-report.json`).
- Dictionary coverage guard at `npm run check:i18n`; current coverage is 835 English keys with non-empty values across all six locales.
- Production validation is currently clean with `npm run check:i18n` and `npx astro check`.

Still not fully implemented:

- Per-locale long-form product/blog markdown overrides — the folder skeleton and loader exist, but no translator-authored bodies have been added yet. All visible content is served by the runtime helpers and therefore needs no `noindex` fallback.
- Per-market SEO transcreation (Ahrefs/Semrush keyword research per locale) for `meta.title`/`meta.description` rewrites beyond the current literal translations.
- Transactional email sending / formal invoice template generation and native legal/scientific translation review remain pending. There is currently no production email sender or formal invoice template module in the codebase to localize directly.

---

## 1. Content Audit

A locale dictionary must cover every user-visible string the codebase emits. The audit is split into five layers.

### 1.1 Static page copy (Astro pages)

Located under `src/pages/`. Every `<h1>`, paragraph, button label, eyebrow, list item, alt text, microcopy, and error message must be extracted.

| Page | Path | Notes |
|------|------|-------|
| Home | [src/pages/index.astro](astro-peptide/src/pages/index.astro) | Hero, value props, featured grid headings |
| Shop | [src/pages/shop.astro](astro-peptide/src/pages/shop.astro) | Toolbar labels, sort/view options, empty state, drawer |
| Product detail | [src/pages/peptides/[slug].astro](astro-peptide/src/pages/peptides/%5Bslug%5D.astro) | Tab labels, badges, RUO banner, COA section, related-products heading |
| Catalogue hub | [src/pages/catalog/](astro-peptide/src/pages/catalog) | Area names also in `data/taxonomy.ts` |
| Use case hubs | [src/pages/use-case/](astro-peptide/src/pages/use-case) | |
| Cart | [src/pages/cart.astro](astro-peptide/src/pages/cart.astro) | Empty state, totals, minimum-order, CTA |
| Checkout | [src/pages/checkout.astro](astro-peptide/src/pages/checkout.astro) | Form labels, validation, payment terms |
| Bundles, About, Contact, FAQ, Quality, Shipping, COA policy, Privacy, Terms, Disclaimer, Wholesale, 404, Search | `src/pages/*.astro` | Include legal pages — must be reviewed by a native legal/medical translator |
| Insights | [src/pages/blog/](astro-peptide/src/pages/blog) | Article bodies are content collection (see 1.3) |
| Learn | [src/pages/learn/](astro-peptide/src/pages/learn) | |

### 1.2 Components (UI strings + ARIA)

Located in `src/components/` (Astro + React islands). Strings to extract:

- Header / nav: [Header.astro](astro-peptide/src/components/Header.astro) — primary nav, mobile drawer, mega-menu groupings, top bar (`Free EU shipping over €150`, etc.).
- Footer: [Footer.astro](astro-peptide/src/components/Footer.astro) — column titles, link labels, legal disclaimers.
- Sidebar / filters: [ShopSidebar.astro](astro-peptide/src/components/ShopSidebar.astro), [ShopFilters.astro](astro-peptide/src/components/ShopFilters.astro) — block titles, RUO note, "All areas".
- Cart islands (React): [CartModal.tsx](astro-peptide/src/components/CartModal.tsx), [CartNotification.tsx](astro-peptide/src/components/CartNotification.tsx), [CartIcon.tsx](astro-peptide/src/components/CartIcon.tsx), [CartPageContent.tsx](astro-peptide/src/components/CartPageContent.tsx), [Checkout.tsx](astro-peptide/src/components/Checkout.tsx), [AddToCartButton.tsx](astro-peptide/src/components/AddToCartButton.tsx), [ProductOptions.tsx](astro-peptide/src/components/ProductOptions.tsx).
- Search: [SearchBar.tsx](astro-peptide/src/components/SearchBar.tsx) — placeholder, no-results message.
- Misc: [PageTitle.astro](astro-peptide/src/components/PageTitle.astro), [PageHeading.astro](astro-peptide/src/components/PageHeading.astro), [SectionHeadingRow.astro](astro-peptide/src/components/SectionHeadingRow.astro), [Breadcrumb.astro](astro-peptide/src/components/Breadcrumb.astro), [RUOBanner.astro](astro-peptide/src/components/RUOBanner.astro), [ProductFAQs.astro](astro-peptide/src/components/ProductFAQs.astro), [ProductReviews.astro](astro-peptide/src/components/ProductReviews.astro), [RelatedProducts.astro](astro-peptide/src/components/RelatedProducts.astro), [ProductCard.tsx](astro-peptide/src/components/ProductCard.tsx).

### 1.3 Content collections (long-form)

Defined in [src/content/config.ts](astro-peptide/src/content/config.ts). Every translatable field per locale:

- **Products** (`src/content/products/*.md`, 48 entries):
  - `title`, `short_description`, `storage`, `package_sizes[]`, `price_range`
  - `meta.title`, `meta.description`
  - `faqs[].question`, `faqs[].answer`
  - `reviews[].title`, `reviews[].content`, `reviews[].author` (transliterate names; do not invent)
  - Markdown body (`Description` block)
  - **Do NOT translate:** `id`, `cas`, `molecular_weight`, `purity` (numeric), `sequence`, `category`, `researchArea`, `useCases`, `tags`, `images`, `primary_keyword` (kept for analytics; the localized SEO keyword goes into `meta.title`/`meta.description`).
- **Blog** (`src/content/blog/*.md`): `title`, `description`, `category`, `tags`, body, `meta.*`.
- **Taxonomy** ([src/data/taxonomy.ts](astro-peptide/src/data/taxonomy.ts)): `researchAreas[].name/short/description/keywords` and `useCases[].name/...`. Move display labels into a per-locale dictionary; keep slugs immutable.
- **Product catalogue JSON** ([src/data/product-catalogue.json](astro-peptide/src/data/product-catalogue.json)): translate user-facing fields if rendered.

### 1.4 SEO & structured data

- `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<meta name="twitter:*">` — emitted via [SEO.astro](astro-peptide/src/components/SEO.astro) and [Layout.astro](astro-peptide/src/layouts/Layout.astro). Must accept `locale` and a localized `title`/`description`.
- JSON-LD blocks in product, FAQ, breadcrumb, organization, and collection schemas (already injected in `[slug].astro` and `catalog/index.astro`) — propagate `inLanguage`, `name`, `description`, FAQ Q/A.
- `<html lang>` attribute: currently hard-coded `en` in [Layout.astro](astro-peptide/src/layouts/Layout.astro). Must become `Astro.currentLocale`.
- `hreflang` alternate links: emit one `<link rel="alternate" hreflang="…">` per locale plus `x-default`.
- Sitemap: `@astrojs/sitemap` already integrated — configure `i18n` option to emit per-locale URL groups with alternate refs.
- Robots/canonical: canonical URL must include the locale prefix; non-default locales should be canonical to themselves.
- COA i18n already exists for `en/de/fr/es` ([src/lib/coa/i18n.ts](astro-peptide/src/lib/coa/i18n.ts)) — extend to `nl` and `it` and align dictionary keys with the new global dictionary structure where overlap exists.

### 1.5 Dynamic / runtime strings

- API routes under [src/pages/api/](astro-peptide/src/pages/api) — error messages returned to the client (e.g. cart, checkout, COA download) must be either locale-aware or strictly machine-readable codes mapped client-side to localized strings.
- Store: [src/scripts/cartStore.ts](astro-peptide/src/scripts/cartStore.ts) — toast/notification text routed through the `t()` helper.
- Date, number, and currency formatting → use `Intl.DateTimeFormat`/`Intl.NumberFormat` with the active locale; price stays in EUR (`€`) but decimal/group separators differ (`1.299,00 €` for de/nl/it/es vs `€1,299.00` for en).
- Form validation libraries (HTML5 `required`, custom validators) — provide localized messages.

---

## 2. Technical Mapping

### 2.1 Routing strategy

Use Astro's built-in i18n routing (`astro.config.mjs`):

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'de', 'nl', 'fr', 'it', 'es'],
  routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  fallback: { de: 'en', nl: 'en', fr: 'en', it: 'en', es: 'en' },
}
```

URL shape:

| Locale | URL example |
|--------|-------------|
| English (default) | `/peptides/bpc-157/` |
| German            | `/de/peptides/bpc-157/` |
| Dutch             | `/nl/peptides/bpc-157/` |
| French            | `/fr/peptides/bpc-157/` |
| Italian           | `/it/peptides/bpc-157/` |
| Spanish           | `/es/peptides/bpc-157/` |

Slugs stay English to preserve link equity and existing 301 redirects in `astro.config.mjs`. (Optional Phase 2: localized slugs via a slug map per collection — see §4.7.)

### 2.2 Directory layout

```
src/
  i18n/
    config.ts                # locale list, default, labels, flag map
    ui.ts                    # type-safe t() helper
    dictionaries/
      en.json
      de.json
      nl.json
      fr.json
      it.json
      es.json
  content/
    products/
      en/<slug>.md
      de/<slug>.md
      ...
    blog/
      en/<slug>.md
      de/<slug>.md
      ...
  pages/
    [...index, shop, peptides, cart, ...]   # English routes
    [locale]/
      index.astro
      shop.astro
      peptides/[slug].astro
      ...                                    # Mirror of English, reads from locale-aware loaders
  components/
    LanguageSwitcher.astro                   # New (see §5)
```

Two viable layouts for the routed pages:

- **A. Mirror tree** (above) — duplicate Astro entry files under `src/pages/[locale]/`. Pro: explicit, no clever routing. Con: 2× page files.
- **B. Single dynamic prefix** — keep one set of pages and read `Astro.currentLocale`; rely on Astro's i18n middleware to resolve. Pro: DRY. Con: every page must accept locale; harder to special-case static prerendered routes.

**Recommendation: B (single tree with `Astro.currentLocale`)** because we already have prerendered `getStaticPaths` for products, COA, catalog and use-case hubs. Generate paths once per locale inside `getStaticPaths` (`for locale in locales: for slug in slugs: paths.push(...)`).

### 2.3 Dictionary access (`t()` helper)

```ts
// src/i18n/ui.ts
import en from './dictionaries/en.json';
import de from './dictionaries/de.json';
// ...
export const dictionaries = { en, de, nl, fr, it, es } as const;
export type Locale = keyof typeof dictionaries;

export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale] ?? dictionaries.en;
  return function t(key: string, vars?: Record<string, string | number>) {
    const value = key.split('.').reduce<any>((o, k) => o?.[k], dict) ?? key;
    return vars
      ? value.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
      : value;
  };
}
```

In `.astro` files: `const t = useTranslations(Astro.currentLocale as Locale);` then `<button>{t('cart.add')}</button>`.

In React islands: pass `locale` and the relevant slice of the dictionary via props (avoid bundling all 6 dictionaries in client JS). Provide a `<I18nProvider>` thin context wrapper so components can call `t()` without prop-drilling.

### 2.4 Content-collection localization

Restructure each collection per locale:

```ts
// src/content/config.ts
const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({ ..., locale: z.enum(['en','de','nl','fr','it','es']) }),
});
```

File layout: `src/content/products/<locale>/<slug>.md`. Loader helper:

```ts
export async function getProduct(slug: string, locale: Locale) {
  const all = await getCollection('products');
  return all.find(p => p.id === `${locale}/${slug}.md`)
      ?? all.find(p => p.id === `en/${slug}.md`); // fallback
}
```

The fallback to English ensures missing translations never 404; SEO can later detect `data.locale !== Astro.currentLocale` and emit `noindex` for those pages.

### 2.5 SEO surfaces

Update [src/components/SEO.astro](astro-peptide/src/components/SEO.astro) and [src/layouts/Layout.astro](astro-peptide/src/layouts/Layout.astro):

```astro
<html lang={Astro.currentLocale}>
  <head>
    <link rel="canonical" href={canonicalForLocale(Astro.url, locale)} />
    {locales.map(l => (
      <link rel="alternate" hreflang={l} href={alternateUrl(l)} />
    ))}
    <link rel="alternate" hreflang="x-default" href={alternateUrl('en')} />
    <title>{localizedTitle}</title>
    <meta name="description" content={localizedDescription} />
    <meta property="og:locale" content={ogLocale(locale)} />
  </head>
</html>
```

`og:locale` mapping: `en_US`, `de_DE`, `nl_NL`, `fr_FR`, `it_IT`, `es_ES`.

JSON-LD: add `inLanguage` to every schema; localize `name`/`description`.

Sitemap config:

```js
sitemap({
  i18n: {
    defaultLocale: 'en',
    locales: { en: 'en-US', de: 'de-DE', nl: 'nl-NL', fr: 'fr-FR', it: 'it-IT', es: 'es-ES' },
  },
});
```

### 2.6 SSR / API routes

Detect locale from URL prefix in middleware; expose `context.locals.locale`. Localize JSON error payloads via a small server-side `t()`. Cart line text and order confirmations honour the user-selected locale (persist in cookie `pref-lang`, default to URL).

### 2.7 Email & invoice templates

Order confirmation, shipping notification, and invoice/PDF messages must each accept a `locale` and load the matching template. Reuse the same dictionary subtree under a `transactional.*` namespace.

### 2.8 Currency & legal

- Currency stays EUR site-wide.
- VAT: legal copy on `/terms/`, `/privacy/`, `/disclaimer/` differs by jurisdiction; have a native lawyer review the German, Dutch, French, Italian, and Spanish versions before launch.
- COA labels: extend `SUPPORTED_LOCALES` in [src/lib/coa/i18n.ts](astro-peptide/src/lib/coa/i18n.ts) to add `nl` and `it`.

---

## 3. Translation Strategy

### 3.1 Recommended approach: **Hybrid (AI draft → professional review → SME sign-off)**

| Layer | Approach | Rationale |
|-------|----------|-----------|
| UI microcopy (buttons, nav, toasts) | AI (DeepL Pro / GPT-4-class) → in-house bilingual reviewer | Short, low-risk, repetitive. |
| Marketing pages (Home, About, Bundles, Quality) | AI draft → professional copywriter per language | Tone, brand voice, conversion. |
| Product descriptions, FAQs | AI draft → scientific editor (biochem/pharma background) | Accuracy of peptide terminology. |
| Legal (Terms, Privacy, Shipping, Disclaimer, COA policy, RUO banner) | Professional legal translator (native, jurisdiction-aware) | Liability. |
| Blog / Insights | Native copywriter from English brief; not a literal translation | Local SEO, examples, references. |
| SEO meta titles/descriptions | Localized **transcreation** (target keyword research per market) | Search intent differs by language. |

### 3.2 SEO localization rules

- Per-locale keyword research with Ahrefs / Semrush / Google Keyword Planner (set country + language). Do **not** translate the English target keyword literally.
- `meta.title` ≤ 60 chars after translation (German titles often expand 30%; keep brand suffix flexible).
- `meta.description` ≤ 155 chars; preserve a CTA.
- Localized H1 must contain the local primary keyword.
- Internal links use the active locale prefix (link helper `localizedHref(path, locale)`).
- Avoid duplicate content: ship `noindex` for any page that falls back to English until a real translation exists.
- Submit one sitemap per locale to Search Console (or a single multilingual sitemap with hreflang).

### 3.3 Cultural & tone guidance

- **German (de-DE):** Sie-form for B2B research customers; precise, technical register; hyphenated compounds reviewed for line-break friendliness in product cards.
- **Dutch (nl-NL):** U-form for legal/checkout, je-form for marketing; concise; avoid Belgian Dutch idioms.
- **French (fr-FR):** Vouvoiement; respect typographic spaces (` :` ` ;` ` ?`); avoid Quebec spellings.
- **Italian (it-IT):** Standard Italian; avoid Anglicisms in legal copy; gendered nouns reviewed for inclusive forms where natural.
- **Spanish (es-ES):** Castilian Spanish (vosotros optional, prefer plural ustedes-free phrasing for neutrality across LatAm secondary audience); avoid leísmo in CTAs.

### 3.4 Translation memory & glossary

- Maintain a TMX/glossary CSV under `src/i18n/glossary.csv` with locked terms: `peptide`, `vial`, `bacteriostatic water`, `HPLC`, `COA`, `RUO`, `lyophilized`, brand name `Peptide Shop`, abbreviations (`mg`, `mL`, `IU`).
- Plug into translator tooling (DeepL glossaries, Crowdin/Lokalise project glossary).
- Brand name and "RUO / For research use only" are **not translated** (regulatory marker), but the long-form sentence under `<RUOBanner>` is translated and references the abbreviation.

---

## 4. Implementation Roadmap

### Phase 0 — Preparation
1. Lock the dictionary key schema (see §2.3) and naming convention (`page.section.key`).
2. Set up Lokalise / Crowdin (or self-hosted Weblate) project with the 6 locales.
3. Create `src/i18n/` skeleton, `dictionaries/en.json` populated by extraction script.
4. Add CI lint that fails the build if a non-`en` dictionary key is missing or empty.

### Phase 1 — String extraction
1. Write `scripts/extract-i18n.mjs` that walks `src/components` and `src/pages`, regex-finds hard-coded text inside `>...<` and string literal props (e.g. `aria-label="…"`, `title="…"`), and writes a candidate `en.json` flat map.
2. Manual pass: refactor each component to call `t('namespace.key')` and remove the hard-coded string. Run `astro check` after each batch.
3. Move taxonomy display labels from `data/taxonomy.ts` into `dictionaries/en.json` under `taxonomy.researchAreas.<slug>.name`, etc.

### Phase 2 — Routing & layout
1. Add `i18n` block to `astro.config.mjs` (see §2.1).
2. Create middleware that resolves locale from URL → `context.locals.locale`.
3. Update `Layout.astro` to set `<html lang>` and inject hreflang/canonical via SEO component.
4. Add `localizedHref(path, locale)` helper and refactor all internal `<a href>` to use it.

### Phase 3 — Content collections
1. Migrate existing `src/content/products/*.md` into `src/content/products/en/`.
2. Update collection schema & loaders (see §2.4).
3. Update `getStaticPaths` in `[slug].astro`, `catalog/`, `use-case/`, `blog/` to emit `{ locale, slug }` tuples.
4. Run `astro check` and `astro build` to confirm prerendering still produces clean HTML for the English locale before adding translations.

### Phase 4 — Translation production (per locale, in this order: de → nl → fr → it → es)
1. Push `en.json` + product/blog markdown to TMS (Lokalise).
2. Apply glossary, run AI pre-translation.
3. Human reviewer (native + domain expertise) edits in TMS.
4. Pull translated `dictionaries/<locale>.json` and `content/<collection>/<locale>/*.md` into the repo via PR.
5. Build site for the new locale; spot-check 5 critical pages (home, shop, top product, cart, checkout) before merging.

### Phase 5 — UI/UX integration
1. Build `<LanguageSwitcher>` component (see §5).
2. Mount in `Layout.astro` (visible on every page).
3. Persist user choice in `pref-lang` cookie (1-year expiry, `SameSite=Lax`).
4. On first visit, suggest a locale based on `Accept-Language` (banner only — never auto-redirect, per Google's webmaster guidance).

### Phase 6 — SEO finalization
1. Verify hreflang clusters with Search Console's International Targeting report and tools like Sitebulb / Ahrefs.
2. Submit per-locale sitemaps; request indexing for the new URLs.
3. Update Organization JSON-LD with `sameAs` and `availableLanguage` array.
4. Update Open Graph image alt text per locale where appropriate.

### Phase 7 — Launch
1. Soft-launch behind `?preview-locale=de` for QA.
2. Open one locale at a time (recommended cadence: 1 per sprint after launch). Monitor 404s, hreflang errors, and Core Web Vitals per locale in Search Console.

---

## 5. UI/UX — Floating Language Switcher

### 5.1 Specification

- **Position:** fixed bottom-left, 16px from viewport edge on desktop; bottom-left at 12px on mobile but raised above the cart bar/safe-area inset.
- **Trigger:** circular pill showing the **current** flag + ISO code (e.g. 🇬🇧 EN). Click/tap toggles a popover.
- **Popover:** vertical list of all locales with flag emoji or SVG + native-language name (e.g. "Deutsch", "Nederlands"). Active item is highlighted and `aria-current="true"`.
- **Keyboard:** Tab into trigger, Enter/Space opens, Escape closes, Up/Down arrows traverse, Enter selects. Focus trap inside popover while open.
- **A11y:** trigger has `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`. List uses `role="listbox"`, items `role="option"`. Visible focus ring (`outline: 2px solid var(--color-primary)`).
- **Reduced motion:** respect `prefers-reduced-motion: reduce` (no slide animation, only opacity).
- **Color scheme:** matches site tokens; popover surface `#fff`, border `var(--color-border)`, shadow `var(--shadow-lg)`.
- **Print:** `@media print { .lang-switcher { display: none; } }`.

### 5.2 Behaviour

- Selecting a locale navigates to the same path under the new prefix:
  `current path = /peptides/bpc-157/?ref=hero` → `/de/peptides/bpc-157/?ref=hero`.
- Sets cookie `pref-lang=<locale>` (1 year, SameSite=Lax, Secure).
- On unsupported route under a locale, fall back to that locale's home (the i18n middleware handles it).

### 5.3 Component sketch

```astro
---
// src/components/LanguageSwitcher.astro
import { locales, localeMeta } from '../i18n/config';
const currentPath = Astro.url.pathname.replace(/^\/(de|nl|fr|it|es)(\/|$)/, '/');
const active = (Astro.currentLocale ?? 'en') as keyof typeof localeMeta;
---
<div class="lang-switcher" data-lang-switcher>
  <button
    class="lang-switcher__trigger"
    type="button"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="lang-list"
    aria-label={`Change language. Current: ${localeMeta[active].name}`}
  >
    <span class="flag" aria-hidden="true">{localeMeta[active].flag}</span>
    <span class="code">{active.toUpperCase()}</span>
  </button>

  <ul id="lang-list" class="lang-switcher__list" role="listbox" hidden>
    {locales.map((loc) => (
      <li role="option" aria-selected={loc === active}>
        <a
          href={loc === 'en' ? currentPath : `/${loc}${currentPath}`}
          hreflang={loc}
          data-locale={loc}
          aria-current={loc === active ? 'true' : undefined}
        >
          <span class="flag" aria-hidden="true">{localeMeta[loc].flag}</span>
          <span class="name">{localeMeta[loc].name}</span>
        </a>
      </li>
    ))}
  </ul>
</div>

<style>
  .lang-switcher {
    position: fixed;
    left: 16px;
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    z-index: 90;
  }
  .lang-switcher__trigger {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 14px;
    border-radius: 999px;
    background: #fff;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
    font-weight: 600; cursor: pointer;
  }
  .lang-switcher__trigger:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
  .lang-switcher__list {
    position: absolute; bottom: calc(100% + 8px); left: 0;
    list-style: none; margin: 0; padding: 6px;
    min-width: 200px;
    background: #fff; border: 1px solid var(--color-border);
    border-radius: var(--radius-md); box-shadow: var(--shadow-lg);
  }
  .lang-switcher__list a {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: var(--radius-sm);
    color: var(--color-ink); text-decoration: none; font-size: var(--text-sm);
  }
  .lang-switcher__list a[aria-current="true"],
  .lang-switcher__list a:hover { background: var(--color-primary-50); color: var(--color-primary); }
  @media (max-width: 600px) {
    .lang-switcher { left: 12px; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); }
  }
  @media print { .lang-switcher { display: none; } }
  @media (prefers-reduced-motion: reduce) { .lang-switcher__list { transition: none; } }
</style>

<script>
  const root = document.querySelector<HTMLElement>('[data-lang-switcher]');
  const trigger = root?.querySelector<HTMLButtonElement>('.lang-switcher__trigger');
  const list = root?.querySelector<HTMLUListElement>('.lang-switcher__list');
  const toggle = (open: boolean) => {
    if (!trigger || !list) return;
    list.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger?.addEventListener('click', () => toggle(list!.hidden));
  document.addEventListener('click', (e) => {
    if (root && !root.contains(e.target as Node)) toggle(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  list?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      const loc = a.getAttribute('data-locale');
      if (loc) document.cookie = `pref-lang=${loc}; path=/; max-age=31536000; samesite=lax`;
    })
  );
</script>
```

`src/i18n/config.ts`:

```ts
export const locales = ['en', 'de', 'nl', 'fr', 'it', 'es'] as const;
export const localeMeta = {
  en: { name: 'English',    flag: '🇬🇧', dir: 'ltr', og: 'en_US' },
  de: { name: 'Deutsch',    flag: '🇩🇪', dir: 'ltr', og: 'de_DE' },
  nl: { name: 'Nederlands', flag: '🇳🇱', dir: 'ltr', og: 'nl_NL' },
  fr: { name: 'Français',   flag: '🇫🇷', dir: 'ltr', og: 'fr_FR' },
  it: { name: 'Italiano',   flag: '🇮🇹', dir: 'ltr', og: 'it_IT' },
  es: { name: 'Español',    flag: '🇪🇸', dir: 'ltr', og: 'es_ES' },
};
```

> If emoji flags are inconsistent on Windows, swap to inline SVG flag set (e.g. `flag-icons` package, ~30 KB total when tree-shaken).

---

## 6. Quality Assurance

### 6.1 Linguistic QA

- **In-context review:** translators access the staging site via per-locale preview URLs (`https://staging.peptide-shop.net/de/`).
- **Pseudo-localization pass** (English wrapped in accents and padded 30%) before real translation lands — surfaces hard-coded strings and layout overflow early.
- **Glossary compliance check:** automated diff of translated files against `glossary.csv` to flag locked-term violations.
- **Inclusive language & bias review:** native reviewer second-pass.
- **Legal review sign-off:** required before publishing `terms`, `privacy`, `shipping`, `disclaimer`, `coa-policy`, `wholesale`.

### 6.2 SEO QA

- Validate hreflang clusters with Merkle's hreflang tester or Ahrefs Site Audit.
- Validate JSON-LD per locale (Google Rich Results Test).
- Ensure each locale's sitemap is reachable at `/sitemap-<locale>.xml` (or one combined `/sitemap-index.xml`).
- Verify `<html lang>` and `og:locale` per page (Lighthouse SEO audit).
- Check canonical URLs do not point cross-locale.
- Confirm 301s preserve locale prefix (e.g. `/de/peptides/buy-bpc-157` → `/de/peptides/bpc-157/`).

### 6.3 Functional QA

- Cross-browser: Chrome, Edge, Firefox, Safari (macOS + iOS), Samsung Internet on Android.
- Cross-device: 360px (small mobile), 768px (tablet), 1280px (desktop), 1920px (wide).
- Functional flows per locale: browse shop → add to cart → checkout → confirmation; COA download; language switch from each page persists path & cookie; back/forward navigation.
- Form validation messages render in the active locale.
- Email previews per locale (use Mailtrap / Litmus).

### 6.4 Performance & accessibility

- Lighthouse CI per locale, budget: LCP < 2.5s, CLS < 0.1, INP < 200ms, SEO ≥ 95, A11y ≥ 95.
- Axe-core run per locale on representative pages.
- Verify language switcher is reachable by keyboard alone and announced correctly by NVDA / VoiceOver.

### 6.5 Automated regression

- Playwright suite: one project per locale, smoke test the 6 critical flows.
- Snapshot test the language switcher popover.
- CI step: `node scripts/check-i18n-coverage.mjs` fails the build if any dictionary key in `en.json` is missing in another locale (with allow-list for intentional fallbacks).

### 6.6 Post-launch monitoring

- Search Console per property variant; weekly hreflang error report.
- GA4 / Plausible: segment by locale; track conversion rate, bounce rate, language-switcher click rate.
- 404 monitor (e.g. Sentry) tagged with locale.

---

## 7. Risk Register & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| German/French copy overflows product cards | High | Medium | Pseudo-loc pass; CSS uses `min-width: 0` and `text-wrap: balance`; per-card hyphenation. |
| Legal copy inaccurate per jurisdiction | Medium | High | Native legal review per locale before publish. |
| Duplicate-content penalty if translations missing | Medium | High | `noindex` fallback pages; complete translations before locale goes public. |
| Cookie-based redirect causes Googlebot loops | Low | High | Banner suggestion only — never auto-redirect. |
| Emoji flags render inconsistently | Medium | Low | Swap to SVG flag set. |
| Translation drift over time | High | Medium | TMS as single source; CI coverage check; quarterly audit. |

---

## 8. Acceptance Criteria

A locale is "Done" when:

1. 100% of `en.json` keys have non-empty translations.
2. All 48 product markdown files exist under `src/content/products/<locale>/` with full frontmatter and translated body.
3. Blog & legal pages have a published version.
4. Lighthouse SEO and A11y ≥ 95 on Home, Shop, Product, Cart, Checkout.
5. hreflang validator returns no errors.
6. Sitemap submitted and indexed in Search Console.
7. Language switcher routes correctly from every page in the locale.
8. Cart → Checkout → order email all render in the locale.
9. QA sign-off from native reviewer + product owner.

---

## 9. Estimated Workstream Sequencing

> Effort estimates intentionally omitted; treat as relative ordering.

```
Phase 0  Setup + dictionary skeleton
Phase 1  Extract & refactor strings to t()
Phase 2  Routing, hreflang, sitemap, layout
Phase 3  Migrate content collections to en/
Phase 4  de translation → review → merge
         nl translation → review → merge
         fr translation → review → merge
         it translation → review → merge
         es translation → review → merge
Phase 5  Language switcher + cookie persistence
Phase 6  SEO finalization
Phase 7  Soft launch → monitor → public launch (one locale at a time)
```

---

## 10. Appendices

### A. Suggested dictionary namespaces

```
common.*           # buttons, generic labels, units
nav.*              # header + footer
home.*
shop.*
product.*
cart.*
checkout.*
seo.*              # site-wide SEO defaults
forms.*            # validation messages
toast.*            # cartStore notifications
ruo.*              # banner heading + body
taxonomy.researchAreas.<slug>.{name,short,description}
taxonomy.useCases.<slug>.{name,description}
transactional.*    # email subjects + bodies
errors.*           # API error code → message map
```

### B. Reusable helpers to add

- `localizedHref(path, locale)`
- `alternateUrl(locale, currentPath)`
- `formatCurrency(amount, locale)` (Intl.NumberFormat, `currency: 'EUR'`)
- `formatDate(iso, locale)` (Intl.DateTimeFormat)
- `getLocalizedProduct(slug, locale)` with English fallback
- `t(key, vars)` server-side; React `useT()` hook for islands

### C. Tooling shortlist

- **TMS:** Lokalise (recommended), Crowdin, or Weblate (self-host).
- **MT engines:** DeepL Pro (best EU language quality) primary; OpenAI/Anthropic for transcreation prompts.
- **Glossary:** maintained in TMS + mirrored as `src/i18n/glossary.csv` for CI checks.
- **SEO:** Ahrefs / Semrush per-country data; Sitebulb crawler for hreflang.
- **QA:** Playwright, axe-core, Lighthouse CI, Mailtrap.

---

*End of plan.*
