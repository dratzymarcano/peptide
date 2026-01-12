// Debug script to check product collection
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsDir = path.join(__dirname, '../src/content/products');

// List all product directories
const langs = fs.readdirSync(productsDir).filter(f => 
  fs.statSync(path.join(productsDir, f)).isDirectory()
);

console.log('Product language folders:', langs);

for (const lang of langs) {
  const langDir = path.join(productsDir, lang);
  const products = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
  console.log(`\n${lang}/: ${products.length} products`);
  products.slice(0, 3).forEach(p => console.log(`  - ${p}`));
  if (products.length > 3) console.log(`  ... and ${products.length - 3} more`);
}

console.log('\nExpected Astro collection slugs:');
for (const lang of langs) {
  const langDir = path.join(productsDir, lang);
  const products = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
  products.slice(0, 2).forEach(p => {
    const name = p.replace('.md', '');
    console.log(`  ${lang}/${name}`);
  });
}
