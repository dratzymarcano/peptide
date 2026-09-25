#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dictDir = join(root, 'src/i18n/dictionaries');
// The dictionary every other locale is diffed against. This is the authoring
// language, not the locale served at the root — German moved to the root but
// en.json is still the source of truth for coverage.
const sourceLocale = 'en';
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
  // `useCasePage.metaTitle` is a placeholder plus the brand name — there is no
  // prose in it to translate. The use-case name substituted into {useCase} is
  // translated per locale in taxonomy.useCases.<slug>.name.
  nl: ['contact.directContact', 'useCasePage.metaTitle'],
  fr: ['legal.termsDocumentationTitle', 'learn.guideBadge', 'learnArticle.categories.neuro.name', 'useCasePage.metaTitle'],
  it: ['useCasePage.metaTitle'],
  es: ['useCasePage.metaTitle'],
  de: ['useCasePage.metaTitle'],
};

/** Values too short or too symbolic for identity to imply "untranslated". */
function isTranslatableProse(value) {
  if (value.trim().length <= 12) return false;
  if (!/\p{L}/u.test(value)) return false;
  // Bare interpolations and pure punctuation/symbol runs carry no language.
  if (/^[\s\p{P}\p{S}\d]*(\{[a-zA-Z]+\}[\s\p{P}\p{S}\d]*)+$/u.test(value)) return false;
  return true;
}

/**
 * Interpolation placeholders in a value, e.g. `{area}` in "{area} peptides".
 *
 * These are substituted by `useTranslations()` against a caller-supplied
 * params object, so the token name is code — not prose. Translating the token
 * itself silently breaks the string: the Spanish catalogue shipped
 * "Péptidos de investigación {área}" as the <title> of all twelve research-area
 * pages (and inside Product/CollectionPage schema), because `{área}` never
 * matched the `area` key the page passes in. Key presence and non-identity
 * both looked fine, so nothing caught it.
 */
function placeholders(value) {
  return new Set([...value.matchAll(/\{([^}]*)\}/g)].map((match) => match[1]));
}

function sameSet(a, b) {
  return a.size === b.size && [...a].every((item) => b.has(item));
}

/**
 * Every literal key a template asks for must exist in the English dictionary.
 *
 * `useTranslations()` falls back to echoing the key when a lookup misses, so a
 * missing entry ships as visible source code: the catalogue index rendered the
 * string "home.productCount" as a badge on all twelve research-area cards, and
 * a research-area page rendered "shopSidebar.allResearchAreas" as a link
 * label. Neither failed a build, and dictionary-to-dictionary comparison
 * cannot see them — the key was absent from all six.
 *
 * Only static single-quoted literals are checked. Template literals with
 * interpolation (`taxonomy.researchAreas.${slug}.name`) are skipped: the slug
 * comes from the typed taxonomy, so TypeScript already guards those.
 */
function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (['.astro', '.ts', '.tsx'].includes(extname(entry))) out.push(full);
  }
  return out;
}

function usedKeys() {
  const found = new Map();
  for (const file of sourceFiles(join(root, 'src'))) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/\bt(?:\.raw)?\(\s*'([A-Za-z0-9_.]+)'/g)) {
      if (!found.has(match[1])) found.set(match[1], file.slice(root.length));
    }
  }
  return found;
}

/**
 * `t('key')` on a value containing a placeholder, with no variables supplied.
 *
 * `t()` substitutes eagerly and turns an unsupplied placeholder into an empty
 * string, so this always renders a sentence with a hole in it. The checkout
 * shipped "Place order · €" and "a minimum order value of €" in all six
 * languages this way, because the labels were bundled to a React island
 * through `t()` instead of `t.raw()`.
 *
 * Legitimate cases are `t('key', { ... })` — matched with a trailing comma —
 * and `t.raw('key')`, where the caller substitutes later.
 */
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/[^\n]*/g, '$1');
}

/**
 * Raw taxonomy labels rendered straight into a template.
 *
 * `researchAreas` and `useCases` in src/data/taxonomy.ts carry English `name`,
 * `short` and `description` fields — those are source strings, and the
 * translated versions live under `taxonomy.*` in the dictionaries. Rendering
 * the record directly put "Neuroscience & CNS" and "Weight-loss research" into
 * the header, footer, shop sidebar and shop filters of every non-English page.
 * With German at the root that was the site's primary navigation.
 *
 * Heuristic, deliberately: a template that imports the taxonomy and also
 * renders `{something.name}` is almost certainly doing this.
 */
