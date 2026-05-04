#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CAT_PATH = join(__dirname, '..', 'src', 'data', 'product-catalogue.json');

// product name -> { unit_quantity, unit_price_eur, corresponding_quantity }
const MAP = {
  '5-Amino-1MQ':         { unit_quantity: '60 × 50 mg caps', unit_price_eur: 65,  corresponding_quantity: '1 bottle (60 caps)' },
  'AOD-9604':            { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 25,  corresponding_quantity: '1 vial' },
  'Bacteriostatic Water':{ unit_quantity: '10 × 10 mL vials', unit_price_eur: 18, corresponding_quantity: '1 pack (10 vials)' },
  'BPC-157':             { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 22,  corresponding_quantity: '1 vial' },
  'Cagrilintide':        { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 55,  corresponding_quantity: '1 vial' },
  'CJC-1295 (No DAC)':   { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 18,  corresponding_quantity: '1 vial' },
  'DSIP':                { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 15,  corresponding_quantity: '1 vial' },
  'Epitalon':            { unit_quantity: '1 × 10 mg vial', unit_price_eur: 15,  corresponding_quantity: '1 vial' },
  'GH Frag 176-191':     { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 22,  corresponding_quantity: '1 vial' },
  'GHK-Cu':              { unit_quantity: '500 mg powder',  unit_price_eur: 75,  corresponding_quantity: '1 jar' },
  'GHRP-2':              { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 15,  corresponding_quantity: '1 vial' },
  'GHRP-6':              { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 15,  corresponding_quantity: '1 vial' },
  'Ipamorelin':          { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 18,  corresponding_quantity: '1 vial' },
  'Melanotan-2':         { unit_quantity: '1 × 10 mg vial', unit_price_eur: 15,  corresponding_quantity: '1 vial' },
  'NAD+':                { unit_quantity: '1 × 500 mg vial', unit_price_eur: 55, corresponding_quantity: '1 vial' },
  'O-304':               { unit_quantity: '3 g powder',     unit_price_eur: 95,  corresponding_quantity: '1 jar' },
  'Retatrutide':         { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 145, corresponding_quantity: '1 vial' },
  'Selank':              { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 18,  corresponding_quantity: '1 vial' },
  'Semaglutide':         { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 45,  corresponding_quantity: '1 vial' },
  'Semax':               { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 18,  corresponding_quantity: '1 vial' },
  'TB-500':              { unit_quantity: '1 × 5 mg vial',  unit_price_eur: 25,  corresponding_quantity: '1 vial' },
  'Tesofensine':         { unit_quantity: '60 × 0.5 mg caps', unit_price_eur: 55, corresponding_quantity: '1 bottle (60 caps)' },
  'Tirzepatide':         { unit_quantity: '1 × 10 mg vial', unit_price_eur: 95,  corresponding_quantity: '1 vial' },
};

const cat = JSON.parse(readFileSync(CAT_PATH, 'utf8'));
let n = 0;
for (const item of cat) {
  const cfg = MAP[item.product];
  if (!cfg) continue;
  Object.assign(item, cfg);
  n++;
}
writeFileSync(CAT_PATH, JSON.stringify(cat, null, 2) + '\n');
console.log(`Updated ${n} catalogue entries.`);
