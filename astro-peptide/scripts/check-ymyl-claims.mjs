#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const scanDirs = [
  'src/content/products',
  'src/content/blog',
  'src/content/learn',
  'src/i18n/dictionaries',
];

const allowlist = [
  /disclaimer/i,
  /not intended/i,
  /not for human/i,
  /not marketed/i,
  /never marketed/i,
  /not approved/i,
  /research-use-only/i,
  /nicht.*bestimmt/i,
  /nicht.*zugelassen/i,
  /nicht.*vermarktet/i,
  /keine.*anwendung/i,
  /no est[aá]n? destinados/i,
  /non destinati/i,
  /jamais pr[eé]sent[eé]/i,
  /mai commercializzato/i,
  /nooit vermarkt/i,
  /niet bedoeld/i,
  /not a medicine/i,
  /kein arzneimittel/i,
  /research use only/i,
  /nur für forschungszwecke/i,
  /\b(not|never|no|non|niet|kein|keine|nicht|jamais|mai)\b.{0,120}\b(therap|diagnos|human|veterin|consum|cosmet|supplement|zugelassen|vermarkt|approved|intended|destinad|destinati|bedoeld)/i,
  /must not be used/i,
  /solely for laboratory research/i,
  /no marketing copy/i,
  /nunca comercializado/i,
  /fresh shelf-life clock/i,
  /cell-penetrating peptides/i,
  /"repair"\s*:\s*\{/i,
  /traitement des données/i,
  /traitement des commandes/i,
  /reverse-phase/i,
  /reverse phase/i,
  /treat the/i,
  /traiter les commandes/i,
  /tratamiento de datos/i,
  /traitement de données/i,
];

const patterns = [
  { label: 'EN therapeutic claim', regex: /\b(cure|curing|heals?|healing|treats?|treating|therapy|therapeutic|repair|regenerate|regeneration|prevent disease|diagnose|anti[- ]?inflammatory|pain relief|fat loss|weight loss)\b/i },
  { label: 'DE therapeutic claim', regex: /\b(heilen|heilung|behandeln|therapie|therapeutisch|reparatur|regeneration|schmerzen|entzündungshemmend|gewichtsverlust|abnehmen|diagnostizieren)\b/i },
  { label: 'FR therapeutic claim', regex: /\b(guérir|traiter|traitement|thérapie|réparer|régénérer|douleur|perte de poids|diagnostiquer)\b/i },
  { label: 'ES therapeutic claim', regex: /\b(curar|tratar|tratamiento|terapia|reparar|regenerar|dolor|pérdida de peso|diagnosticar)\b/i },
  { label: 'IT therapeutic claim', regex: /\b(curare|trattare|trattamento|terapia|riparare|rigenerare|dolore|perdita di peso|diagnosticare)\b/i },
  { label: 'NL therapeutic claim', regex: /\b(genezen|behandelen|behandeling|therapie|herstel|regeneratie|pijn|gewichtsverlies|diagnosticeren)\b/i },
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const rel = relative(root, path);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(md|astro|json|ts|tsx)$/.test(entry) ? [rel] : [];
  });
}

const findings = [];

for (const dir of scanDirs) {
  for (const rel of walk(join(root, dir))) {
    const source = readFileSync(join(root, rel), 'utf8');
    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (allowlist.some((pattern) => pattern.test(line))) return;
      for (const pattern of patterns) {
        if (pattern.regex.test(line)) {
          findings.push({ file: rel, line: index + 1, label: pattern.label, text: line.trim().slice(0, 220) });
          break;
        }
      }
    });
  }
}

if (findings.length) {
  console.error(`YMYL/HWG claim scan found ${findings.length} lines requiring native/legal review:`);
  for (const finding of findings.slice(0, 120)) {
    console.error(`- ${finding.file}:${finding.line} [${finding.label}] ${finding.text}`);
  }
  if (findings.length > 120) console.error(`...and ${findings.length - 120} more.`);
  console.error('\nThis is a review gate, not legal advice. Rewrite or approve each flagged line before launch/merchant activation.');
  process.exit(1);
}

console.log('YMYL/HWG claim scan OK: no obvious therapeutic/medical claim terms found.');
