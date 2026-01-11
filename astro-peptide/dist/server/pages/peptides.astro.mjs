/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DOeZcGv4.mjs';
import { g as getCollection } from '../chunks/_astro_content_B0aha66o.mjs';
import { P as ProductCard } from '../chunks/ProductCard_CTf3m74s.mjs';
import { $ as $$Sidebar } from '../chunks/Sidebar_BqNMwsa_.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getCollection("products");
  const cleanSlug = (slug) => slug.replace(/^\/peptides\//, "").replace(/^\//, "");
  const metaTitle = "Buy Peptides UK | Research Peptides for Sale | Peptide Shop";
  const metaDescription = "Buy peptides UK. Premium Semaglutide, Tirzepatide, BPC-157, Melanotan 2 & more. \u226599% purity, COA included. Fast UK delivery. Trusted by researchers.";
  const productCount = products.length;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": metaTitle, "description": metaDescription, "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Peptides", url: "/peptides" }
  ], "data-astro-cid-hbpg2qzg": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="peptides-hero" data-astro-cid-hbpg2qzg> <div class="container mx-auto px-4" data-astro-cid-hbpg2qzg> <!-- Breadcrumb --> <nav class="breadcrumb" aria-label="Breadcrumb" data-astro-cid-hbpg2qzg> <ol class="breadcrumb-list" data-astro-cid-hbpg2qzg> <li data-astro-cid-hbpg2qzg><a href="/" data-astro-cid-hbpg2qzg>Home</a></li> <li data-astro-cid-hbpg2qzg><span class="current" data-astro-cid-hbpg2qzg>All Peptides</span></li> </ol> </nav> <div class="hero-content" data-astro-cid-hbpg2qzg> <div class="hero-text" data-astro-cid-hbpg2qzg> <h1 class="hero-title" data-astro-cid-hbpg2qzg>Buy Research Peptides UK</h1> <p class="hero-description" data-astro-cid-hbpg2qzg>
Explore our complete collection of premium research peptides. From GLP-1 agonists like Semaglutide and Tirzepatide to recovery peptides like BPC-157, all compounds are HPLC-verified with ≥99% purity and include Certificates of Analysis.
</p> <!-- Trust Badges --> <div class="trust-badges" data-astro-cid-hbpg2qzg> <span class="trust-badge" data-astro-cid-hbpg2qzg> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-hbpg2qzg><polyline points="20 6 9 17 4 12" data-astro-cid-hbpg2qzg></polyline></svg>
≥99% HPLC Purity
</span> <span class="trust-badge" data-astro-cid-hbpg2qzg> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-hbpg2qzg><polyline points="20 6 9 17 4 12" data-astro-cid-hbpg2qzg></polyline></svg>
COA Included
</span> <span class="trust-badge" data-astro-cid-hbpg2qzg> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-hbpg2qzg><polyline points="20 6 9 17 4 12" data-astro-cid-hbpg2qzg></polyline></svg>
Fast UK Delivery
</span> <span class="trust-badge" data-astro-cid-hbpg2qzg> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-hbpg2qzg><polyline points="20 6 9 17 4 12" data-astro-cid-hbpg2qzg></polyline></svg>
Secure Checkout
</span> </div> </div> <div class="hero-stats" data-astro-cid-hbpg2qzg> <div class="stat-card" data-astro-cid-hbpg2qzg> <span class="stat-number" data-astro-cid-hbpg2qzg>${productCount}</span> <span class="stat-label" data-astro-cid-hbpg2qzg>Products</span> </div> <div class="stat-card" data-astro-cid-hbpg2qzg> <span class="stat-number" data-astro-cid-hbpg2qzg>≥99%</span> <span class="stat-label" data-astro-cid-hbpg2qzg>Purity</span> </div> <div class="stat-card" data-astro-cid-hbpg2qzg> <span class="stat-number" data-astro-cid-hbpg2qzg>24h</span> <span class="stat-label" data-astro-cid-hbpg2qzg>UK Dispatch</span> </div> </div> </div> </div> </section>  <section class="products-section" data-astro-cid-hbpg2qzg> <div class="container mx-auto px-4" data-astro-cid-hbpg2qzg> <div class="products-layout" data-astro-cid-hbpg2qzg> <!-- Sidebar Filters --> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "data-astro-cid-hbpg2qzg": true })} <!-- Product Grid --> <div class="products-main" data-astro-cid-hbpg2qzg> <div class="products-header" data-astro-cid-hbpg2qzg> <p class="showing-text" data-astro-cid-hbpg2qzg>Showing <strong data-astro-cid-hbpg2qzg>${productCount}</strong> research peptides</p> </div> <div class="products-grid" data-astro-cid-hbpg2qzg> ${products.map((product) => {
    const price = product.data.price || product.data.moq || 45;
    const image = product.data.images[0] || "/images/peptide-default.jpg";
    const slug = cleanSlug(product.slug);
    return renderTemplate`${renderComponent($$result2, "ProductCard", ProductCard, { "client:visible": true, "id": product.data.id, "title": product.data.title, "price": price, "image": image, "slug": slug, "category": product.data.category, "purity": product.data.purity, "reviewCount": product.data.reviews?.length || 0, "packageSize": product.data.package_sizes?.[0], "client:component-hydration": "visible", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/ProductCard", "client:component-export": "default", "data-astro-cid-hbpg2qzg": true })}`;
  })} </div> <!-- SEO Content --> <div class="seo-content" data-astro-cid-hbpg2qzg> <h2 data-astro-cid-hbpg2qzg>Buy Research Peptides UK - Premium Quality Guaranteed</h2> <p data-astro-cid-hbpg2qzg>
Peptide Shop is your trusted source for premium research-grade peptides in the United Kingdom. Our extensive catalogue includes popular compounds such as Semaglutide, Tirzepatide, BPC-157, TB-500, Melanotan 2, and many more specialised peptides for scientific research.
</p> <p data-astro-cid-hbpg2qzg>
Every peptide we supply undergoes rigorous HPLC testing to verify ≥99% purity. Each order includes a comprehensive Certificate of Analysis (COA) documenting batch purity, identity verification, and quality metrics. Our peptides are stored in optimal conditions and shipped in temperature-controlled packaging to maintain integrity.
</p> <p data-astro-cid-hbpg2qzg>
Whether you're conducting metabolic research, tissue repair studies, or molecular investigations, our research-grade compounds meet the highest standards for scientific applications. With fast UK delivery and expert customer support, Peptide Shop is the preferred choice for researchers across the United Kingdom and Europe.
</p> </div> </div> </div> </div> </section>  ` })}`;
}, "/home/ivan/peptide/astro-peptide/src/pages/peptides/index.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/peptides/index.astro";
const $$url = "/peptides";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
