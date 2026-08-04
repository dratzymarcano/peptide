#!/usr/bin/env node
/**
 * Validate src/data/coa-lots.json before it can reach a rendered certificate.
 *
 * A Certificate of Analysis is a laboratory record: every field must trace to
 * a real analytical report. This gate enforces the structural contract from
 * src/lib/coa/lots.ts and refuses obvious placeholder text, so a half-filled
 * template cannot be published as if it were a genuine certificate.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const lotsPath = join(root, 'src/data/coa-lots.json');
const productsDir = join(root, 'src/content/products');

const failures = [];
const warnings = [];

if (!existsSync(lotsPath)) {
	console.error('src/data/coa-lots.json: missing');
	process.exit(1);
}

let registry;
try {
	registry = JSON.parse(readFileSync(lotsPath, 'utf8'));
} catch (error) {
	console.error(`src/data/coa-lots.json: invalid JSON — ${error.message}`);
	process.exit(1);
}

const knownSlugs = new Set(
	readdirSync(productsDir)
		.filter((file) => file.endsWith('.md'))
		.map((file) => basename(file, '.md'))
);

const REQUIRED = ['batchNo', 'docNo', 'revision', 'issuedDate', 'manufactureDate', 'retestDate', 'laboratory', 'results'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Text that means "someone left the template in place".
const PLACEHOLDER = /REPLACE|TRANSCRIBE|TODO|PLACEHOLDER|XXX|example-lab|LOT-NUMBER|LAB-REPORT-REF/i;

function checkPlaceholder(where, value) {
	if (typeof value === 'string' && PLACEHOLDER.test(value)) {
		failures.push(`${where}: still contains placeholder text ("${value}")`);
	}
}

for (const [slug, lots] of Object.entries(registry)) {
	if (!knownSlugs.has(slug)) {
		warnings.push(`${slug}: no product with this slug in src/content/products`);
	}
	if (!Array.isArray(lots)) {
		failures.push(`${slug}: expected an array of lot records`);
		continue;
	}
	lots.forEach((lot, index) => {
		const where = `${slug}[${index}]`;
		if (typeof lot !== 'object' || lot === null) {
			failures.push(`${where}: expected an object`);
			return;
		}

		for (const field of REQUIRED) {
			if (lot[field] === undefined || lot[field] === null || lot[field] === '') {
				failures.push(`${where}.${field}: required`);
			}
		}

		for (const field of ['issuedDate', 'manufactureDate', 'retestDate']) {
			if (lot[field] && !ISO_DATE.test(lot[field])) {
				failures.push(`${where}.${field}: expected YYYY-MM-DD, got "${lot[field]}"`);
			}
		}
		if (lot.issuedDate && lot.manufactureDate && lot.issuedDate < lot.manufactureDate) {
			failures.push(`${where}: issuedDate (${lot.issuedDate}) precedes manufactureDate (${lot.manufactureDate})`);
		}
		if (lot.retestDate && lot.manufactureDate && lot.retestDate <= lot.manufactureDate) {
			failures.push(`${where}: retestDate (${lot.retestDate}) must be after manufactureDate (${lot.manufactureDate})`);
		}

		checkPlaceholder(`${where}.batchNo`, lot.batchNo);
		checkPlaceholder(`${where}.docNo`, lot.docNo);

		if (lot.laboratory) {
			if (!lot.laboratory.name) failures.push(`${where}.laboratory.name: required — the testing lab must be named`);
			if (!lot.laboratory.location) failures.push(`${where}.laboratory.location: required`);
			checkPlaceholder(`${where}.laboratory.name`, lot.laboratory.name);
			checkPlaceholder(`${where}.laboratory.reportNumber`, lot.laboratory.reportNumber);
			checkPlaceholder(`${where}.laboratory.reportUrl`, lot.laboratory.reportUrl);
		}

		if (Array.isArray(lot.results)) {
			if (lot.results.length === 0) {
				failures.push(`${where}.results: at least one analytical result is required`);
			}
			lot.results.forEach((row, rowIndex) => {
				const rowWhere = `${where}.results[${rowIndex}]`;
				for (const field of ['parameter', 'method', 'specification', 'result']) {
					if (!row?.[field]) failures.push(`${rowWhere}.${field}: required`);
					checkPlaceholder(`${rowWhere}.${field}`, row?.[field]);
				}
				if (row?.status !== 'pass' && row?.status !== 'fail') {
					failures.push(`${rowWhere}.status: must be "pass" or "fail"`);
				}
			});
		} else if (lot.results !== undefined) {
			failures.push(`${where}.results: expected an array`);
		}

		if (Array.isArray(lot.signatories)) {
			lot.signatories.forEach((signatory, sigIndex) => {
				const sigWhere = `${where}.signatories[${sigIndex}]`;
				for (const field of ['name', 'role', 'date']) {
					if (!signatory?.[field]) failures.push(`${sigWhere}.${field}: required`);
					checkPlaceholder(`${sigWhere}.${field}`, signatory?.[field]);
				}
				if (signatory?.date && !ISO_DATE.test(signatory.date)) {
					failures.push(`${sigWhere}.date: expected YYYY-MM-DD, got "${signatory.date}"`);
				}
			});
		}
	});
}

for (const warning of warnings) console.warn(`warning: ${warning}`);

if (failures.length) {
	console.error(`\nCoA lot validation failed (${failures.length} problem${failures.length === 1 ? '' : 's'}):`);
	for (const failure of failures) console.error(`- ${failure}`);
	console.error('\nEvery field must be transcribed from a real laboratory report. See src/data/coa-lots.example.json.');
	process.exit(1);
}

const slugCount = Object.keys(registry).length;
const lotCount = Object.values(registry).reduce((sum, lots) => sum + (Array.isArray(lots) ? lots.length : 0), 0);

if (slugCount === 0) {
	console.log(
		'CoA lots OK: registry is empty — every product serves the "certificate available on request" page.\n' +
		'Add real lot data to src/data/coa-lots.json to publish certificates.'
	);
} else {
	console.log(`CoA lots OK: ${lotCount} lot(s) across ${slugCount} product(s) validated.`);
}
