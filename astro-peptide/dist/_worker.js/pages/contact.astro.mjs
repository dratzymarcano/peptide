globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DjzMfJVp.mjs';
import { $ as $$ContactPage } from '../chunks/ContactPage_DOa_YUce.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ContactPage", $$ContactPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/contact.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contact,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
