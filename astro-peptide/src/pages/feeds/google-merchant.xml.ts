import type { APIRoute } from 'astro';
import { getCanonicalCollection } from '../../lib/collections';

export const prerender = false;

function escapeXml(unsafe: string): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const products = await getCanonicalCollection('products');
  const siteUrl = 'https://peptide-kaufen.net';

  const itemsXml = products
    .map((product) => {
      const id = product.data.id;
      const title = escapeXml(product.data.title);
      const description = escapeXml(
        product.data.short_description ||
        product.data.meta?.description ||
        `${product.data.title} hochreines Forschungspeptid für Laborforschung. Reinheit ≥99% per RP-HPLC, Analysezertifikat beiliegend.`
      );
      const link = `${siteUrl}/peptides/${product.id}/`;
      const imageLink = `${siteUrl}${product.data.images[0] || '/images/peptide-default.jpg'}`;
      const priceVal = (product.data.price || 55.0).toFixed(2);

      return `    <item>
      <g:id>${escapeXml(id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${priceVal} EUR</g:price>
      <g:brand>Peptide Shop</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>Health &amp; Beauty &gt; Health Care</g:google_product_category>
      <g:product_type>Laborchemikalien &gt; Biochemikalien &gt; Forschungspeptide</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>AT</g:country>
        <g:service>Österreich Inland Express</g:service>
        <g:price>9.90 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>DE</g:country>
        <g:service>Deutschland Express</g:service>
        <g:price>9.90 EUR</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>CH</g:country>
        <g:service>Schweiz Prioritär</g:service>
        <g:price>14.90 EUR</g:price>
      </g:shipping>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Peptide Shop - Labor- und Forschungspeptide</title>
    <link>${siteUrl}</link>
    <description>Zertifizierte Forschungspeptide (≥99% HPLC) mit chargenbezogenem Analysezertifikat (COA). Standort: Wien, Österreich. Expressversand in den gesamten DACH-Raum (Deutschland, Österreich, Schweiz).</description>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
