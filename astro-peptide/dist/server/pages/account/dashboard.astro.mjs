/* empty css                                         */
import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DOeZcGv4.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "My Account | Peptide Shop", "description": "Manage your Peptide Shop account. View orders, track shipments, update addresses and access order history. Secure account management for researchers.", "data-astro-cid-fopdk3ek": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="page-hero" style="background: linear-gradient(135deg, #0077b6, #023e8a); padding: 60px 0;" data-astro-cid-fopdk3ek> <div class="container" data-astro-cid-fopdk3ek> <div class="row align-items-center" data-astro-cid-fopdk3ek> <div class="col-lg-8" data-astro-cid-fopdk3ek> <nav aria-label="breadcrumb" style="margin-bottom: 1rem;" data-astro-cid-fopdk3ek> <ol class="breadcrumb" style="margin-bottom: 0; background: transparent; padding: 0;" data-astro-cid-fopdk3ek> <li class="breadcrumb-item" data-astro-cid-fopdk3ek><a href="/" style="color: white; text-decoration: none; font-weight: 500;" data-astro-cid-fopdk3ek>Home</a></li> <li class="breadcrumb-item active" aria-current="page" style="color: white; font-weight: 600;" data-astro-cid-fopdk3ek>My Account</li> </ol> </nav> <h1 style="color: white; font-weight: 800; font-size: 2.5rem; margin-bottom: 1rem;" data-astro-cid-fopdk3ek>My Account</h1> <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; margin-bottom: 0; max-width: 600px;" data-astro-cid-fopdk3ek>
Manage your orders, addresses, and account settings in one place.
</p> </div> <div class="col-lg-4 text-lg-end d-none d-lg-block" data-astro-cid-fopdk3ek> <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.15); padding: 12px 20px; border-radius: 50px;" data-astro-cid-fopdk3ek> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" data-astro-cid-fopdk3ek> <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" data-astro-cid-fopdk3ek></path> <circle cx="12" cy="7" r="4" data-astro-cid-fopdk3ek></circle> </svg> <span style="color: white; font-weight: 600;" data-astro-cid-fopdk3ek>Account Dashboard</span> </div> </div> </div> </div> </section>  <section style="background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); min-height: 70vh;" data-astro-cid-fopdk3ek> <div id="dashboard-root" data-astro-cid-fopdk3ek></div> </section> ` })} ${renderScript($$result, "/home/ivan/peptide/astro-peptide/src/pages/account/dashboard.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/ivan/peptide/astro-peptide/src/pages/account/dashboard.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/account/dashboard.astro";
const $$url = "/account/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
