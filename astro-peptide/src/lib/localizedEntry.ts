import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { sourceLocale, locales, type Locale } from '../i18n/config';

/**
 * Returns the content-collection entry for the requested slug & locale, falling
 * back to the canonical English entry when no per-locale markdown file exists.
 *
 * Per-locale markdown lives at `src/content/<collection>/<locale>/<slug>.md`,
 * canonical English files remain at `src/content/<collection>/<slug>.md`.
 *
 * Long-form runtime translation is still primarily provided by the typed
 * helpers (`productContent.ts`, `blogContent.ts`). This loader is the wiring
 * point for future per-locale markdown migration without breaking existing
 * routes — translators can drop in a `<locale>/<slug>.md` file and it will be
 * preferred over the English canonical record.
 */
export async function getLocalizedEntry<C extends CollectionKey>(
  collection: C,
  slug: string,
  locale: Locale,
): Promise<CollectionEntry<C> | undefined> {
  const all = await getCollection(collection);
  if (locale !== sourceLocale) {
    const localized = all.find((entry) => entry.id === `${locale}/${slug}`);
    if (localized) return localized;
  }
  return all.find(
    (entry) => entry.id === slug || entry.id === `${sourceLocale}/${slug}`,
  );
}

/**
 * Collections whose entries are translated at runtime for every locale.
 *
 * `productContent.ts` and `blogContent.ts` carry hand-written copy for de, nl,
 * fr, it and es keyed by locale — not by slug — so *every* product and post
 * renders fully localized (title, meta, body, FAQs, storage) at
 * `/<locale>/<path>/`, with or without a markdown override. A per-locale
 * markdown file is an upgrade to that translation, never the thing that
 * creates it.
 *
 * Treating the override file as the gate is what broke hreflang: 48 products
 * and 3 posts served six genuine language versions each, but declared only the
 * one or two that happened to have a `<locale>/<slug>.md`. Google therefore saw
 * ~290 live, internally linked, sitemap-absent URLs with no hreflang cluster —
 * the classic setup for the localized pages being dropped as duplicates of the
 * English one. `learn` is deliberately absent: those articles render their
 * English markdown body under every locale prefix, so they are English-only
 * and must not claim otherwise.
 */
const RUNTIME_TRANSLATED_COLLECTIONS = new Set<string>(['products', 'blog']);

export async function getAvailableLocales<C extends CollectionKey>(
  collection: C,
  slug: string,
): Promise<Locale[]> {
  const all = await getCollection(collection);
  const hasCanonical = all.some(
    (entry) => entry.id === slug || entry.id === `${sourceLocale}/${slug}`,
  );
  if (!hasCanonical) return [];

  if (RUNTIME_TRANSLATED_COLLECTIONS.has(collection)) return [...locales];

  const available = new Set<Locale>([sourceLocale]);
  for (const locale of locales) {
    if (locale === sourceLocale) continue;
    if (all.some((entry) => entry.id === `${locale}/${slug}`)) available.add(locale);
  }

  return locales.filter((locale) => available.has(locale));
}
