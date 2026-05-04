# DESIGN_SPEC.md — UI Style Guide & Redesign Blueprint

Inspired by **eurogentec.com**, adapted for **peptide-shop.net**'s B2C-leaning research-peptide catalog. The spec is implementation-ready for an Astro + Tailwind (recommended) or Astro + CSS Custom Properties stack. Bootstrap 4 + jQuery are **deprecated** by this spec (see [UPDATE_PLAN.md](UPDATE_PLAN.md) for migration order).

---

## 1. Design principles

1. **Clinical clarity over decoration.** White surfaces, one accent, no gradients on functional UI.
2. **Information density at the catalog level.** A scientist scans dozens of SKUs per visit; cards are compact, sortable, filterable.
3. **Authority through citation.** Every claim (purity, lead time, certification) is backed by a downloadable artifact (COA PDF, ISO cert, batch report).
4. **Performance is a feature.** Budget: ≤ 90 KB JS, ≤ 50 KB CSS, LCP ≤ 2.0 s on 4G/Moto G.
5. **Accessibility is non-negotiable.** WCAG 2.2 AA minimum; AAA for body text where feasible.

---

## 2. Typography system

### 2.1 Font families

| Role | Family | Source | Weights | Notes |
|---|---|---|---|---|
| UI / Body | **Inter** (variable) | self-hosted, `font-display: swap` | 400, 500, 600, 700 | Replaces Raleway. Better at small sizes. |
| Display (optional) | **Inter Display** or `Inter` 700/800 | self-hosted | 700, 800 | Hero only. |
| Monospace (sequences, SKU) | **JetBrains Mono** or `ui-monospace` | self-hosted / system | 400, 500 | For peptide sequences `H-Gly-Pro-…-OH`. |

CSS:

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}
```

### 2.2 Type scale (modular, 1.200 minor third, 16 px base)

| Token | px / rem | Use |
|---|---:|---|
| `text-xs` | 12 / 0.75 | Eyebrow, captions, table micro |
| `text-sm` | 14 / 0.875 | Secondary text, breadcrumbs |
| `text-base` | 16 / 1.00 | Body |
| `text-lg` | 18 / 1.125 | Large body, intro paragraph |
| `text-xl` | 20 / 1.25 | Card title |
| `text-2xl` | 24 / 1.50 | H3, section subtitle |
| `text-3xl` | 30 / 1.875 | H2 |
| `text-4xl` | 36 / 2.25 | H1 (interior pages) |
| `text-5xl` | 48 / 3.00 | H1 (home hero only) |

**Line-height:** body 1.6, headings 1.2, eyebrow 1.4.
**Letter-spacing:** body `0`, eyebrow `0.08em` uppercase, H1–H2 `-0.01em`.
**Max measure:** 72ch for prose blocks.

### 2.3 Heading rules
- Exactly one `<h1>` per page (the page title).
- `<h2>` opens every major section; `<h3>` for cards, FAQs, sub-sections.
- Eyebrow above H1 in small caps (`PEPTIDES`, `RESEARCH AREA`, `BLOG POST`).

---

## 3. Color system

### 3.1 Brand palette

| Token | Hex | Usage |
|---|---|---|
| `--color-ink` | `#0F172A` | Primary text, H1–H3 |
| `--color-ink-2` | `#334155` | Body |
| `--color-ink-3` | `#64748B` | Muted text (must not be < 14 px on white) |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-surface-2` | `#F8FAFC` | Section alternate, table zebra |
| `--color-border` | `#E2E8F0` | 1 px dividers, card border |
| `--color-border-strong` | `#CBD5E1` | Inputs |
| `--color-primary` | `#005B8C` | Brand accent (deeper, more clinical than `#0077b6`) |
| `--color-primary-600` | `#00496F` | Hover |
| `--color-primary-50` | `#E6F1F8` | Tinted surface, badges |

### 3.2 Functional colors

| Token | Hex | AA on white | Use |
|---|---|---|---|
| `--color-success` | `#0F7B3F` | 5.5 : 1 | In stock, COA verified |
| `--color-warning` | `#B45309` | 4.7 : 1 | Low stock, lead-time notice |
| `--color-danger` | `#B42318` | 6.0 : 1 | Out of stock, errors |
| `--color-info` | `#0B5FB7` | 6.4 : 1 | Banner, advisory |

### 3.3 Forbidden
- Multi-color gradients on functional UI (cards, buttons, hero).
- Drop shadows on cards by default. Allowed only on overlays (modals, popovers).
- Color used as the *only* signal (always pair with icon or text).

