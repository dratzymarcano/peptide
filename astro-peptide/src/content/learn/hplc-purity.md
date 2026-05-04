---
title: "What ≥99% HPLC Purity Actually Means"
description: "The chemistry behind a peptide purity number, what 99% does and does not guarantee, and when to ask for additional orthogonal data."
publishDate: "2026-05-03"
category: "Quality"
readTime: "7 min"
order: 30
primaryKeyword: "hplc purity peptides"
tags: ["hplc", "purity", "qc"]
meta:
  title: "What ≥99% HPLC Purity Means | Peptide Shop Learn"
  description: "How RP-HPLC peptide purity is measured, what it tells you about impurity profile, and when a single purity number is insufficient."
---

"≥99% HPLC purity" appears on most research-peptide product pages, but the number is more nuanced than it looks. This article explains how the value is generated, what it does and does not guarantee, and when to request orthogonal evidence.

## How the number is produced

A purity assay on a synthetic peptide is almost always reverse-phase high-performance liquid chromatography (RP-HPLC) on a C18 column. The crude or final peptide is loaded, separated by a water–acetonitrile gradient containing 0.1% trifluoroacetic acid (TFA), and detected by UV at **220 nm** — the absorption maximum of the peptide backbone amide bond.

The chromatogram is integrated. The reported purity is:

```
purity (%) = area of main peak / total integrated area  × 100
```

A 99% purity therefore means the main peak accounts for 99% of all UV-absorbing material that elutes within the gradient window.

## What 99% guarantees

It guarantees that, **under those analytical conditions**, no other UV-absorbing species accounts for more than 1% of the trace. For most research peptides, this is sufficient.

## What 99% does not guarantee

1. **Which impurities make up the remaining 1%.** Deletion sequences (one residue missing), epimers (D-residue at a chiral centre), oxidation products (+16 Da), or scrambled disulfides may all coelute or elute close to the main peak.
2. **Salt and solvent burden.** Counter-ion (TFA, acetate) and residual water are not in the chromatogram. They are reported separately on the COA.
3. **Endotoxin or microbial load.** RP-HPLC does not measure these; for cell and animal studies, request a LAL endotoxin assay.
4. **Aggregation state.** The chromatographic conditions denature most secondary structure; aggregates that re-form on reconstitution will not appear.
5. **Orthogonal purity.** A single C18 method may underestimate true purity by 0.5–2% if a co-eluting impurity exists.

## Detection wavelength matters

Purity quoted at 220 nm captures all peptide-bond-containing species. Purity quoted at **280 nm** (Trp/Tyr) only captures aromatics; for a peptide without an aromatic residue, a 280 nm trace is uninformative. Always check which wavelength a quoted purity refers to.

## When to request orthogonal data

For most binding studies, in-vitro receptor assays and structural work, a single ≥98–99% RP-HPLC value is fine. Ask for additional evidence when:

- The peptide will be used in a long-term in-vivo research model where impurity accumulation matters.
- The assay is exquisitely sensitive (e.g. ion-channel electrophysiology) and trace contaminants could give false positives.
- The peptide contains epimerisation-prone residues (Cys, Ser, Thr after Pro) and stereochemistry must be confirmed.
- Two synthesis lots give inconsistent functional results.

In those cases, request:

- **A second orthogonal HPLC method** (different column chemistry, different additive — for example, ion-pairing RP with formic acid instead of TFA).
- **High-resolution MS** with isotope-pattern analysis, not just unit-mass ESI.
- **Capillary electrophoresis** for charge isoforms.
- **Chiral amino-acid analysis** if stereochemistry is in question.

## What Peptide Shop ships

Every research peptide carries a lot-specific COA with at minimum:

- RP-HPLC purity at 220 nm (chromatogram available on request).
- ESI-MS confirmation of identity.
- Counter-ion identity and percentage.
- Karl Fischer water content.
- Net peptide content.

For the vast majority of research applications, that combination provides sufficient confidence to begin work. For specialised assays, contact technical support with the lot number and the additional data you need.

## Cross-references

- [How to read a peptide COA](/learn/coa-explained/)
- [Peptide research glossary](/learn/glossary/) — entries on *area-percent*, *counter-ion*, *epimer*
