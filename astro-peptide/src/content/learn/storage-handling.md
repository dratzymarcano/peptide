---
title: "Peptide Storage & Handling Best Practices"
description: "How to store lyophilised and reconstituted research peptides without losing purity to oxidation, hydrolysis, freeze–thaw or adsorption."
publishDate: "2026-05-03"
category: "Lab Techniques"
readTime: "8 min"
order: 50
primaryKeyword: "peptide storage"
tags: ["storage", "handling", "stability", "lab-techniques"]
meta:
  title: "Peptide Storage & Handling Best Practices | Peptide Shop Learn"
  description: "Defensible storage protocol for lyophilised and reconstituted research peptides: temperature, desiccant, aliquoting, freeze–thaw and shelf life."
---

A correctly synthesised, ≥99% pure peptide can lose 10–30% of its activity to bad storage in a single quarter. This guide describes the storage and handling decisions that preserve a research peptide from the moment it leaves cold storage at our facility to the day it is consumed at the bench.

## Lyophilised storage

Lyophilised (freeze-dried) peptide is the most stable form. Stored properly, most sequences are stable for **24 months** from the date of manufacture.

Recommended conditions:

- **−20 °C in a frost-free freezer**, double-bagged with desiccant.
- **−80 °C** for sequences with known oxidation liabilities (Met, Cys, Trp, free N-terminal Gln) or for archival lots.
- **Desiccated.** Lyophilisation removes water; reintroducing it is the fastest path to hydrolysis and degradation.
- **Dark.** UV light catalyses oxidation and disulfide rearrangement.

Avoid frequent door-opening freezers and shared `−20 °C` units that cycle through frequent thaws.

## Receiving a shipment

Vials shipped on dry ice or with cold packs should be inspected on arrival:

1. Confirm the vial is intact and the seal is undamaged.
2. Check the lot number against the COA in the shipment.
3. Place the vial directly in `−20 °C` storage; **do not open** until you are ready to reconstitute.
4. Equilibrate to room temperature (20–30 min, sealed) before each opening to prevent moisture condensation.

## Reconstituted storage

Once dissolved, the same peptide is dramatically less stable.

| Solvent | Storage | Typical shelf life |
|---|---|---|
| Bacteriostatic water | 2–8 °C | 2–4 weeks |
| Sterile water for injection | 2–8 °C | 5–7 days |
| 0.1% acetic acid | 2–8 °C | 1–2 weeks |
| 1× PBS | 2–8 °C | 24–72 hours (most sequences) |
| DMSO | −20 °C, sealed | 6–12 months |
| Aqueous, frozen as aliquots | −80 °C | 6–12 months |

Single-use aliquots in **low-binding tubes** at `−80 °C` are the gold standard. Each freeze–thaw cycle costs roughly 5–15% of effective concentration for sensitive peptides; the second and third cycles cost more.

## Sequence-specific liabilities

| Residue / motif | Failure mode | Mitigation |
|---|---|---|
| Met | Oxidation to Met sulfoxide (+16 Da) | Avoid air, store dark, add 1 mM TCEP if appropriate |
| Cys (free) | Disulfide scrambling, Cys oxidation | N₂ overlay, low-O₂ storage, single freeze–thaw |
| Trp | Oxidation to N-formylkynurenine (+32 Da) | Dark amber tubes, no UV |
| N-terminal Gln | Pyroglutamate formation | Acetylate or pyroglutamate the N-terminus during synthesis |
| Asp-Pro | Acid-catalysed cleavage | Avoid low pH for prolonged periods |
| Asn-Gly | Deamidation, isoaspartate | Neutral pH, low temperature |

If your peptide contains any of these, request the sequence-specific stability note from technical support.

## Plasticware and adsorption

Short, hydrophobic, or highly cationic peptides adsorb to standard polypropylene within minutes. Use:

- **Protein LoBind (Eppendorf) or equivalent low-binding tubes** for stocks.
- **Glass HPLC vials** for analytical work.
- **0.1% BSA pre-coat** of plasticware where the assay tolerates BSA.
- **Polypropylene pipette tips** rather than glass for small aqueous volumes; rinse three times before final transfer to saturate non-specific binding sites.

## Shelf-life monitoring

For long-running studies, re-verify a stock that has been stored more than 6 weeks at `2–8 °C` or 6 months at `−80 °C`:

- Visual: clear solution, no precipitate.
- A280 (Trp/Tyr peptides): concentration within 10% of fresh.
- Activity in a known-good assay: within 20% of historical performance.

If any of these drifts, retire the stock and reconstitute from a fresh vial.

## Cross-references

- [Peptide reconstitution & dilution guide](/learn/reconstitution-guide/) — for the upstream step.
- [Lyophilised vs liquid peptides](/learn/lyophilized-peptides/) — why the lyophilised form is the stable starting point.
- [How to read a peptide COA](/learn/coa-explained/) — for the *net peptide content* used to recalculate concentrations after long storage.
