/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$ShopPage } from '../chunks/ShopPage_DUJWkrSF.mjs';
export { renderers } from '../renderers.mjs';

const $$Shop = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ShopPage", $$ShopPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/shop.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/shop.astro";
const $$url = "/shop";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Shop,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
