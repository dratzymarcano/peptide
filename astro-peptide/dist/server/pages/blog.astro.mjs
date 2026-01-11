/* empty css                                      */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_B0aha66o.mjs';
import { $ as $$Layout } from '../chunks/Layout_DOeZcGv4.mjs';
import { $ as $$PageTitle } from '../chunks/PageTitle_DiEJsxH3.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );
  const featuredPosts = sortedPosts.filter((post) => post.data.featured);
  const regularPosts = sortedPosts.filter((post) => !post.data.featured);
  const categories = [...new Set(posts.map((post) => post.data.category))];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Research Blog | Peptide Shop", "description": "Expert insights on peptide research, laboratory protocols, and the latest developments in peptide science. Educational resources for researchers.", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ], "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTitle", $$PageTitle, { "title": "Research Blog", "subtitle": "Expert insights on peptide research, laboratory protocols, and scientific developments", "breadcrumbs": [
    { name: "Home", url: "/" },
    { name: "Blog" }
  ], "data-astro-cid-5tznm7mj": true })} ${maybeRenderHead()}<section class="section" data-astro-cid-5tznm7mj> <div class="container" data-astro-cid-5tznm7mj> <div class="row" data-astro-cid-5tznm7mj> <!-- Main Content --> <div class="col-lg-8" data-astro-cid-5tznm7mj> ${featuredPosts.length > 0 && renderTemplate`<div class="featured-posts mb-5" data-astro-cid-5tznm7mj> <h2 class="section-title mb-4" data-astro-cid-5tznm7mj>Featured Articles</h2> ${featuredPosts.map((post) => renderTemplate`<article class="featured-post-card" data-astro-cid-5tznm7mj> <div class="row align-items-center" data-astro-cid-5tznm7mj> ${post.data.image && renderTemplate`<div class="col-md-5" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}/`, "href")} data-astro-cid-5tznm7mj> <img${addAttribute(post.data.image, "src")}${addAttribute(post.data.title, "alt")} class="featured-image" data-astro-cid-5tznm7mj> </a> </div>`} <div${addAttribute(post.data.image ? "col-md-7" : "col-12", "class")} data-astro-cid-5tznm7mj> <div class="featured-content" data-astro-cid-5tznm7mj> <span class="post-category" data-astro-cid-5tznm7mj>${post.data.category}</span> <h3 class="post-title" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}/`, "href")} data-astro-cid-5tznm7mj>${post.data.title}</a> </h3> <p class="post-excerpt" data-astro-cid-5tznm7mj>${post.data.description}</p> <div class="post-meta" data-astro-cid-5tznm7mj> <span class="post-author" data-astro-cid-5tznm7mj>${post.data.author}</span> <span class="post-date" data-astro-cid-5tznm7mj>${new Date(post.data.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span> </div> </div> </div> </div> </article>`)} </div>`} <h2 class="section-title mb-4" data-astro-cid-5tznm7mj>Latest Articles</h2> ${regularPosts.length > 0 ? renderTemplate`<div class="posts-grid" data-astro-cid-5tznm7mj> ${regularPosts.map((post) => renderTemplate`<article class="post-card" data-astro-cid-5tznm7mj> ${post.data.image && renderTemplate`<a${addAttribute(`/blog/${post.slug}/`, "href")} class="post-image-link" data-astro-cid-5tznm7mj> <img${addAttribute(post.data.image, "src")}${addAttribute(post.data.title, "alt")} class="post-image" data-astro-cid-5tznm7mj> </a>`} <div class="post-content" data-astro-cid-5tznm7mj> <span class="post-category" data-astro-cid-5tznm7mj>${post.data.category}</span> <h3 class="post-title" data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/${post.slug}/`, "href")} data-astro-cid-5tznm7mj>${post.data.title}</a> </h3> <p class="post-excerpt" data-astro-cid-5tznm7mj>${post.data.description}</p> <div class="post-meta" data-astro-cid-5tznm7mj> <span class="post-date" data-astro-cid-5tznm7mj>${new Date(post.data.publishDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span> </div> </div> </article>`)} </div>` : renderTemplate`<div class="no-posts" data-astro-cid-5tznm7mj> <div class="text-center py-5" data-astro-cid-5tznm7mj> <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0077b6" stroke-width="1.5" class="mb-3" data-astro-cid-5tznm7mj> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-5tznm7mj></path> <polyline points="14 2 14 8 20 8" data-astro-cid-5tznm7mj></polyline> <line x1="16" x2="8" y1="13" y2="13" data-astro-cid-5tznm7mj></line> <line x1="16" x2="8" y1="17" y2="17" data-astro-cid-5tznm7mj></line> <polyline points="10 9 9 9 8 9" data-astro-cid-5tznm7mj></polyline> </svg> <h3 data-astro-cid-5tznm7mj>Coming Soon</h3> <p class="text-muted" data-astro-cid-5tznm7mj>We're working on exciting new content. Check back soon for research insights and guides.</p> </div> </div>`} </div> <!-- Sidebar --> <div class="col-lg-4" data-astro-cid-5tznm7mj> <div class="sidebar" data-astro-cid-5tznm7mj> <!-- Categories --> <div class="sidebar-widget" data-astro-cid-5tznm7mj> <h4 data-astro-cid-5tznm7mj>Categories</h4> <ul class="category-list" data-astro-cid-5tznm7mj> ${categories.map((category) => renderTemplate`<li data-astro-cid-5tznm7mj> <a${addAttribute(`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}/`, "href")} data-astro-cid-5tznm7mj> ${category} <span class="count" data-astro-cid-5tznm7mj>(${posts.filter((p) => p.data.category === category).length})</span> </a> </li>`)} </ul> </div> <!-- About the Blog --> <div class="sidebar-widget" data-astro-cid-5tznm7mj> <h4 data-astro-cid-5tznm7mj>About Our Blog</h4> <p class="small text-muted" data-astro-cid-5tznm7mj>
Our research blog provides educational content for laboratory professionals and researchers. 
                From peptide handling protocols to the latest scientific developments, we share expert insights 
                to support your research.
</p> </div> <!-- Newsletter Signup --> <div class="sidebar-widget newsletter-widget" data-astro-cid-5tznm7mj> <h4 data-astro-cid-5tznm7mj>Stay Updated</h4> <p class="small" data-astro-cid-5tznm7mj>Get the latest research insights delivered to your inbox.</p> <form class="newsletter-form" data-astro-cid-5tznm7mj> <input type="email" placeholder="Your email address" class="form-control mb-2" data-astro-cid-5tznm7mj> <button type="submit" class="btn btn-primary btn-block w-100" data-astro-cid-5tznm7mj>Subscribe</button> </form> </div> </div> </div> </div> </div> </section> ` })} `;
}, "/home/ivan/peptide/astro-peptide/src/pages/blog/index.astro", void 0);

const $$file = "/home/ivan/peptide/astro-peptide/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
