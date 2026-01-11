import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { g as getCollection } from './_astro_content_B0aha66o.mjs';
import { t, $ as $$Layout, b as translatePackageSize, c as cleanProductTitle } from './Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from './PageTitle_DiEJsxH3.mjs';
import { P as ProductCard } from './ProductCard_CTf3m74s.mjs';
import { $ as $$Sidebar } from './Sidebar_BqNMwsa_.mjs';
/* empty css                              */

const $$Astro = createAstro("https://peptide-shop.net");
const $$ShopPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ShopPage;
  const { lang } = Astro2.props;
  const cleanSlug = (slug) => slug.replace(/^\/peptides\//, "").replace(/^\//, "");
  const products = await getCollection("products");
  const title = t(lang, "shopPage.title");
  const subtitle = t(lang, "shopPage.subtitle");
  const showingText = t(lang, "shopPage.showing").replace("{count}", products.length.toString());
  const sortOptions = [
    t(lang, "shopPage.sort.featured"),
    t(lang, "shopPage.sort.priceLowHigh"),
    t(lang, "shopPage.sort.priceHighLow"),
    t(lang, "shopPage.sort.nameAZ")
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": subtitle, "breadcrumbs": [
    { name: t(lang, "nav.home"), url: lang === "en" ? "/" : `/${lang}` },
    { name: "Shop", url: lang === "en" ? "/shop" : `/${lang}/shop` }
  ], "data-astro-cid-ottcdley": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": title, "breadcrumbs": [
    { name: t(lang, "nav.home"), url: lang === "en" ? "/" : `/${lang}` },
    { name: "Shop" }
  ], "data-astro-cid-ottcdley": true })} ${maybeRenderHead()}<section class="section" data-astro-cid-ottcdley> <div class="container" data-astro-cid-ottcdley> <div class="row" data-astro-cid-ottcdley> <!-- Filters Sidebar --> <div class="col-lg-3 mb-5" data-astro-cid-ottcdley> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "data-astro-cid-ottcdley": true })} </div> <!-- Products Grid --> <div class="col-lg-9" data-astro-cid-ottcdley> <div class="d-flex justify-content-between align-items-center mb-4" data-astro-cid-ottcdley> <p class="mb-0 text-muted" data-astro-cid-ottcdley>${showingText}</p> <select class="form-control" style="width: 200px;" data-astro-cid-ottcdley> ${sortOptions.map((option) => renderTemplate`<option data-astro-cid-ottcdley>${option}</option>`)} </select> </div> <div class="row product-grid" data-astro-cid-ottcdley> ${products.map((product) => {
    const extractPrice = (priceStr) => {
      const match = priceStr?.match(/[\d,]+/);
      return match ? parseFloat(match[0].replace(",", "")) : 99;
    };
    const price = product.data.moq || extractPrice(product.data.price_range);
    const image = product.data.images && product.data.images[0] ? product.data.images[0] : "/images/peptide-default.jpg";
    const slug = cleanSlug(product.slug);
    return renderTemplate`<div class="col-6 col-md-6 col-lg-4 mb-4" data-astro-cid-ottcdley> ${renderComponent($$result2, "ProductCard", ProductCard, { "client:load": true, "id": product.data.id, "title": cleanProductTitle(product.data.title, lang), "price": product.data.price || price, "image": image, "slug": slug, "category": product.data.category, "purity": product.data.purity, "reviewCount": product.data.reviews?.length || 0, "packageSize": translatePackageSize(product.data.package_sizes?.[0] || "", lang), "lang": lang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/ProductCard", "client:component-export": "default", "data-astro-cid-ottcdley": true })} </div>`;
  })} </div> </div> </div> </div> </section> ` })} `;
}, "/home/ivan/peptide/astro-peptide/src/components/pages/ShopPage.astro", void 0);

export { $$ShopPage as $ };
