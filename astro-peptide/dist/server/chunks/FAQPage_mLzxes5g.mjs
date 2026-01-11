import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, u as unescapeHTML, e as addAttribute, F as Fragment, m as maybeRenderHead } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { t, a as getLocalizedPath, $ as $$Layout } from './Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from './PageTitle_DiEJsxH3.mjs';
/* empty css                              */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://peptide-shop.net");
const $$FAQPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FAQPage;
  const { lang } = Astro2.props;
  const faqCategoriesRaw = [
    {
      name: "General Information",
      icon: "info-circle",
      faqs: [
        {
          question: "What are peptides?",
          answer: "Peptides are short chains of amino acids, typically containing between 2 and 50 amino acids. They are the building blocks of proteins and play crucial roles in various biological processes. Research peptides are synthetic versions used for scientific study and laboratory research."
        },
        {
          question: "Are your products safe for human consumption?",
          answer: "Our research peptides are strictly for laboratory and research use only - they are NOT intended for human consumption. All products are clearly labeled for their intended purpose. Researchers must comply with all applicable laws and regulations."
        },
        {
          question: "Who can purchase from Peptide Shop?",
          answer: "Our products are available to researchers, laboratories, academic institutions, and qualified individuals conducting legitimate research. By placing an order, you confirm that products will be used solely for research purposes."
        },
        {
          question: "Do I need a license to purchase research peptides?",
          answer: "Requirements vary by country and jurisdiction. In most European countries, research peptides can be purchased without a special license for legitimate research purposes. However, we recommend checking your local regulations before ordering."
        },
        {
          question: "What makes Peptide Shop different from other suppliers?",
          answer: "We offer 98%+ purity guaranteed on all peptides, verified by HPLC and Mass Spectrometry analysis. Every order includes a Certificate of Analysis (COA), we provide same-day dispatch before 4PM, and we offer secure payment options including Bitcoin."
        },
        {
          question: "Do you have a physical location?",
          answer: "We operate primarily online to keep costs low and pass savings to our customers. Our products are stored in climate-controlled facilities and shipped directly to ensure maximum freshness and potency."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach us via email at info@peptide-shop.net or through our contact form. We typically respond within 24 hours on business days. For urgent inquiries, please include 'URGENT' in your subject line."
        },
        {
          question: "Do you offer wholesale pricing?",
          answer: "Yes! We offer competitive bulk pricing for laboratories and research institutions. Visit our wholesale page or contact us directly for a custom quote based on your volume requirements."
        }
      ]
    },
    {
      name: "Quality & Testing",
      icon: "shield-check",
      faqs: [
        {
          question: "What is the purity of your peptides?",
          answer: "We guarantee a minimum purity of 98% for all research peptides, with many products exceeding 99% purity. Every batch is tested using High-Performance Liquid Chromatography (HPLC) and verified through Mass Spectrometry analysis."
        },
        {
          question: "Do you provide Certificates of Analysis (COA)?",
          answer: "Yes, every order includes a detailed Certificate of Analysis (COA) showing the HPLC purity results, molecular weight verification, and batch information. COAs are also available for download on each product page."
        },
        {
          question: "How do you test your peptides?",
          answer: "All peptides undergo rigorous quality control including: HPLC analysis for purity verification, Mass Spectrometry (MS) for molecular weight confirmation, appearance inspection, and solubility testing. Only batches meeting our strict standards are released for sale."
        },
        {
          question: "What does HPLC purity mean?",
          answer: "HPLC (High-Performance Liquid Chromatography) purity indicates the percentage of the target peptide in the sample. A 98% HPLC purity means that 98% of the sample consists of the intended peptide, with minimal impurities or degradation products."
        },
        {
          question: "Are your peptides pharmaceutical grade?",
          answer: "Our peptides are research-grade with pharmaceutical-level purity (\u226598%). They are synthesized using the same methods as pharmaceutical peptides but are intended for research purposes only, not therapeutic use."
        },
        {
          question: "How do you ensure batch-to-batch consistency?",
          answer: "We work with ISO-certified manufacturers who follow strict GMP-like protocols. Each batch is independently tested, and we maintain detailed records to ensure consistent quality across all production runs."
        }
      ]
    },
    {
      name: "Ordering & Payment",
      icon: "credit-card",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept Bank Transfer (SEPA for EU customers) and Bitcoin/Cryptocurrency. Card payments may be available for select orders. Bitcoin payments receive a 5% discount and are processed instantly."
        },
        {
          question: "Is it safe to pay with Bitcoin?",
          answer: "Yes! Bitcoin payments are processed through BTCPay Server, a secure and private payment processor. Transactions are encrypted and we never store your payment details. Plus, you receive a 5% discount on all Bitcoin orders."
        },
        {
          question: "How do I pay via bank transfer?",
          answer: "After placing your order, you'll receive our bank details via email. Simply transfer the exact amount with your order number as the reference. Orders are processed once payment is confirmed (usually 1-2 business days for SEPA transfers)."
        },
        {
          question: "Can I cancel or modify my order?",
          answer: "Orders can be cancelled or modified before dispatch. Once shipped, orders cannot be cancelled. Please contact us immediately if you need to make changes. We'll do our best to accommodate your request."
        },
        {
          question: "Do you offer discounts for large orders?",
          answer: "Yes! We offer tiered pricing for bulk orders. Contact our wholesale team for custom quotes. We also offer a 5% discount for Bitcoin payments and occasional promotional discounts for newsletter subscribers."
        },
        {
          question: "Will I receive an invoice?",
          answer: "Yes, a detailed invoice is sent via email upon order confirmation. Invoices include product details, pricing, and can be used for research expense documentation. Additional copies are available upon request."
        },
        {
          question: "What currency are prices displayed in?",
          answer: "All prices are displayed in British Pounds (GBP). For EU customers, the equivalent in Euros will be shown at checkout based on current exchange rates."
        },
        {
          question: "Is my personal information secure?",
          answer: "Absolutely. We use SSL encryption for all transactions, never store payment card details, and follow strict data protection guidelines compliant with GDPR. Your privacy is our priority."
        }
      ]
    },
    {
      name: "Shipping & Delivery",
      icon: "truck",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "UK orders: 1-2 business days. EU orders: 3-7 business days depending on destination. Orders placed before 4PM (GMT) on business days are dispatched same day."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on orders over \xA3150 (or \u20AC175 equivalent) within the UK and EU. Express shipping options are available at checkout for an additional fee."
        },
        {
          question: "How are peptides packaged for shipping?",
          answer: "Peptides are shipped in sealed vials with secure caps. Temperature-sensitive items include cold packs. All packages are discreetly labeled with no indication of contents on the exterior."
        },
        {
          question: "Do you provide tracking information?",
          answer: "Yes, all orders include tracking. You'll receive a tracking number via email once your order is dispatched. You can track your package through our website or the carrier's tracking portal."
        },
        {
          question: "What happens if my package is delayed?",
          answer: "Shipping delays can occasionally occur due to customs or carrier issues. If your package is significantly delayed, contact us with your order number and we'll investigate immediately. We'll reship or refund if the package is lost."
        },
        {
          question: "Can I specify a delivery date or time?",
          answer: "We cannot guarantee specific delivery dates as this depends on the carrier. However, you can add delivery instructions at checkout, and we'll include them with the shipment."
        },
        {
          question: "Do you ship on weekends?",
          answer: "Orders are dispatched Monday through Friday only. Orders placed on weekends or holidays will be processed the next business day."
        },
        {
          question: "What carriers do you use?",
          answer: "We use reputable carriers including Royal Mail, DPD, and DHL depending on destination and service level selected. All carriers offer tracking and signature confirmation where available."
        }
      ]
    },
    {
      name: "International & Customs",
      icon: "globe",
      faqs: [
        {
          question: "Which countries do you ship to?",
          answer: "We ship throughout the European Union including: UK, Germany, France, Netherlands, Spain, Italy, Portugal, Poland, Czech Republic, Austria, Belgium, Sweden, Denmark, Finland, Ireland, and more. Contact us for other destinations."
        },
        {
          question: "Will I have to pay customs duties or import taxes?",
          answer: "For EU countries, no additional customs duties apply. For non-EU destinations, you may be responsible for import duties and taxes according to your country's regulations. These are not included in our prices."
        },
        {
          question: "How do you handle customs declarations?",
          answer: "All packages include accurate customs documentation describing the contents as 'Research Chemicals' or 'Laboratory Supplies' with declared values. We comply with all international shipping regulations."
        },
        {
          question: "What if my package is seized by customs?",
          answer: "Customs seizures are rare but can occur. If your package is seized, provide us with documentation from customs and we'll work with you to resolve the situation. We may offer a partial refund or replacement depending on circumstances."
        },
        {
          question: "Are there any products you cannot ship internationally?",
          answer: "Some peptides may have restrictions in certain countries. We recommend checking your local regulations before ordering. If we cannot ship a specific product to your location, we'll notify you and offer alternatives or a refund."
        },
        {
          question: "Do you ship to the USA?",
          answer: "Currently, we focus on European markets. US shipping may be available for select products - please contact us to inquire about specific items and shipping options to the United States."
        }
      ]
    },
    {
      name: "Storage & Handling",
      icon: "thermometer",
      faqs: [
        {
          question: "How should I store my peptides?",
          answer: "Lyophilized (freeze-dried) peptides should be stored at -20\xB0C for long-term storage. Short-term storage at 4\xB0C (refrigerator) is acceptable. Keep peptides away from light and moisture. Reconstituted peptides should be stored at 4\xB0C and used within the timeframe specified on the COA."
        },
        {
          question: "How long do peptides remain stable?",
          answer: "Lyophilized peptides stored at -20\xB0C typically remain stable for 2+ years. At 4\xB0C, stability is generally 6-12 months. Reconstituted peptides have shorter stability, typically 2-4 weeks when refrigerated. Always check the expiration date on your COA."
        },
        {
          question: "Do you provide reconstitution instructions?",
          answer: "Yes, general reconstitution guidelines are provided with each order. Typically, peptides are reconstituted with bacteriostatic water or sterile water. Specific protocols depend on your research requirements."
        },
        {
          question: "What is bacteriostatic water and why is it used?",
          answer: "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol, which inhibits bacterial growth. It's preferred for reconstituting peptides that will be used over multiple days, as it helps maintain sterility and extends the solution's usability."
        },
        {
          question: "Can I freeze reconstituted peptides?",
          answer: "Generally, we don't recommend freezing reconstituted peptides as freeze-thaw cycles can cause degradation. If you must freeze, aliquot into single-use portions to avoid repeated freezing and thawing."
        },
        {
          question: "My peptide arrived at room temperature - is it still good?",
          answer: "Lyophilized peptides are stable at room temperature for short periods during transit (typically several days). As long as the seal is intact and the peptide appears as expected (usually a white powder), it should be fine. Store properly upon receipt."
        }
      ]
    },
    {
      name: "Returns & Refunds",
      icon: "refresh",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We accept returns of unopened, undamaged products within 14 days of delivery. Products must be in original packaging with seals intact. Contact us to initiate a return and receive a Return Authorization number."
        },
        {
          question: "What if I receive a damaged or incorrect product?",
          answer: "Contact us immediately with photos of the damage or incorrect item. We'll arrange a replacement or full refund at no additional cost. Please keep all packaging until the issue is resolved."
        },
        {
          question: "How long do refunds take to process?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. Bank transfer refunds may take an additional 2-3 days to appear in your account. Bitcoin refunds are processed at the current exchange rate."
        },
        {
          question: "Can I exchange a product for a different one?",
          answer: "Yes, we accept exchanges for unopened products. Return the original item and place a new order, or contact us to arrange an exchange. Any price difference will be charged or refunded accordingly."
        },
        {
          question: "What if my peptide doesn't meet purity specifications?",
          answer: "If independent testing shows our product doesn't meet stated purity specifications, we'll provide a full refund or replacement. Please provide documentation of your testing methodology and results."
        },
        {
          question: "Do you refund shipping costs?",
          answer: "Shipping costs are refunded if the return is due to our error (wrong item, damaged product, etc.). For change-of-mind returns, original shipping costs are non-refundable and return shipping is the customer's responsibility."
        }
      ]
    }
  ];
  const faqCategories = faqCategoriesRaw.map((cat) => {
    let translatedName = cat.name;
    if (cat.name === "General Information") translatedName = t(lang, "faqPage.categories.general");
    else if (cat.name === "Quality & Testing") translatedName = t(lang, "faqPage.categories.quality");
    else if (cat.name === "Ordering & Payment") translatedName = t(lang, "faqPage.categories.payment");
    return {
      ...cat,
      name: translatedName
    };
  });
  const allFaqs = faqCategories.flatMap((cat) => cat.faqs);
  const title = t(lang, "faqPage.title");
  const contactPath = getLocalizedPath("/contact/", lang);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${title} | Peptide Shop`, "description": "Find answers about research peptides, ordering, shipping, and quality testing. Common questions about Peptide Shop products and services.", "breadcrumbs": [
    { name: t(lang, "nav.home"), url: getLocalizedPath("/", lang) },
    { name: "FAQ", url: getLocalizedPath("/faq", lang) }
  ], "data-astro-cid-uh6r4kbv": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<div class="faq-page" data-astro-cid-uh6r4kbv> ', ' <!-- Main Content --> <section style="padding-bottom: 80px;" data-astro-cid-uh6r4kbv> <div class="container" data-astro-cid-uh6r4kbv> <div class="row" data-astro-cid-uh6r4kbv> <!-- Sidebar Navigation --> <div class="col-lg-3" data-astro-cid-uh6r4kbv> <div class="faq-nav" data-astro-cid-uh6r4kbv> <div class="faq-nav-title" data-astro-cid-uh6r4kbv>Categories</div> ', ' </div> </div> <!-- FAQ Content --> <div class="col-lg-9" data-astro-cid-uh6r4kbv> ', ` <!-- CTA Section --> <div class="faq-cta" data-astro-cid-uh6r4kbv> <h3 data-astro-cid-uh6r4kbv>Still Have Questions?</h3> <p data-astro-cid-uh6r4kbv>Can't find what you're looking for? Our support team is here to help.</p> <a`, ' class="faq-cta-btn" data-astro-cid-uh6r4kbv>Contact Us</a> </div> </div> </div> </div> </section> </div>  <script type="application/ld+json">', "<\/script> "])), maybeRenderHead(), renderComponent($$result2, "PageTitle", $$PageTitle, { "title": title, "subtitle": "Find answers to common questions about our research peptides, ordering process, shipping, and quality assurance.", "breadcrumbs": [
    { name: t(lang, "nav.home"), url: getLocalizedPath("/", lang) },
    { name: "FAQ" }
  ], "data-astro-cid-uh6r4kbv": true }), faqCategories.map((category, idx) => renderTemplate`<a${addAttribute(`#category-${idx}`, "href")} class="faq-nav-link" data-astro-cid-uh6r4kbv> ${category.name} (${category.faqs.length})
