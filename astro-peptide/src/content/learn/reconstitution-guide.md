---
title: "Peptide Reconstitution & Dilution Guide"
description: "Choose the right diluent, calculate the correct volume, and avoid the foaming, adsorption and oxidation pitfalls that ruin a fresh vial."
publishDate: "2026-05-03"
category: "Lab Techniques"
readTime: "9 min"
order: 40
primaryKeyword: "reconstitute peptides"
howTo: true
tags: ["reconstitution", "dilution", "protocol", "lab-techniques"]
meta:
  title: "Peptide Reconstitution Guide | Peptide Shop Learn"
  description: "Step-by-step research-peptide reconstitution: diluent selection, volume calculation, vial handling, aliquoting and concentration verification."
---

Reconstitution is where a vial of well-characterised peptide most often loses purity — through poor solvent choice, foaming, adsorption to plasticware, or imprecise volumes. This guide describes a defensible workflow.

## Step 1 — Equilibrate the vial

Remove the lyophilised vial from cold storage and let it sit, sealed, at room temperature for **20–30 minutes** before opening. Cold glass condenses atmospheric moisture; the cake will absorb it within seconds and your reported water content is suddenly wrong.

## Step 2 — Choose the diluent

| Diluent | When to use | Notes |
|---|---|---|
| Bacteriostatic water (0.9% benzyl alcohol) | Stocks intended for repeated draws over 2–4 weeks at 4 °C | Most common for research peptide reconstitution |
| Sterile water for injection | Single-use stocks, cell-assay aliquots | No preservative; freeze leftover aliquots immediately |
| 0.1% acetic acid in water | Basic peptides that resist dissolution in neutral water | Particularly useful for Lys/Arg-rich sequences |
| 1× PBS pH 7.4 | Direct addition to assays where pH must be neutral | Some peptides precipitate in PBS — test on a small aliquot first |
| DMSO (≤5% final in assays) | Hydrophobic peptides | Stock solutions in DMSO are stable; cell-assay DMSO ≤0.1–1% |

## Step 3 — Calculate the volume

Use the **net peptide content** from the COA, not the label fill mass.

```
target volume (mL) = (net peptide mass in vial, mg) / (target concentration, mg/mL)
```

Example: a vial labelled 5 mg with 88% net peptide contains 4.4 mg. To reach 1 mg/mL:

```
volume = 4.4 / 1 = 4.4 mL
```

If you reach the wrong concentration because you used the label mass, every downstream IC50 is wrong by the same multiplicative factor.

## Step 4 — Add diluent slowly

Direct the diluent stream onto the **inner glass wall of the vial**, never directly onto the cake. Foam destroys peptide. The cake will dissolve from the bottom up over 1–10 minutes; do not rush.

If the cake refuses to dissolve, add 1–2 µL of glacial acetic acid or warm the vial gently in your closed palm (never above 30 °C). Do not vortex.

## Step 5 — Confirm dissolution

The solution should be **clear and free of particulates**. Cloudiness indicates one of:

- pH-driven aggregation (try 0.1% acetic acid instead of water).
- Hydrophobic aggregation (try a small DMSO co-solvent).
- A genuinely insoluble peptide for the chosen diluent (consult the COA).

A faint blue colour is normal for copper-containing peptides such as GHK-Cu.

## Step 6 — Aliquot

Repeated freeze–thaw cycles are the single biggest avoidable cause of stock-solution decay. Immediately after dissolution:

1. Mix gently by inversion.
2. Pipette **single-use volumes** into low-binding tubes (Protein LoBind or equivalent).
3. Label each aliquot with peptide name, lot, concentration, diluent and date.
4. Freeze upright at −80 °C for long-term, −20 °C for medium-term.

Each freeze–thaw cycle reduces effective concentration by 5–15% for sensitive peptides.

## Step 7 — Verify (optional but recommended)

For high-stakes experiments, verify the reconstituted concentration with a quick UV scan:

- Trp-containing peptides: A280 with the calculated extinction coefficient (ProtParam value).
- BCA or Bradford assay using a peptide standard for short sequences.

A measured concentration within 10% of the calculated value is usually good enough; a discrepancy of 20%+ suggests poor dissolution or adsorption to the tube.

## Common pitfalls

- **Polypropylene adsorption.** Short hydrophobic peptides (≤15 residues) lose 10–40% of nominal concentration to standard polypropylene tubes within minutes. Use Protein LoBind tubes, or pre-coat plasticware with 0.1% BSA where the assay tolerates it.
- **Pipette accuracy at low volume.** Below 5 µL, a P10 pipette can read 10–15% high or low. Use larger volumes and serial dilutions.
- **Concentration drift after freezing.** Some peptides precipitate on thawing; spin briefly and re-dissolve before drawing.
- **Label confusion.** Always label aliquots with concentration *and* diluent. A 1 mg/mL stock in DMSO behaves differently from 1 mg/mL in PBS in every assay.

## Cross-references

- [How to read a peptide COA](/learn/coa-explained/) — understanding the *net peptide content* used in step 3.
- [Lyophilised vs liquid peptides](/learn/lyophilized-peptides/) — why the lyophilised form is the stable starting point.
- Storage protocols: see the blog [Best Practices for Peptide Storage and Handling](/blog/peptide-storage-handling-best-practices/).
