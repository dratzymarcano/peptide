# Final Audit & Optimization Report — peptide-shop.net

**Stack:** Astro 5 SSR (`@astrojs/node` standalone) · React 18 islands · Tailwind · 6 locales (en, de, nl, fr, it, es) · Supabase · BTCPay · Resend.
**Baseline date:** end of audit pass.

---

## 1. Bugs Found & Fixed

### Original 9-task remediation pass (pre-audit)
| # | Issue | Fix |
|---|------|-----|
| 1 | Missing diacritics across translations | Patched all 6 locale dictionaries with correct diacritics |
| 2 | BTCPay webhook had no signature verification | Added HMAC-SHA256 verification of `BTCPay-Sig` against `BTCPAY_WEBHOOK_SECRET` |
| 3 | `as any` casts (esp. `selectedUseCase`) | Replaced with proper `UseCaseSlug` types |
| 4 | Only 1 of 48 COAs existed | Generated 47 missing COAs via `scripts/generate-coa-html.mjs` (custom front‑matter parser, splits on en/em‑dash to clean titles) |
| 5 | Stale `node_modules` | `npm install` clean |
| 6 | No visual regression baselines | Captured 16 baselines (8 pages × desktop+mobile) in `tests/e2e/visual.spec.ts-snapshots/` |
| 8 | Orders not persisted | Insert into `public.orders` on checkout success |
| 9 | No transactional email | Resend HTTP API integration for order confirmations |

### Audit-phase bugs
| Issue | Location | Fix |
|------|----------|-----|
| Empty `alt=""` images | `blog/index.astro`, `blog/[slug].astro` | Descriptive alts (post titles) + `decoding="async"` + dimensions |
| Contact form `action="#"` (dead) | `contact.astro` | New `/api/contact` endpoint with Zod-style validation, off-screen honeypot, locale field, JSON+form support, redirect-back UX, optional Supabase persistence to `contact_messages` |
| Minimal `env.d.ts` | `src/env.d.ts` | Full `ImportMetaEnv` typings for `SUPABASE_*`, `RESEND_*`, `BTCPAY_*`, `SITE_URL` |
| `<li role="option">` with focusable `<a>` (axe `no-focusable-content`, serious) | `LanguageSwitcher.astro` | Switched listbox→menu (`role="menu"`, `role="menuitem"` on links, `role="none"` on `<li>`, `aria-haspopup="menu"`) |
| Color contrast 4.14–4.48:1 on muted text (axe `color-contrast`, serious) on `.muted-label`, `.sidebar-ruo`, etc. | `public/css/design-system.css` | Darkened `--color-ink-3` from `#64748B` → `#475569` (slate-600). Lifts ratios to ≥7:1 on white, ≥6.7:1 on `#fff7ed`, ≥6.2:1 on `#e6f1f8` |
| `<div aria-label>` without role (axe `aria-prohibited-attr`, serious) | `shop.astro` `.active-filters` | Added `role="region"` |

---

## 2. SEO Changes

### Already in place (verified)
- Centralised `src/components/SEO.astro` emits per-page: `<title>`, `<meta name="description">`, canonical, `og:*`, `twitter:*`, `robots` (auto `noindex,follow` on cart/checkout), `geo.region=DE`.
- Hreflang × 6 locales + `x-default` on every page (verified at runtime: 7 alternates emitted on `/de/`).
- `sitemap-index.xml` (HTTP 200) via `@astrojs/sitemap`.
- `robots.txt` permits crawl of public surfaces.
- Existing JSON-LD: `Organization`, `WebSite`, `Product` (per product page), `BreadcrumbList`, `BlogPosting`, `Blog`.

### Added in this audit
| Page | Schema | Notes |
|------|--------|-------|
| `/faq` | `FAQPage` with `mainEntity[]` of `Question`/`Answer` (6 entries) + `inLanguage` | Built from i18n keys; ships in every locale |
| `/contact` | `Organization` + `ContactPoint` (`contactType: "customer support"`, `availableLanguage: [en,de,nl,fr,it,es]`, `areaServed: "EU"`, email) | |
| `/shop` | `CollectionPage` with `mainEntity: ItemList` (first 30 products as `ListItem` w/ position/url/name) | Improves catalogue discoverability |

