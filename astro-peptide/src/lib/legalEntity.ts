/**
 * Guarded access to the operator details behind the Impressum.
 *
 * The business is an **Einzelunternehmen** (sole trader), so there is no
 * Handelsregister entry: §5 DDG requires the operator's own full name and a
 * summonable postal address, not a registered company name, Amtsgericht or HRB
 * number. Those fields are deliberately absent from the model — carrying them
 * invited someone to invent one.
 *
 * `src/data/legalEntity.json` ships `TODO_IMPRESSUM_*` sentinels for the values
 * only the operator can supply. Those sentinels were previously rendered
 * verbatim onto the live Impressum page and emitted inside
 * Organization/LocalBusiness JSON-LD, which is worse than publishing nothing:
 * it advertises a non-existent legal identity to readers and to Google.
 *
 * Everything funnels through `resolve()`, which returns `null` for an unfilled
 * field so callers omit it rather than print the sentinel.
 *
 * Fill in the real values and `npm run legal:check` turns green.
 */
import rawLegalEntity from '../data/legalEntity.json';

const PLACEHOLDER = /^TODO_|_TODO$|^TODO$/;

export type LegalEntityField = keyof typeof rawLegalEntity;

/**
 * Fields required for a §5 DDG-compliant sole-trader Impressum.
 *
 * `vatId` is handled separately: a Kleinunternehmer under §19 UStG may hold no
 * USt-IdNr at all, and §27a UStG only requires publishing one that exists. The
 * Steuernummer is never a substitute and must not be published.
 */
export const REQUIRED_FIELDS: LegalEntityField[] = [
  'ownerName',
  'streetAddress',
  'postalCode',
  'addressLocality',
  'contentResponsibleName',
  'contentResponsibleAddress',
];

/** True when a value is still an unfilled placeholder (or empty). */
export function isPlaceholder(value: unknown): boolean {
  return typeof value !== 'string' || value.trim() === '' || PLACEHOLDER.test(value.trim());
}

/** The field's real value, or `null` if it has not been supplied yet. */
export function resolve(field: LegalEntityField): string | null {
  const value = rawLegalEntity[field];
  return isPlaceholder(value) ? null : String(value);
}

/** Required fields still awaiting real data. */
export function missingFields(): LegalEntityField[] {
  const missing = REQUIRED_FIELDS.filter((field) => resolve(field) === null);
  // A VAT ID is required only where one has actually been issued. Declaring
  // Kleinunternehmer status satisfies the obligation without inventing one.
  if (!rawLegalEntity.kleinunternehmer && resolve('vatId') === null) {
    missing.push('vatId');
  }
  return missing;
}

/** True once every required Impressum field carries real data. */
export function isComplete(): boolean {
  return missingFields().length === 0;
}

/** True when the operator has declared §19 UStG small-business status. */
export const isKleinunternehmer = rawLegalEntity.kleinunternehmer === true;

/**
 * Postal address for structured data, or `null` while incomplete. Emitting a
 * partial PostalAddress is worse than omitting the property: Google treats a
 * malformed address as a data-quality signal against the entity.
 */
export function postalAddress() {
  const streetAddress = resolve('streetAddress');
  const postalCode = resolve('postalCode');
  const addressLocality = resolve('addressLocality');
  if (!streetAddress || !postalCode || !addressLocality) return null;
  return {
    '@type': 'PostalAddress',
    streetAddress,
    postalCode,
    addressLocality,
    addressCountry: rawLegalEntity.addressCountry,
  };
}

/** Always-safe fields — these are real regardless of Impressum completeness. */
export const brandName = rawLegalEntity.brandName;
export const email = rawLegalEntity.email;
export const addressCountry = rawLegalEntity.addressCountry;

export default rawLegalEntity;
