/* empty css                                      */
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { g as getLangFromUrl, t, $ as $$Layout, a as getLocalizedPath } from '../chunks/Layout_DOeZcGv4.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://peptide-shop.net");
const $$Checkout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Checkout;
  const currentLang = getLangFromUrl(Astro2.url);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t(currentLang, "cart.checkout")} | Peptide Shop`, "description": t(currentLang, "cart.checkoutSubtitle"), "data-astro-cid-ojox7d5b": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section style="background: linear-gradient(135deg, #0077b6 0%, #023e8a 100%); padding: 100px 0 60px; margin-top: 70px;" data-astro-cid-ojox7d5b> <div class="container" data-astro-cid-ojox7d5b> <div class="row align-items-center" data-astro-cid-ojox7d5b> <div class="col-lg-8" data-astro-cid-ojox7d5b> <nav aria-label="breadcrumb" style="margin-bottom: 20px;" data-astro-cid-ojox7d5b> <ol class="breadcrumb" style="background: transparent; padding: 0; margin: 0;" data-astro-cid-ojox7d5b> <li class="breadcrumb-item" data-astro-cid-ojox7d5b><a${addAttribute(getLocalizedPath("/", currentLang), "href")} style="color: white; text-decoration: none; font-weight: 500;" data-astro-cid-ojox7d5b>${t(currentLang, "nav.home")}</a></li> <li class="breadcrumb-item" data-astro-cid-ojox7d5b><a${addAttribute(getLocalizedPath("/cart/", currentLang), "href")} style="color: white; text-decoration: none; font-weight: 500;" data-astro-cid-ojox7d5b>${t(currentLang, "nav.cart")}</a></li> <li class="breadcrumb-item active" style="color: white; font-weight: 600;" data-astro-cid-ojox7d5b>${t(currentLang, "cart.checkout")}</li> </ol> </nav> <h1 style="color: white; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 16px; line-height: 1.1;" data-astro-cid-ojox7d5b> ${t(currentLang, "cart.secureCheckout")} </h1> <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; max-width: 600px; line-height: 1.6; margin: 0;" data-astro-cid-ojox7d5b> ${t(currentLang, "cart.checkoutSubtitle")} </p> </div> <div class="col-lg-4 text-lg-right mt-4 mt-lg-0" data-astro-cid-ojox7d5b> <div style="display: inline-flex; align-items: center; gap: 16px;" data-astro-cid-ojox7d5b> <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 12px 20px; border-radius: 12px; backdrop-filter: blur(10px);" data-astro-cid-ojox7d5b> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" data-astro-cid-ojox7d5b> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-ojox7d5b></path> </svg> <span style="color: white; font-weight: 600; font-size: 14px;" data-astro-cid-ojox7d5b>${t(currentLang, "cart.secureBadge")}</span> </div> <div style="display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 12px 20px; border-radius: 12px; backdrop-filter: blur(10px);" data-astro-cid-ojox7d5b> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" data-astro-cid-ojox7d5b> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" data-astro-cid-ojox7d5b></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4" data-astro-cid-ojox7d5b></path> </svg> <span style="color: white; font-weight: 600; font-size: 14px;" data-astro-cid-ojox7d5b>SSL</span> </div> </div> </div> </div> </div> </section>  <section style="padding: 60px 0 80px; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);" data-astro-cid-ojox7d5b> ${renderComponent($$result2, "CheckoutComponent", null, { "client:only": "react", "lang": currentLang, "client:component-hydration": "only", "data-astro-cid-ojox7d5b": true, "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/Checkout", "client:component-export": "default" })} </section> ` })} `;
}, "/home/ivan/peptide/astro-peptide/src/pages/checkout.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Checkout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