function rawTaxonomyLabels() {
  const offenders = [];
  for (const file of sourceFiles(join(root, 'src'))) {
    if (file.endsWith('/data/taxonomy.ts')) continue;
    const text = stripComments(readFileSync(file, 'utf8'));
    if (!/from '[^']*data\/taxonomy'/.test(text)) continue;
    for (const match of text.matchAll(/\{\s*([A-Za-z_$][\w$]*)\.(name|short|description)\s*\}/g)) {
      offenders.push(`${file.slice(root.length)} renders {${match[1]}.${match[2]}} — use t('taxonomy.…') instead`);
    }
  }
  return offenders;
}

function eagerPlaceholderCalls(sourceDictionary) {
  const offenders = [];
  for (const file of sourceFiles(join(root, 'src'))) {
    // Comments are stripped first: prose describing the rule (including the
    // doc comment on t.raw itself) would otherwise be reported as a call site.
    const text = stripComments(readFileSync(file, 'utf8'));
    for (const match of text.matchAll(/(^|[^.\w])t\(\s*'([A-Za-z0-9_.]+)'\s*\)/g)) {
      const key = match[2];
      const value = getByPath(sourceDictionary, key);
      if (typeof value !== 'string') continue;
      const placeholders = [...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
      if (placeholders.length === 0) continue;
      offenders.push(
        `${key} needs {${placeholders.join('}, {')}} — called as t('${key}') in ${file.slice(root.length)}`
      );
    }
  }
  return offenders;
}

const source = readDictionary(sourceLocale);
const sourceKeys = flattenKeys(source).sort();
const sourceKeySet = new Set(sourceKeys);

const missingFromSource = [];
for (const [key, file] of usedKeys()) {
  if (!sourceKeySet.has(key)) missingFromSource.push(`${key} — used in ${file}`);
}

const eagerPlaceholders = eagerPlaceholderCalls(source);
const rawTaxonomy = rawTaxonomyLabels();
const failures = [];
const untranslated = [];
const brokenPlaceholders = [];

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

    if (typeof sourceValue === 'string') {
      const expected = placeholders(sourceValue);
      const actual = placeholders(value);
      if (!sameSet(expected, actual)) {
        brokenPlaceholders.push(
          `${locale}: ${key} expects {${[...expected].join('}, {')}} but has ` +
            (actual.size ? `{${[...actual].join('}, {')}}` : 'none') +
            ` ("${value.slice(0, 60)}")`
        );
      }
    }
  }
}

if (
  missingFromSource.length > 0 ||
  rawTaxonomy.length > 0 ||
  eagerPlaceholders.length > 0 ||
  failures.length > 0 ||
  untranslated.length > 0 ||
  brokenPlaceholders.length > 0
) {
  if (rawTaxonomy.length) {
    console.error(`i18n coverage failed (${rawTaxonomy.length} untranslated taxonomy labels):`);
    for (const entry of rawTaxonomy) console.error(`- ${entry}`);
    console.error('');
  }
  if (eagerPlaceholders.length) {
    console.error(`i18n coverage failed (${eagerPlaceholders.length} placeholders dropped at render):`);
    for (const entry of eagerPlaceholders) console.error(`- ${entry}`);
    console.error('\nPass the variables — t(key, { ... }) — or use t.raw(key) if a client island substitutes them.');
  }
  if (missingFromSource.length) {
    console.error(`i18n coverage failed (${missingFromSource.length} keys used but not defined):`);
    for (const entry of missingFromSource) console.error(`- ${entry}`);
    console.error('\nAdd the key to every dictionary, or point the call at the key that exists.');
  }
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
  if (brokenPlaceholders.length) {
    console.error(`i18n coverage failed (${brokenPlaceholders.length} broken interpolations):`);
    for (const entry of brokenPlaceholders) console.error(`- ${entry}`);
    console.error('\nPlaceholder names are code. Translate the words around them, never the token.');
  }
  process.exit(1);
}

console.log(
  `i18n coverage OK: ${sourceKeys.length} keys translated across ${locales.length + 1} locales, ` +
    `${usedKeys().size} literal call sites resolved, interpolation placeholders intact`
);