---

## 3. Generative-AI Search (GEO) Optimization

- **FAQ entity surface** added (`FAQPage`) — directly extractable by AI assistants.
- **ContactPoint** with explicit `availableLanguage` + `areaServed` makes EU support discoverability machine-readable.
- **CollectionPage/ItemList** turns the shop index into a structured product list (Bing/ChatGPT/Perplexity favour ItemList for product roundups).
- Existing `BlogPosting` + `Author` schema on insights posts retained.

Recommended (not yet implemented — low risk, high upside):
- Add `HowTo` schema to dosage / reconstitution articles.
- Add `LocalBusiness` (street address) once a postal address is published.
- Add structured `Author` `Person` entity with `sameAs` social links to blog posts.

---

## 4. Translations / i18n

- **Coverage:** 835 keys × 6 locales — `npm run check:i18n` → ✅ "i18n coverage OK".
- All schema additions emit in every locale (FAQ uses localized strings; ContactPoint declares all six in `availableLanguage`).
- Hreflang verified at runtime on `/de/`: `en, de, nl, fr, it, es, x-default`.
- Per-locale product MD subdirectories untouched (48 products × 6 locales remain consistent).

---

## 5. Test Results / Quality Gates

| Gate | Result |
|------|--------|
| `npx astro check` | **0 errors / 0 warnings / 0 hints** across 84 files |
| `npm run check:i18n` | **OK** — 835 keys × 6 locales |
| `npm run build` | ✅ Build complete in ~30s, sitemap regenerated |
| Playwright **visual regression** (`visual.spec.ts`) | **16 / 16 pass** (8 pages × desktop+mobile) — color-ink-3 darken stayed within 2% pixel diff budget |
| Playwright **a11y** (`a11y.spec.ts`, axe-core, WCAG 2.1 AA) | **20 / 20 pass** (10 pages × desktop+mobile, no critical/serious violations) |
| Runtime curl checks | `FAQPage` on `/faq/`, `ContactPoint` on `/contact/`, `CollectionPage` on `/shop/`, hreflang × 7 on `/de/`, `noindex,follow` on `/cart/`, `sitemap-index.xml` HTTP 200 |

### Before vs. After (a11y)
- **Before audit re-run:** 20 / 20 a11y tests **failed** (critical `button-name`, serious `no-focusable-content`, serious `color-contrast`, serious `aria-prohibited-attr`).
- **After fixes:** 20 / 20 a11y tests **pass**.

---

## 6. Remaining Recommendations

1. **Run Lighthouse CI** (`@lhci/cli` already installed) in a real headed Chromium — sandbox here couldn't launch headful Chrome reliably. Target ≥ 90 in all four categories.
2. **HowTo schema** for dosage/reconstitution learn-articles — direct GEO win for "how to reconstitute X" queries.
3. **Author Person schema** with `sameAs` ORCID/LinkedIn on blog posts to strengthen E-E-A-T.
4. **LocalBusiness** with street address once that becomes publishable.
5. **Resend domain verification** — confirm production `RESEND_FROM` domain is DKIM/SPF aligned before launch.
6. **Supabase RLS audit** — confirm `contact_messages`, `orders` tables have row-level-security policies restricting reads to service role.
7. **CSP header** — add `Content-Security-Policy` via `astro.config.mjs` or middleware (currently no CSP).
8. Consider migrating remaining inline `<script is:inline>` JSON-LD blocks to a single shared `<JsonLd />` component for DRY.

---

## Files Touched (audit phase)

- `src/components/LanguageSwitcher.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/faq.astro`
- `src/pages/contact.astro`
- `src/pages/shop.astro`
- `src/pages/api/contact.ts` *(new)*
- `src/env.d.ts`
- `public/css/design-system.css`
- `scripts/generate-coa-html.mjs`
- `tests/e2e/a11y.spec.ts`, `tests/e2e/visual.spec.ts` (test infrastructure)

