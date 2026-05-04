import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { defaultLocale, locales, type Locale } from '../i18n/config';

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
  if (locale !== defaultLocale) {
    const localized = all.find((entry) => entry.id === `${locale}/${slug}.md` || entry.slug === `${locale}/${slug}`);
    if (localized) return localized;
  }
  return all.find(
    (entry) => entry.id === `${slug}.md` || entry.slug === slug || entry.id === `${defaultLocale}/${slug}.md`,
  );
}

export async function getAvailableLocales<C extends CollectionKey>(
  collection: C,
  slug: string,
): Promise<Locale[]> {
  const all = await getCollection(collection);
  const hasCanonical = all.some(
    (entry) => entry.id === `${slug}.md` || entry.slug === slug || entry.id === `${defaultLocale}/${slug}.md`,
  );
  const available = hasCanonical ? new Set<Locale>([defaultLocale]) : new Set<Locale>();

  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const hasLocalizedEntry = all.some(
      (entry) => entry.id === `${locale}/${slug}.md` || entry.slug === `${locale}/${slug}`,
    );
    if (hasLocalizedEntry) available.add(locale);
  }

  return locales.filter((locale) => available.has(locale));
}
