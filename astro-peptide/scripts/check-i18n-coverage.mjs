#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dictDir = join(root, 'src/i18n/dictionaries');
const defaultLocale = 'en';
const locales = ['de', 'nl', 'fr', 'it', 'es'];

function readDictionary(locale) {
  return JSON.parse(readFileSync(join(dictDir, `${locale}.json`), 'utf8'));
}

function flattenKeys(value, prefix = '') {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return flattenKeys(child, next);
  });
}

function getByPath(value, path) {
  return path.split('.').reduce((current, segment) => {
    if (!current || typeof current !== 'object') return undefined;
    return current[segment];
  }, value);
}

/**
 * Strings that are legitimately identical to English in a given locale.
 *
 * Key-presence alone is a weak signal: the dictionaries once reported "795
 * keys covered" while the entire cart and checkout funnel sat untranslated in
 * nl/fr/it/es, because the English text had been copied in to fill the key.
 * Untranslated values are now failures, and true cognates are listed here so
 * the exception is explicit and reviewable rather than silent.
 */
const IDENTICAL_BY_DESIGN = {
  nl: ['contact.directContact'],
  fr: ['legal.termsDocumentationTitle', 'learn.guideBadge', 'learnArticle.categories.neuro.name'],
  it: [],
  es: [],
  de: [],
};

/** Values too short or too symbolic for identity to imply "untranslated". */
function isTranslatableProse(value) {
  if (value.trim().length <= 12) return false;
  if (!/\p{L}/u.test(value)) return false;
  // Bare interpolations and pure punctuation/symbol runs carry no language.
  if (/^[\s\p{P}\p{S}\d]*(\{[a-zA-Z]+\}[\s\p{P}\p{S}\d]*)+$/u.test(value)) return false;
  return true;
}

const source = readDictionary(defaultLocale);
const sourceKeys = flattenKeys(source).sort();
const failures = [];
const untranslated = [];

for (const locale of locales) {
  const dictionary = readDictionary(locale);
  const allowed = new Set(IDENTICAL_BY_DESIGN[locale] ?? []);

  for (const key of sourceKeys) {
    const value = getByPath(dictionary, key);
    if (typeof value !== 'string' || value.trim() === '') {
      failures.push(`${locale}: missing ${key}`);
      continue;
    }

    const sourceValue = getByPath(source, key);
    if (
      typeof sourceValue === 'string' &&
      value === sourceValue &&
      isTranslatableProse(sourceValue) &&
      !allowed.has(key)
    ) {
      untranslated.push(`${locale}: ${key} is still the English source ("${sourceValue.slice(0, 60)}")`);
    }
  }
}

if (failures.length > 0 || untranslated.length > 0) {
  if (failures.length) {
    console.error(`i18n coverage failed (${failures.length} missing keys):`);
    for (const failure of failures) console.error(`- ${failure}`);
  }
  if (untranslated.length) {
    console.error(`i18n coverage failed (${untranslated.length} untranslated values):`);
    for (const entry of untranslated.slice(0, 60)) console.error(`- ${entry}`);
    if (untranslated.length > 60) console.error(`...and ${untranslated.length - 60} more.`);
    console.error('\nTranslate the value, or add the key to IDENTICAL_BY_DESIGN if the words genuinely match.');
  }
  process.exit(1);
}

console.log(
  `i18n coverage OK: ${sourceKeys.length} keys translated across ${locales.length + 1} locales`
);
