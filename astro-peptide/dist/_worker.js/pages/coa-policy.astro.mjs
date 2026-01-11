globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DjzMfJVp.mjs';
import { $ as $$CoaPolicyPage } from '../chunks/CoaPolicyPage_CeMKi9RL.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

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
