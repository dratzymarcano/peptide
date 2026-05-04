#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const failures = [];
const warnings = [];

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function assertFile(path) {
  if (!existsSync(join(root, path))) failures.push(`${path}: missing`);
}

assertFile('wrangler.toml');
assertFile('public/feeds/manifest.json');

if (existsSync(join(root, 'wrangler.toml'))) {
  const wrangler = read('wrangler.toml');
  if (!/account_id\s*=\s*"[^"]+"/.test(wrangler)) failures.push('wrangler.toml: missing account_id');
  if (!/name\s*=\s*"peptide-shop"/.test(wrangler)) warnings.push('wrangler.toml: worker name is not peptide-shop');
  if (!/observability\]\s*\nenabled\s*=\s*true/s.test(wrangler)) warnings.push('wrangler.toml: observability is not enabled');
}

if (!process.env.CLOUDFLARE_API_TOKEN) {
  failures.push('CLOUDFLARE_API_TOKEN: missing; cannot run Wrangler account checks or deploy from this machine');
}

if (existsSync(join(root, 'public/feeds/manifest.json'))) {
  const manifest = JSON.parse(read('public/feeds/manifest.json'));
  if (!Array.isArray(manifest.feeds) || manifest.feeds.length < 6) {
    failures.push('public/feeds/manifest.json: expected at least 6 localized Merchant Center feeds');
  } else {
    for (const feed of manifest.feeds) {
      const path = `public/feeds/feed-${feed.id}.xml`;
      if (!existsSync(join(root, path))) failures.push(`${path}: feed listed in manifest but missing`);
      if (!String(feed.url || '').startsWith('https://peptide-shop.net/feeds/')) {
        failures.push(`manifest feed ${feed.id}: URL must be a peptide-shop.net /feeds/ URL`);
      }
    }
  }
}

const manualGoogleItems = [
  'Merchant Center: create/select account for Peptide Shop German business entity',
  'Merchant Center: verify and claim https://peptide-shop.net',
  'Merchant Center: add scheduled fetches for every URL in public/feeds/manifest.json',
  'Merchant Center: request policy review before enabling research-peptide listings',
  'Search Console: create domain property peptide-shop.net and URL-prefix properties for /de/, /nl/, /fr/, /it/, /es/',
  'GA4: configure Consent Mode v2, locale custom dimension, ecommerce events, and DSGVO-compliant retention',
];

if (failures.length) {
  console.error(`account readiness failed (${failures.length} blockers):`);
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.error('\nwarnings:');
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  console.error('\nManual Google account tasks that cannot be performed without account access:');
  for (const item of manualGoogleItems) console.error(`- ${item}`);
  process.exit(1);
}

console.log('account readiness OK: Wrangler config, Cloudflare token, and Merchant Center feed files are present.');
if (warnings.length) {
  console.log('warnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}
console.log('\nManual Google account tasks still require account access:');
for (const item of manualGoogleItems) console.log(`- ${item}`);
