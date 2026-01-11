globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment } from '../chunks/astro/server_DjzMfJVp.mjs';
import { $ as $$Layout } from '../chunks/Layout_B6oc2337.mjs';
/* empty css                                     */
export { r as renderers } from '../chunks/_@astro-renderers_Co1rHHJa.mjs';

const $$Wholesale = createComponent(($$result, $$props, $$slots) => {
  const tiers = [
    {
      name: "Starter",
      minOrder: "\xA3500",
      discount: "10%",
      features: [
        "10% discount on all products",
        "Priority processing",
        "Dedicated account manager",
        "Monthly invoicing available"
      ],
      color: "#0077b6"
    },
    {
      name: "Professional",
      minOrder: "\xA31,000",
      discount: "15%",
      features: [
        "15% discount on all products",
        "Same-day processing",
        "Dedicated account manager",
        "Net-30 payment terms",
        "Custom packaging available"
      ],
      color: "#023e8a",
      popular: true
    },
    {
      name: "Enterprise",
      minOrder: "\xA32,500+",
      discount: "20%+",
      features: [
        "20%+ custom discount",
        "Priority same-day processing",
        "Senior account manager",
        "Flexible payment terms",
        "Custom packaging & labeling",
        "Bulk quantity pricing"
      ],
      color: "#1e293b"
    }
  ];
  const benefits = [
    {
      icon: "shield",
      title: "Quality Guaranteed",
      description: "All products are HPLC-verified with 98%+ purity and include COA documentation"
    },
    {
      icon: "truck",
      title: "Reliable Supply",
      description: "Consistent stock levels and reliable shipping schedules for your research needs"
    },
    {
      icon: "users",
      title: "Dedicated Support",
      description: "Direct access to your account manager for orders, technical questions, and support"
    },
    {
      icon: "file-text",
      title: "Documentation",
      description: "Comprehensive COA, MSDS, and batch documentation for regulatory compliance"
    },
    {
      icon: "credit-card",
      title: "Flexible Payment",
      description: "Bank transfer, Bitcoin, and credit terms available for qualified accounts"
    },
    {
      icon: "package",
      title: "Custom Orders",
      description: "Custom quantities, packaging, and labeling options for your specific requirements"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Wholesale Research Peptides | Bulk Orders | Peptide Shop", "description": "Wholesale research peptides for laboratories and institutions. Bulk pricing, dedicated support, and flexible payment terms. Apply now.", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Wholesale", url: "/wholesale" }
  ], "data-astro-cid-djkzptiy": true }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="wholesale-hero" data-astro-cid-djkzptiy> <div class="container" data-astro-cid-djkzptiy> <div class="row align-items-center" data-astro-cid-djkzptiy> <div class="col-lg-8 hero-content" data-astro-cid-djkzptiy> <span class="hero-badge" data-astro-cid-djkzptiy>FOR LABORATORIES & INSTITUTIONS</span> <h1 class="hero-title" data-astro-cid-djkzptiy>Wholesale Research Peptides</h1> <p class="hero-description" data-astro-cid-djkzptiy>
Partner with Peptide Shop for reliable, high-quality research peptides at competitive bulk pricing. 
            Dedicated support, flexible payment terms, and consistent supply for your research needs.
</p> <a href="#apply" class="hero-cta" data-astro-cid-djkzptiy>Apply for Wholesale Account</a> </div> </div> </div> </section>  <section class="tiers-section" data-astro-cid-djkzptiy> <div class="container" data-astro-cid-djkzptiy> <div class="section-header" data-astro-cid-djkzptiy> <p class="section-label" data-astro-cid-djkzptiy>Pricing Tiers</p> <h2 class="section-title" data-astro-cid-djkzptiy>Volume Discounts</h2> <p class="section-subtitle" data-astro-cid-djkzptiy>Choose the tier that fits your research volume. All tiers include full documentation and priority support.</p> </div> <div class="tiers-grid" data-astro-cid-djkzptiy> ${tiers.map((tier) => renderTemplate`<div${addAttribute(`tier-card ${tier.popular ? "popular" : ""}`, "class")} data-astro-cid-djkzptiy> ${tier.popular && renderTemplate`<span class="popular-badge" data-astro-cid-djkzptiy>Most Popular</span>`} <h3 class="tier-name" data-astro-cid-djkzptiy>${tier.name}</h3> <p class="tier-min" data-astro-cid-djkzptiy>Minimum order: ${tier.minOrder}</p> <p class="tier-discount"${addAttribute(`color: ${tier.color}`, "style")} data-astro-cid-djkzptiy> ${tier.discount} <span data-astro-cid-djkzptiy>off all products</span> </p> <ul class="tier-features" data-astro-cid-djkzptiy> ${tier.features.map((feature) => renderTemplate`<li data-astro-cid-djkzptiy> <svg viewBox="0 0 24 24" fill="none"${addAttribute(tier.color, "stroke")} stroke-width="2" data-astro-cid-djkzptiy> <polyline points="20 6 9 17 4 12" data-astro-cid-djkzptiy></polyline> </svg> ${feature} </li>`)} </ul> <a href="#apply"${addAttribute(tier.popular ? "tier-btn tier-btn-primary" : "tier-btn tier-btn-outline", "class")} data-astro-cid-djkzptiy>
Get Started
</a> </div>`)} </div> </div> </section>  <section class="benefits-section" data-astro-cid-djkzptiy> <div class="container" data-astro-cid-djkzptiy> <div class="section-header" data-astro-cid-djkzptiy> <p class="section-label" data-astro-cid-djkzptiy>Why Partner With Us</p> <h2 class="section-title" data-astro-cid-djkzptiy>Wholesale Benefits</h2> <p class="section-subtitle" data-astro-cid-djkzptiy>Everything you need for reliable peptide supply to your laboratory.</p> </div> <div class="benefits-grid" data-astro-cid-djkzptiy> ${benefits.map((benefit) => renderTemplate`<div class="benefit-card" data-astro-cid-djkzptiy> <div class="benefit-icon" data-astro-cid-djkzptiy> <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-djkzptiy> ${benefit.icon === "shield" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-djkzptiy": true }, { "default": ($$result3) => renderTemplate`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-djkzptiy></path>` })}`} ${benefit.icon === "truck" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-djkzptiy": true }, { "default": ($$result3) => renderTemplate`<path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" data-astro-cid-djkzptiy></path><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" data-astro-cid-djkzptiy></path><circle cx="7" cy="18" r="2" data-astro-cid-djkzptiy></circle><circle cx="17" cy="18" r="2" data-astro-cid-djkzptiy></circle>` })}`} ${benefit.icon === "users" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-djkzptiy": true }, { "default": ($$result3) => renderTemplate`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-astro-cid-djkzptiy></path><circle cx="9" cy="7" r="4" data-astro-cid-djkzptiy></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-astro-cid-djkzptiy></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-astro-cid-djkzptiy></path>` })}`} ${benefit.icon === "file-text" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-djkzptiy": true }, { "default": ($$result3) => renderTemplate`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-djkzptiy></path><polyline points="14 2 14 8 20 8" data-astro-cid-djkzptiy></polyline><line x1="16" y1="13" x2="8" y2="13" data-astro-cid-djkzptiy></line><line x1="16" y1="17" x2="8" y2="17" data-astro-cid-djkzptiy></line><polyline points="10 9 9 9 8 9" data-astro-cid-djkzptiy></polyline>` })}`} ${benefit.icon === "credit-card" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-djkzptiy": true }, { "default": ($$result3) => renderTemplate`<rect width="20" height="14" x="2" y="5" rx="2" data-astro-cid-djkzptiy></rect><line x1="2" y1="10" x2="22" y2="10" data-astro-cid-djkzptiy></line>` })}`} ${benefit.icon === "package" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-djkzptiy": true }, { "default": ($$result3) => renderTemplate`<path d="m7.5 4.27 9 5.15" data-astro-cid-djkzptiy></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" data-astro-cid-djkzptiy></path><path d="m3.3 7 8.7 5 8.7-5" data-astro-cid-djkzptiy></path><path d="M12 22V12" data-astro-cid-djkzptiy></path>` })}`} </svg> </div> <h3 class="benefit-title" data-astro-cid-djkzptiy>${benefit.title}</h3> <p class="benefit-description" data-astro-cid-djkzptiy>${benefit.description}</p> </div>`)} </div> </div> </section>  <section class="apply-section" id="apply" data-astro-cid-djkzptiy> <div class="container" data-astro-cid-djkzptiy> <div class="section-header" data-astro-cid-djkzptiy> <p class="section-label" data-astro-cid-djkzptiy>Get Started</p> <h2 class="section-title" data-astro-cid-djkzptiy>Apply for Wholesale Account</h2> <p class="section-subtitle" data-astro-cid-djkzptiy>Complete the form below and our team will be in touch within 24 hours.</p> </div> <div class="apply-container" data-astro-cid-djkzptiy> <form class="apply-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" data-astro-cid-djkzptiy> <div class="form-row" data-astro-cid-djkzptiy> <div data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>First Name *</label> <input type="text" name="firstName" class="form-input" required data-astro-cid-djkzptiy> </div> <div data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Last Name *</label> <input type="text" name="lastName" class="form-input" required data-astro-cid-djkzptiy> </div> </div> <div class="form-group" data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Email Address *</label> <input type="email" name="email" class="form-input" required data-astro-cid-djkzptiy> </div> <div class="form-group" data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Organization / Institution *</label> <input type="text" name="organization" class="form-input" required data-astro-cid-djkzptiy> </div> <div class="form-row" data-astro-cid-djkzptiy> <div data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Country *</label> <select name="country" class="form-select" required data-astro-cid-djkzptiy> <option value="" data-astro-cid-djkzptiy>Select country</option> <option value="UK" data-astro-cid-djkzptiy>United Kingdom</option> <option value="DE" data-astro-cid-djkzptiy>Germany</option> <option value="FR" data-astro-cid-djkzptiy>France</option> <option value="NL" data-astro-cid-djkzptiy>Netherlands</option> <option value="ES" data-astro-cid-djkzptiy>Spain</option> <option value="IT" data-astro-cid-djkzptiy>Italy</option> <option value="PT" data-astro-cid-djkzptiy>Portugal</option> <option value="PL" data-astro-cid-djkzptiy>Poland</option> <option value="CZ" data-astro-cid-djkzptiy>Czech Republic</option> <option value="AT" data-astro-cid-djkzptiy>Austria</option> <option value="BE" data-astro-cid-djkzptiy>Belgium</option> <option value="IE" data-astro-cid-djkzptiy>Ireland</option> <option value="other" data-astro-cid-djkzptiy>Other EU Country</option> </select> </div> <div data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Estimated Monthly Volume *</label> <select name="volume" class="form-select" required data-astro-cid-djkzptiy> <option value="" data-astro-cid-djkzptiy>Select volume</option> <option value="500-1000" data-astro-cid-djkzptiy>£500 - £1,000</option> <option value="1000-2500" data-astro-cid-djkzptiy>£1,000 - £2,500</option> <option value="2500-5000" data-astro-cid-djkzptiy>£2,500 - £5,000</option> <option value="5000+" data-astro-cid-djkzptiy>£5,000+</option> </select> </div> </div> <div class="form-group" data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Products of Interest</label> <textarea name="products" class="form-textarea" placeholder="Please list the peptides you're interested in and typical quantities..." data-astro-cid-djkzptiy></textarea> </div> <div class="form-group" data-astro-cid-djkzptiy> <label class="form-label" data-astro-cid-djkzptiy>Additional Information</label> <textarea name="message" class="form-textarea" placeholder="Tell us about your research needs, preferred payment terms, or any questions..." data-astro-cid-djkzptiy></textarea> </div> <button type="submit" class="submit-btn" data-astro-cid-djkzptiy>Submit Application</button> <p class="form-note" data-astro-cid-djkzptiy>We typically respond within 24 business hours.</p> </form> </div> </div> </section> ` })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/wholesale.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/wholesale.astro";
const $$url = "/wholesale";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Wholesale,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
