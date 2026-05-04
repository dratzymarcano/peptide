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

const source = readDictionary(defaultLocale);
const sourceKeys = flattenKeys(source).sort();
const failures = [];

for (const locale of locales) {
  const dictionary = readDictionary(locale);

  for (const key of sourceKeys) {
    const value = getByPath(dictionary, key);
    if (typeof value !== 'string' || value.trim() === '') {
      failures.push(`${locale}: missing ${key}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`i18n coverage failed (${failures.length} missing keys):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`i18n coverage OK: ${sourceKeys.length} keys covered across ${locales.length + 1} locales`);
