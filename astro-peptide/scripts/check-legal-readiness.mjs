#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const legalEntityPath = join(root, 'src/data/legalEntity.json');
const filesToCheck = [
  join(root, 'src/lib/schema.ts'),
  ...readdirSync(join(root, 'src/i18n/dictionaries'))
    .filter((file) => file.endsWith('.json'))
    .map((file) => join(root, 'src/i18n/dictionaries', file)),
];

const requiredPublicFiles = [
  join(root, 'src/data/legalEntity.json'),
  join(root, 'src/pages/impressum.astro'),
  join(root, 'public/feeds/manifest.json'),
  join(root, 'public/feeds/feed-de-de.xml'),
  join(root, 'public/feeds/feed-de-en.xml'),
];

const failures = [];

const requiredLegalEntityFields = [
  'brandName',
  'legalName',
  'legalForm',
  'streetAddress',
  'postalCode',
  'addressLocality',
  'addressCountry',
  'registerCourt',
  'commercialRegisterNumber',
  'vatId',
  'contentResponsibleName',
  'contentResponsibleAddress',
  'email',
];

for (const file of filesToCheck) {
  const source = readFileSync(file, 'utf8');
  if (source.includes('TODO_IMPRESSUM')) {
    failures.push(`${file.replace(`${root}/`, '')}: contains TODO_IMPRESSUM placeholder`);
  }
  if (source.includes('TODO(impressum)')) {
    failures.push(`${file.replace(`${root}/`, '')}: contains TODO(impressum) placeholder`);
  }
}

for (const file of requiredPublicFiles) {
  if (!existsSync(file)) {
    failures.push(`${file.replace(`${root}/`, '')}: required legal/commerce file is missing`);
  }
}

if (existsSync(legalEntityPath)) {
  const legalEntity = JSON.parse(readFileSync(legalEntityPath, 'utf8'));
  for (const field of requiredLegalEntityFields) {
    const value = legalEntity[field];
    if (typeof value !== 'string' || value.trim() === '' || value.includes('TODO_IMPRESSUM')) {
      failures.push(`src/data/legalEntity.json: ${field} must contain real public Impressum data`);
    }
  }
}

if (failures.length > 0) {
  console.error(`legal readiness failed (${failures.length} blockers):`);
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('\nProvide the registered German entity details, then replace the Impressum placeholders and rerun npm run legal:check.');
  process.exit(1);
}

console.log('legal readiness OK: Impressum placeholders removed and public commerce/legal files are present.');
