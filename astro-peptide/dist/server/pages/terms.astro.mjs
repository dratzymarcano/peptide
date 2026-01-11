/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$TermsPage } from '../chunks/TermsPage_EC4n6ueA.mjs';
export { renderers } from '../renderers.mjs';

const $$Terms = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "TermsPage", $$TermsPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/terms.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/terms.astro";
const $$url = "/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Terms,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
