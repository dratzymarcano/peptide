/* empty css                                         */
import { c as createComponent, r as renderComponent, a as renderTemplate, F as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from '../../chunks/PageTitle_DiEJsxH3.mjs';
/* empty css                                                */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$WhatArePeptides = createComponent(($$result, $$props, $$slots) => {
  const peptideCategories = [
    {
      name: "GLP-1 Agonists",
      description: "Peptides that mimic glucagon-like peptide-1, primarily researched for metabolic effects",
      examples: ["Semaglutide", "Tirzepatide", "Retatrutide", "Cagrilintide"],
      icon: "scale"
    },
    {
      name: "Growth Hormone Secretagogues",
      description: "Peptides that stimulate the release of growth hormone from the pituitary gland",
      examples: ["Ipamorelin", "GHRP-2", "GHRP-6", "CJC-1295"],
      icon: "trending-up"
    },
    {
      name: "Recovery Peptides",
      description: "Peptides researched for tissue repair, healing, and recovery applications",
      examples: ["BPC-157", "TB-500", "GHK-Cu"],
      icon: "heart"
    },
    {
      name: "Nootropic Peptides",
      description: "Peptides studied for cognitive enhancement and neuroprotection",
      examples: ["Semax", "Selank", "DSIP", "Epitalon"],
      icon: "brain"
    },
    {
      name: "Melanocortin Peptides",
      description: "Peptides that interact with melanocortin receptors, researched for pigmentation",
      examples: ["Melanotan 2", "PT-141"],
      icon: "sun"
    }
  ];
  const faqs = [
    {
      question: "What is the difference between peptides and proteins?",
      answer: "The main difference is size. Peptides typically contain 2-50 amino acids, while proteins contain more than 50 amino acids. Proteins have more complex three-dimensional structures and generally perform more diverse biological functions."
    },
    {
      question: "How are synthetic peptides made?",
      answer: "Synthetic peptides are manufactured using solid-phase peptide synthesis (SPPS), developed by Bruce Merrifield in 1963. This process involves sequentially adding amino acids to a growing chain attached to a solid resin, allowing for precise control over the peptide sequence."
    },
    {
      question: "What does HPLC purity mean?",
      answer: "HPLC (High-Performance Liquid Chromatography) purity indicates the percentage of the target peptide in a sample. For example, 98% HPLC purity means 98% of the sample is the intended peptide. Higher purity is essential for reliable research results."
    },
    {
      question: "Are research peptides the same as pharmaceutical peptides?",
      answer: "Research peptides are synthesized using similar methods but are intended solely for laboratory research, not human use. Pharmaceutical peptides undergo additional manufacturing standards, clinical trials, and regulatory approval for therapeutic applications."
    },
    {
      question: "How should peptides be stored?",
      answer: "Lyophilized (freeze-dried) peptides should be stored at -20\xB0C for long-term storage. Short-term storage at 4\xB0C is acceptable. Reconstituted peptides should be kept at 4\xB0C and used within the timeframe specified on the Certificate of Analysis."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "What Are Peptides? Complete Guide to Research Peptides | Peptide Shop", "description": "Learn about peptides, amino acid chains, and peptide research. Guide to peptide types, synthesis, applications, and storage.", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Learn", url: "/learn" },
    { name: "What Are Peptides", url: "/learn/what-are-peptides" }
  ], "data-astro-cid-ukawssjz": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", "  ", '<section class="content-section" data-astro-cid-ukawssjz> <div class="container" data-astro-cid-ukawssjz> <div class="content-container" data-astro-cid-ukawssjz> <h2 class="section-title" data-astro-cid-ukawssjz>Understanding Peptides</h2> <p class="section-text" data-astro-cid-ukawssjz>\nPeptides are short chains of amino acids linked together by peptide bonds. They are the building blocks of proteins \n          and play essential roles in virtually every biological process in the body. While proteins contain more than 50 amino \n          acids, peptides typically contain between 2 and 50 amino acids, making them smaller and often more targeted in their \n          biological activities.\n</p> <p class="section-text" data-astro-cid-ukawssjz>\nThe human body naturally produces many peptides, including hormones like insulin (51 amino acids) and oxytocin \n          (9 amino acids). These endogenous peptides regulate crucial functions including metabolism, immune response, \n          cell signaling, and tissue repair.\n</p> <div class="highlight-box" data-astro-cid-ukawssjz> <p data-astro-cid-ukawssjz> <strong data-astro-cid-ukawssjz>Key Point:</strong> Research peptides are synthetic versions of natural or novel peptide sequences, \n            manufactured to precise specifications for laboratory research. They allow scientists to study biological \n            mechanisms that would otherwise be difficult to investigate.\n</p> </div> </div> </div> </section>  <section class="diagram-section" data-astro-cid-ukawssjz> <div class="container" data-astro-cid-ukawssjz> <div class="content-container" data-astro-cid-ukawssjz> <div class="amino-diagram" data-astro-cid-ukawssjz> <h3 class="section-title" style="margin-bottom: 16px;" data-astro-cid-ukawssjz>The Peptide Structure</h3> <p style="color: #64748b; margin-bottom: 24px;" data-astro-cid-ukawssjz>Amino acids connected by peptide bonds form a peptide chain</p> <div class="amino-chain" data-astro-cid-ukawssjz> <div class="amino-acid" style="background: #0077b6;" data-astro-cid-ukawssjz>Gly</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #0891b2;" data-astro-cid-ukawssjz>Ala</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #0d9488;" data-astro-cid-ukawssjz>Leu</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #059669;" data-astro-cid-ukawssjz>Val</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #16a34a;" data-astro-cid-ukawssjz>Ile</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #65a30d;" data-astro-cid-ukawssjz>Pro</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #ca8a04;" data-astro-cid-ukawssjz>Ser</div> <div class="peptide-bond" data-astro-cid-ukawssjz></div> <div class="amino-acid" style="background: #ea580c;" data-astro-cid-ukawssjz>Thr</div> </div> <p class="diagram-caption" data-astro-cid-ukawssjz>\nExample: An octapeptide (8 amino acids) showing glycine, alanine, leucine, valine, isoleucine, proline, serine, and threonine\n</p> </div> </div> </div> </section>  <section class="categories-section" data-astro-cid-ukawssjz> <div class="container" data-astro-cid-ukawssjz> <div class="content-container" data-astro-cid-ukawssjz> <h2 class="section-title" data-astro-cid-ukawssjz>Categories of Research Peptides</h2> <p class="section-text" data-astro-cid-ukawssjz>\nResearch peptides are typically classified by their primary area of study or mechanism of action. \n          Here are the main categories available for scientific research:\n</p> <div class="categories-grid" data-astro-cid-ukawssjz> ', ' </div> </div> </div> </section>  <section class="synthesis-section" data-astro-cid-ukawssjz> <div class="container" data-astro-cid-ukawssjz> <div class="content-container" data-astro-cid-ukawssjz> <h2 class="section-title" data-astro-cid-ukawssjz>How Are Peptides Synthesized?</h2> <p class="section-text" data-astro-cid-ukawssjz>\nModern peptide synthesis primarily uses Solid-Phase Peptide Synthesis (SPPS), a revolutionary technique \n          developed by Bruce Merrifield in 1963, for which he received the Nobel Prize in Chemistry in 1984.\n</p> <div class="process-steps" data-astro-cid-ukawssjz> <div class="step-card" data-astro-cid-ukawssjz> <div class="step-number" data-astro-cid-ukawssjz>1</div> <h4 class="step-title" data-astro-cid-ukawssjz>Attach to Resin</h4> <p class="step-description" data-astro-cid-ukawssjz>The first amino acid is attached to an insoluble polymer resin</p> </div> <div class="step-card" data-astro-cid-ukawssjz> <div class="step-number" data-astro-cid-ukawssjz>2</div> <h4 class="step-title" data-astro-cid-ukawssjz>Deprotection</h4> <p class="step-description" data-astro-cid-ukawssjz>Protective groups are removed from the amino acid</p> </div> <div class="step-card" data-astro-cid-ukawssjz> <div class="step-number" data-astro-cid-ukawssjz>3</div> <h4 class="step-title" data-astro-cid-ukawssjz>Coupling</h4> <p class="step-description" data-astro-cid-ukawssjz>Next amino acid is coupled to the growing chain</p> </div> <div class="step-card" data-astro-cid-ukawssjz> <div class="step-number" data-astro-cid-ukawssjz>4</div> <h4 class="step-title" data-astro-cid-ukawssjz>Cleavage</h4> <p class="step-description" data-astro-cid-ukawssjz>Completed peptide is cleaved from the resin and purified</p> </div> </div> <div class="highlight-box" style="margin-top: 40px;" data-astro-cid-ukawssjz> <p data-astro-cid-ukawssjz> <strong data-astro-cid-ukawssjz>Quality Control:</strong> After synthesis, peptides undergo rigorous testing including HPLC analysis \n            for purity verification and Mass Spectrometry for molecular weight confirmation. Only peptides meeting strict \n            purity standards (typically \u226598%) are released for research use.\n</p> </div> </div> </div> </section>  <section class="faq-section" data-astro-cid-ukawssjz> <div class="container" data-astro-cid-ukawssjz> <div class="content-container" data-astro-cid-ukawssjz> <h2 class="section-title" data-astro-cid-ukawssjz>Frequently Asked Questions</h2> <div class="faq-list" data-astro-cid-ukawssjz> ', ' </div> </div> </div> </section>  <section class="cta-section" data-astro-cid-ukawssjz> <div class="container" data-astro-cid-ukawssjz> <h2 class="cta-title" data-astro-cid-ukawssjz>Ready to Start Your Research?</h2> <p class="cta-subtitle" data-astro-cid-ukawssjz>\nExplore our complete catalog of high-purity research peptides. Every product includes a Certificate of Analysis.\n</p> <a href="/peptides/" class="cta-btn" data-astro-cid-ukawssjz>Browse Peptides</a> </div> </section>  <script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "Article",\n    "headline": "What Are Peptides? Complete Guide to Research Peptides",\n    "description": "A comprehensive introduction to peptides, amino acid chains, and their significance in scientific research. Learn about peptide synthesis, categories, and applications.",\n    "image": "https://peptide-shop.net/images/what-are-peptides.jpg",\n    "author": {\n      "@type": "Organization",\n      "name": "Peptide Shop"\n    },\n    "publisher": {\n      "@type": "Organization",\n      "name": "Peptide Shop",\n      "logo": {\n        "@type": "ImageObject",\n        "url": "https://peptide-shop.net/images/logo.png"\n      }\n    },\n    "datePublished": "2024-01-15",\n    "dateModified": "2024-01-15",\n    "mainEntityOfPage": {\n      "@type": "WebPage",\n      "@id": "https://peptide-shop.net/learn/what-are-peptides"\n    }\n  }\n  <\/script> '])), renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "What Are Peptides?", "subtitle": "A comprehensive introduction to peptides, amino acid chains, and their significance in scientific research. Learn about peptide synthesis, categories, and applications in modern research.", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Learn", url: "/learn" },
    { name: "What Are Peptides" }
  ], "data-astro-cid-ukawssjz": true }), maybeRenderHead(), peptideCategories.map((cat) => renderTemplate`<div class="category-card" data-astro-cid-ukawssjz> <div class="category-header" data-astro-cid-ukawssjz> <div class="category-icon" data-astro-cid-ukawssjz> <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ukawssjz> ${cat.icon === "scale" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ukawssjz": true }, { "default": ($$result3) => renderTemplate`<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" data-astro-cid-ukawssjz></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" data-astro-cid-ukawssjz></path><path d="M7 21h10" data-astro-cid-ukawssjz></path><path d="M12 3v18" data-astro-cid-ukawssjz></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" data-astro-cid-ukawssjz></path>` })}`} ${cat.icon === "trending-up" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ukawssjz": true }, { "default": ($$result3) => renderTemplate`<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" data-astro-cid-ukawssjz></polyline><polyline points="17 6 23 6 23 12" data-astro-cid-ukawssjz></polyline>` })}`} ${cat.icon === "heart" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ukawssjz": true }, { "default": ($$result3) => renderTemplate`<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" data-astro-cid-ukawssjz></path>` })}`} ${cat.icon === "brain" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ukawssjz": true }, { "default": ($$result3) => renderTemplate`<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54" data-astro-cid-ukawssjz></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54" data-astro-cid-ukawssjz></path>` })}`} ${cat.icon === "sun" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ukawssjz": true }, { "default": ($$result3) => renderTemplate`<circle cx="12" cy="12" r="4" data-astro-cid-ukawssjz></circle><path d="M12 2v2" data-astro-cid-ukawssjz></path><path d="M12 20v2" data-astro-cid-ukawssjz></path><path d="m4.93 4.93 1.41 1.41" data-astro-cid-ukawssjz></path><path d="m17.66 17.66 1.41 1.41" data-astro-cid-ukawssjz></path><path d="M2 12h2" data-astro-cid-ukawssjz></path><path d="M20 12h2" data-astro-cid-ukawssjz></path><path d="m6.34 17.66-1.41 1.41" data-astro-cid-ukawssjz></path><path d="m19.07 4.93-1.41 1.41" data-astro-cid-ukawssjz></path>` })}`} </svg> </div> <h3 class="category-name" data-astro-cid-ukawssjz>${cat.name}</h3> </div> <p class="category-description" data-astro-cid-ukawssjz>${cat.description}</p> <div class="category-examples" data-astro-cid-ukawssjz> ${cat.examples.map((ex) => renderTemplate`<span class="example-tag" data-astro-cid-ukawssjz>${ex}</span>`)} </div> </div>`), faqs.map((faq) => renderTemplate`<div class="faq-item" data-astro-cid-ukawssjz> <h3 class="faq-question" data-astro-cid-ukawssjz>${faq.question}</h3> <p class="faq-answer" data-astro-cid-ukawssjz>${faq.answer}</p> </div>`)) })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/learn/what-are-peptides.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/learn/what-are-peptides.astro";
const $$url = "/learn/what-are-peptides";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$WhatArePeptides,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
