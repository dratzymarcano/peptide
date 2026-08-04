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

// Einzelunternehmen (sole trader): §5 DDG requires the operator's own full
// name and a summonable postal address. There is no Handelsregister entry, so
// registerCourt / commercialRegisterNumber are not part of the contract.
const requiredLegalEntityFields = [
  'brandName',
  'ownerName',
  'streetAddress',
  'postalCode',
  'addressLocality',
  'addressCountry',
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

  // §27a UStG only requires publishing a USt-IdNr that has actually been
  // issued. A Kleinunternehmer under §19 UStG declares that status instead.
  const vatId = legalEntity.vatId;
  const hasVatId = typeof vatId === 'string' && vatId.trim() !== '' && !vatId.includes('TODO_IMPRESSUM');
  if (!hasVatId && legalEntity.kleinunternehmer !== true) {
    failures.push(
      'src/data/legalEntity.json: set vatId to the issued USt-IdNr, or set kleinunternehmer to true if none was issued (§19 UStG)'
    );
  }
  if (hasVatId && !/^DE\s?\d{9}$/.test(vatId.replace(/\s+/g, ' ').trim())) {
    failures.push(`src/data/legalEntity.json: vatId "${vatId}" is not a valid German USt-IdNr (expected DE + 9 digits)`);
  }

  // The Steuernummer is not a substitute for a USt-IdNr and should not be
  // published — it is not required by §5 DDG and exposes the operator.
  if (typeof vatId === 'string' && /^\d{2,3}\/\d{3}\/\d{4,5}$/.test(vatId.trim())) {
    failures.push('src/data/legalEntity.json: vatId looks like a Steuernummer — publish the USt-IdNr instead, or declare Kleinunternehmer status');
  }
}

if (failures.length > 0) {
  console.error(`legal readiness failed (${failures.length} blockers):`);
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('\nFill in src/data/legalEntity.json with the sole trader\'s real name, postal address and VAT status, then rerun npm run legal:check.');
  process.exit(1);
}

console.log('legal readiness OK: Impressum placeholders removed and public commerce/legal files are present.');
