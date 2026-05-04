#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const sitemapPath = join(root, 'dist/sitemap-0.xml');

if (!existsSync(sitemapPath)) {
	console.error('dist/sitemap-0.xml not found. Run npm run build before validate-hreflang.');
	process.exit(1);
}

const xml = readFileSync(sitemapPath, 'utf8');
const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
const clusters = new Map();
const failures = [];

function firstMatch(source, pattern) {
	return source.match(pattern)?.[1];
}

function parseLinks(block) {
	return [...block.matchAll(/<xhtml:link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/>/g)]
		.map((match) => ({ lang: match[1], href: match[2] }))
		.sort((a, b) => a.lang.localeCompare(b.lang));
}

for (const block of urlBlocks) {
	const loc = firstMatch(block, /<loc>([^<]+)<\/loc>/);
	if (!loc) {
		failures.push('URL block missing <loc>.');
		continue;
	}
	const links = parseLinks(block);
	const languageLinks = links.filter((link) => link.lang !== 'x-default');
	const xDefault = links.find((link) => link.lang === 'x-default');
	const duplicateLangs = links.map((link) => link.lang).filter((lang, index, langs) => langs.indexOf(lang) !== index);

	if (!xDefault) failures.push(`${loc}: missing x-default hreflang.`);
	if (duplicateLangs.length) failures.push(`${loc}: duplicate hreflang values: ${[...new Set(duplicateLangs)].join(', ')}.`);
	if (!languageLinks.some((link) => link.href === loc)) failures.push(`${loc}: self URL is not present as a language alternate.`);
	if (!languageLinks.some((link) => link.lang === 'en')) failures.push(`${loc}: missing English default alternate.`);

	clusters.set(loc, links);
}

for (const [loc, links] of clusters) {
	const signature = JSON.stringify(links);
	for (const link of links.filter((candidate) => candidate.lang !== 'x-default')) {
		const reciprocal = clusters.get(link.href);
		if (!reciprocal) {
			failures.push(`${loc}: alternate ${link.href} has no sitemap URL block.`);
			continue;
		}
		if (JSON.stringify(reciprocal) !== signature) {
			failures.push(`${loc}: alternate ${link.href} does not reciprocate the same hreflang cluster.`);
		}
	}
}

if (failures.length > 0) {
	console.error(`hreflang validation failed (${failures.length} issues):`);
	for (const failure of failures.slice(0, 50)) console.error(`- ${failure}`);
	if (failures.length > 50) console.error(`...and ${failures.length - 50} more.`);
	process.exit(1);
}

console.log(`hreflang validation OK: ${clusters.size} sitemap URLs have reciprocal clusters with x-default.`);
