import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { sourceLocale, locales } from '../i18n/config';

// Per-locale markdown overrides live under `src/content/<collection>/<locale>/<slug>.md`.
// Listing pages (shop, catalog, blog index, etc.) and getStaticPaths must iterate ONLY
// the canonical English entries — locale overrides are picked up at render time via
// `getLocalizedEntry` in `./localizedEntry.ts`.
//
// Keyed to `sourceLocale`, not `defaultLocale`: the canonical files are the
// unprefixed English ones, and every other language — German included — lives
// in a subdirectory. Using the routing default here would have stopped
// filtering `de/` once German moved to the root, so every German override
// would have surfaced as a second, duplicate product in every listing.
const LOCALE_PREFIXES = locales
  .filter((locale) => locale !== sourceLocale)
  .map((locale) => `${locale}/`);

const isCanonicalEntry = (entry: { id: string }): boolean =>
  !LOCALE_PREFIXES.some((prefix) => entry.id.startsWith(prefix));

/**
 * Returns canonical (default-locale) entries for a collection, excluding any
 * per-locale override files stored in `<collection>/<locale>/<slug>.md`.
 *
 * Use this everywhere you would normally call `getCollection(c)` for listing,
 * routing or counting purposes. Per-locale rendering is then resolved in the
 * page itself via `getLocalizedEntry`.
 */
export async function getCanonicalCollection<C extends CollectionKey>(
  collection: C,
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection);
  return all.filter((entry) => isCanonicalEntry(entry as { id: string }));
}
