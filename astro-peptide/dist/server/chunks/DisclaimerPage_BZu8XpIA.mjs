import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { a as getLocalizedPath, t, $ as $$Layout } from './Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from './PageTitle_DiEJsxH3.mjs';

const $$Astro = createAstro("https://peptide-shop.net");
const $$DisclaimerPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DisclaimerPage;
  const { lang } = Astro2.props;
  const breadcrumbs = [
    { name: t(lang, "nav.home"), url: getLocalizedPath("/", lang) },
    { name: t(lang, "footer.disclaimer"), url: getLocalizedPath("/disclaimer", lang) }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t(lang, "legalPages.disclaimer.title")} | Peptide Shop`, "description": t(lang, "legalPages.disclaimer.subtitle"), "breadcrumbs": breadcrumbs }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": t(lang, "legalPages.disclaimer.title"), "subtitle": t(lang, "legalPages.disclaimer.subtitle"), "breadcrumbs": breadcrumbs })} ${maybeRenderHead()}<section class="section"> <div class="container"> <div class="row justify-content-center"> <div class="col-lg-10"> <div class="alert alert-danger border-0 shadow-sm mb-5" role="alert"> <h4 class="alert-heading d-flex align-items-center"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg> ${t(lang, "legalPages.disclaimer.warning")} </h4> <p class="mb-0">${t(lang, "legalPages.disclaimer.warningText")}</p> </div> <p class="lead mb-4">${t(lang, "legalPages.disclaimer.lead")}</p> <p>${t(lang, "legalPages.disclaimer.patent")}</p> <p>${t(lang, "legalPages.disclaimer.qualified")}</p> <p>${t(lang, "legalPages.disclaimer.rights")}</p> </div> </div> </div> </section> ` })}`;
}, "/home/ivan/peptide/astro-peptide/src/components/pages/DisclaimerPage.astro", void 0);

export { $$DisclaimerPage as $ };
