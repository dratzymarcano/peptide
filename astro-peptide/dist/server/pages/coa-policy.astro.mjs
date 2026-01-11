/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$CoaPolicyPage } from '../chunks/CoaPolicyPage_DHhbZioy.mjs';
export { renderers } from '../renderers.mjs';

const $$CoaPolicy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "CoaPolicyPage", $$CoaPolicyPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/coa-policy.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/coa-policy.astro";
const $$url = "/coa-policy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$CoaPolicy,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
