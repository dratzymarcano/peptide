#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const productsDir = join(rootDir, 'src/content/products');
const outputDir = join(rootDir, 'public/feeds');
const site = 'https://peptide-shop.net';
const defaultLocale = 'en';

const localeMeta = {
	en: { language: 'en', term: 'Peptide', purity: 'purity', hplc: 'HPLC verified', ruo: 'For laboratory research use only. Not for human or veterinary use, food, cosmetics, supplements or diagnostics.' },
	de: { language: 'de', term: 'Peptid', purity: 'Reinheit', hplc: 'HPLC-verifiziert', ruo: 'Nur für Laborforschung. Nicht zur Anwendung bei Menschen oder Tieren, nicht als Lebensmittel, Kosmetikum, Nahrungsergänzung oder Diagnostikum.' },
	nl: { language: 'nl', term: 'peptide', purity: 'zuiverheid', hplc: 'HPLC-geverifieerd', ruo: 'Alleen voor laboratoriumonderzoek. Niet voor menselijk of veterinair gebruik, voeding, cosmetica, supplementen of diagnostiek.' },
	fr: { language: 'fr', term: 'peptide', purity: 'pureté', hplc: 'vérifié HPLC', ruo: 'Réservé à la recherche en laboratoire. Non destiné à un usage humain ou vétérinaire, alimentaire, cosmétique, complémentaire ou diagnostique.' },
	it: { language: 'it', term: 'peptide', purity: 'purezza', hplc: 'verificato HPLC', ruo: 'Solo per ricerca di laboratorio. Non destinato a uso umano o veterinario, alimentare, cosmetico, integratore o diagnostico.' },
	es: { language: 'es', term: 'péptido', purity: 'pureza', hplc: 'verificado por HPLC', ruo: 'Solo para investigación de laboratorio. No destinado a uso humano o veterinario, alimentos, cosméticos, suplementos o diagnóstico.' },
};

const feeds = [
	{ id: 'de-de', locale: 'de', targetCountry: 'DE', shippingPrice: '9.90 EUR', productType: 'Forschungspeptide' },
	{ id: 'de-en', locale: 'en', targetCountry: 'DE', shippingPrice: '9.90 EUR', productType: 'Research peptides' },
	{ id: 'nl-nl', locale: 'nl', targetCountry: 'NL', shippingPrice: '14.90 EUR', productType: 'Onderzoekspeptiden' },
	{ id: 'fr-fr', locale: 'fr', targetCountry: 'FR', shippingPrice: '14.90 EUR', productType: 'Peptides de recherche' },
	{ id: 'it-it', locale: 'it', targetCountry: 'IT', shippingPrice: '14.90 EUR', productType: 'Peptidi di ricerca' },
	{ id: 'es-es', locale: 'es', targetCountry: 'ES', shippingPrice: '14.90 EUR', productType: 'Péptidos de investigación' },
];