</a>`), faqCategories.map((category, catIdx) => renderTemplate`<div class="faq-category"${addAttribute(`category-${catIdx}`, "id")} data-astro-cid-uh6r4kbv> <div class="faq-category-header" data-astro-cid-uh6r4kbv> <div class="faq-category-icon" data-astro-cid-uh6r4kbv> <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-uh6r4kbv> ${category.icon === "info-circle" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<circle cx="12" cy="12" r="10" data-astro-cid-uh6r4kbv></circle><path d="M12 16v-4" data-astro-cid-uh6r4kbv></path><path d="M12 8h.01" data-astro-cid-uh6r4kbv></path>` })}`} ${category.icon === "shield-check" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-uh6r4kbv></path><path d="M9 12l2 2 4-4" data-astro-cid-uh6r4kbv></path>` })}`} ${category.icon === "credit-card" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<rect width="20" height="14" x="2" y="5" rx="2" data-astro-cid-uh6r4kbv></rect><line x1="2" x2="22" y1="10" y2="10" data-astro-cid-uh6r4kbv></line>` })}`} ${category.icon === "truck" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" data-astro-cid-uh6r4kbv></path><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" data-astro-cid-uh6r4kbv></path><circle cx="7" cy="18" r="2" data-astro-cid-uh6r4kbv></circle><circle cx="17" cy="18" r="2" data-astro-cid-uh6r4kbv></circle>` })}`} ${category.icon === "globe" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<circle cx="12" cy="12" r="10" data-astro-cid-uh6r4kbv></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" data-astro-cid-uh6r4kbv></path><path d="M2 12h20" data-astro-cid-uh6r4kbv></path>` })}`} ${category.icon === "thermometer" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" data-astro-cid-uh6r4kbv></path>` })}`} ${category.icon === "refresh" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-uh6r4kbv": true }, { "default": ($$result3) => renderTemplate`<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" data-astro-cid-uh6r4kbv></path><path d="M3 3v5h5" data-astro-cid-uh6r4kbv></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" data-astro-cid-uh6r4kbv></path><path d="M16 16h5v5" data-astro-cid-uh6r4kbv></path>` })}`} </svg> </div> <h2 class="faq-category-title" data-astro-cid-uh6r4kbv>${category.name}</h2> </div> ${category.faqs.map((faq) => renderTemplate`<div class="faq-item" data-faq data-astro-cid-uh6r4kbv> <div class="faq-question" onclick="this.parentElement.classList.toggle('active')" data-astro-cid-uh6r4kbv> <h3 data-astro-cid-uh6r4kbv>${faq.question}</h3> <div class="faq-toggle" data-astro-cid-uh6r4kbv> <svg viewBox="0 0 24 24" fill="none" stroke-width="2" data-astro-cid-uh6r4kbv> <path d="M6 9l6 6 6-6" data-astro-cid-uh6r4kbv></path> </svg> </div> </div> <div class="faq-answer" data-astro-cid-uh6r4kbv> ${faq.answer} </div> </div>`)} </div>`), addAttribute(contactPath, "href"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }))) })}`;
}, "/home/ivan/peptide/astro-peptide/src/components/pages/FAQPage.astro", void 0);

export { $$FAQPage as $ };
