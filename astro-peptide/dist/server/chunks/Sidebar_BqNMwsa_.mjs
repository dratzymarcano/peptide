import { d as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import 'clsx';
import { g as getCollection } from './_astro_content_B0aha66o.mjs';
import { t, a as getLocalizedPath } from './Layout_DOeZcGv4.mjs';
/* empty css                              */

const $$Astro = createAstro("https://peptide-shop.net");
const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { activeCategory, showProductInfo = false, productInfo, lang = "en" } = Astro2.props;
  const products = await getCollection("products");
  const categories = [...new Set(products.map((product) => product.data.category))];
  const getCategoryKey = (cat) => {
    const map = {
      "weight-loss": "weightLoss",
      "muscle-recovery": "muscleRecovery",
      "growth-hormone": "growthHormone",
      "tanning": "tanning",
      "cognitive": "cognitive",
      "supplies": "supplies"
    };
    return map[cat] || cat;
  };
  const productCount = products.length;
  return renderTemplate`${maybeRenderHead()}<aside class="sidebar" data-astro-cid-ssfzsv2f> <div class="sidebar-widget" data-astro-cid-ssfzsv2f> <h3 class="sidebar-title" data-astro-cid-ssfzsv2f>${t(lang, "nav.categories")}</h3> <ul class="category-list" data-astro-cid-ssfzsv2f> <li data-astro-cid-ssfzsv2f> <a${addAttribute(getLocalizedPath("/peptides", lang), "href")}${addAttribute([["category-link", { active: !activeCategory }]], "class:list")} data-astro-cid-ssfzsv2f> ${t(lang, "nav.allPeptides")} <span class="count" data-astro-cid-ssfzsv2f>(${productCount})</span> </a> </li> ${categories.map((cat) => {
    const catProducts = products.filter((p) => p.data.category === cat);
    const isActive = activeCategory === cat;
    const title = t(lang, `nav.${getCategoryKey(cat)}`) || cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    return renderTemplate`<li data-astro-cid-ssfzsv2f> <a${addAttribute(getLocalizedPath(`/peptides/${cat}`, lang), "href")}${addAttribute([["category-link", { active: isActive }]], "class:list")} data-astro-cid-ssfzsv2f> ${title} <span class="count" data-astro-cid-ssfzsv2f>(${catProducts.length})</span> </a> </li>`;
  })} </ul> </div> <div class="sidebar-widget why-us" data-astro-cid-ssfzsv2f> <h4 class="sidebar-title" data-astro-cid-ssfzsv2f>${t(lang, "home.about.title")}</h4> <ul class="why-list" data-astro-cid-ssfzsv2f> <li data-astro-cid-ssfzsv2f> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2" data-astro-cid-ssfzsv2f><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-ssfzsv2f></path></svg> ${t(lang, "product.trust.purity")} </li> <li data-astro-cid-ssfzsv2f> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2" data-astro-cid-ssfzsv2f><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-ssfzsv2f></path><polyline points="14 2 14 8 20 8" data-astro-cid-ssfzsv2f></polyline></svg> ${t(lang, "product.trust.coa")} </li> <li data-astro-cid-ssfzsv2f> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2" data-astro-cid-ssfzsv2f><rect x="1" y="3" width="15" height="13" data-astro-cid-ssfzsv2f></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-astro-cid-ssfzsv2f></polygon><circle cx="5.5" cy="18.5" r="2.5" data-astro-cid-ssfzsv2f></circle><circle cx="18.5" cy="18.5" r="2.5" data-astro-cid-ssfzsv2f></circle></svg> ${t(lang, "product.trust.delivery")} </li> </ul> </div> ${showProductInfo && productInfo && renderTemplate`<div class="sidebar-widget product-info" data-astro-cid-ssfzsv2f> <h5 class="sidebar-title" data-astro-cid-ssfzsv2f>${t(lang, "product.specifications")}</h5> <ul class="info-list" data-astro-cid-ssfzsv2f> ${productInfo.cas && renderTemplate`<li data-astro-cid-ssfzsv2f> <span class="label" data-astro-cid-ssfzsv2f>${t(lang, "product.casNo")}</span> <span class="value" data-astro-cid-ssfzsv2f>${productInfo.cas}</span> </li>`} ${productInfo.purity && renderTemplate`<li data-astro-cid-ssfzsv2f> <span class="label" data-astro-cid-ssfzsv2f>${t(lang, "product.purity")}</span> <span class="value purity" data-astro-cid-ssfzsv2f>${productInfo.purity}</span> </li>`} ${productInfo.rating !== void 0 && renderTemplate`<li data-astro-cid-ssfzsv2f> <span class="label" data-astro-cid-ssfzsv2f>${t(lang, "product.reviews")}</span> <span class="value" data-astro-cid-ssfzsv2f> <span class="star" data-astro-cid-ssfzsv2f>★</span> ${productInfo.rating.toFixed(1)} (${productInfo.reviewCount || 0})
</span> </li>`} <li data-astro-cid-ssfzsv2f> <span class="label" data-astro-cid-ssfzsv2f>${t(lang, "product.inStock")}</span> <span class="value stock" data-astro-cid-ssfzsv2f>${t(lang, "product.inStock")}</span> </li> </ul> </div>`} </aside> `;
}, "/home/ivan/peptide/astro-peptide/src/components/Sidebar.astro", void 0);

export { $$Sidebar as $ };
