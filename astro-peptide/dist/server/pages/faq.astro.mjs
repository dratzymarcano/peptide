/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$FAQPage } from '../chunks/FAQPage_mLzxes5g.mjs';
export { renderers } from '../renderers.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "FAQPage", $$FAQPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/faq.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Faq,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