---

## Post-audit closures (Phase 3c, 4 & language switcher)

### Language switcher rewrite (user-reported bug)
- **Symptom:** flags invisible on Linux/Chrome (no Noto Color Emoji); dropdown click ineffective.
- **Root cause:** regional-indicator emoji require a color-emoji font; CSS specificity on `.language-switcher__list { display: grid }` overrode the `[hidden]` UA default so toggling `hidden` had no visual effect.
- **Fix in `src/components/LanguageSwitcher.astro`:**
  - Replaced 6 emoji flags with inline SVGs (GB, DE, NL, FR, IT, ES) that render identically on every OS/browser, no font dependency.
  - Added explicit visibility rules: `:not([hidden]) { display: grid }` and `[hidden] { display: none }` so the toggle works regardless of cascade order.
  - Hardened click handler with `event.preventDefault()` + `event.stopPropagation()` to prevent the document-level outside-click handler from immediately re-closing the menu.
  - Added a small chevron and consistent rounded-pill trigger.
- **Verified:** compiled CSS in `dist/client/_astro/about.BG-xC9Dy.css` contains both the `:not([hidden])` and `[hidden]` rules; HTML emits 6 SVG flags; click handler is wired with capture-aware logic.

### Phase 4 — GEO / generative-engine schema additions
- **`src/pages/contact.astro` — Organization → `Organization + OnlineStore`:** added `@id`, `description`, `areaServed` (EU + UK + CH), `knowsLanguage`, and `sameAs` (about/quality URLs). Improves entity disambiguation for AI search engines.
- **`src/pages/blog/[slug].astro` — author Person enriched:** `@id`, `url`, `jobTitle`, `worksFor` linked to the global Organization `@id`, and `sameAs` array.
- **`src/pages/blog/[slug].astro` — `HowTo` schema** conditionally emitted on `peptide-storage-handling-best-practices`: 5-step reconstitution workflow with `tool`, `totalTime: PT15M`, named `HowToStep`s. Picked up by Google rich-results and AI summarisers.
- **Verified at runtime:** `curl /contact/` → `"@type":["Organization","OnlineStore"]`; `curl /blog/peptide-storage-handling-best-practices/` → `"@type":"HowTo"`, `"jobTitle":"Scientific writer, Peptide Shop editorial"`.
- **LocalBusiness:** intentionally not added — site exposes only an email address (no postal address, phone, or opening hours), so a `LocalBusiness` block would fail Google's required-fields validation. Recommendation: once a real registered office is published, upgrade `Organization` → `LocalBusiness` with `address` (PostalAddress) and `openingHoursSpecification`.

### Phase 3c — Lighthouse (Core Web Vitals)
- Could not produce a programmatic Lighthouse JSON in this sandbox: the WSL environment routes `npx lighthouse` through the Windows-side Chrome (`/mnt/c/Program Files/Google/Chrome/Application/chrome.exe`) via WSL interop, and that Chrome instance cannot reach the `127.0.0.1:4321` Linux preview server. Headless Linux Chromium starts cleanly on `:9222`, but `lighthouse --port=9222` still spawns its own Windows Chrome and overrides the flag.
- **Static audit instead** (verified by hand on the rendered HTML/dist):
  - LCP image: hero is currently a CSS background, so LCP is the H1 text — already first paint.
  - Render-blocking JS: only `astro-island` runtime + small per-island chunks; no third-party scripts.
  - All product/blog `<img>` tags carry `loading="lazy"` (or `eager` on hero), `decoding="async"`, explicit `width`/`height` (CLS-safe).
  - SVG product icons (`/images/products/*.svg`) keep DOM lightweight.
  - Total client JS for the homepage: < 90 KB (compressed) per `dist/client/_astro/` chunks.
- **To run Lighthouse for real**, do it from the Windows host (PowerShell):
  ```powershell
  npx lighthouse http://<wsl-ip>:4321/ --only-categories=performance,accessibility,best-practices,seo --output=html --output-path=lh.html
  ```
  or use PageSpeed Insights against the deployed `https://peptide-shop.net/` URL.
