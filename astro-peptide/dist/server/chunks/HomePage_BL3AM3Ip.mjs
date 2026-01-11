import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, e as addAttribute, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { q as productSlugTranslations, r as getMarket, $ as $$Layout, u as translations, b as translatePackageSize, c as cleanProductTitle } from './Layout_DOeZcGv4.mjs';
import { g as getCollection } from './_astro_content_B0aha66o.mjs';
import { P as ProductCard } from './ProductCard_CTf3m74s.mjs';
/* empty css                         */

const defaultLang = "en";
const languages = {
  en: { name: "English", flag: "🇬🇧", locale: "en-GB", region: "United Kingdom", hreflang: "en" },
  nl: { name: "Nederlands", flag: "🇳🇱", locale: "nl-NL", region: "Netherlands", hreflang: "nl" },
  de: { name: "Deutsch", flag: "🇩🇪", locale: "de-DE", region: "Germany", hreflang: "de" },
  fr: { name: "Français", flag: "🇫🇷", locale: "fr-FR", region: "France", hreflang: "fr" },
  es: { name: "Español", flag: "🇪🇸", locale: "es-ES", region: "Spain", hreflang: "es" },
  it: { name: "Italiano", flag: "🇮🇹", locale: "it-IT", region: "Italy", hreflang: "it" }
};
const supportedLanguages = Object.keys(languages);
function getLocalizedPath(path, lang) {
  const withoutLocale = path.replace(/^\/(en|nl|de|fr|es|it)(\/|$)/, "/");
  const match = withoutLocale.match(/^([^?#]*)(.*)$/);
  const pathname = (match?.[1] ?? withoutLocale) || "/";
  const suffix = match?.[2] ?? "";
  const getCanonicalProductSlug = (slug) => {
    const clean = slug.replace(/^\/peptides\//, "").replace(/^\//, "").replace(/\/$/, "");
    for (const l of supportedLanguages) {
      const table = productSlugTranslations[l];
      if (table && Object.prototype.hasOwnProperty.call(table, clean)) {
        return clean;
      }
    }
    for (const l of supportedLanguages) {
      const table = productSlugTranslations[l];
      if (!table) continue;
      for (const [englishSlug, localizedSlug] of Object.entries(table)) {
        if (localizedSlug === clean) return englishSlug;
      }
    }
    return clean;
  };
  let resolvedPathname = pathname;
  if (pathname.startsWith("/peptides/")) {
    const rawSlug = pathname.replace("/peptides/", "").replace(/\/$/, "");
    const canonicalSlug = getCanonicalProductSlug(rawSlug);
    const table = productSlugTranslations[lang];
    if (lang !== defaultLang && table && table[canonicalSlug]) {
      resolvedPathname = `/peptides/${table[canonicalSlug]}`;
    } else {
      resolvedPathname = `/peptides/${canonicalSlug}`;
    }
  }
  if (lang === defaultLang) {
    return `${resolvedPathname || "/"}${suffix}`;
  }
  const localizedRoots = [
    "/",
    "/about",
    "/contact",
    "/faq",
    "/shop",
    "/cart",
    "/checkout",
    "/peptides"
  ];
  const isLocalizedRoute = resolvedPathname === "/" || localizedRoots.some(
    (root) => root === "/" ? false : resolvedPathname === root || resolvedPathname.startsWith(`${root}/`)
  );
  if (!isLocalizedRoute) {
    return `${resolvedPathname || "/"}${suffix}`;
  }
  const normalizedPath = resolvedPathname.startsWith("/") ? resolvedPathname : `/${resolvedPathname}`;
  return `/${lang}${normalizedPath === "/" ? "" : normalizedPath}${suffix}`;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://peptide-shop.net");
const $$HomePage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HomePage;
  const { lang } = Astro2.props;
  const market = getMarket(lang);
  function t(key) {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  }
  const cleanSlug = (slug) => slug.replace(/^\/peptides\//, "").replace(/^\//, "");
  const allProducts = await getCollection("products");
  const featuredProducts = allProducts.slice(0, 8);
  const categories = [
    { name: t("nav.weightLoss"), slug: "weight-loss", icon: "scale", desc: t("home.categories.desc.weightLoss"), gradient: "from-purple-500 to-pink-500" },
    { name: t("nav.muscleRecovery"), slug: "muscle-recovery", icon: "activity", desc: t("home.categories.desc.muscleRecovery"), gradient: "from-blue-500 to-cyan-500" },
    { name: t("nav.cognitive"), slug: "cognitive", icon: "brain", desc: t("home.categories.desc.cognitive"), gradient: "from-green-500 to-emerald-500" },
    { name: t("nav.growthHormone"), slug: "growth-hormone", icon: "clock", desc: t("home.categories.desc.antiAging"), gradient: "from-orange-500 to-red-500" }
  ];
  const testimonials = [
    { name: "Dr. Sarah Mitchell", role: t("home.testimonials.role1"), text: t("home.testimonials.text1"), rating: 5 },
    { name: "Prof. James Chen", role: t("home.testimonials.role2"), text: t("home.testimonials.text2"), rating: 5 },
    { name: "Dr. Emma Rodriguez", role: t("home.testimonials.role3"), text: t("home.testimonials.text3"), rating: 5 }
  ];
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `Peptide Shop - Buy Peptides ${market.marketName} & Europe`,
    "url": "https://peptide-shop.net",
    "description": `Buy peptides ${market.marketName} & Europe. Premium research peptides for sale with 99% purity. Fast delivery, COA included. Semaglutide, BPC-157, Tirzepatide & more.`,
    "inLanguage": ["en-GB", "nl-NL", "de-DE", "fr-FR", "es-ES", "it-IT"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://peptide-shop.net/peptides?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Peptide Shop",
    "alternateName": `PeptideShop ${market.marketName}`,
    "url": "https://peptide-shop.net",
    "logo": "https://peptide-shop.net/favicon.png",
    "description": `Buy peptides ${market.marketName} & Europe. Leading supplier of research peptides with 99% purity. Fast delivery across ${market.geoPlacename} and Europe.`,
    "areaServed": [
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Netherlands" },
      { "@type": "Country", "name": "Germany" },
      { "@type": "Country", "name": "France" },
      { "@type": "Country", "name": "Spain" },
      { "@type": "Country", "name": "Italy" },
      { "@type": "Country", "name": "Belgium" },
      { "@type": "Country", "name": "Ireland" },
      { "@type": "Country", "name": "Austria" },
      { "@type": "Country", "name": "Portugal" }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-123-456-7890",
      "contactType": "customer service",
      "areaServed": ["GB", "NL", "DE", "FR", "ES", "IT"],
      "availableLanguage": ["English", "Dutch", "German", "French", "Spanish", "Italian"]
    },
    "sameAs": [
      "https://t.me/peptideshop"
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("home.heroTitle") + " | " + t("home.heroTitleHighlight") + " | Peptide Shop", "description": t("home.heroSubtitle") }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script>    ", '<section class="full-width-section hero-banner"> <div class="inner-container section-padding"> <div class="row align-items-center g-5"> <div class="col-lg-6 hero-content"> <span class="hero-badge">', '</span> <h1 class="hero-title"> ', '<br> <span class="text-shop-primary">', '</span> </h1> <p class="hero-subtitle"> ', ' </p> <div class="d-flex flex-wrap gap-3"> <a', ' class="btn-shop-primary"> ', ' <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> </svg> </a> <a', ' class="btn-shop-outline"> ', ' </a> </div> </div> <div class="col-lg-6 d-none d-lg-block"> <div class="hero-image-wrapper"> <div class="hero-image-container"> <img src="/images/hero-image.webp"', ' class="hero-main-image"> <!-- Floating Product Cards --> <div class="floating-card floating-card-1"> <div class="d-flex align-items-center gap-3"> <div class="floating-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path> <polyline points="9 12 11 14 15 10"></polyline> </svg> </div> <div> <div style="font-weight: 700; color: #1e293b; font-size: 16px;">99.9% Purity</div> <div style="font-size: 13px; color: #6b7280;">Lab Verified</div> </div> </div> </div> <div class="floating-card floating-card-2"> <div class="d-flex align-items-center gap-2"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect> <polyline points="16 8 20 8 23 11 23 16 16 16 16 8"></polyline> <circle cx="5.5" cy="18.5" r="2.5"></circle> <circle cx="18.5" cy="18.5" r="2.5"></circle> </svg> <span style="font-weight: 600; color: #1e293b; font-size: 14px;">24h Dispatch</span> </div> </div> </div> </div> </div> </div> </div> </section>  <section class="full-width-section stats-bar"> <div class="inner-container" style="padding: 40px 60px;"> <div class="row g-4"> <div class="col-6 col-md-3"> <div class="stat-item"> <div class="stat-number">50K+</div> <div class="stat-label">', '</div> </div> </div> <div class="col-6 col-md-3"> <div class="stat-item"> <div class="stat-number">99.9%</div> <div class="stat-label">', '</div> </div> </div> <div class="col-6 col-md-3"> <div class="stat-item"> <div class="stat-number">24h</div> <div class="stat-label">', '</div> </div> </div> <div class="col-6 col-md-3"> <div class="stat-item"> <div class="stat-number">500+</div> <div class="stat-label">', '</div> </div> </div> </div> </div> </section>  <section class="full-width-section" style="background: var(--shop-surface);"> <div class="inner-container section-padding"> <div class="section-header"> <div class="section-label">', '</div> <h2 class="section-title">', '</h2> </div> <div class="category-grid"> ', ' </div> </div> </section>  <section class="full-width-section" style="background: white;"> <div class="inner-container section-padding"> <div class="d-flex justify-content-between align-items-end mb-4"> <div class="section-header mb-0"> <div class="section-label">', '</div> <h2 class="section-title">', "</h2> </div> <a", ' class="btn-shop-outline d-none d-md-inline-flex"> ', ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> </svg> </a> </div> <!-- Filter Tabs --> <div class="d-flex flex-wrap gap-2 mb-4 pb-3 border-bottom" id="product-filters"> <button class="btn-shop-primary filter-btn active" data-category="all" style="padding: 8px 20px; font-size: 14px;">', '</button> <button class="btn-shop-outline filter-btn" data-category="weight-loss" style="padding: 8px 20px; font-size: 14px;">', '</button> <button class="btn-shop-outline filter-btn" data-category="muscle-recovery" style="padding: 8px 20px; font-size: 14px;">', '</button> <button class="btn-shop-outline filter-btn" data-category="cognitive" style="padding: 8px 20px; font-size: 14px;">', '</button> <button class="btn-shop-outline filter-btn" data-category="growth-hormone" style="padding: 8px 20px; font-size: 14px;">', '</button> </div> <div class="products-grid" id="products-container"> ', ' </div> <div class="text-center mt-4 d-md-none"> <a', ' class="btn-shop-outline w-100">', '</a> </div> </div> </section>  <section class="full-width-section" id="about" style="background: var(--shop-surface);"> <div class="inner-container section-padding"> <div class="row align-items-center g-5"> <div class="col-lg-6"> <div class="about-image-grid"> <div class="about-image-main"> <img src="/images/about/about-peptide-shop.jpg" alt="About Peptide Shop - Premium Research Peptides Supplier" class="img-fluid" loading="lazy" decoding="async" style="border-radius: 16px; width: 100%; height: 100%; object-fit: cover;"> </div> <!-- Experience Badge --> <div class="about-badge"> <div class="about-badge-number">10+</div> <div class="about-badge-text">Years<br>Experience</div> </div> </div> </div> <div class="col-lg-6"> <div class="section-header"> <div class="section-label">', '</div> <h2 class="section-title">', '</h2> <p class="section-desc mb-4"> ', ' </p> </div> <p style="color: #6b7280; margin-bottom: 24px; line-height: 1.8;"> ', ' </p> <div class="row g-4 mb-4"> <div class="col-6"> <div class="about-stat"> <div class="about-stat-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path> <polyline points="9 12 11 14 15 10"></polyline> </svg> </div> <div> <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #1e293b;">', '</h4> <p style="color: #6b7280; margin: 0; font-size: 13px;">', '</p> </div> </div> </div> <div class="col-6"> <div class="about-stat"> <div class="about-stat-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg> </div> <div> <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #1e293b;">', '</h4> <p style="color: #6b7280; margin: 0; font-size: 13px;">', '</p> </div> </div> </div> <div class="col-6"> <div class="about-stat"> <div class="about-stat-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> </svg> </div> <div> <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #1e293b;">', '</h4> <p style="color: #6b7280; margin: 0; font-size: 13px;">', '</p> </div> </div> </div> <div class="col-6"> <div class="about-stat"> <div class="about-stat-icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <circle cx="12" cy="12" r="10"></circle> <line x1="2" y1="12" x2="22" y2="12"></line> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path> </svg> </div> <div> <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #1e293b;">', '</h4> <p style="color: #6b7280; margin: 0; font-size: 13px;">', "</p> </div> </div> </div> </div> <a", ' class="btn-shop-primary"> ', ' <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> </svg> </a> </div> </div> </div> </section>  <section class="full-width-section" style="background: white;"> <div class="inner-container section-padding"> <div class="section-header text-center mb-5"> <div class="section-label">', '</div> <h2 class="section-title mx-auto">', '</h2> <p class="section-desc mx-auto" style="text-align: center;">\nStay updated with the latest peptide research, industry insights, and scientific breakthroughs.\n</p> </div> <div class="row g-4"> <div class="col-lg-4"> <div class="blog-card"> <img src="/images/blog/post1.jpg" alt="Blog Post" class="blog-image"> <div class="p-4"> <span class="badge mb-3" style="background: rgba(0, 119, 182, 0.1); color: #0077b6; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 600;">RESEARCH</span> <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: #1e293b; line-height: 1.4;">\nUnderstanding Peptide Purity\n</h3> <p style="color: #6b7280; margin-bottom: 16px; line-height: 1.6; font-size: 14px;">\nDiscover how peptide purity directly impacts research outcomes.\n</p> </div> </div> </div> <div class="col-lg-4"> <div class="blog-card"> <img src="/images/blog/post2.jpg" alt="Blog Post" class="blog-image"> <div class="p-4"> <span class="badge mb-3" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 600;">GUIDE</span> <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: #1e293b; line-height: 1.4;">\nStorage Best Practices\n</h3> <p style="color: #6b7280; margin-bottom: 16px; line-height: 1.6; font-size: 14px;">\nLearn the optimal storage conditions for peptide integrity.\n</p> </div> </div> </div> <div class="col-lg-4"> <div class="blog-card"> <img src="/images/blog/post3.jpg" alt="Blog Post" class="blog-image"> <div class="p-4"> <span class="badge mb-3" style="background: rgba(0, 119, 182, 0.1); color: #0077b6; padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 600;">INDUSTRY</span> <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: #1e293b; line-height: 1.4;">\nFuture of Therapeutics\n</h3> <p style="color: #6b7280; margin-bottom: 16px; line-height: 1.6; font-size: 14px;">\nExplore emerging trends in peptide-based treatments.\n</p> </div> </div> </div> </div> <div class="text-center mt-5"> <a', ' class="btn-shop-outline">', '</a> </div> </div> </section>  <section class="full-width-section" style="background: var(--shop-surface);"> <div class="inner-container section-padding"> <div class="section-header text-center mb-5"> <div class="section-label">', '</div> <h2 class="section-title mx-auto">', '</h2> </div> <div class="row g-4"> ', ' </div> </div> </section>  <section class="full-width-section" style="background: white;"> <div class="inner-container section-padding"> <div class="section-header text-center mb-5"> <div class="section-label">', '</div> <h2 class="section-title mx-auto">', `</h2> </div> <div class="row justify-content-center"> <div class="col-lg-10"> <div class="faq-item"> <div class="faq-question"> <span>What makes your peptides different from competitors?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
Our peptides undergo rigorous HPLC and Mass Spectrometry analysis with third-party verification. Every batch comes with a Certificate of Analysis (COA) showing 99.9%+ purity.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>How quickly can I receive my order?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
All orders are dispatched within 24 hours. We offer standard delivery (3-5 business days) and express shipping (1-2 business days) options.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>Do you provide Certificates of Analysis (COA)?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
Yes, every product includes a batch-specific COA with HPLC chromatogram, mass spectrometry data, purity percentage, and storage recommendations.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>Where can I buy peptides in Europe?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
You can buy peptides online from Peptide Shop with fast delivery across Europe. Delivery times vary by destination and service level, and we offer both standard and express options.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>What payment methods do you accept?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for institutional orders. All transactions are securely processed.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>How should I store my peptides?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
Lyophilized peptides should be stored at -20\xB0C for long-term storage. Once reconstituted, store at 2-8\xB0C and use within the timeframe specified in the product documentation. Always protect from light and repeated freeze-thaw cycles.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>Are your peptides for human consumption?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
No. All our peptides are sold strictly for research and laboratory use only. They are not intended for human or veterinary use, food additives, drugs, or cosmetic applications.
</div> </div> <div class="faq-item"> <div class="faq-question"> <span>Can I get a refund or replacement if there's an issue?</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg> </div> <div class="faq-answer">
Absolutely. If you receive a product that doesn't meet our advertised purity specifications, we offer a full refund or replacement. Please contact our support team with your COA and any supporting documentation within 30 days of receipt.
</div> </div> </div> </div> </div> </section>  <section class="full-width-section" style="background: white;"> <div class="inner-container section-padding"> <div class="row"> <div class="col-lg-10 mx-auto"> <h2 class="section-title text-center mb-4">Buy Peptides Online `, ' & Europe - Your Complete Guide</h2> <div class="row g-4"> <div class="col-md-6"> <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Buy Peptides ', '</h3> <p style="color: #6b7280; line-height: 1.8; margin-bottom: 20px;">\nLooking to buy peptides in ', '? Peptide Shop offers premium research peptides with 99% purity verified by HPLC analysis.\n                Our best-selling peptides include Semaglutide, Tirzepatide, BPC-157, TB-500, and Melanotan 2. All orders include a Certificate of Analysis (COA)\n                and are dispatched within 24 hours.\n</p> </div> <div class="col-md-6"> <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Buy Peptides Europe</h3> <p style="color: #6b7280; line-height: 1.8; margin-bottom: 20px;">\nBuy peptides online with fast European delivery. We ship to Netherlands, Germany, France, Spain, Italy, Belgium, Austria, Ireland, and Portugal. \n                Whether you need GLP-1 peptides for weight loss research, BPC-157 for muscle recovery studies, or growth hormone peptides, \n                Peptide Shop is your trusted European peptide supplier with discreet, temperature-controlled shipping.\n</p> </div> <div class="col-md-6"> <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Peptides for Weight Loss Research</h3> <p style="color: #6b7280; line-height: 1.8; margin-bottom: 20px;">\nOur weight loss peptides for sale include the latest GLP-1 receptor agonists: Semaglutide, Tirzepatide, Retatrutide, and Cagrilintide. \n                These research peptides are HPLC-verified and come with full documentation for metabolic research applications. \n                Buy peptides for weight loss studies with confidence from a trusted European peptide supplier.\n</p> </div> <div class="col-md-6"> <h3 style="font-size: 1.25rem; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Peptides for Muscle Growth Research</h3> <p style="color: #6b7280; line-height: 1.8; margin-bottom: 20px;">\nBuy peptides for muscle growth and recovery research including BPC-157, TB-500, and IGF-1 variants. \n                Our bodybuilding peptides are research-grade with 99% purity, ideal for tissue repair and regeneration studies. \n                Fast dispatch and competitive prices make us the preferred choice for researchers studying anabolic pathways.\n</p> </div> </div> <div class="text-center mt-4"> <a', ' class="btn-shop-primary">\nBrowse All Peptides for Sale\n<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="5" y1="12" x2="19" y2="12"></line> <polyline points="12 5 19 12 12 19"></polyline> </svg> </a> </div> </div> </div> </div> </section>  <section class="full-width-section cta-full-section"> <div class="inner-container section-padding"> <div class="cta-box"> <div class="cta-content"> <h2 class="cta-title">', '</h2> <p class="cta-subtitle"> ', ' </p> <form class="cta-form"> <input type="email" class="cta-input"', '> <button type="submit" class="cta-button">', `</button> </form> <p class="cta-privacy">\u{1F512} We respect your privacy. Unsubscribe anytime.</p> </div> <div class="cta-decoration"> <div class="cta-circle cta-circle-1"></div> <div class="cta-circle cta-circle-2"></div> </div> </div> </div> </section> <script>
    document.addEventListener('DOMContentLoaded', () => {
      // FAQ Accordion
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
          question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
              }
            });
            item.classList.toggle('active');
          });
        }
      });

      // Product Filter Tabs
      const filterBtns = document.querySelectorAll('.filter-btn');
      const productItems = document.querySelectorAll('.product-item');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active button styles
          filterBtns.forEach(b => {
            b.classList.remove('active', 'btn-shop-primary');
            b.classList.add('btn-shop-outline');
          });
          btn.classList.add('active', 'btn-shop-primary');
          btn.classList.remove('btn-shop-outline');

          // Filter products
          const category = btn.dataset.category;
          
          productItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
              item.style.display = '';
              item.style.opacity = '0';
              item.style.transform = 'translateY(10px)';
              setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 50);
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  <\/script> `])), unescapeHTML(JSON.stringify(websiteSchema)), unescapeHTML(JSON.stringify(organizationSchema)), maybeRenderHead(), t("home.heroBadge"), t("home.heroTitle"), t("home.heroTitleHighlight"), t("home.heroSubtitle"), addAttribute(getLocalizedPath("/peptides/", lang), "href"), t("home.shopNow"), addAttribute(getLocalizedPath("/quality/", lang), "href"), t("home.viewLabReports"), addAttribute(t("home.heroTitle") + " - " + t("home.heroTitleHighlight") + " - Peptide Shop", "alt"), t("home.stats.ordersDelivered"), t("home.stats.purityGuarantee"), t("home.stats.expressShipping"), t("home.stats.researchLabs"), t("home.categories.subtitle"), t("home.categories.title"), categories.map((cat) => renderTemplate`<a${addAttribute(getLocalizedPath("/peptides/" + cat.slug, lang), "href")} class="category-card"> <div class="category-icon"> <i${addAttribute(cat.icon, "data-lucide")} style="width: 28px; height: 28px; color: var(--shop-primary);"></i> </div> <div class="category-info"> <h3>${cat.name}</h3> <p>${cat.desc}</p> </div> </a>`), t("home.bestSellers.subtitle"), t("home.bestSellers.title"), addAttribute(getLocalizedPath("/peptides/", lang), "href"), t("home.bestSellers.viewAll"), t("common.all"), t("nav.weightLoss"), t("nav.muscleRecovery"), t("nav.cognitive"), t("home.filters.antiAging"), featuredProducts.map((product) => {
    const price = product.data.moq || parseFloat(product.data.price_range?.match(/[\d,]+/)?.[0]?.replace(",", "") || "0");
    const productSlug = cleanSlug(product.slug);
    return renderTemplate`<div class="product-item"${addAttribute(product.data.category, "data-category")}> ${renderComponent($$result2, "ProductCard", ProductCard, { "id": product.data.id, "title": cleanProductTitle(product.data.title, lang), "price": product.data.price || price, "image": product.data.images?.[0] || "/images/peptide-default.jpg", "slug": productSlug, "category": product.data.category, "purity": product.data.purity, "reviewCount": product.data.reviews?.length || 0, "packageSize": translatePackageSize(product.data.package_sizes?.[0] || "", lang), "lang": lang, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/ProductCard", "client:component-export": "default" })} </div>`;
  }), addAttribute(getLocalizedPath("/peptides/", lang), "href"), t("home.bestSellers.viewAllPeptides"), t("home.about.subtitle"), t("home.about.title"), t("aboutPage.subtitle"), t("home.about.description"), t("home.about.features.isoCertified"), t("home.about.features.isoCertifiedDesc"), t("home.about.features.fastDispatch"), t("home.about.features.fastDispatchDesc"), t("home.about.features.expertTeam"), t("home.about.features.expertTeamDesc"), t("home.about.features.globalReach"), t("home.about.features.globalReachDesc"), addAttribute(getLocalizedPath("/about/", lang), "href"), t("home.about.learnMore"), t("home.blog.subtitle"), t("home.blog.title"), addAttribute(getLocalizedPath("/blog/", lang), "href"), t("home.blog.viewAll"), t("home.testimonials.subtitle"), t("home.testimonials.title"), testimonials.map((testimonial) => renderTemplate`<div class="col-lg-4"> <div class="testimonial-card"> <div class="star-rating mb-3">${"\u2605".repeat(testimonial.rating)}</div> <p style="font-size: 1rem; line-height: 1.7; color: #374151; margin-bottom: 20px; font-style: italic;">
"${testimonial.text}"
</p> <div class="d-flex align-items-center"> <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 44px; height: 44px; background: var(--shop-primary); font-weight: 600; font-size: 16px; color: white;"> ${testimonial.name.split(" ").map((n) => n[0]).join("")} </div> <div> <h5 style="margin: 0; font-size: 0.9rem; font-weight: 600; color: #1e293b;">${testimonial.name}</h5> <p style="margin: 0; font-size: 12px; color: #6b7280;">${testimonial.role}</p> </div> </div> </div> </div>`), t("home.faq.subtitle"), t("home.faq.title"), market.marketName, market.marketName, market.geoPlacename, addAttribute(getLocalizedPath("/peptides/", lang), "href"), t("home.cta.title"), t("home.cta.subtitle"), addAttribute(t("home.cta.placeholder"), "placeholder"), t("home.cta.button")) })}`;
}, "/home/ivan/peptide/astro-peptide/src/components/pages/HomePage.astro", void 0);

export { $$HomePage as $ };
