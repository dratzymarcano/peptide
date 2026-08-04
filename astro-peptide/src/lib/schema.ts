/**
 * Centralized JSON-LD schema generators with per-locale `inLanguage` support.
 *
 * Use these helpers from page templates (Astro frontmatter) and pass the
 * resulting object into `<JsonLd schema={...} />`. Every generator emits an
 * `inLanguage` property aligned to the page's locale so Google's structured-data
 * pipeline associates the entity with the correct language version.
 *
 * Scientific identifiers (CAS, PubChem, Wikidata) live in
 * `src/data/entities.json` and are language-neutral; this module only handles
 * the human-readable schema scaffolding.
 */

import type { Locale } from '../i18n/config';
import legalEntity from '../data/legalEntity.json';
import { postalAddress, resolve as resolveLegalField } from './legalEntity';

const SITE = 'https://peptide-kaufen.net';

// Map UI locale codes to BCP 47 language tags emitted in schema. English is
// region-less (global default); the other locales are region-qualified to
// match the per-locale GSC International Targeting strategy.
const inLanguageMap: Record<Locale, string> = {
  en: 'en',
  de: 'de-DE',
  nl: 'nl-NL',
  fr: 'fr-FR',
  it: 'it-IT',
  es: 'es-ES',
};

export function inLanguage(locale: Locale): string {
  return inLanguageMap[locale] ?? locale;
}

// Null until the real Impressum data lands. Callers spread this conditionally
// so a half-filled PostalAddress full of TODO sentinels never reaches Google.
const registeredAddress = postalAddress();
// Sole trader: the legal person behind the shop is the owner, so `legalName`
// is their own name rather than a registered company name. Omitted entirely
// until supplied — never emitted as a placeholder.
const registeredLegalName = resolveLegalField('ownerName');

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

interface OrganizationArgs {
  locale: Locale;
  /** Optional list of social / authoritative profile URLs. */
  sameAs?: string[];
}

/**
 * Single-source Organization schema. Render once per page (typically homepage).
 * Establishes the German legal entity and is consistent across all locales —
 * the entity itself is language-neutral; only `inLanguage` differs per render.
 */
export function organizationSchema({ locale, sameAs = [] }: OrganizationArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: legalEntity.brandName,
    ...(registeredLegalName ? { legalName: registeredLegalName } : {}),
    url: SITE,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE}/favicon.svg`,
    },
    inLanguage: inLanguage(locale),
    ...(registeredAddress ? { address: registeredAddress } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: legalEntity.email,
        availableLanguage: ['en', 'de', 'nl', 'fr', 'it', 'es'],
      },
    ],
    sameAs,
  };
}

// ---------------------------------------------------------------------------
// LocalBusiness (German base)
// ---------------------------------------------------------------------------

interface LocalBusinessArgs {
  locale: Locale;
}

export function localBusinessSchema({ locale }: LocalBusinessArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#localbusiness`,
    name: legalEntity.brandName,
    ...(registeredLegalName ? { legalName: registeredLegalName } : {}),
    url: SITE,
    inLanguage: inLanguage(locale),
    parentOrganization: { '@id': `${SITE}/#organization` },
    ...(registeredAddress ? { address: registeredAddress } : {}),
    email: legalEntity.email,
    priceRange: '€€',
  };
}

// ---------------------------------------------------------------------------
// WebSite + SearchAction
// ---------------------------------------------------------------------------

interface WebSiteArgs {
  locale: Locale;
  /** Localized homepage URL (already includes locale prefix). */
  homeUrl: string;
  /** Localized search URL (already includes locale prefix). */
  searchUrl: string;
}

export function websiteSchema({ locale, homeUrl, searchUrl }: WebSiteArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website-${locale}`,
    name: 'Peptide Shop',
    url: homeUrl,
    inLanguage: inLanguage(locale),
    publisher: { '@id': `${SITE}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${searchUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: inLanguage(locale),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE}${item.url}`,
    })),
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: inLanguage(locale),
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}
