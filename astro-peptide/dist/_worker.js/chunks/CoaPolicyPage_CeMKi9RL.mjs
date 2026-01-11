globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_DjzMfJVp.mjs';
import { a as getLocalizedPath, t, $ as $$Layout } from './Layout_B6oc2337.mjs';
import { $ as $$PageTitle } from './PageTitle_B5SKoSSw.mjs';

const $$Astro = createAstro("https://peptide-shop.net");
const $$CoaPolicyPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CoaPolicyPage;
  const { lang } = Astro2.props;
  const breadcrumbs = [
    { name: t(lang, "nav.home"), url: getLocalizedPath("/", lang) },
    { name: t(lang, "legalPages.coaPolicy.title"), url: getLocalizedPath("/coa-policy", lang) }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t(lang, "legalPages.coaPolicy.title")} | Peptide Shop`, "description": t(lang, "legalPages.coaPolicy.subtitle"), "breadcrumbs": breadcrumbs }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": t(lang, "legalPages.coaPolicy.title"), "subtitle": t(lang, "legalPages.coaPolicy.subtitle"), "breadcrumbs": breadcrumbs })} ${maybeRenderHead()}<section class="section" style="padding: 60px 0;"> <div class="container"> <div class="row justify-content-center"> <div class="col-lg-10"> <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);"> <h2 class="mb-3" style="color: #1e293b; font-weight: 700;">${t(lang, "legalPages.coaPolicy.batchTitle")}</h2> <p class="mb-5" style="color: #64748b; line-height: 1.8;"> ${t(lang, "legalPages.coaPolicy.batchContent")} </p> <h2 class="mb-3" style="color: #1e293b; font-weight: 700;">${t(lang, "legalPages.coaPolicy.methodsTitle")}</h2> <ul class="list-unstyled mb-5"> <li class="mb-3 d-flex align-items-start"> <div style="width: 36px; height: 36px; background: rgba(0, 119, 182, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <polyline points="20 6 9 17 4 12"></polyline> </svg> </div> <span style="color: #64748b; line-height: 1.6;">${t(lang, "legalPages.coaPolicy.hplc")}</span> </li> <li class="mb-3 d-flex align-items-start"> <div style="width: 36px; height: 36px; background: rgba(0, 119, 182, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="2"> <polyline points="20 6 9 17 4 12"></polyline> </svg> </div> <span style="color: #64748b; line-height: 1.6;">${t(lang, "legalPages.coaPolicy.ms")}</span> </li> </ul> <h2 class="mb-3" style="color: #1e293b; font-weight: 700;">${t(lang, "legalPages.coaPolicy.availTitle")}</h2> <p style="color: #64748b; line-height: 1.8;"> ${t(lang, "legalPages.coaPolicy.availContent")} </p> </div> </div> </div> </div> </section> ` })}`;
}, "/home/ivan/peptide/astro-peptide/src/components/pages/CoaPolicyPage.astro", void 0);

export { $$CoaPolicyPage as $ };
