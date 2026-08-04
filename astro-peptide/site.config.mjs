/**
 * Single source of truth for the canonical site origin and brand name.
 *
 * Imported by astro.config.mjs and by the Node scripts under scripts/ so a
 * domain change is a one-line edit. Previously the merchant-feed generator
 * carried its own hardcoded origin, which silently kept pointing at the
 * pre-rebrand domain and poisoned every generated feed URL.
 */
export const SITE_ORIGIN = 'https://peptide-kaufen.net';
export const BRAND_NAME = 'Peptide Shop';
