---
title: "Leitfaden zur Rekonstitution und Verdünnung von Peptiden"
description: "Wählen Sie das richtige Verdünnungsmittel, berechnen Sie das richtige Volumen und vermeiden Sie Schaumbildung, Adsorption und Oxidation, die ein frisches Fläschchen ruinieren."
publishDate: "2026-05-03"
category: "Lab Techniques"
readTime: "9 min"
order: 40
primaryKeyword: "reconstitute peptides"
howTo: true
tags: ["reconstitution", "dilution", "protocol", "lab-techniques"]
meta:
  title: "Leitfaden zur Peptid-Rekonstitution | Peptide Shop"
  description: "Schritt-für-Schritt-Anleitung zur Rekonstitution: Lösungsmittelauswahl, Volumenberechnung, Aliquotierung und Handhabung."
---

Bei der Rekonstitution verliert ein Fläschchen mit gut charakterisiertem Peptid am häufigsten an Reinheit – durch schlechte Lösungsmittelauswahl, Schaumbildung, Adsorption an Kunststoffartikeln oder ungenaue Volumina. Dieser Leitfaden beschreibt einen vertretbaren Arbeitsablauf.

## Schritt 1 – Äquilibrieren Sie das Fläschchen

Nehmen Sie das lyophilisierte Fläschchen aus dem Kühlraum und lassen Sie es versiegelt **20–30 Minuten** bei Raumtemperatur stehen, bevor Sie es öffnen. Kaltes Glas kondensiert die Luftfeuchtigkeit; Der Kuchen wird es innerhalb von Sekunden absorbieren und Ihr angegebener Wassergehalt ist plötzlich falsch.

## Schritt 2 – Wählen Sie das Verdünnungsmittel

| Verdünnungsmittel | Wann sollte | verwendet werden? Notizen |
|---|---|---|
| Bakteriostatisches Wasser (0,9 % Benzylalkohol) | Vorräte zur wiederholten Entnahme über 2–4 Wochen bei 4 °C | Am häufigsten für die Peptidrekonstitution in der Forschung |
| Steriles Wasser zur Injektion | Einwegbestände, Zellassay-Aliquots | Kein Konservierungsmittel; übrig gebliebene Aliquots sofort einfrieren |
| 0,1 % Essigsäure in Wasser | Basische Peptide, die der Auflösung in neutralem Wasser widerstehen | Besonders nützlich für Lys/Arg-reiche Sequenzen |
| 1× PBS pH 7,4 | Direkte Zugabe zu Tests, bei denen der pH-Wert neutral sein muss | Einige Peptide fallen in PBS aus – zuerst an einem kleinen Aliquot testen |
| DMSO (≤5 % endgültig in den Tests) | Hydrophobe Peptide | Stammlösungen in DMSO sind stabil; Zelltest DMSO ≤0,1–1 % |

## Schritt 3 – Berechnen Sie das Volumen

Verwenden Sie den **Nettopeptidgehalt** aus dem Echtheitszertifikat, nicht die Füllmasse des Etiketts.

```text
Zielvolumen (ml) = (Nettopeptidmasse im Fläschchen, mg) / (Zielkonzentration, mg/ml)
```

Beispiel: Ein Fläschchen mit der Aufschrift 5 mg mit 88 % Nettopeptid enthält 4,4 mg. Um 1 mg/ml zu erreichen:

```text
Volumen = 4,4 / 1 = 4,4 ml
```

> 💡 **Interaktives Labor-Tool:** Nutzen Sie unseren kostenlosen [Peptid-Rechner & Rekonstitutions-Rechner](/peptid-rechner/), um die exakte Menge an bakteriostatischem Wasser (BAC) und die Einheiten auf U-100/U-50/U-30 Insulinspritzen automatisch zu berechnen.

Wenn Sie die falsche Konzentration erreichen, weil Sie die Markierungsmasse verwendet haben, ist jeder nachgeschaltete IC50 um denselben multiplikativen Faktor falsch.

## Schritt 4 – Verdünnungsmittel langsam zugeben

