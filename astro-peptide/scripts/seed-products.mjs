#!/usr/bin/env node
// One-shot seed for 25 research peptides covering the 5 previously empty research areas.
// Idempotent: skips files that already exist.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'content', 'products');
mkdirSync(OUT, { recursive: true });

const yamlEscape = (s) => String(s).replace(/"/g, '\\"');
const blockify = (arr, indent = '  ') => arr.map((x) => `${indent}- ${x}`).join('\n');
const faqsYaml = (faqs) => faqs.map((f) =>
  `  - question: ${JSON.stringify(f.q)}\n    answer: ${JSON.stringify(f.a)}`
).join('\n');

function build(p) {
  const pkgSize = p.package_sizes[0];
  const tags = [
    'research-use-only',
    'coa-included',
    p.researchArea,
    ...(p.useCases ?? []),
    'research-peptide',
    p.slug,
  ];
  const useCasesBlock = p.useCases?.length
    ? `useCases:\n${blockify(p.useCases)}\n`
    : '';
  const seqLine = p.sequence ? `sequence: ${JSON.stringify(p.sequence)}\n` : '';

  return `---
id: peptide-${p.slug}
title: "${yamlEscape(p.title)}"
primary_keyword: ${p.slug}
search_volume: "${p.searchVolume ?? 0}"
aliases:
${blockify(p.aliases)}
cas: ${p.cas ? p.cas : 'null'}
molecular_weight: ${p.mw ? `"${p.mw}"` : 'null'}
purity: "≥ 98%"
storage: "${p.storage ?? '-20°C lyophilised, desiccated, protected from light (research only)'}"
package_sizes:
${blockify(p.package_sizes)}
moq: 1
price_range: "Contact for pricing"
short_description: >-
  ${p.shortDescription}
category: ${p.category}
researchArea: ${p.researchArea}
${useCasesBlock}${seqLine}tags:
${blockify(tags)}
images:
  - /images/products/research-vial.svg
meta:
  title: "${yamlEscape(p.title)} | Peptide Shop"
  description: "${yamlEscape(p.metaDescription)}"
faqs:
${faqsYaml(p.faqs)}
---

## ${p.title} — research overview

${p.body.intro}

Peptide Shop supplies ${p.displayName} (${pkgSize}) as a sealed research material with lot-level documentation. This product is supplied for in-vitro laboratory research only and is not intended for human use, veterinary use, therapy, diagnosis, cosmetic application or consumption.

## Research applications

${p.body.applications.map((a) => `- ${a}`).join('\n')}

## Sequence and analytical data

${p.body.analytical}

## Storage and handling

${p.body.storage}

## Documentation

A lot-specific Certificate of Analysis is available in EN, DE, FR and ES from the product detail page after dispatch. The CoA reports HPLC purity, identity confirmation, appearance, and storage and handling guidance for the dispatched lot.
`;
}

// ============================================================================
// PRODUCT DEFINITIONS
// ============================================================================

const products = [
  // --- CARDIOVASCULAR & VASCULAR -------------------------------------------
  {
    slug: 'anp-1-28',
    title: 'ANP (1-28), human — 1 mg, ≥98 % HPLC',
    displayName: 'ANP (1-28)',
    aliases: ['Atrial Natriuretic Peptide', 'Atriopeptin', 'ANP', 'h-ANP'],
    cas: '85637-73-6',
    mw: '3080.5 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'cardiovascular',
    sequence: 'SLRRSSCFGGRMDRIGAQSGLGCNSFRY (disulfide bond Cys7-Cys23)',
    shortDescription: 'Research-grade human Atrial Natriuretic Peptide (ANP 1-28) for natriuretic-receptor and vascular-tone studies. ≥98% HPLC. RUO.',
    metaDescription: 'Human ANP (1-28) 1 mg vial, ≥98% HPLC purity, lot CoA included. Reference peptide for natriuretic-receptor research. RUO, UK dispatch.',
    body: {
      intro: 'ANP (1-28) is the mature 28-amino-acid form of atrial natriuretic peptide, a cardiac hormone that activates guanylate-cyclase-coupled NPR-A receptors and is widely used as a reference ligand in cardiovascular and renal research.',
      applications: [
        'NPR-A / NPR-C receptor binding and activation studies',
        'Natriuresis, diuresis and renal-tubule research models',
        'Vascular smooth-muscle relaxation assays',
        'Endothelial-function and blood-pressure regulation research',
      ],
      analytical: 'Disulfide bridge between Cys7 and Cys23 confirmed by reductive HPLC and mass spectrometry. Supplied lyophilised from acetic-acid buffer.',
      storage: 'Store lyophilised at -20 °C, protected from light. Once reconstituted in 0.1% BSA / PBS or dilute acetic acid, store aliquots at -80 °C and avoid freeze-thaw cycles.',
    },
    faqs: [
      { q: 'What is the disulfide configuration of ANP (1-28)?', a: 'The single intramolecular disulfide bridges Cys7 and Cys23, forming the canonical 17-residue ring required for NPR-A activation.' },
      { q: 'Which species is this ANP from?', a: 'This is the human sequence. Rat ANP (1-28) differs at position 12 (Ile → Met) and is supplied separately on request.' },
      { q: 'How should ANP be reconstituted for receptor assays?', a: 'Most cardiovascular labs reconstitute in 0.01 M acetic acid containing 0.1% BSA at 0.5–1 mg/mL, then dilute into assay buffer immediately before use.' },
    ],
  },
  {
    slug: 'bnp-32',
    title: 'BNP-32, human — 0.5 mg, ≥98 % HPLC',
    displayName: 'BNP-32',
    aliases: ['B-type Natriuretic Peptide', 'Brain Natriuretic Peptide', 'h-BNP', 'Nesiritide reference'],
    cas: '114471-18-0',
    mw: '3464.0 g/mol',
    package_sizes: ['1 × 0.5 mg vial'],
    category: 'research-peptide',
    researchArea: 'cardiovascular',
    sequence: 'SPKMVQGSGCFGRKMDRISSSSGLGCKVLRRH (disulfide Cys10-Cys26)',
    shortDescription: 'Human B-type Natriuretic Peptide (BNP-32) reference standard for heart-failure biomarker and ELISA-control research. ≥98% HPLC. RUO.',
    metaDescription: 'Human BNP-32 0.5 mg vial, ≥98% HPLC. Reference peptide for heart-failure biomarker research, ELISA controls and NPR-A studies. RUO.',
    body: {
      intro: 'BNP-32 is the active 32-residue form of B-type natriuretic peptide secreted by ventricular cardiomyocytes. It is the most widely cited cardiac biomarker reference in heart-failure research and ELISA assay development.',
      applications: [
        'NT-proBNP / BNP immunoassay calibration and ELISA controls',
        'NPR-A signalling and cGMP-pathway research',
        'Cardiac stretch-response and ventricular-remodelling models',
        'Heart-failure biomarker validation studies',
      ],
      analytical: 'Sequence identity confirmed by ESI-MS; disulfide formation between Cys10 and Cys26 verified by reductive HPLC.',
      storage: 'Store lyophilised at -20 °C protected from light. Reconstituted aliquots are stable at -80 °C; avoid repeated freeze-thaw cycles.',
    },
    faqs: [
      { q: 'How does BNP-32 differ from NT-proBNP?', a: 'BNP-32 is the biologically active C-terminal cleavage product of proBNP; NT-proBNP is the inactive N-terminal fragment. Both are routinely measured in heart-failure biomarker research.' },
      { q: 'Is this material suitable as an ELISA standard?', a: 'Yes. Lot CoA reports peptide content by HPLC and a recommended working concentration range for assay calibration.' },
      { q: 'Why such a small package size?', a: 'BNP-32 is typically used at low picomolar concentrations in immunoassays; 0.5 mg supports several months of routine assay calibration in most labs.' },
    ],
  },
  {
    slug: 'angiotensin-ii',
    title: 'Angiotensin II (human) — 5 mg, ≥98 % HPLC',
    displayName: 'Angiotensin II',
    aliases: ['Angiotensin II human', 'Ang II', '5-Isoleucine angiotensin II'],
    cas: '4474-91-3',
    mw: '1046.18 g/mol',
    package_sizes: ['1 × 5 mg vial'],
    category: 'research-peptide',
    researchArea: 'cardiovascular',
    sequence: 'DRVYIHPF',
    shortDescription: 'Angiotensin II octapeptide reference standard for RAAS, AT1/AT2 receptor and vasoconstriction research. ≥98% HPLC. RUO.',
    metaDescription: 'Angiotensin II (human) 5 mg, ≥98% HPLC purity. Classical RAAS reference peptide for AT1/AT2 receptor research and vascular tone models. RUO.',
    body: {
      intro: 'Angiotensin II is the principal effector octapeptide of the renin-angiotensin-aldosterone system (RAAS), used as a standard ligand in AT1- and AT2-receptor research, vasoconstriction assays and isolated-organ preparations.',
      applications: [
        'AT1R / AT2R receptor pharmacology and competitive-binding studies',
        'Isolated aortic-ring and vasoconstriction assays',
        'RAAS inhibitor (ARB / ACEi) screening reference compound',
        'Aldosterone-release and adrenocortical research models',
      ],
      analytical: 'Identity confirmed by ESI-MS ([M+H]+ = 1046.5). Counterion: trifluoroacetate (acetate available on request).',
      storage: 'Store lyophilised at -20 °C. Stock solutions in dilute acetic acid (10 mM) are stable for 1 month at 4 °C.',
    },
    faqs: [
      { q: 'Is this the human or rat sequence?', a: 'Human, rat and mouse Ang II share the identical octapeptide sequence (DRVYIHPF), so this material is suitable for cross-species pharmacology.' },
      { q: 'Which counterion is used?', a: 'Standard supply is trifluoroacetate. Acetate-form Angiotensin II is available on request for bioassay work where TFA interference is a concern.' },
      { q: 'Recommended assay concentrations?', a: 'Receptor-binding studies typically use 0.1 nM – 1 µM; isolated-vessel preparations 1–100 nM. Validate locally for each model.' },
    ],
  },
  {
    slug: 'endothelin-1',
    title: 'Endothelin-1, human — 0.5 mg, ≥98 % HPLC',
    displayName: 'Endothelin-1',
    aliases: ['ET-1', 'Endothelin 1', 'Human ET-1'],
    cas: '117399-94-7',
    mw: '2491.91 g/mol',
    package_sizes: ['1 × 0.5 mg vial'],
    category: 'research-peptide',
    researchArea: 'cardiovascular',
    sequence: 'CSCSSLMDKECVYFCHLDIIW (two disulfide bridges: Cys1-Cys15, Cys3-Cys11)',
    shortDescription: 'Human Endothelin-1 reference peptide for vasoconstriction, endothelial-dysfunction and pulmonary-hypertension research. ≥98% HPLC. RUO.',
    metaDescription: 'Human Endothelin-1 (ET-1) 0.5 mg, ≥98% HPLC. ETA/ETB receptor research, vasoconstriction and pulmonary-hypertension models. RUO.',
    body: {
      intro: 'Endothelin-1 is the most potent endogenous vasoconstrictor known and the principal endothelin isoform expressed by vascular endothelium. It is a standard ligand for ETA/ETB receptor research and a reference compound in pulmonary-hypertension and endothelial-dysfunction models.',
      applications: [
        'ETA / ETB receptor binding, activation and antagonist screening',
        'Vasoconstriction and isolated-vessel pharmacology',
        'Pulmonary arterial hypertension (PAH) research models',
        'Cardiac hypertrophy and remodelling research',
      ],
      analytical: 'Two intramolecular disulfide bridges (Cys1-Cys15, Cys3-Cys11) confirmed by reductive HPLC and ESI-MS. The folded form is required for receptor activity.',
      storage: 'Store lyophilised at -20 °C protected from light. Reconstitute in 0.1% acetic acid; aliquot and store at -80 °C.',
    },
    faqs: [
      { q: 'Is this the human or porcine ET-1?', a: 'This is the human sequence; human, porcine, bovine and canine ET-1 share the identical 21-residue sequence with both disulfide bridges.' },
      { q: 'How is biological activity verified?', a: 'Identity and disulfide configuration are confirmed by HPLC and MS. Bioactivity is reported by reference to published EC50 ranges in published assays.' },
      { q: 'Receptor selectivity?', a: 'ET-1 activates both ETA and ETB receptors. For ETB-selective studies use ET-3 or sarafotoxin S6c; both available on request.' },
    ],
  },
  {
    slug: 'bradykinin-acetate',
    title: 'Bradykinin acetate — 5 mg, ≥98 % HPLC',
    displayName: 'Bradykinin acetate',
    aliases: ['Bradykinin', 'BK', 'Kallidin-9'],
    cas: '5979-11-3',
    mw: '1060.21 g/mol (free base)',
    package_sizes: ['1 × 5 mg vial'],
    category: 'research-peptide',
    researchArea: 'cardiovascular',
    sequence: 'RPPGFSPFR',
    shortDescription: 'Bradykinin (acetate salt) for B1 / B2 kinin-receptor research, vascular permeability and inflammation studies. ≥98% HPLC. RUO.',
    metaDescription: 'Bradykinin acetate 5 mg, ≥98% HPLC. Kinin B1/B2 receptor research, vascular permeability and inflammation models. RUO, UK dispatch.',
    body: {
      intro: 'Bradykinin is a nine-residue kinin peptide released from kininogens by kallikrein action. It is widely used as a reference agonist for kinin B1 and B2 receptors and in vascular-permeability, pain and inflammation research.',
      applications: [
        'B1 and B2 kinin-receptor binding and signalling assays',
        'Vascular permeability and oedema research models',
        'Pain, hyperalgesia and inflammation studies',
        'ACE-inhibitor research (bradykinin is an ACE substrate)',
      ],
      analytical: 'Supplied as the acetate salt. Identity confirmed by ESI-MS ([M+H]+ = 1060.6). Acetate counterion preferred over TFA for bioassay applications.',
      storage: 'Store lyophilised at -20 °C. Stock solutions in water or PBS are stable for several days at 4 °C; for longer storage aliquot at -80 °C.',
    },
    faqs: [
      { q: 'Why acetate rather than TFA salt?', a: 'Acetate-form Bradykinin avoids the bioassay interference and ion-channel effects sometimes attributed to TFA, making it preferred for vascular and isolated-tissue work.' },
      { q: 'Is this material suitable for in-vitro vascular studies?', a: 'Yes. The acetate salt and ≥98% HPLC purity are typical specifications for isolated-vessel and endothelial-cell research.' },
      { q: 'Stability in serum?', a: 'Bradykinin is rapidly degraded by ACE and other kininases in serum. For pharmacokinetic-style studies consider HOE-140 (icatibant) as a stable B2-selective analog.' },
    ],
  },

  // --- CANCER & APOPTOSIS --------------------------------------------------
  {
    slug: 'thymalin',
    title: 'Thymalin — 10 mg, ≥98 % HPLC',
    displayName: 'Thymalin',
    aliases: ['Thymalin polypeptide complex', 'Tималин'],
    cas: null,
    mw: null,
    package_sizes: ['1 × 10 mg vial'],
    category: 'research-peptide',
    researchArea: 'cancer-apoptosis',
    shortDescription: 'Thymalin polypeptide complex for thymic-immunology and immuno-oncology adjuvant research. ≥98% HPLC. RUO.',
    metaDescription: 'Thymalin 10 mg, ≥98% HPLC purity. Thymic polypeptide complex for immuno-oncology adjuvant research and T-cell maturation studies. RUO.',
    body: {
      intro: 'Thymalin is a low-molecular-weight polypeptide fraction extracted from calf thymus and characterised in T-cell maturation, immune-modulation and adjuvant immuno-oncology research.',
      applications: [
        'T-cell maturation and CD4/CD8 differentiation studies',
        'Immuno-oncology adjuvant research models',
        'Thymic involution and senescence research',
        'Cytokine-balance (Th1/Th2) modulation studies',
      ],
      analytical: 'Supplied as a lyophilised polypeptide complex; lot-specific HPLC fingerprint and total peptide content reported on the CoA.',
      storage: 'Store lyophilised at -20 °C protected from moisture and light. Reconstitute in sterile water immediately before use.',
    },
    faqs: [
      { q: 'Is Thymalin a single peptide?', a: 'No — it is a defined polypeptide complex. The CoA reports lot-specific HPLC profile and total peptide content rather than a single molecular mass.' },
      { q: 'Origin of the material?', a: 'Calf-thymus extract, processed and lyophilised under controlled conditions and supplied for laboratory research only.' },
      { q: 'Reference dosing in research models?', a: 'Vary widely by model; consult the extensive Khavinson-school literature on thymic-peptide research before designing studies.' },
    ],
  },
  {
    slug: 'pnc-27',
    title: 'PNC-27 — 5 mg, ≥98 % HPLC',
    displayName: 'PNC-27',
    aliases: ['PNC27', 'p53 / HDM2 membranolytic peptide', 'Penetratin-coupled p53 peptide'],
    cas: null,
    mw: '3823.6 g/mol',
    package_sizes: ['1 × 5 mg vial'],
    category: 'research-peptide',
    researchArea: 'cancer-apoptosis',
    sequence: 'PPLSQETFSDLWKLLKKWKMRRNQFWVKVQRG',
    shortDescription: 'PNC-27 fusion peptide for p53/HDM2-pathway and membranolytic-apoptosis tumour-cell research. ≥98% HPLC. RUO.',
    metaDescription: 'PNC-27 5 mg, ≥98% HPLC. Fusion peptide of p53 HDM-2 binding domain with penetratin for tumour-cell membranolytic apoptosis research. RUO.',
    body: {
      intro: 'PNC-27 is a chimeric peptide combining residues 12–26 of the p53 HDM-2 binding domain with a membrane-residency sequence derived from penetratin. It is used in cancer-cell membranolysis and selective apoptosis research.',
      applications: [
        'Selective tumour-cell membranolysis research models',
        'p53 / HDM2 (MDM2) protein–protein interaction studies',
        'Cancer-cell selectivity and apoptosis induction assays',
        'Membrane-active anticancer-peptide structure–activity research',
      ],
      analytical: 'Identity and length confirmed by ESI-MS and analytical RP-HPLC. Highly hydrophobic; reconstitution requires careful solvent selection.',
      storage: 'Store lyophilised at -20 °C protected from moisture. Reconstitute in DMSO or 5% DMSO/PBS; aliquot to avoid freeze-thaw.',
    },
    faqs: [
      { q: 'What is the proposed mechanism?', a: 'PNC-27 is reported in published research to selectively form pores in tumour-cell membranes expressing surface HDM-2, leading to membranolytic cell death distinct from classical apoptosis.' },
      { q: 'Recommended reconstitution solvent?', a: 'DMSO, then dilute into culture medium. Final DMSO ≤0.5% is typical to avoid solvent toxicity.' },
      { q: 'Storage of reconstituted peptide?', a: 'Aliquot into low-binding tubes and store at -80 °C; avoid repeated freeze-thaw cycles which degrade activity.' },
    ],
  },
  {
    slug: 'mia-602',
    title: 'MIA-602 (GHRH antagonist) — 2 mg, ≥98 % HPLC',
    displayName: 'MIA-602',
    aliases: ['GHRH antagonist MIA-602', 'Schally GHRH antagonist'],
    cas: null,
    mw: '4060.7 g/mol',
    package_sizes: ['1 × 2 mg vial'],
    category: 'research-peptide',
    researchArea: 'cancer-apoptosis',
    shortDescription: 'MIA-602, a Schally-school GHRH-receptor antagonist for anti-tumour, anti-proliferative and inflammation research. ≥98% HPLC. RUO.',
    metaDescription: 'MIA-602 GHRH antagonist 2 mg, ≥98% HPLC. Anti-tumour, anti-proliferative and anti-inflammatory research peptide (Schally analog). RUO.',
    body: {
      intro: 'MIA-602 is a synthetic GHRH-receptor antagonist developed by the Schally group, used in oncology research for its anti-proliferative and anti-tumour activity across multiple solid-tumour models, and increasingly cited in inflammation research.',
      applications: [
        'GHRH-receptor antagonist binding and competition assays',
        'Anti-proliferative and anti-tumour cell-line research',
        'Anti-inflammatory and lung-injury research models',
        'Endocrine-oncology mechanism studies',
      ],
      analytical: 'Highly modified non-natural peptide with multiple D-amino acids and N-terminal acylation; identity confirmed by ESI-MS and amino-acid analysis.',
      storage: 'Store lyophilised at -20 °C. Reconstitute in 0.1% acetic acid or DMSO depending on assay; aliquot and store at -80 °C.',
    },
    faqs: [
      { q: 'Is MIA-602 receptor-selective?', a: 'MIA-602 is selective for the pituitary-type GHRH receptor (pGHRH-R) and its splice variants reported in tumour tissue.' },
      { q: 'Origin of the sequence?', a: 'MIA-602 belongs to the Schally-laboratory series of acylated GHRH antagonists; it is widely cited in published oncology and inflammation research.' },
      { q: 'Solubility?', a: 'Limited aqueous solubility — most published protocols reconstitute in 100% DMSO and dilute into assay medium.' },
    ],
  },
  {
    slug: 'bombesin',
    title: 'Bombesin — 1 mg, ≥98 % HPLC',
    displayName: 'Bombesin',
    aliases: ['Bombesin acetate', 'GRP-related peptide', 'BBN'],
    cas: '31362-50-2',
    mw: '1619.85 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'cancer-apoptosis',
    sequence: 'pGlu-QRLGNQWAVGHLM-NH2',
    shortDescription: 'Bombesin tetradecapeptide for GRPR / NMBR receptor research and tumour-targeting / imaging studies. ≥98% HPLC. RUO.',
    metaDescription: 'Bombesin 1 mg, ≥98% HPLC. GRPR / NMBR-targeted peptide for tumour-imaging and gastrin-releasing-peptide-receptor research. RUO.',
    body: {
      intro: 'Bombesin is a 14-residue amphibian peptide that activates mammalian gastrin-releasing-peptide receptor (GRPR) and neuromedin-B receptor (NMBR). It is widely used as a tumour-targeting reference ligand because GRPR is overexpressed in several human cancers.',
      applications: [
        'GRPR / NMBR receptor binding and pharmacology',
        'Tumour-imaging targeting-vector research (radiolabelled analogs)',
        'Gastrin-release and GI-physiology research',
        'CNS-active peptide receptor research',
      ],
      analytical: 'C-terminal amide and N-terminal pyroglutamate confirmed by ESI-MS ([M+H]+ = 1620.8). Supplied as the acetate salt.',
      storage: 'Store lyophilised at -20 °C protected from light. Reconstitute in 0.1% BSA / PBS for receptor work.',
    },
    faqs: [
      { q: 'How is Bombesin related to GRP?', a: 'Bombesin is the amphibian ortholog of mammalian gastrin-releasing peptide (GRP) and shares the C-terminal heptapeptide that activates GRPR.' },
      { q: 'Counterion?', a: 'Acetate. TFA-salt material is available on request for non-bioassay applications.' },
      { q: 'Suitable for radiolabelling research?', a: 'Yes. Bombesin and its analogs are widely used as parent compounds for chelator-conjugated tumour-targeting research vectors.' },
    ],
  },
  {
    slug: 'octreotide-acetate',
    title: 'Octreotide acetate — 2 mg, ≥98 % HPLC',
    displayName: 'Octreotide acetate',
    aliases: ['Octreotide', 'SMS 201-995', 'Sandostatin reference compound'],
    cas: '83150-76-9',
    mw: '1019.24 g/mol (free base)',
    package_sizes: ['1 × 2 mg vial'],
    category: 'research-peptide',
    researchArea: 'cancer-apoptosis',
    sequence: 'D-Phe-Cys-Phe-D-Trp-Lys-Thr-Cys-Thr-ol (disulfide Cys2-Cys7)',
    shortDescription: 'Octreotide acetate, somatostatin-receptor (SSTR2/5) reference for tumour-imaging and neuroendocrine research. ≥98% HPLC. RUO.',
    metaDescription: 'Octreotide acetate 2 mg, ≥98% HPLC. Long-acting somatostatin analog reference for SSTR2/5 receptor and tumour-imaging research. RUO.',
    body: {
      intro: 'Octreotide is a synthetic cyclic octapeptide somatostatin analog with high affinity for SSTR2 and SSTR5. It is the reference compound for somatostatin-receptor-positive tumour imaging and neuroendocrine-tumour research.',
      applications: [
        'SSTR2 / SSTR5 receptor binding and competition assays',
        'Neuroendocrine tumour (NET) research models',
        'Reference compound for radiolabelled tumour-imaging analogs',
        'Growth-hormone / IGF-1 axis research',
      ],
      analytical: 'Cyclic disulfide between Cys2 and Cys7 confirmed by HPLC and ESI-MS. Two D-amino acids confer enzymatic stability.',
      storage: 'Store lyophilised at -20 °C protected from light. Stable in solution at 4 °C for several days at neutral pH.',
    },
    faqs: [
      { q: 'Receptor selectivity?', a: 'Octreotide is highly selective for SSTR2 and SSTR5, with weak affinity for SSTR3 and negligible activity at SSTR1 and SSTR4.' },
      { q: 'Why D-amino acids?', a: 'D-Phe at position 1 and D-Trp at position 4 confer resistance to enzymatic degradation, giving the molecule a much longer half-life than native somatostatin-14.' },
      { q: 'Is this suitable for radiolabelling research?', a: 'Octreotide itself lacks a chelator; for radiolabelling research use DOTA-TATE or DOTA-TOC analogs (available on request).' },
    ],
  },

  // --- IMMUNOLOGY -----------------------------------------------------------
  {
    slug: 'll-37',
    title: 'LL-37, human cathelicidin — 1 mg, ≥98 % HPLC',
    displayName: 'LL-37',
    aliases: ['Cathelicidin LL-37', 'hCAP-18 (104-140)', 'Human antimicrobial peptide LL-37'],
    cas: '154947-66-7',
    mw: '4493.33 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'immunology',
    sequence: 'LLGDFFRKSKEKIGKEFKRIVQRIKDFLRNLVPRTES',
    shortDescription: 'Human cathelicidin LL-37 antimicrobial peptide, the gold-standard innate-immunity reference. ≥98% HPLC. RUO.',
    metaDescription: 'Human LL-37 cathelicidin 1 mg, ≥98% HPLC purity, lot CoA. Innate-immunity, antimicrobial-peptide and host-defence research reference. RUO.',
    body: {
      intro: 'LL-37 is the only human cathelicidin antimicrobial peptide, derived by proteolytic cleavage of hCAP-18. It is the most widely cited reference compound in antimicrobial-peptide and innate-immunity research.',
      applications: [
        'Antimicrobial peptide (AMP) research and MIC determination',
        'Innate-immunity and host-defence studies',
        'Endotoxin (LPS) neutralisation research',
        'Wound-healing and re-epithelialisation models',
        'Inflammation, chemotaxis and biofilm-disruption assays',
      ],
      analytical: 'Identity confirmed by ESI-MS ([M+H]+ = 4494.3). Highly cationic and amphipathic; uses low-binding tubes recommended.',
      storage: 'Store lyophilised at -20 °C protected from light. Reconstitute in sterile water or 0.01% acetic acid; avoid contact with serum proteins which bind LL-37 strongly.',
    },
    faqs: [
      { q: 'Why is LL-37 considered the AMP reference?', a: 'LL-37 is the only human cathelicidin and one of the most extensively published AMPs, making it the de-facto positive control in antimicrobial-peptide research.' },
      { q: 'Should I use low-binding tubes?', a: 'Yes — LL-37 is highly cationic and adsorbs strongly to standard polypropylene. Low-protein-binding tubes are strongly recommended for reproducible activity.' },
      { q: 'Is the C-terminus amidated?', a: 'No, LL-37 has a free C-terminal carboxylate, matching the natural cleavage product of hCAP-18.' },
    ],
  },
  {
    slug: 'thymosin-alpha-1',
    title: 'Thymosin α1 (Tα1) — 5 mg, ≥98 % HPLC',
    displayName: 'Thymosin α1',
    aliases: ['Tα1', 'Thymosin alpha-1', 'Thymalfasin reference', 'Zadaxin reference'],
    cas: '62304-98-7',
    mw: '3108.27 g/mol',
    package_sizes: ['1 × 5 mg vial'],
    category: 'research-peptide',
    researchArea: 'immunology',
    sequence: 'Ac-SDAAVDTSSEITTKDLKEKKEVVEEAEN',
    shortDescription: 'Thymosin α1 (28-residue, N-acetylated) for T-cell maturation, dendritic-cell and antiviral immunology research. ≥98% HPLC. RUO.',
    metaDescription: 'Thymosin α1 (Tα1) 5 mg, ≥98% HPLC. N-acetylated 28-residue immunomodulatory peptide for T-cell, dendritic-cell and antiviral research. RUO.',
    body: {
      intro: 'Thymosin α1 is a 28-residue N-acetylated thymic peptide derived from prothymosin α. It modulates T-cell maturation, dendritic-cell function and TLR9 signalling, and is widely cited in antiviral and immuno-oncology research.',
      applications: [
        'T-cell maturation and CD4/CD8 differentiation research',
        'Dendritic-cell activation and TLR9-pathway studies',
        'Antiviral immunology research models (HBV, HCV)',
        'Immuno-oncology adjuvant mechanism studies',
      ],
      analytical: 'N-terminal acetylation and identity confirmed by ESI-MS. Single peak by analytical RP-HPLC.',
      storage: 'Store lyophilised at -20 °C. Stable in aqueous solution at 4 °C for short periods; aliquot and freeze at -80 °C for longer storage.',
    },
    faqs: [
      { q: 'Is the N-terminus acetylated?', a: 'Yes — N-terminal acetylation is a defining feature of native Thymosin α1 and is required for biological activity in published research models.' },
      { q: 'How is Tα1 different from Thymalin?', a: 'Tα1 is a single defined 28-residue peptide; Thymalin is a polypeptide complex from thymic extract.' },
      { q: 'Recommended reconstitution?', a: 'Sterile PBS or 0.9% saline at 0.1–1 mg/mL; the peptide is highly soluble in aqueous buffer.' },
    ],
  },
  {
    slug: 'thymulin',
    title: 'Thymulin (Zn-FTS) — 1 mg, ≥98 % HPLC',
    displayName: 'Thymulin',
    aliases: ['Zn-FTS', 'Facteur Thymique Sérique', 'Serum thymic factor'],
    cas: '63958-90-7',
    mw: '857.93 g/mol (peptide, ex Zn²⁺)',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'immunology',
    sequence: 'pGlu-AKSQGGSN',
    shortDescription: 'Thymulin (zinc-bound FTS nonapeptide) for thymic-immunology, T-cell and immunosenescence research. ≥98% HPLC. RUO.',
    metaDescription: 'Thymulin (Zn-FTS) 1 mg, ≥98% HPLC. Zinc-dependent thymic nonapeptide for T-cell maturation and immunosenescence research. RUO.',
    body: {
      intro: 'Thymulin is a nine-residue thymic peptide whose biological activity depends on stoichiometric Zn²⁺ binding. It is used in T-cell maturation, immunosenescence and neuroendocrine-immune research.',
      applications: [
        'T-cell receptor and CD differentiation research',
        'Immunosenescence and thymic-involution studies',
        'Neuroendocrine-immune crossover research models',
        'Zinc-dependent peptide biology research',
      ],
      analytical: 'Supplied as the apo-peptide (zinc-free); add equimolar ZnSO4 in assay buffer to generate the active Zn-bound form. Identity confirmed by ESI-MS.',
      storage: 'Store lyophilised at -20 °C protected from moisture. Reconstitute fresh and add Zn²⁺ immediately before use.',
    },
    faqs: [
      { q: 'Is Zn²⁺ included in the vial?', a: 'No — Thymulin is supplied as the apo-peptide. Add equimolar Zn²⁺ (typically as ZnSO4 or ZnCl2) in your assay buffer to reconstitute the biologically active Zn-FTS complex.' },
      { q: 'Why does activity require zinc?', a: 'Zn²⁺ binding induces the bioactive conformation; the apo-peptide is essentially inactive in published T-cell maturation assays.' },
      { q: 'Origin of the sequence?', a: 'Thymulin is identical across mammalian species; it was originally isolated as serum thymic factor (FTS) from porcine serum.' },
    ],
  },
  {
    slug: 'alpha-defensin-1',
    title: 'α-Defensin 1 (HNP-1) — 0.5 mg, ≥95 % HPLC',
    displayName: 'α-Defensin 1 (HNP-1)',
    aliases: ['HNP-1', 'Human Neutrophil Peptide 1', 'α-Defensin-1'],
    cas: '99287-08-2',
    mw: '3442.05 g/mol',
    package_sizes: ['1 × 0.5 mg vial'],
    category: 'research-peptide',
    researchArea: 'immunology',
    sequence: 'ACYCRIPACIAGERRYGTCIYQGRLWAFCC (three disulfide bridges)',
    shortDescription: 'Human Neutrophil Peptide 1 (HNP-1, α-defensin 1) for innate-immunity and antimicrobial-peptide research. ≥95% HPLC. RUO.',
    metaDescription: 'α-Defensin 1 (HNP-1) 0.5 mg, ≥95% HPLC. Human neutrophil α-defensin for innate-immunity and antimicrobial research. RUO, UK dispatch.',
    body: {
      intro: 'HNP-1 is a 30-residue cysteine-rich α-defensin stored in the azurophilic granules of human neutrophils. It is a reference antimicrobial peptide for innate-immunity and host-defence research.',
      applications: [
        'Antimicrobial peptide (AMP) research and Gram±/fungal MIC studies',
        'Neutrophil-derived innate-immunity research',
        'Chemotaxis and inflammation modulation studies',
        'Antiviral defence mechanism research',
      ],
      analytical: 'Three intramolecular disulfide bridges (Cys2-Cys30, Cys4-Cys19, Cys9-Cys29) verified by reductive HPLC. Folding is essential for activity.',
      storage: 'Store lyophilised at -20 °C protected from light and moisture. Reconstitute in 0.01% acetic acid; avoid serum proteins which neutralise activity.',
    },
    faqs: [
      { q: 'Why ≥95% rather than ≥98%?', a: 'Cysteine-rich folded peptides like HNP-1 are challenging to purify above 95% by RP-HPLC without compromising the disulfide-bridged active fold; ≥95% is the standard research-grade specification.' },
      { q: 'Are the disulfides correctly paired?', a: 'Yes. The CoA reports reductive-HPLC verification confirming the three native disulfide bridges.' },
      { q: 'How does HNP-1 differ from LL-37?', a: 'HNP-1 is a β-sheet defensin from neutrophils with disulfide stabilisation; LL-37 is an α-helical cathelicidin from epithelial cells and neutrophils. They are complementary AMP references.' },
    ],
  },
  {
    slug: 'tuftsin',
    title: 'Tuftsin — 5 mg, ≥98 % HPLC',
    displayName: 'Tuftsin',
    aliases: ['IgG (289-292)', 'TKPR'],
    cas: '9063-57-4',
    mw: '500.6 g/mol',
    package_sizes: ['1 × 5 mg vial'],
    category: 'research-peptide',
    researchArea: 'immunology',
    sequence: 'TKPR',
    shortDescription: 'Tuftsin tetrapeptide for macrophage-activation, phagocytosis and innate-immunity research. ≥98% HPLC. RUO.',
    metaDescription: 'Tuftsin 5 mg, ≥98% HPLC. IgG-derived tetrapeptide (TKPR) for macrophage-activation and phagocytosis research. RUO, UK dispatch.',
    body: {
      intro: 'Tuftsin is a tetrapeptide (Thr-Lys-Pro-Arg) derived from the CH2 domain of IgG heavy chain. It activates macrophages, monocytes and granulocytes and is a classical reference for phagocytosis and innate-immunity research.',
      applications: [
        'Macrophage and monocyte activation research models',
        'Phagocytosis and respiratory-burst assays',
        'Innate-immunity and host-defence research',
        'Vaccine-adjuvant peptide research',
      ],
      analytical: 'Identity confirmed by ESI-MS ([M+H]+ = 501.3). Highly water-soluble.',
      storage: 'Store lyophilised at -20 °C. Aqueous stock solutions are stable for several days at 4 °C.',
    },
    faqs: [
      { q: 'How is Tuftsin produced?', a: 'Tuftsin is generated in vivo by cleavage of IgG heavy-chain residues 289–292; this material is supplied as the synthetic tetrapeptide.' },
      { q: 'Receptor target?', a: 'Tuftsin acts via the neuropilin-1 receptor on macrophages and granulocytes in published research.' },
      { q: 'Solubility?', a: 'Highly soluble in water and aqueous buffers; up to 10 mg/mL is routinely achievable.' },
    ],
  },

  // --- CELL SIGNALING ------------------------------------------------------
  {
    slug: 'pki-6-22-amide',
    title: 'PKI (6-22) amide — 1 mg, ≥98 % HPLC',
    displayName: 'PKI (6-22) amide',
    aliases: ['PKA inhibitor peptide', 'Protein Kinase Inhibitor (6-22)', 'PKI(6-22)-NH2'],
    cas: '121932-06-7',
    mw: '2222.6 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'cell-signaling',
    sequence: 'TYADFIASGRTGRRNAI-NH2',
    shortDescription: 'PKI (6-22) amide, the most widely cited specific PKA inhibitor peptide for kinase-pathway research. ≥98% HPLC. RUO.',
    metaDescription: 'PKI (6-22) amide 1 mg, ≥98% HPLC. Specific PKA inhibitor peptide for kinase-pathway research and cAMP-pathway studies. RUO.',
    body: {
      intro: 'PKI (6-22) amide is the active fragment of the heat-stable protein-kinase inhibitor (PKI), a highly specific competitive inhibitor of cAMP-dependent protein kinase (PKA) catalytic subunit. It is the standard reference inhibitor in kinase-pathway research.',
      applications: [
        'PKA inhibition in in-vitro kinase assays (Ki ≈ 1–3 nM)',
        'cAMP / PKA signalling pathway dissection',
        'Permeabilised-cell PKA inhibition research',
        'Reference control for PKA-selective small-molecule screens',
      ],
      analytical: 'C-terminal amidation and identity confirmed by ESI-MS. Highly soluble in aqueous buffers.',
      storage: 'Store lyophilised at -20 °C. Aqueous stock solutions are stable at -80 °C; avoid repeated freeze-thaw.',
    },
    faqs: [
      { q: 'How specific is PKI (6-22) for PKA?', a: 'PKI (6-22) amide is one of the most selective protein-kinase inhibitors known, with sub-nanomolar Ki for PKA catalytic subunit and negligible activity on other AGC-family kinases at typical assay concentrations.' },
      { q: 'Is this material cell-permeable?', a: 'No. For cell-based research use the myristoylated PKI (14-22) amide variant (also catalogued).' },
      { q: 'Recommended assay concentration?', a: 'In-vitro PKA inhibition typically uses 0.1–10 µM; permeabilised-cell research uses 1–10 µM.' },
    ],
  },
  {
    slug: 'myristoylated-pki-14-22',
    title: 'Myristoylated PKI (14-22) amide — 1 mg, ≥98 % HPLC',
    displayName: 'Myr-PKI (14-22) amide',
    aliases: ['Myr-PKI(14-22)', 'Cell-permeable PKA inhibitor', 'N-Myristoylated PKI fragment'],
    cas: '221019-15-2',
    mw: '1297.6 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'cell-signaling',
    sequence: 'Myr-GRTGRRNAI-NH2',
    shortDescription: 'Cell-permeable myristoylated PKI (14-22) amide for intact-cell PKA inhibition in kinase-pathway research. ≥98% HPLC. RUO.',
    metaDescription: 'Myristoylated PKI (14-22) amide 1 mg, ≥98% HPLC. Cell-permeable PKA inhibitor peptide for intact-cell kinase research. RUO.',
    body: {
      intro: 'Myristoylated PKI (14-22) amide is the cell-permeable variant of the protein-kinase inhibitor pseudosubstrate, with the N-terminal myristate enabling diffusion across cell membranes for intact-cell PKA inhibition research.',
      applications: [
        'Intact-cell PKA inhibition (typical use 1–25 µM)',
        'cAMP / PKA pathway research in primary cells and tissue slices',
        'Reference inhibitor in cardiac, neuronal and endocrine signalling research',
        'Pseudosubstrate-based kinase research',
      ],
      analytical: 'N-terminal myristoylation and C-terminal amidation confirmed by ESI-MS. Limited aqueous solubility — DMSO stocks recommended.',
      storage: 'Store lyophilised at -20 °C. DMSO stocks at -80 °C; final assay DMSO ≤0.5%.',
    },
    faqs: [
      { q: 'Why myristoylate the peptide?', a: 'The N-terminal C14 fatty acid enables passive diffusion across cell membranes, making this variant suitable for intact-cell PKA inhibition research where the unmodified peptide is excluded.' },
      { q: 'Recommended reconstitution?', a: 'DMSO at 1–10 mM, then dilute into culture medium to final concentration with DMSO ≤0.5%.' },
      { q: 'Is it as selective as PKI (6-22)?', a: 'Selectivity is preserved; the truncation to residues 14–22 retains the PKA pseudosubstrate motif.' },
    ],
  },
  {
    slug: 'aip-camkii-inhibitor',
    title: 'Autocamtide-2-related Inhibitory Peptide (AIP) — 1 mg, ≥98 % HPLC',
    displayName: 'AIP (CaMKII inhibitor)',
    aliases: ['AIP', 'Autocamtide-2 inhibitory peptide', 'CaMKII inhibitor peptide'],
    cas: '167114-91-2',
    mw: '1771.0 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'cell-signaling',
    sequence: 'KKALRRQEAVDAL',
    shortDescription: 'AIP — the most selective Ca²⁺/calmodulin-dependent protein kinase II inhibitor peptide. ≥98% HPLC. RUO.',
    metaDescription: 'AIP CaMKII inhibitor peptide 1 mg, ≥98% HPLC. Highly selective CaMKII inhibitor for kinase-pathway and synaptic-plasticity research. RUO.',
    body: {
      intro: 'AIP (Autocamtide-2-related Inhibitory Peptide) is a highly selective Ca²⁺/calmodulin-dependent protein kinase II (CaMKII) inhibitor derived from the autoregulatory domain of the kinase. It is the reference CaMKII inhibitor in cell-signalling research.',
      applications: [
        'In-vitro CaMKII inhibition (IC50 ≈ 40 nM)',
        'Synaptic plasticity and LTP/LTD research',
        'Cardiac CaMKII research models',
        'Reference inhibitor for CaMKII-selective small-molecule screens',
      ],
      analytical: 'Identity confirmed by ESI-MS. Highly water-soluble; cationic — use low-binding tubes.',
      storage: 'Store lyophilised at -20 °C. Aqueous stocks at -80 °C; avoid freeze-thaw.',
    },
    faqs: [
      { q: 'How selective is AIP for CaMKII?', a: 'AIP shows >100-fold selectivity for CaMKII over PKA, PKC and CaMKIV in standard kinase panel assays.' },
      { q: 'Is this material cell-permeable?', a: 'No — for intact-cell research use the myristoylated AIP variant (available on request).' },
      { q: 'Recommended assay concentration?', a: 'In-vitro: 0.1–10 µM. Permeabilised cells: 1–10 µM.' },
    ],
  },
  {
    slug: 'substance-p',
    title: 'Substance P — 5 mg, ≥98 % HPLC',
    displayName: 'Substance P',
    aliases: ['SP', 'Tachykinin SP', 'Neurokinin-1 receptor agonist'],
    cas: '33507-63-0',
    mw: '1347.63 g/mol',
    package_sizes: ['1 × 5 mg vial'],
    category: 'research-peptide',
    researchArea: 'cell-signaling',
    sequence: 'RPKPQQFFGLM-NH2',
    shortDescription: 'Substance P undecapeptide — reference NK1 (tachykinin) receptor agonist for pain and neurogenic-inflammation research. ≥98% HPLC. RUO.',
    metaDescription: 'Substance P 5 mg, ≥98% HPLC. NK1 tachykinin receptor agonist for pain, neurogenic inflammation and GPCR signalling research. RUO.',
    body: {
      intro: 'Substance P is an 11-residue tachykinin neuropeptide that activates the neurokinin-1 (NK1) receptor. It is one of the most extensively cited GPCR agonists in pain, neurogenic-inflammation and CNS research.',
      applications: [
        'NK1 receptor binding and activation studies',
        'Pain and nociception research models',
        'Neurogenic inflammation and mast-cell research',
        'Tachykinin-pathway antagonist screening',
      ],
      analytical: 'C-terminal amidation confirmed by ESI-MS ([M+H]+ = 1348.7). Supplied as the acetate salt.',
      storage: 'Store lyophilised at -20 °C protected from light. Aqueous stocks stable at -80 °C; aliquot to avoid freeze-thaw.',
    },
    faqs: [
      { q: 'Receptor selectivity?', a: 'Substance P is preferred ligand for NK1 (>NK2 >NK3). For NK2-selective research use neurokinin A; for NK3-selective use neurokinin B.' },
      { q: 'Counterion?', a: 'Acetate. TFA-form is available on request for non-bioassay applications.' },
      { q: 'Suitable for in-vivo research?', a: 'This material is supplied for in-vitro research only. RUO.' },
    ],
  },
  {
    slug: 'gastrin-i-human',
    title: 'Gastrin I, human — 1 mg, ≥98 % HPLC',
    displayName: 'Gastrin I (human)',
    aliases: ['Big gastrin', 'h-Gastrin I', 'Little gastrin'],
    cas: '10047-33-3',
    mw: '2098.21 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'research-peptide',
    researchArea: 'cell-signaling',
    sequence: 'pGlu-GPWLEEEEEAYGWMDF-NH2',
    shortDescription: 'Human Gastrin I 17-residue peptide for CCK / gastrin GPCR signalling and gastric-physiology research. ≥98% HPLC. RUO.',
    metaDescription: 'Human Gastrin I 1 mg, ≥98% HPLC. CCK2/gastrin receptor agonist for gastric-acid secretion and GPCR signalling research. RUO.',
    body: {
      intro: 'Gastrin I (little gastrin) is a 17-residue peptide hormone secreted by gastric G-cells that activates the CCK2/gastrin receptor. It is the reference agonist for gastric-acid-secretion and CCK2-receptor research.',
      applications: [
        'CCK2 / gastrin receptor binding and activation studies',
        'Gastric parietal-cell and acid-secretion research',
        'Enterochromaffin-like (ECL) cell research',
        'GI-physiology GPCR pharmacology',
      ],
      analytical: 'N-terminal pyroglutamate, C-terminal amidation and the central pentaglutamyl tract confirmed by ESI-MS ([M+H]+ = 2099.0).',
      storage: 'Store lyophilised at -20 °C protected from moisture. Aqueous stocks at neutral pH stable at -80 °C.',
    },
    faqs: [
      { q: 'Is the tyrosine sulfated?', a: 'No — this is the non-sulfated form. Sulfated Gastrin I (Gastrin II) is available on request.' },
      { q: 'How does this differ from CCK-8?', a: 'Gastrin I and CCK-8 share the C-terminal tetrapeptide that activates CCK2; CCK-8 sulfated form additionally activates CCK1.' },
      { q: 'Solubility?', a: 'Highly soluble in mildly alkaline buffers (pH 7.5–8.5); the pentaglutamyl tract limits solubility at low pH.' },
    ],
  },

  // --- PROTEIN ANALYSIS & STANDARDS ----------------------------------------
  {
    slug: 'bsa-tryptic-digest-standard',
    title: 'BSA Tryptic Digest LC-MS Standard — 100 µg',
    displayName: 'BSA Tryptic Digest Standard',
    aliases: ['BSA digest', 'Tryptic BSA', 'LC-MS QC standard'],
    cas: null,
    mw: null,
    package_sizes: ['1 × 100 µg lyophilised'],
    category: 'mass-spec-standard',
    researchArea: 'protein-analysis',
    shortDescription: 'Bovine Serum Albumin tryptic digest standard for daily LC-MS/MS QC, system-suitability and proteomics-pipeline validation. RUO.',
    metaDescription: 'BSA tryptic digest LC-MS standard 100 µg. Daily QC and system-suitability reference for proteomics LC-MS/MS workflows. RUO.',
    body: {
      intro: 'A controlled tryptic digest of bovine serum albumin, supplied as a lyophilised reference for daily LC-MS/MS system-suitability testing, proteomics-pipeline QC and bottom-up workflow benchmarking.',
      applications: [
        'Daily LC-MS/MS system-suitability testing (SST)',
        'Proteomics-pipeline QC and database-search validation',
        'Bottom-up proteomics method development',
        'Inter-laboratory comparison and round-robin reference',
      ],
      analytical: 'Trypsin digestion to ≥95% completion verified by RP-LC-MS; lot-specific peptide map and identified-peptide list reported on the CoA.',
      storage: 'Store lyophilised at -20 °C protected from moisture. Reconstitute in 0.1% formic acid to a stock concentration of 1 pmol/µL; use within 1 month at -80 °C.',
    },
    faqs: [
      { q: 'How many peptides are typically detected?', a: 'A well-tuned Orbitrap or Q-TOF will detect 50–80+ tryptic peptides corresponding to ≥40% sequence coverage of BSA in a 30-minute gradient.' },
      { q: 'What is the recommended injection amount?', a: '50–500 fmol on column for nano-LC; 1–10 pmol for analytical-flow LC-MS.' },
      { q: 'Does the CoA report a peptide list?', a: 'Yes — the CoA includes the lot-specific list of identified tryptic peptides and a representative TIC chromatogram.' },
    ],
  },
  {
    slug: 'angiotensin-i-ms-standard',
    title: 'Angiotensin I — MS Calibration Standard, 1 mg, ≥99 %',
    displayName: 'Angiotensin I',
    aliases: ['Ang I', '5-Isoleucine angiotensin I', 'Mass-spec calibrant'],
    cas: '484-42-4',
    mw: '1296.48 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'mass-spec-standard',
    researchArea: 'protein-analysis',
    sequence: 'DRVYIHPFHL',
    shortDescription: 'Angiotensin I, ≥99% HPLC, supplied as a mass-spectrometry calibration standard ([M+H]+ = 1297.5). RUO.',
    metaDescription: 'Angiotensin I MS calibration standard 1 mg, ≥99% HPLC. Universal mass-accuracy reference ([M+H]+ = 1297.5). RUO.',
    body: {
      intro: 'Angiotensin I is one of the most widely used peptide mass-calibration standards in LC-MS, MALDI-TOF and ESI-Q-TOF workflows, with a singly-charged [M+H]+ at 1297.5 Da.',
      applications: [
        'ESI / MALDI mass calibration and mass-accuracy verification',
        'LC-MS/MS system-suitability testing',
        'CID / HCD fragmentation reference standard',
        'Proteomics quantitation reference (heavy-label SIL variant available)',
      ],
      analytical: '≥99% HPLC, identity confirmed by ESI-MS. Supplied as the trifluoroacetate salt (acetate available).',
      storage: 'Store lyophilised at -20 °C. Reconstitute in 50% acetonitrile / 0.1% formic acid; aliquot stocks at -80 °C.',
    },
    faqs: [
      { q: 'Which charge state is used for calibration?', a: 'For low-mass calibration, [M+H]+ = 1296.6853 Da (monoisotopic). For Q-TOF, the doubly-charged [M+2H]2+ = 648.8463 is also commonly used.' },
      { q: 'Is a heavy-label variant available?', a: 'Yes — Angiotensin I with ¹³C/¹⁵N-labelled residues (typically Phe⁴ or Leu¹⁰) is available on request for SIL-based quantitation.' },
      { q: 'Counterion?', a: 'Standard supply is TFA. Acetate-form available for ion-suppression-sensitive workflows.' },
    ],
  },
  {
    slug: 'glu-fibrinopeptide-b',
    title: '[Glu1]-Fibrinopeptide B — MS Lock-Mass Standard, 1 mg, ≥99 %',
    displayName: '[Glu1]-Fibrinopeptide B',
    aliases: ['Glu-Fib', 'Glu1-Fib', 'GFP', 'GluFib lock-mass standard'],
    cas: '103213-49-6',
    mw: '1570.57 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'mass-spec-standard',
    researchArea: 'protein-analysis',
    sequence: 'EGVNDNEEGFFSAR',
    shortDescription: '[Glu1]-Fibrinopeptide B (Glu-Fib), the universal LC-MS lock-mass and collision-energy tuning reference. ≥99% HPLC. RUO.',
    metaDescription: '[Glu1]-Fibrinopeptide B (Glu-Fib) 1 mg, ≥99% HPLC. Universal lock-mass and CID-tuning reference for Waters/Thermo LC-MS systems. RUO.',
    body: {
      intro: '[Glu1]-Fibrinopeptide B (Glu-Fib) is the most widely cited LC-MS lock-mass and collision-energy tuning peptide. It is the de-facto QC reference for Waters Synapt, Xevo and Thermo Orbitrap workflows.',
      applications: [
        'LC-MS lock-mass reference (Waters LockSpray)',
        'Collision-energy / CID tuning reference compound',
        'Peptide-fragmentation library benchmarking',
        'Daily LC-MS/MS QC and system-suitability',
      ],
      analytical: '≥99% HPLC, [M+2H]2+ = 785.84. Identity confirmed by ESI-MS and tandem-MS fragmentation pattern.',
      storage: 'Store lyophilised at -20 °C. Reconstitute in 50% acetonitrile / 0.1% formic acid at 100 fmol/µL for routine LockSpray use.',
    },
    faqs: [
      { q: 'What is the recommended LockSpray concentration?', a: '100–500 fmol/µL infused at 5–10 µL/min is typical for Waters LockSpray-equipped instruments.' },
      { q: 'Why is Glu-Fib the standard CID tuning peptide?', a: 'Its 14-residue length, mid-mass [M+2H]2+ at 785.8 and well-characterised fragmentation pattern make it ideal for collision-energy optimisation across instrument platforms.' },
      { q: 'Heavy-label variant available?', a: 'Yes — ¹³C/¹⁵N-labelled Glu-Fib for SIL quantitation is available on request.' },
    ],
  },
  {
    slug: 'acth-fragments-maldi-set',
    title: 'ACTH Fragment Set (1-17 + 18-39) — MALDI-TOF Standards, 0.5 mg each',
    displayName: 'ACTH (1-17) + (18-39) MALDI calibration set',
    aliases: ['ACTH fragments', 'MALDI-TOF calibration', 'Adrenocorticotropic hormone fragments'],
    cas: null,
    mw: '2093.4 g/mol (1-17) + 2465.2 g/mol (18-39)',
    package_sizes: ['2 × 0.5 mg vials (one of each fragment)'],
    category: 'mass-spec-standard',
    researchArea: 'protein-analysis',
    shortDescription: 'ACTH (1-17) and (18-39) fragment pair for MALDI-TOF mass calibration in the 2000–2500 Da range. ≥98% HPLC each. RUO.',
    metaDescription: 'ACTH fragment MALDI-TOF calibration set: ACTH (1-17) and (18-39), 0.5 mg each, ≥98% HPLC. Mid-mass MALDI calibration reference. RUO.',
    body: {
      intro: 'A two-vial set of ACTH fragments (residues 1-17 and 18-39) supplied as MALDI-TOF mass calibration standards in the 2000–2500 Da range. These are the most widely cited mid-mass MALDI calibrants in published proteomics workflows.',
      applications: [
        'MALDI-TOF mass calibration in the 2000–2500 Da range',
        'Reflectron-mode mass-accuracy verification',
        'Daily MALDI system-suitability QC',
        'Component of larger MALDI calibration mixtures (with insulin, ubiquitin etc.)',
      ],
      analytical: 'Each fragment supplied at ≥98% HPLC. [M+H]+ values: ACTH (1-17) = 2094.4, ACTH (18-39) = 2466.2. Identity confirmed by MALDI-TOF.',
      storage: 'Store lyophilised at -20 °C. Reconstitute in 50% acetonitrile / 0.1% TFA at 1 pmol/µL for MALDI spotting.',
    },
    faqs: [
      { q: 'Why a two-fragment set?', a: 'The combination of ACTH (1-17) and (18-39) provides two well-separated calibration points in the mid-mass MALDI range, improving polynomial mass-calibration accuracy across 2000–2500 Da.' },
      { q: 'Are these compatible with standard MALDI calibration mixtures?', a: 'Yes — they are routinely combined with bradykinin (1-7), Angiotensin I, insulin oxidised B-chain and bovine ubiquitin for full-range MALDI calibration.' },
      { q: 'Recommended matrix?', a: 'α-CHCA in 50% acetonitrile / 0.1% TFA is standard for both fragments.' },
    ],
  },
  {
    slug: 'bradykinin-1-7-ms-standard',
    title: 'Bradykinin (1-7) — MS Calibration Standard, 1 mg, ≥99 %',
    displayName: 'Bradykinin (1-7)',
    aliases: ['BK (1-7)', 'Bradykinin 1-7', 'Mass-spec low-mass calibrant'],
    cas: '23815-89-6',
    mw: '757.85 g/mol',
    package_sizes: ['1 × 1 mg vial'],
    category: 'mass-spec-standard',
    researchArea: 'protein-analysis',
    sequence: 'RPPGFSP',
    shortDescription: 'Bradykinin (1-7), ≥99% HPLC, low-mass MS calibration reference ([M+H]+ = 758.4). RUO.',
    metaDescription: 'Bradykinin (1-7) MS standard 1 mg, ≥99% HPLC. Low-mass calibration reference ([M+H]+ = 758.4) for MALDI/ESI workflows. RUO.',
    body: {
      intro: 'Bradykinin (1-7) is a heptapeptide widely used as a low-mass calibration standard in MALDI-TOF and ESI-MS workflows, complementing Angiotensin I and Glu-Fib at the low-mass end of the calibration range.',
      applications: [
        'MALDI-TOF and ESI-MS low-mass calibration ([M+H]+ = 758.4)',
        'CID fragmentation reference for low-mass peptides',
        'Component of universal MALDI calibration mixtures',
        'LC-MS/MS system-suitability and method-development reference',
      ],
      analytical: '≥99% HPLC, identity confirmed by ESI-MS. Monoisotopic [M+H]+ = 757.3992 Da.',
      storage: 'Store lyophilised at -20 °C. Reconstitute in 50% acetonitrile / 0.1% formic acid at 100 fmol/µL.',
    },
    faqs: [
      { q: 'How does this differ from full-length Bradykinin?', a: 'Bradykinin (1-7) is the N-terminal heptapeptide cleavage product, used purely as an MS calibration standard rather than a kinin-receptor ligand.' },
      { q: 'Heavy-label available?', a: 'Yes — ¹³C/¹⁵N-labelled Bradykinin (1-7) is available on request for SIL-based quantitation research.' },
      { q: 'Counterion?', a: 'Standard supply is TFA. Acetate available on request.' },
    ],
  },
];

// ============================================================================

let written = 0, skipped = 0;
for (const p of products) {
  const path = join(OUT, `${p.slug}.md`);
  if (existsSync(path)) { skipped++; continue; }
  writeFileSync(path, build(p), 'utf8');
  written++;
}
console.log(`Wrote ${written} new product files; skipped ${skipped} existing.`);
