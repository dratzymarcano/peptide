/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$ShippingPage } from '../chunks/ShippingPage_BYaBrT_P.mjs';
export { renderers } from '../renderers.mjs';

const $$Shipping = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ShippingPage", $$ShippingPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/shipping.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/shipping.astro";
const $$url = "/shipping";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Shipping,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