Richten Sie den Verdünnungsstrahl auf die **innere Glaswand des Fläschchens**, niemals direkt auf den Kuchen. Schaum zerstört Peptide. Der Kuchen löst sich innerhalb von 1–10 Minuten von unten nach oben auf; beeil dich nicht.

Wenn sich der Kuchen nicht auflöst, geben Sie 1–2 µL Eisessig hinzu oder erwärmen Sie das Fläschchen vorsichtig in Ihrer geschlossenen Handfläche (niemals über 30 °C). Nicht vortexen.

## Schritt 5 – Bestätigen Sie die Auflösung

Die Lösung sollte **klar und frei von Partikeln** sein. Trübung weist auf Folgendes hin:

- pH-gesteuerte Aggregation (versuchen Sie es mit 0,1 % Essigsäure anstelle von Wasser).
- Hydrophobe Aggregation (versuchen Sie es mit einem kleinen DMSO-Colösungsmittel).
- Ein wirklich unlösliches Peptid für das gewählte Verdünnungsmittel (konsultieren Sie das COA).

Eine schwache blaue Farbe ist bei kupferhaltigen Peptiden wie GHK-Cu normal.

## Schritt 6 – Aliquot

Wiederholte Gefrier-Tau-Zyklen sind die größte vermeidbare Ursache für den Zerfall der Stammlösung. Unmittelbar nach der Auflösung:

1. Vorsichtig durch Umdrehen mischen.
2. Pipettieren Sie **Einwegvolumina** in Röhrchen mit geringer Bindung (Protein LoBind oder gleichwertig).
3. Beschriften Sie jedes Aliquot mit Peptidname, Charge, Konzentration, Verdünnungsmittel und Datum.
4. Langfristig aufrecht bei −80 °C und mittelfristig bei −20 °C einfrieren.

Jeder Einfrier-Auftau-Zyklus reduziert die wirksame Konzentration für empfindliche Peptide um 5–15 %.

## Schritt 7 – Überprüfen (optional, aber empfohlen)

Überprüfen Sie bei Experimenten mit hohem Risiko die wiederhergestellte Konzentration mit einem schnellen UV-Scan:

- Trp-haltige Peptide: A280 mit dem berechneten Extinktionskoeffizienten (ProtParam-Wert).
- BCA- oder Bradford-Assay unter Verwendung eines Peptidstandards für kurze Sequenzen.

Eine gemessene Konzentration innerhalb von 10 % des berechneten Wertes ist normalerweise ausreichend; Eine Abweichung von mehr als 20 % deutet auf eine schlechte Auflösung oder Adsorption im Röhrchen hin.

## Häufige Fallstricke

- **Polypropylen-Adsorption.** Kurze hydrophobe Peptide (≤15 Reste) verlieren innerhalb von Minuten 10–40 % der Nennkonzentration gegenüber Standard-Polypropylenröhrchen. Verwenden Sie Protein-LoBind-Röhrchen oder beschichten Sie Kunststoffgefäße mit 0,1 % BSA vor, sofern der Test dies toleriert.
- **Pipettengenauigkeit bei geringem Volumen.** Unter 5 µL kann eine P10-Pipette 10–15 % zu hoch oder zu niedrig anzeigen. Verwenden Sie größere Volumina und serielle Verdünnungen.
- **Konzentrationsdrift nach dem Einfrieren.** Einige Peptide fallen beim Auftauen aus; Kurz drehen und vor dem Ziehen wieder auflösen.
- **Verwirrung bei der Beschriftung.** Beschriften Sie Aliquote immer mit der Konzentration *und* dem Verdünnungsmittel. Eine 1 mg/ml-Lösung in DMSO verhält sich in jedem Test anders als 1 mg/ml in PBS.

## Querverweise

- [Wie man einen Peptid-COA liest](/learn/coa-explained/) – Verständnis des in Schritt 3 verwendeten *Nettopeptidgehalts*.
- [Lyophilisierte vs. flüssige Peptide](/learn/lyophilized-peptides/) – warum die lyophilisierte Form der stabile Ausgangspunkt ist.
- Lagerungsprotokolle: siehe Blog [Best Practices for Peptide Storage and Handling](/blog/peptide-storage-handling-best-practices/).
