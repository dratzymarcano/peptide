globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DjzMfJVp.mjs';
import { $ as $$HomePage } from '../chunks/HomePage_BPTJRDtB.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "HomePage", $$HomePage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/index.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
