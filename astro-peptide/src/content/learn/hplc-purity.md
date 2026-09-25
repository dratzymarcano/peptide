---
title: "Was ≥99 % HPLC-Reinheit tatsächlich bedeutet"
description: "Die Chemie hinter einer Peptidreinheitszahl, was 99 % garantiert und was nicht und wann zusätzliche orthogonale Daten angefordert werden sollten."
publishDate: "2026-05-03"
category: "Quality"
readTime: "7 min"
order: 30
primaryKeyword: "hplc purity peptides"
tags: ["hplc", "purity", "qc"]
meta:
  title: "Was ≥99 % HPLC-Reinheit bedeutet | Peptide Shop"
  description: "Wie die RP-HPLC-Reinheit gemessen wird, was Verunreinigungsprofile aussagen und wann orthogonale Daten erforderlich sind."
---

„≥99 % HPLC-Reinheit“ erscheint auf den meisten Forschungspeptid-Produktseiten, aber die Zahl ist nuancierter als sie aussieht. In diesem Artikel wird erläutert, wie der Wert generiert wird, was er garantiert und was nicht und wann orthogonale Beweise angefordert werden müssen.

## Wie die Zahl entsteht

Bei einem Reinheitstest für ein synthetisches Peptid handelt es sich fast immer um eine Umkehrphasen-Hochleistungsflüssigkeitschromatographie (RP-HPLC) auf einer C18-Säule. Das Roh- oder Endpeptid wird geladen, durch einen Wasser-Acetonitril-Gradienten mit 0,1 % Trifluoressigsäure (TFA) getrennt und durch UV bei **220 nm** – dem Absorptionsmaximum der Amidbindung im Peptidrückgrat – nachgewiesen.

Das Chromatogramm wird integriert. Die angegebene Reinheit beträgt:

```text
Reinheit (%) = Fläche des Hauptpeaks / integrierte Gesamtfläche × 100
```

Eine Reinheit von 99 % bedeutet daher, dass der Hauptpeak 99 % des gesamten UV-absorbierenden Materials ausmacht, das innerhalb des Gradientenfensters eluiert.

## Was 99 % garantiert

Es garantiert, dass **unter diesen Analysebedingungen** keine andere UV-absorbierende Spezies mehr als 1 % der Spur ausmacht. Für die meisten Forschungspeptide ist dies ausreichend.

## Was 99 % nicht garantieren

1. **Welche Verunreinigungen machen die verbleibenden 1 % aus?** Deletionssequenzen (ein Rest fehlt), Epimere (D-Rest an einem chiralen Zentrum), Oxidationsprodukte (+16 Da) oder durcheinandergemischte Disulfide können alle zusammen oder in der Nähe des Hauptpeaks eluieren.
2. **Salz- und Lösungsmittelbelastung.** Gegenion (TFA, Acetat) und Restwasser sind nicht im Chromatogramm enthalten. Sie werden im COA gesondert ausgewiesen.
3. **Endotoxin- oder mikrobielle Belastung.** RP-HPLC misst diese nicht; Fordern Sie für Zell- und Tierstudien einen LAL-Endotoxintest an.
4. **Aggregationszustand.** Die chromatographischen Bedingungen denaturieren die meisten Sekundärstrukturen; Aggregate, die sich bei der Rekonstitution neu bilden, treten nicht auf.
5. **Orthogonale Reinheit.** Eine einzelne C18-Methode kann die tatsächliche Reinheit um 0,5–2 % unterschätzen, wenn eine koeluierende Verunreinigung vorhanden ist.

## Detektionswellenlänge ist wichtig

Die bei 220 nm angegebene Reinheit erfasst alle Spezies, die Peptidbindungen enthalten. Die bei **280 nm** (Trp/Tyr) angegebene Reinheit erfasst nur Aromaten; Für ein Peptid ohne aromatischen Rest ist eine 280-nm-Spur nicht aussagekräftig. Überprüfen Sie immer, auf welche Wellenlänge sich die angegebene Reinheit bezieht.

## Wann orthogonale Daten angefordert werden sollen

Für die meisten Bindungsstudien, In-vitro-Rezeptortests und Strukturarbeiten ist ein einzelner RP-HPLC-Wert von ≥98–99 % ausreichend. Fordern Sie zusätzliche Nachweise an, wenn:

- Das Peptid wird in einem langfristigen In-vivo-Forschungsmodell verwendet, bei dem die Anreicherung von Verunreinigungen von Bedeutung ist.
- Der Assay ist äußerst empfindlich (z. B. Ionenkanal-Elektrophysiologie) und Spuren von Verunreinigungen können zu falsch positiven Ergebnissen führen.
- Das Peptid enthält zur Epimerisierung neigende Reste (Cys, Ser, Thr nach Pro) und die Stereochemie muss bestätigt werden.
- Zwei Synthesechargen liefern inkonsistente funktionelle Ergebnisse.

In diesen Fällen fordern Sie Folgendes an:

- **Eine zweite orthogonale HPLC-Methode** (andere Säulenchemie, anderes Additiv – zum Beispiel Ionenpaarung von RP mit Ameisensäure anstelle von TFA).
- **Hochauflösende MS** mit Isotopenmusteranalyse, nicht nur Einheitsmassen-ESI.
- **Kapillarelektrophorese** für Ladungsisoformen.
- **Analyse chiraler Aminosäuren**, wenn Stereochemie in Frage steht.

## Was Peptide Shop versendet

Jedes Forschungspeptid trägt ein losspezifisches COA mit mindestens:

- RP-HPLC-Reinheit bei 220 nm (Chromatogramm auf Anfrage erhältlich).
- ESI-MS-Identitätsbestätigung.
- Identität und Prozentsatz der Gegenionen.
- Karl-Fischer-Wassergehalt.
- Nettopeptidgehalt.

Für die überwiegende Mehrheit der Forschungsanträge bietet diese Kombination ausreichend Sicherheit, um mit der Arbeit zu beginnen. Für spezielle Tests wenden Sie sich mit der Chargennummer und den zusätzlichen Daten, die Sie benötigen, an den technischen Support.

## Querverweise

- [Wie man ein Peptid-COA liest](/learn/coa-explained/)
- [Glossar zur Peptidforschung](/learn/glossary/) – Einträge zu *Flächenprozent*, *Gegenion*, *Epimer*