function escapeXml(value) {
	return String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function parseFrontmatter(filePath) {
	const source = readFileSync(filePath, 'utf8');
	const match = source.match(/^---\n([\s\S]*?)\n---/);
	if (!match) throw new Error(`Missing frontmatter: ${filePath}`);
	return parse(match[1]);
}

function cleanTitle(title) {
	return String(title)
		.split('|')[0]
		.split('—')[0]
		.split('–')[0]
		.trim()
		.replace(/^Buy\s+/i, '');
}

function localizePath(path, locale) {
	if (locale === defaultLocale) return path;
	return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

function localizedProductData(product, locale) {
	const localizedPath = join(productsDir, locale, `${product.slug}.md`);
	const data = locale !== defaultLocale && existsSync(localizedPath)
		? { ...product.data, ...parseFrontmatter(localizedPath) }
		: product.data;
	const meta = localeMeta[locale];
	const baseName = cleanTitle(data.title || product.data.title);
	const packageSize = data.package_sizes?.[0] ?? product.data.package_sizes?.[0] ?? '';
	const purity = data.purity ?? product.data.purity ?? '';

	return {
		title: `${baseName} ${packageSize} | ${purity} ${meta.purity} | ${meta.hplc}`.replace(/\s+/g, ' ').trim(),
		description: `${data.short_description || product.data.short_description} ${meta.ruo}`.replace(/\s+/g, ' ').trim(),
	};
}

function productFiles() {
	return readdirSync(productsDir)
		.filter((file) => file.endsWith('.md'))
		.sort()
		.map((file) => {
			const slug = basename(file, '.md');
			const data = parseFrontmatter(join(productsDir, file));
			return { slug, data };
		});
}

function availability(product) {
	if (product.data.availability === 'out_of_stock') return 'out_of_stock';
	if (product.data.availability === 'preorder') return 'preorder';
	return 'in_stock';
}

function googleCategory(product) {
	return product.data.category === 'supplies'
		? 'Health & Beauty > Health Care > Medical Supplies'
		: 'Health & Beauty > Health Care';
}

function feedItem(product, feed) {
	const data = product.data;
	const localized = localizedProductData(product, feed.locale);
	const image = data.images?.[0] ?? '/images/peptide-default.jpg';
	const price = Number(data.price ?? String(data.price_range ?? '').match(/[\d,.]+/)?.[0]?.replace(',', '.') ?? 0);
	const link = `${site}${localizePath(`/peptides/${product.slug}/`, feed.locale)}`;
	const imageLink = image.startsWith('http') ? image : `${site}${image}`;
	const labels = [data.researchArea, ...(data.useCases ?? []), ...(data.tags ?? [])].filter(Boolean);

	return `
	<item>
		<g:id>${escapeXml(data.id || product.slug)}</g:id>
		<g:title>${escapeXml(localized.title.slice(0, 150))}</g:title>
		<g:description>${escapeXml(localized.description.slice(0, 5000))}</g:description>
		<g:link>${escapeXml(link)}</g:link>
		<g:image_link>${escapeXml(imageLink)}</g:image_link>
		<g:availability>${availability(product)}</g:availability>
		<g:price>${price.toFixed(2)} EUR</g:price>
		<g:brand>Peptide Shop</g:brand>
		<g:condition>new</g:condition>
		<g:mpn>${escapeXml(data.id || product.slug)}</g:mpn>
		<g:identifier_exists>no</g:identifier_exists>
		<g:google_product_category>${escapeXml(googleCategory(product))}</g:google_product_category>
		<g:product_type>${escapeXml(feed.productType)}</g:product_type>
		<g:shipping>
			<g:country>${feed.targetCountry}</g:country>
			<g:service>Standard</g:service>
			<g:price>${feed.shippingPrice}</g:price>
		</g:shipping>
		<g:custom_label_0>${escapeXml(data.researchArea || data.category || 'catalog')}</g:custom_label_0>
		<g:custom_label_1>${escapeXml(data.purity || '')}</g:custom_label_1>
		<g:custom_label_2>${escapeXml((data.cas || '').toString())}</g:custom_label_2>
		<g:custom_label_3>${escapeXml(labels.includes('research-use-only') ? 'research-use-only' : 'standard')}</g:custom_label_3>
		<g:custom_label_4>${existsSync(join(productsDir, feed.locale, `${product.slug}.md`)) ? 'markdown-localized' : 'runtime-localized'}</g:custom_label_4>
	</item>`;
}

function writeFeed(feed, products) {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
	<title>Peptide Shop ${feed.id.toUpperCase()} Product Feed</title>
	<link>${site}${localizePath('/', feed.locale)}</link>
	<description>Localized Peptide Shop product feed for ${feed.targetCountry}/${feed.locale}.</description>
	${products.map((product) => feedItem(product, feed)).join('\n')}
</channel>
</rss>
`;
	writeFileSync(join(outputDir, `feed-${feed.id}.xml`), xml);
}

function writeManifest(products) {
	const manifest = {
		generatedAt: new Date().toISOString(),
		productCount: products.length,
		feeds: feeds.map((feed) => ({
			id: feed.id,
			locale: feed.locale,
			targetCountry: feed.targetCountry,
			url: `${site}/feeds/feed-${feed.id}.xml`,
			uploadMode: 'Merchant Center scheduled fetch',
			policyReview: 'Required before activation for research peptide products.',
		})),
	};
	writeFileSync(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

mkdirSync(outputDir, { recursive: true });
const products = productFiles();
for (const feed of feeds) writeFeed(feed, products);
writeManifest(products);

console.log(`Generated ${feeds.length} Merchant Center feeds for ${products.length} products in public/feeds/`);
