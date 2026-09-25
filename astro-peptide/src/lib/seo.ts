/**
 * Meta-tag hygiene helpers.
 *
 * Google renders roughly 155–160 characters of a description on desktop and
 * fewer on mobile; past that it either truncates mid-word or discards the tag
 * and writes its own snippet from the page. Several templates here compose a
 * meta description from translated prose plus a boilerplate suffix, and the
 * prose is authored for the page body, not the SERP — the French diabetes
 * catalogue page shipped 271 characters. Clamping centrally means no page can
 * regress, whatever a future translation does to the length.
 */

const DESCRIPTION_LIMIT = 158;

/**
 * Trims to `limit` characters on a word boundary, without leaving a dangling
 * separator before the ellipsis.
 */
export function clampMetaDescription(value: string | undefined, limit = DESCRIPTION_LIMIT): string | undefined {
  if (!value) return value;
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= limit) return normalized;

  // Reserve one character for the ellipsis.
  const slice = normalized.slice(0, limit - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const head = (lastSpace > limit * 0.6 ? slice.slice(0, lastSpace) : slice)
    .replace(/[\s,;:.\-–—·]+$/u, '');
  return `${head}…`;
}