### 3.4 Contrast targets
- Body text on white: **≥ 7 : 1** (AAA).
- UI text ≥ 12 px: **≥ 4.5 : 1** (AA).
- Non-text indicators (focus ring, borders): **≥ 3 : 1**.

---

## 4. Spacing, radius, elevation

### 4.1 Spacing scale (4 px base)

`0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

Tokens: `--space-1 .. --space-32`. All paddings/margins must come from this scale.

### 4.2 Border radius
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4 px | Buttons, inputs, badges |
| `--radius-md` | 6 px | Cards |
| `--radius-lg` | 12 px | Modals, drawers |
| `--radius-pill` | 999 px | Filter chips |

### 4.3 Elevation
| Token | Shadow | Use |
|---|---|---|
| `--shadow-0` | none | Default cards |
| `--shadow-1` | `0 1px 2px rgb(15 23 42 / 0.06)` | Sticky header on scroll |
| `--shadow-2` | `0 8px 24px rgb(15 23 42 / 0.08)` | Dropdown, popover |
| `--shadow-3` | `0 24px 48px rgb(15 23 42 / 0.16)` | Modal |

---

## 5. Layout grid

- **Container:** max-width `1280px`, gutters `24px` (desktop) / `16px` (mobile).
- **12-column** grid on `≥ 1024px`, **8-column** on `≥ 640px`, **4-column** on mobile.
- Section vertical rhythm: `--space-20` (80 px) desktop, `--space-12` (48 px) mobile.
- Breakpoints (mobile-first): `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1440`.

---

## 6. Component library

### 6.1 Buttons

```html
<button class="btn btn-primary">Add to cart</button>
<button class="btn btn-secondary">Download COA</button>
<button class="btn btn-ghost">Learn more</button>
<button class="btn btn-primary" disabled>Out of stock</button>
```

| Variant | BG | Text | Border | Hover | Disabled |
|---|---|---|---|---|---|
| Primary | `--color-primary` | white | none | `--color-primary-600` | bg `--color-ink-3`, opacity 0.5 |
| Secondary | white | `--color-primary` | 1 px `--color-primary` | bg `--color-primary-50` | as above |
| Ghost | transparent | `--color-ink-2` | none | bg `--color-surface-2` | as above |
| Danger | `--color-danger` | white | none | darken 8 % | as above |

Sizes (height / padding-x / font):
- `sm` 32 / 12 / 14
- `md` 40 / 16 / 14 (default)
- `lg` 48 / 24 / 16

States:
- `:hover` 150 ms ease-out
- `:focus-visible` outline `2px solid var(--color-primary)`, offset 2 px
- `:active` translate-y 1 px

### 6.2 Cards

**Category card** (used on the new research-area hub):

```
┌─────────────────────────────┐
│   [icon 32×32]              │
│                             │
│   Neuroscience              │  ← H3, text-xl, ink
│   18 peptides · 4 families  │  ← text-sm, ink-3
│   ──────────────────        │
│   View collection →         │  ← ghost button
└─────────────────────────────┘
```
- BG white, 1 px `--color-border`, `--radius-md`, no shadow.
- Hover: border becomes `--color-primary`, no transform.
- Min-height `200 px`, padding `24 px`.

**Product card** (catalog grid):

```
┌──────────────────────────────┐
│ [image 1:1]                  │
├──────────────────────────────┤
│ BPC-157          [✓ 99.2 %]  │  ← badge = purity
│ 5 mg vial · CAS 137525-51-0  │
│ ★★★★★ 4.9 (128)              │
│ £39.00                       │
│ [ Add to cart ] [ COA ↓ ]    │
└──────────────────────────────┘
```
- 1 px border, no shadow at rest, `--shadow-1` on hover.
- Image lazy-loaded, `aspect-ratio: 1`, `object-fit: contain`, BG `--color-surface-2`.
- Sequence and CAS in `--font-mono`.

### 6.3 Inputs & forms

- Height 40 px, padding 12 px, border 1 px `--color-border-strong`, radius `--radius-sm`.
- Label above, 14 px, weight 500.
- Helper text 12 px `--color-ink-3` below.
- Error: border `--color-danger`, message `--color-danger`, `aria-invalid="true"`.
- Focus: border `--color-primary`, ring 3 px `--color-primary-50`.
- Always pair `<label for>` with `<input id>`. No placeholder-as-label.

### 6.4 Filter chips & pills
- Height 32 px, radius pill, border 1 px `--color-border`, BG white, label 13 px.
- Selected: BG `--color-primary-50`, border `--color-primary`, text `--color-primary`, leading checkmark icon 14 px.
- Removable: trailing `×` icon (14 px) with `aria-label="Remove filter {name}"`.

### 6.5 Tables (catalog list view)

- Use `<table>` with `<caption>` (visually hidden) for SR users.
- Sticky `<thead>` on scroll. Zebra rows `--color-surface-2`.
- Numeric columns right-aligned, monospace.
- Sortable headers: button-in-th with `aria-sort="ascending|descending|none"`.

### 6.6 Navigation

**Top utility bar (32 px):** support phone · COA policy · GBP/EUR · cart count.
**Primary nav (64 px, sticky):**
- Logo (28 px svg) + wordmark
- Mega-menu: **Catalog** (by research area, 4 columns), **Custom synthesis**, **Bundles**, **Wholesale**, **Learn**, **About**
- Right: search (icon → expanding input, ⌘K), cart

**Mega-menu** opens on hover (≥ 1024 px) and on click (touch). Keyboard: `↓` to enter, `Esc` to close, focus trap inside.

**Breadcrumb** (every page except home): eyebrow row `Home / Catalog / Neuroscience / BPC-157`, `text-sm` ink-3, current item bold ink.

### 6.7 Tabs (used on product detail)

`Description · Sequence & data · Storage · COA · References · FAQs · Reviews`
- Underline tabs, 48 px height, active border-bottom 2 px `--color-primary`.
- Implementation: anchor links + `IntersectionObserver` for scroll-spy (no JS framework needed).

### 6.8 Empty / loading / error states
- Empty: illustration 96 px, headline, one CTA.
- Skeleton: `--color-surface-2` blocks with `prefers-reduced-motion` respected.
- Error: red banner top of region, retry button.

---

## 7. Page templates

### 7.1 Home (`/`)

```
┌─ Top utility bar ─────────────────────────────────┐
├─ Sticky nav ──────────────────────────────────────┤
│  Hero (white BG, no gradient)                      │
│   Eyebrow: RESEARCH PEPTIDES · UK                  │
│   H1: Lab-verified peptides for research           │
│   Sub: ≥99 % purity, third-party HPLC, COA on...   │
│   [ Browse catalog ] [ Download sample COA ]       │
│   Trust row: ISO 9001 · UK Lab · 24h dispatch      │
├────────────────────────────────────────────────────┤
│  Research areas grid (12 category cards)           │
├────────────────────────────────────────────────────┤
│  Featured catalog peptides (8 product cards)       │
├────────────────────────────────────────────────────┤
│  Quality & compliance band (3 columns)             │
├────────────────────────────────────────────────────┤
│  Latest from the Learn hub (3 article cards)       │
├────────────────────────────────────────────────────┤
│  Footer (6 columns)                                │
└────────────────────────────────────────────────────┘
```

### 7.2 Catalog hub (`/catalog`) — **NEW**

Mirror of Eurogentec's `/catalog-peptides`. 12 research-area cards with count + short description.

### 7.3 Research-area page (`/catalog/{area}`) — **NEW**

- H1: "{Area} peptides"
- Intro paragraph (80–120 words, includes the head term)
- Sub-family list (e.g. for Neuroscience: Alzheimer's, Parkinson's, Multiple Sclerosis, Tau, Humanin)
- Each sub-family is a card linking to its cluster page **or** an inline list of products
- Right-rail: top 5 best-selling SKUs in this area
- Bottom: scientific publications, related Learn articles

### 7.4 Cluster / family page (`/catalog/{area}/{family}`) — **NEW (where SKU count justifies)**

For families with ≥ 6 products. Same template as research area but one level deeper.

### 7.5 Catalog list (`/shop`)

Two view toggles: **Grid** (default) and **Table**.
- Sticky filter sidebar (research area, family, modification, purity, lead time, price).
- Mobile: filters in an off-canvas drawer triggered by a 48 px sticky "Filters (n)" button.
- Sort: featured / price / purity / a-z. **Wired**, not decorative.
- Pagination 24 / 48 / 96 per page; URL-driven (`?page=2&area=neuroscience`).

### 7.6 Product detail (`/peptides/{slug}` — keep slug)

```
Breadcrumb
H1 + eyebrow (research area)
[Image gallery]   [Buy box: variant select, qty, price, add-to-cart, COA ↓]
Tabs: Description · Sequence & data · Storage · COA · References · FAQs · Reviews
Related peptides (same family, 4 cards)
Trust band (RUO disclaimer, ISO, returns)
```

### 7.7 Learn / Blog
- Article hub with topic chips.
- Post template: H1, eyebrow date+author, TOC sidebar (sticky), 65–72ch measure, in-line product callouts.

### 7.8 Cart and checkout
- Single-column 480 px max on cart drawer.
- Checkout: delivery, payment and review steps, progress indicator, no surprise fees.

---

## 8. Header & footer specification

### 8.1 Header sitemap (priority order)

1. **Catalog** (mega)
   - Neuroscience · Cardiovascular · Diabetes · Cancer & Apoptosis · Adhesion & ECM · Cell & Tissue · Immunology · Epigenetics · Hormones · Cell Signaling · Protein Analysis · Cell Permeable
2. **Custom synthesis** (future / mark "Coming soon" if not live)
3. **Bundles**
4. **Wholesale**
5. **Learn**
6. **About**
7. Right utilities: Search · Cart

### 8.2 Footer (6 columns + utility row)

| Col 1 — Catalog | Col 2 — Services | Col 3 — Company | Col 4 — Support | Col 5 — Order | Col 6 — Legal |
|---|---|---|---|---|---|
| All peptides | Custom synthesis | About us | Talk to a specialist | My cart | Terms |
| By research area | Bundles | Quality | FAQs | My orders | Privacy |
| Best sellers | Wholesale | Certifications | COA policy | Wishlist | Disclaimer (RUO) |
| New arrivals | | Press | Contact | Shipping | Cookies |

Bottom utility row:
- Newsletter capture (email + GDPR consent checkbox)
- Social (LinkedIn, X) — remove placeholders if no real profiles
- Address, VAT number, copyright
- "For Research Use Only — Not for human consumption" pinned at the bottom of every page

---

## 9. Iconography

- **Lucide** SVG sprite (self-hosted, only the used subset, ≤ 8 KB).
- Stroke 1.5, size 16/20/24.
- Decorative icons `aria-hidden="true"`. Functional icons get `<title>` and `aria-label` on the parent.

---

## 10. Motion

- Transitions ≤ 200 ms `cubic-bezier(0.2, 0, 0.2, 1)`.
- No parallax, no scroll-jacking.
- Honor `prefers-reduced-motion: reduce` — disable all non-essential motion.

---

## 11. Imagery

- Product photography: white seamless background, vial centered, 1:1, 1200 × 1200 master, served 600 / 300 via `srcset`.
- Always `loading="lazy"` except hero (which uses `fetchpriority="high"`).
- File format: AVIF with WebP fallback.
- Alt text: descriptive (`"5 mg vial of BPC-157 with white cap"`), never `image of …`.

---

## 12. Voice & content tone

| Do | Don't |
|---|---|
| "≥ 99 % HPLC purity (lot-specific COA available)" | "Insanely pure peptides 🔥" |
| "For research use only. Not for human or veterinary consumption." | (omit it) |
| "Dispatched from our UK lab within 24 h" | "Lightning-fast delivery worldwide!" |
| Cite peptide CAS numbers, sequences, references | Marketing superlatives without proof |

---

## 13. Token reference (drop-in CSS)

```css
:root {
  /* Color */
  --color-ink: #0F172A;
  --color-ink-2: #334155;
  --color-ink-3: #64748B;
  --color-surface: #FFFFFF;
  --color-surface-2: #F8FAFC;
  --color-border: #E2E8F0;
  --color-border-strong: #CBD5E1;
  --color-primary: #005B8C;
  --color-primary-600: #00496F;
  --color-primary-50: #E6F1F8;
  --color-success: #0F7B3F;
  --color-warning: #B45309;
  --color-danger: #B42318;

  /* Type */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px;  --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px;

  /* Radius / shadow */
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 12px; --radius-pill: 999px;
  --shadow-1: 0 1px 2px rgb(15 23 42 / 0.06);
  --shadow-2: 0 8px 24px rgb(15 23 42 / 0.08);
  --shadow-3: 0 24px 48px rgb(15 23 42 / 0.16);

  /* Layout */
  --container-max: 1280px;
  --container-pad: 24px;
}

@media (max-width: 768px) {
  :root { --container-pad: 16px; }
}
```

---

## 14. Acceptance criteria for the visual rebuild

1. No page loads more than: 1 CSS file (≤ 50 KB gz), 1 JS bundle (≤ 90 KB gz), 1 web-font family (≤ 25 KB gz, variable).
2. Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 100, Best Practices ≥ 95, SEO ≥ 100.
3. axe-core: 0 critical, 0 serious violations.
4. Visual regression: every template snapshot matches Figma at ± 2 px.
5. The word "gradient" does not appear in `*.astro/*.tsx/*.css` outside the `Hero` band.
