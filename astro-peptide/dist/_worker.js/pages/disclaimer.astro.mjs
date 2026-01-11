globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DjzMfJVp.mjs';
import { $ as $$DisclaimerPage } from '../chunks/DisclaimerPage_dGphDQxS.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

const $$Disclaimer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DisclaimerPage", $$DisclaimerPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/disclaimer.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/disclaimer.astro";
const $$url = "/disclaimer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Disclaimer,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
