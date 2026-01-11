globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as renderers } from './chunks/_@astro-renderers_Co1rHHJa.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cpt_IC0V.mjs';
import { manifest } from './manifest_BYZa26vy.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/account/dashboard.astro.mjs');
const _page3 = () => import('./pages/api/create-bitcoin-invoice.astro.mjs');
const _page4 = () => import('./pages/api/enquiry.astro.mjs');
const _page5 = () => import('./pages/api/search.astro.mjs');
const _page6 = () => import('./pages/blog/category/_category_.astro.mjs');
const _page7 = () => import('./pages/blog/_slug_.astro.mjs');
const _page8 = () => import('./pages/blog.astro.mjs');
const _page9 = () => import('./pages/bundles.astro.mjs');
const _page10 = () => import('./pages/cart.astro.mjs');
const _page11 = () => import('./pages/checkout.astro.mjs');
const _page12 = () => import('./pages/coa-policy.astro.mjs');
const _page13 = () => import('./pages/contact.astro.mjs');
const _page14 = () => import('./pages/disclaimer.astro.mjs');
const _page15 = () => import('./pages/faq.astro.mjs');
const _page16 = () => import('./pages/learn/what-are-peptides.astro.mjs');
const _page17 = () => import('./pages/learn.astro.mjs');
const _page18 = () => import('./pages/peptides/_category_.astro.mjs');
const _page19 = () => import('./pages/peptides/_slug_.astro.mjs');
const _page20 = () => import('./pages/peptides.astro.mjs');
const _page21 = () => import('./pages/privacy.astro.mjs');
const _page22 = () => import('./pages/quality.astro.mjs');
const _page23 = () => import('./pages/shipping.astro.mjs');
const _page24 = () => import('./pages/shop.astro.mjs');
const _page25 = () => import('./pages/terms.astro.mjs');
const _page26 = () => import('./pages/wholesale.astro.mjs');
const _page27 = () => import('./pages/_lang_/peptides/_category_.astro.mjs');
const _page28 = () => import('./pages/_lang_/peptides/_slug_.astro.mjs');
const _page29 = () => import('./pages/_lang_/peptides.astro.mjs');
const _page30 = () => import('./pages/_lang_/_pageslug_.astro.mjs');
const _page31 = () => import('./pages/_lang_.astro.mjs');
const _page32 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/account/dashboard.astro", _page2],
    ["src/pages/api/create-bitcoin-invoice.ts", _page3],
    ["src/pages/api/enquiry.ts", _page4],
    ["src/pages/api/search.ts", _page5],
    ["src/pages/blog/category/[category].astro", _page6],
    ["src/pages/blog/[slug].astro", _page7],
    ["src/pages/blog/index.astro", _page8],
    ["src/pages/bundles.astro", _page9],
    ["src/pages/cart.astro", _page10],
    ["src/pages/checkout.astro", _page11],
    ["src/pages/coa-policy.astro", _page12],
    ["src/pages/contact.astro", _page13],
    ["src/pages/disclaimer.astro", _page14],
    ["src/pages/faq.astro", _page15],
    ["src/pages/learn/what-are-peptides.astro", _page16],
    ["src/pages/learn/index.astro", _page17],
    ["src/pages/peptides/[category].astro", _page18],
    ["src/pages/peptides/[slug].astro", _page19],
    ["src/pages/peptides/index.astro", _page20],
    ["src/pages/privacy.astro", _page21],
    ["src/pages/quality.astro", _page22],
    ["src/pages/shipping.astro", _page23],
    ["src/pages/shop.astro", _page24],
    ["src/pages/terms.astro", _page25],
    ["src/pages/wholesale.astro", _page26],
    ["src/pages/[lang]/peptides/[category].astro", _page27],
    ["src/pages/[lang]/peptides/[slug].astro", _page28],
    ["src/pages/[lang]/peptides/index.astro", _page29],
    ["src/pages/[lang]/[pageSlug].astro", _page30],
    ["src/pages/[lang]/index.astro", _page31],
    ["src/pages/index.astro", _page32]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
