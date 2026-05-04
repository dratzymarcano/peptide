# Per-locale markdown drop folders

These folders mirror the canonical English files in `src/content/products/`
and `src/content/blog/`. Translators may add `<slug>.md` files under the
matching locale subfolder to override or replace the runtime translation
provided by:

- `src/i18n/productContent.ts`
- `src/i18n/blogContent.ts`

The loader at [`src/lib/localizedEntry.ts`](src/lib/localizedEntry.ts) prefers
`<locale>/<slug>.md` when present and falls back to the English canonical file
otherwise. Slugs must remain identical to the English filename to preserve link
equity and the redirect map in `astro.config.mjs`.

Routing covers every locale today through the runtime helpers — adding files
here is only required for posts/products that need a fully rewritten body for
the target market beyond what the typed helper exposes.

`.gitkeep` files are placeholders so the folder structure stays in version
control while the per-locale catalogue is being filled in. They are ignored by
the Astro content loader.
