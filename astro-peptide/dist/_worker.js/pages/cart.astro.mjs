globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_DjzMfJVp.mjs';
import { g as getLangFromUrl, t, $ as $$Layout, a as getLocalizedPath } from '../chunks/Layout_B6oc2337.mjs';
/* empty css                                */
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

const $$Astro = createAstro("https://peptide-shop.net");
const $$Cart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cart;
  const currentLang = getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t(currentLang, "cart.title")} | Peptide Shop`, "description": t(currentLang, "cart.heroSubtitle"), "data-astro-cid-h3zw4u6d": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section style="background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%); padding: 100px 0 60px; margin-top: 70px;" data-astro-cid-h3zw4u6d> <div class="container" data-astro-cid-h3zw4u6d> <div class="row align-items-center" data-astro-cid-h3zw4u6d> <div class="col-lg-8" data-astro-cid-h3zw4u6d> <nav aria-label="breadcrumb" style="margin-bottom: 20px;" data-astro-cid-h3zw4u6d> <ol class="breadcrumb" style="background: transparent; padding: 0; margin: 0;" data-astro-cid-h3zw4u6d> <li class="breadcrumb-item" data-astro-cid-h3zw4u6d><a${addAttribute(getLocalizedPath("/", currentLang), "href")} style="color: white; text-decoration: none; font-weight: 500;" data-astro-cid-h3zw4u6d>${t(currentLang, "nav.home")}</a></li> <li class="breadcrumb-item active" style="color: white; font-weight: 600;" data-astro-cid-h3zw4u6d>${t(currentLang, "nav.cart")}</li> </ol> </nav> <h1 style="color: white; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 16px; line-height: 1.1;" data-astro-cid-h3zw4u6d> ${t(currentLang, "cart.heroTitle")} </h1> <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; max-width: 600px; line-height: 1.6; margin: 0;" data-astro-cid-h3zw4u6d> ${t(currentLang, "cart.heroSubtitle")} </p> </div> <div class="col-lg-4 text-lg-right mt-4 mt-lg-0" data-astro-cid-h3zw4u6d> <div style="display: inline-flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.15); padding: 16px 24px; border-radius: 12px; backdrop-filter: blur(10px);" data-astro-cid-h3zw4u6d> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" data-astro-cid-h3zw4u6d> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" data-astro-cid-h3zw4u6d></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4" data-astro-cid-h3zw4u6d></path> </svg> <div style="text-align: left;" data-astro-cid-h3zw4u6d> <div style="color: rgba(255,255,255,0.8); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;" data-astro-cid-h3zw4u6d>${t(currentLang, "cart.secureCheckout")}</div> <div style="color: white; font-weight: 600;" data-astro-cid-h3zw4u6d>${t(currentLang, "cart.sslEncrypted")}</div> </div> </div> </div> </div> </div> </section>  <section style="padding: 60px 0 80px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "ShoppingCart", null, { "client:only": "react", "lang": currentLang, "client:component-hydration": "only", "data-astro-cid-h3zw4u6d": true, "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/ShoppingCart", "client:component-export": "default" })} </section> ` })} `;
}, "/home/ivan/peptide/astro-peptide/src/pages/cart.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cart,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
