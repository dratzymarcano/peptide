globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DjzMfJVp.mjs';
import { $ as $$PrivacyPage } from '../chunks/PrivacyPage_Ck6WgpOT.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivacyPage", $$PrivacyPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/privacy.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Privacy,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
