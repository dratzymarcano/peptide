---
title: "How to Read a Peptide COA"
description: "What every field on a peptide certificate of analysis means, and how to verify identity, purity and net peptide mass before you use a vial."
publishDate: "2026-05-03"
category: "Quality"
readTime: "8 min"
order: 20
primaryKeyword: "how to read coa hplc"
tags: ["coa", "qc", "hplc", "mass-spec"]
meta:
  title: "How to Read a Peptide COA | Peptide Shop Learn"
  description: "Field-by-field guide to reading a peptide certificate of analysis: identity, RP-HPLC purity, mass-spec confirmation, water content and counter-ion."
---

A peptide certificate of analysis (COA) is a lot-specific quality record. It is the single document that tells you whether the vial in front of you matches the specification on the product page. This guide walks through every field you will see on a Peptide Shop COA and explains what it means in practice.

## What a COA must contain

A complete COA includes:

1. **Product identity** — name, alternate name(s), and CAS number where one exists.
2. **Lot number and manufacture date.** Trace any downstream result back to a specific batch.
3. **Sequence.** Written N-to-C in one-letter or three-letter code.
4. **Theoretical and observed mass.** Both monoisotopic (high-res) and average mass are usually reported.
5. **Purity by RP-HPLC.** Expressed as area-percent at 220 nm.
6. **Counter-ion identity and percentage.** Almost always TFA or acetate.
7. **Water content.** Karl Fischer titration result.
8. **Net peptide content.** The actual peptide mass in the vial after subtracting water and counter-ion.
9. **Storage conditions and recommended re-test interval.**

If any of those fields is missing, treat the document as incomplete.

## Identity verification

The first checkpoint is identity:

- The **mass-spec observed mass** must match the theoretical monoisotopic mass within instrument tolerance (typically ±0.5 Da for low-resolution ESI, ±5 ppm for high-res).
- The **HPLC retention time** alone is not identity — it is a comparator. Identity comes from the mass-spec trace.

If the observed mass differs by exactly +16, suspect oxidation (Met, Trp, Cys); +18 suggests hydrolysis; −18 a dehydration or cyclisation event.

## Purity by RP-HPLC

Reverse-phase HPLC on a C18 column with a water–acetonitrile gradient and 0.1% TFA is the standard. The **purity value** is the integrated area of the main peak divided by the total area, expressed as a percentage at 220 nm (the peptide bond absorption maximum).

A few points researchers regularly miss:

- "≥98% HPLC" tells you nothing about *which* impurities make up the remaining 2%. Ask for the chromatogram if your application is impurity-sensitive.
- Detection wavelength matters. A purity quoted at 220 nm and one at 280 nm are not interchangeable; aromatics-only assays underestimate the impurity profile.
- A single chromatogram does not prove orthogonal purity. For very sensitive applications, request an additional purity assay (ion-pairing reverse-phase with a different gradient, or HILIC for hydrophilic peptides).

## Net peptide content vs gross mass

A 5 mg vial does **not** contain 5 mg of peptide. The fill mass includes:

- Net peptide
- Counter-ion (typically 5–15% TFA, 3–8% acetate)
- Residual water (typically 2–8%)

If the COA reports 88% net peptide content, a 5 mg vial holds 4.4 mg of peptide. Always recalculate target concentrations from the **net** value, not the label.

## Counter-ion considerations

The counter-ion affects:

- **Acidity in solution.** TFA salts produce mildly acidic reconstituted solutions; this can matter for cell assays and certain receptor binding studies.
- **Mass.** The reported mass on a COA is the free-base mass; add the counter-ion contribution if you weigh the salt directly.
- **Cytotoxicity.** TFA at high concentrations can be cytotoxic; acetate is generally preferred for cell work.

Salt exchange (TFA → acetate or HCl) is available on request for sensitive assays.

## Water content

Karl Fischer titration measures hygroscopic water bound in the lyophilised cake. A typical research peptide holds 2–8% water by mass. High water content in a freshly received vial may indicate poor lyophilisation; a sudden increase on retest indicates loss of seal integrity.

## Stability and re-test

Most lyophilised peptide COAs state a re-test interval of 24 months at −20 °C, sealed and protected from light. Re-test does not equal expiry — it is the date by which the analytical purity should be reconfirmed.

For reconstituted peptides, the validated stability window depends on diluent and storage temperature. As a default, single-use aliquots at −80 °C carry 6–12 months of stability for most sequences; refrigerated bacteriostatic-water solutions are typically stable for 2–4 weeks.

## Where Peptide Shop COAs live

Every Peptide Shop product page links to a HTML certificate per locale. The certificate is generated from the lot record on file and includes all fields above. If a paper or PDF version is required for an audit, contact us with the lot number and the locale.

## Cross-references

- Mechanism behind reverse-phase HPLC: see [What ≥99% HPLC purity means](/learn/hplc-purity/).
- Practical reconstitution: see [Peptide reconstitution & dilution guide](/learn/reconstitution-guide/).
- Glossary entries for **net peptide**, **counter-ion**, **monoisotopic mass**, **Karl Fischer**: see [the glossary](/learn/glossary/).
