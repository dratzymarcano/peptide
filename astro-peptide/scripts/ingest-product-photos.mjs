#!/usr/bin/env node
/**
 * Ingest real product photographs and wire them into the catalogue.
 *
 * Drop shots into `photo-intake/<slug>/` (one folder per product slug, matching
 * the filename in src/content/products without .md), then run:
 *
 *   npm run photos:ingest          # process everything and update frontmatter
 *   npm run photos:ingest -- --dry # report what would happen, write nothing
 *   npm run photos:check           # list products still lacking a real photo
 *
 * Shot order is alphabetical by filename, so name files `01-front.jpg`,
 * `02-label.jpg`, `03-angle.jpg`. The first shot becomes the primary image
 * used on cards, product pages, Open Graph and the Merchant Center feed.
 *
 * Output per shot, written to public/images/products/:
 *   <slug>.webp        1600×1600  primary (feed + product page)
 *   <slug>-800.webp     800×800   card / mid-viewport
 *   <slug>-400.webp     400×400   thumbnail
 *   <slug>-2.webp …               additional shots, same variant ladder
 *
 * See PHOTOGRAPHY.md for the shoot specification these files must satisfy.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const intakeDir = join(root, 'photo-intake');
const productsDir = join(root, 'src/content/products');
const outputDir = join(root, 'public/images/products');

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry') || args.has('--dry-run');
const checkOnly = args.has('--check');

/** Merchant Center wants ≥500×500 and recommends ≥1500×1500 for all surfaces. */
const MIN_SOURCE_EDGE = 1500;
const VARIANTS = [
	{ suffix: '', size: 1600 },
	{ suffix: '-800', size: 800 },
	{ suffix: '-400', size: 400 },
];
const SOURCE_EXT = /\.(jpe?g|png|webp|tiff?|avif)$/i;

function productSlugs() {
	return readdirSync(productsDir)
		.filter((file) => file.endsWith('.md'))
		.map((file) => basename(file, '.md'))
		.sort();
}

function shotsFor(slug) {
	const dir = join(intakeDir, slug);
	if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
	return readdirSync(dir)
		.filter((file) => SOURCE_EXT.test(file) && !file.startsWith('.'))
		.sort()
		.map((file) => join(dir, file));
}

/** Public path for shot `index` (0-based) at a given variant suffix. */
function publicPath(slug, index, suffix) {
	const stem = index === 0 ? slug : `${slug}-${index + 1}`;
	return `/images/products/${stem}${suffix}.webp`;
}

async function processShot(slug, sourcePath, index) {
	const meta = await sharp(sourcePath).metadata();
	const problems = [];

	if (!meta.width || !meta.height) {
		problems.push(`${sourcePath}: could not read image dimensions`);
		return { problems, written: [] };
	}
	if (Math.min(meta.width, meta.height) < MIN_SOURCE_EDGE) {
		problems.push(
			`${basename(sourcePath)}: ${meta.width}×${meta.height} is below the ${MIN_SOURCE_EDGE}px minimum edge — reshoot at higher resolution`
		);
		return { problems, written: [] };
	}

	const written = [];
	for (const variant of VARIANTS) {
		const target = publicPath(slug, index, variant.suffix);
		written.push(target);
		if (dryRun) continue;
		await sharp(sourcePath)
			// Square crop keeps every product image on one grid; `attention`
			// biases the crop toward the vial rather than the backdrop.
			.resize(variant.size, variant.size, { fit: 'cover', position: sharp.strategy.attention })
			.webp({ quality: 82, effort: 5 })
			.toFile(join(root, 'public', target.replace(/^\//, '')));
	}
	return { problems, written };
}

/** Rewrite the `images:` list in a product's frontmatter. */
function updateFrontmatter(slug, imagePaths) {
	const filePath = join(productsDir, `${slug}.md`);
	const source = readFileSync(filePath, 'utf8');
	const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) {
		return `${slug}.md: missing frontmatter`;
	}
	const [, frontmatter, body] = match;
	const block = `images:\n${imagePaths.map((path) => `  - ${path}`).join('\n')}`;

	if (!/^images:/m.test(frontmatter)) {
		return `${slug}.md: no images: key to replace`;
	}
	// Replace the images: key and its indented list items.
	const updated = frontmatter.replace(/^images:\n(?:[ \t]+-[^\n]*\n?)*/m, `${block}\n`);
	if (!dryRun) {
		writeFileSync(filePath, `---\n${updated}\n---\n${body}`);
	}
	return null;
}

const slugs = productSlugs();
const withPhotos = [];
const withoutPhotos = [];
const problems = [];

if (checkOnly) {
	for (const slug of slugs) {
		(shotsFor(slug).length ? withPhotos : withoutPhotos).push(slug);
	}
	console.log(`Real product photography: ${withPhotos.length}/${slugs.length} products supplied.`);
	if (withoutPhotos.length) {
		console.log(`\nStill needed (add shots to photo-intake/<slug>/):`);
		for (const slug of withoutPhotos) console.log(`  - ${slug}`);
	}
	process.exit(withoutPhotos.length ? 1 : 0);
}

if (!existsSync(intakeDir)) {
	mkdirSync(intakeDir, { recursive: true });
	console.log(`Created ${intakeDir}. Add shots under photo-intake/<slug>/ and re-run.`);
	console.log('See PHOTOGRAPHY.md for the shoot specification.');
	process.exit(0);
}

mkdirSync(outputDir, { recursive: true });

for (const slug of slugs) {
	const shots = shotsFor(slug);
	if (shots.length === 0) {
		withoutPhotos.push(slug);
		continue;
	}

	const primaryPaths = [];
	for (const [index, sourcePath] of shots.entries()) {
		const result = await processShot(slug, sourcePath, index);
		problems.push(...result.problems);
		if (result.written.length) primaryPaths.push(publicPath(slug, index, ''));
	}

	if (primaryPaths.length === 0) {
		withoutPhotos.push(slug);
		continue;
	}

	const error = updateFrontmatter(slug, primaryPaths);
	if (error) problems.push(error);
	withPhotos.push({ slug, count: primaryPaths.length });
}

const verb = dryRun ? 'Would process' : 'Processed';
console.log(`${verb} photography for ${withPhotos.length} product(s):`);
for (const { slug, count } of withPhotos) {
	console.log(`  ${slug}: ${count} shot(s) → ${count * VARIANTS.length} file(s)`);
}

if (problems.length) {
	console.warn(`\n${problems.length} problem(s):`);
	for (const problem of problems) console.warn(`  - ${problem}`);
}

if (withoutPhotos.length) {
	console.log(`\n${withoutPhotos.length} product(s) still have no real photograph:`);
	for (const slug of withoutPhotos) console.log(`  - ${slug}`);
	console.log('\nThese keep their current placeholder and stay out of the Merchant Center feed.');
}

if (dryRun) console.log('\nDry run — no files written.');
