import { d as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, v as renderSlot, a as renderTemplate } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import 'clsx';
/* empty css                              */

const $$Astro = createAstro("https://peptide-shop.net");
const $$PageTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageTitle;
  const {
    title,
    subtitle,
    breadcrumbs = [],
    variant = "dark"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`page-title-section ${variant}`, "class")} data-astro-cid-guvttfii> <div class="container" data-astro-cid-guvttfii> ${breadcrumbs.length > 0 && renderTemplate`<nav aria-label="breadcrumb" class="mb-3" data-astro-cid-guvttfii> <ol class="breadcrumb-list" data-astro-cid-guvttfii> ${breadcrumbs.map((item, index) => renderTemplate`<li${addAttribute(`breadcrumb-item ${!item.url ? "active" : ""}`, "class")} data-astro-cid-guvttfii> ${item.url ? renderTemplate`<a${addAttribute(item.url, "href")} data-astro-cid-guvttfii> ${index === 0 ? renderTemplate`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-guvttfii> <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-astro-cid-guvttfii></path> <polyline points="9 22 9 12 15 12 15 22" data-astro-cid-guvttfii></polyline> </svg>` : item.name} </a>` : renderTemplate`<span data-astro-cid-guvttfii>${item.name}</span>`} </li>`)} </ol> </nav>`} <h1 class="page-heading" data-astro-cid-guvttfii>${title}</h1> ${subtitle && renderTemplate`<p class="page-subtitle" data-astro-cid-guvttfii>${subtitle}</p>`} ${renderSlot($$result, $$slots["default"])} </div> </section> `;
}, "/home/ivan/peptide/astro-peptide/src/components/PageTitle.astro", void 0);

export { $$PageTitle as $ };
