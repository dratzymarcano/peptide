/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$QualityPage } from '../chunks/QualityPage_Drdi4_1K.mjs';
export { renderers } from '../renderers.mjs';

const $$Quality = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "QualityPage", $$QualityPage, { "lang": "en" })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/quality.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/quality.astro";
const $$url = "/quality";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Quality,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
