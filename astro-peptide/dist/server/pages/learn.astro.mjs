/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from '../chunks/PageTitle_DiEJsxH3.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const guides = [
    {
      title: "What Are Peptides?",
      description: "A comprehensive introduction to peptides, amino acid chains, and their significance in scientific research.",
      href: "/learn/what-are-peptides",
      icon: "book-open",
      readTime: "8 min read"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Learn About Peptides | Educational Resources | Peptide Shop", "description": "Educational resources about research peptides, synthesis, storage, and applications. Comprehensive guides for researchers and scientists.", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Learn", url: "/learn" }
  ], "data-astro-cid-we6un2hb": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "Learn About Peptides", "subtitle": "Educational resources and guides about research peptides, synthesis methods, storage protocols, and scientific applications.", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Learn" }
  ], "data-astro-cid-we6un2hb": true })} ${maybeRenderHead()}<section class="guides-section" data-astro-cid-we6un2hb> <div class="container" data-astro-cid-we6un2hb> <div class="guides-grid" data-astro-cid-we6un2hb> ${guides.map((guide) => renderTemplate`<a${addAttribute(guide.href, "href")} class="guide-card" data-astro-cid-we6un2hb> <div class="guide-icon" data-astro-cid-we6un2hb> <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-we6un2hb> ${guide.icon === "book-open" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-we6un2hb": true }, { "default": ($$result3) => renderTemplate`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" data-astro-cid-we6un2hb></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" data-astro-cid-we6un2hb></path>` })}`} </svg> </div> <h2 class="guide-title" data-astro-cid-we6un2hb>${guide.title}</h2> <p class="guide-description" data-astro-cid-we6un2hb>${guide.description}</p> <span class="guide-meta" data-astro-cid-we6un2hb>${guide.readTime} →</span> </a>`)} </div> </div> </section> ` })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/learn/index.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/learn/index.astro";
const $$url = "/learn";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
