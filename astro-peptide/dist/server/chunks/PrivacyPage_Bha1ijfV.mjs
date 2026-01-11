import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { a as getLocalizedPath, t, $ as $$Layout } from './Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from './PageTitle_DiEJsxH3.mjs';

const $$Astro = createAstro("https://peptide-shop.net");
const $$PrivacyPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PrivacyPage;
  const { lang } = Astro2.props;
  const breadcrumbs = [
    { name: t(lang, "nav.home"), url: getLocalizedPath("/", lang) },
    { name: t(lang, "footer.privacyPolicy"), url: getLocalizedPath("/privacy", lang) }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t(lang, "legalPages.privacy.title")} | Peptide Shop`, "description": t(lang, "legalPages.privacy.subtitle"), "breadcrumbs": breadcrumbs }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": t(lang, "legalPages.privacy.title"), "subtitle": t(lang, "legalPages.privacy.subtitle"), "breadcrumbs": breadcrumbs })} ${maybeRenderHead()}<section class="section"> <div class="container"> <div class="row justify-content-center"> <div class="col-lg-10"> <p class="text-muted mb-5">${t(lang, "legalPages.lastUpdated")}: December 31, 2025</p> <h2 class="mb-3">${t(lang, "legalPages.privacy.infoCollect.title")}</h2> <p class="mb-4">${t(lang, "legalPages.privacy.infoCollect.content")}</p> <h2 class="mb-3">${t(lang, "legalPages.privacy.howUse.title")}</h2> <p>${t(lang, "legalPages.privacy.howUse.intro")}</p> <ul class="list-unstyled mb-4"> <li class="mb-2 d-flex align-items-start"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2 mt-1 text-color flex-shrink-0"><path d="m9 18 6-6-6-6"></path></svg> ${t(lang, "legalPages.privacy.howUse.orders")} </li> <li class="mb-2 d-flex align-items-start"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2 mt-1 text-color flex-shrink-0"><path d="m9 18 6-6-6-6"></path></svg> ${t(lang, "legalPages.privacy.howUse.coa")} </li> <li class="mb-2 d-flex align-items-start"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2 mt-1 text-color flex-shrink-0"><path d="m9 18 6-6-6-6"></path></svg> ${t(lang, "legalPages.privacy.howUse.questions")} </li> <li class="mb-2 d-flex align-items-start"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2 mt-1 text-color flex-shrink-0"><path d="m9 18 6-6-6-6"></path></svg> ${t(lang, "legalPages.privacy.howUse.legal")} </li> </ul> <h2 class="mb-3">${t(lang, "legalPages.privacy.security.title")}</h2> <p class="mb-4">${t(lang, "legalPages.privacy.security.content")}</p> <h2 class="mb-3">${t(lang, "legalPages.privacy.cookies.title")}</h2> <p class="mb-4">${t(lang, "legalPages.privacy.cookies.content")}</p> </div> </div> </div> </section> ` })}`;
}, "/home/ivan/peptide/astro-peptide/src/components/pages/PrivacyPage.astro", void 0);

export { $$PrivacyPage as $ };
