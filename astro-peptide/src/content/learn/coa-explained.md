---
title: "So lesen Sie ein Peptid-COA"
description: "Was jedes Feld auf einem Peptidanalysezertifikat bedeutet und wie Sie Identität, Reinheit und Nettopeptidmasse überprüfen, bevor Sie ein Fläschchen verwenden."
publishDate: "2026-05-03"
category: "Quality"
readTime: "8 min"
order: 20
primaryKeyword: "how to read coa hplc"
tags: ["coa", "qc", "hplc", "mass-spec"]
meta:
  title: "Peptid-COA richtig lesen | Peptide Shop Leitfaden"
  description: "Schritt-für-Schritt-Leitfaden zum Analysezertifikat: Identität, RP-HPLC-Reinheit, Massenspektrometrie, Wassergehalt und Gegenionen."
---

Ein Peptid-Analysezertifikat (COA) ist ein losspezifischer Qualitätsnachweis. Es ist das einzige Dokument, das Ihnen sagt, ob das Fläschchen vor Ihnen mit den Spezifikationen auf der Produktseite übereinstimmt. Dieser Leitfaden geht durch alle Felder, die Sie auf einem Echtheitszertifikat von Peptide Shop sehen, und erklärt, was es in der Praxis bedeutet.

## Was ein Echtheitszertifikat enthalten muss

Ein vollständiger COA umfasst:

1. **Produktidentität** – Name, Alternativname(n) und CAS-Nummer, sofern vorhanden.
2. **Chargennummer und Herstellungsdatum.** Verfolgen Sie alle nachgelagerten Ergebnisse auf eine bestimmte Charge zurück.
3. **Sequenz.** Von N bis C im Ein- oder Drei-Buchstaben-Code geschrieben.
4. **Theoretische und beobachtete Masse.** Normalerweise werden sowohl die monoisotopische (hochaufgelöste) als auch die durchschnittliche Masse angegeben.
5. **Reinheit durch RP-HPLC.** Ausgedrückt als Flächenprozent bei 220 nm.
6. **Identität und Prozentsatz des Gegenions.** Fast immer TFA oder Acetat.
7. **Wassergehalt.** Ergebnis der Karl-Fischer-Titration.
8. **Nettopeptidgehalt.** Die tatsächliche Peptidmasse im Fläschchen nach Abzug von Wasser und Gegenion.
9. **Lagerbedingungen und empfohlenes Wiederholungstestintervall.**

Wenn eines dieser Felder fehlt, behandeln Sie das Dokument als unvollständig.

## Identitätsüberprüfung

Der erste Kontrollpunkt ist die Identität:

- Die **beobachtete Masse der Massenspezifikation** muss mit der theoretischen Monoisotopenmasse innerhalb der Instrumententoleranz übereinstimmen (typischerweise ±0,5 Da für ESI mit niedriger Auflösung, ±5 ppm für ESI mit hoher Auflösung).
- Die **HPLC-Retentionszeit** allein ist keine Identität – sie ist ein Vergleich. Identität ergibt sich aus der Massenspezifikationsspur.

Wenn die beobachtete Masse um genau +16 abweicht, vermuten Sie Oxidation (Met, Trp, Cys); +18 deutet auf Hydrolyse hin; −18 ein Dehydrierungs- oder Zyklisierungsereignis.

## Reinheit durch RP-HPLC

Standard ist die Umkehrphasen-HPLC auf einer C18-Säule mit einem Wasser-Acetonitril-Gradienten und 0,1 % TFA. Der **Reinheitswert** ist die integrierte Fläche des Hauptpeaks dividiert durch die Gesamtfläche, ausgedrückt als Prozentsatz bei 220 nm (dem Absorptionsmaximum der Peptidbindung).

Einige Punkte, die Forscher regelmäßig übersehen:

- „≥98 % HPLC“ sagt nichts darüber aus, *welche* Verunreinigungen die restlichen 2 % ausmachen. Fordern Sie das Chromatogramm an, wenn Ihre Anwendung empfindlich auf Verunreinigungen reagiert.
- Detektionswellenlänge ist wichtig. Die Reinheitsangaben bei 220 nm und 280 nm sind nicht austauschbar; Tests, die nur auf Aromaten basieren, unterschätzen das Verunreinigungsprofil.
- Ein einzelnes Chromatogramm beweist nicht die orthogonale Reinheit. Fordern Sie für sehr empfindliche Anwendungen einen zusätzlichen Reinheitstest an (Ionenpaarung Umkehrphase mit einem anderen Gradienten oder HILIC für hydrophile Peptide).

## Nettopeptidgehalt vs. Bruttomasse

Eine 5-mg-Durchstechflasche enthält **keine** 5 mg Peptid. Die Füllmasse umfasst:

- Nettopeptid
- Gegenion (typischerweise 5–15 % TFA, 3–8 % Acetat)
- Restwasser (typischerweise 2–8 %)

Wenn das COA einen Nettopeptidgehalt von 88 % meldet, enthält ein 5-mg-Fläschchen 4,4 mg Peptid. Berechnen Sie Zielkonzentrationen immer anhand des **Nettowerts** neu, nicht anhand des Etiketts.

## Überlegungen zu Gegenionen

Das Gegenion beeinflusst:

- **Säuregehalt der Lösung.** TFA-Salze ergeben leicht saure rekonstituierte Lösungen; Dies kann für Zelltests und bestimmte Rezeptorbindungsstudien von Bedeutung sein.
- **Masse.** Die auf einem COA angegebene Masse ist die Masse der freien Base; Fügen Sie den Gegenionenbeitrag hinzu, wenn Sie das Salz direkt wiegen.
- **Zytotoxizität.** TFA kann in hohen Konzentrationen zytotoxisch sein; Acetat wird im Allgemeinen für Zellarbeiten bevorzugt.

Für empfindliche Tests ist auf Anfrage ein Salzaustausch (TFA → Acetat oder HCl) möglich.

## Wassergehalt

Die Karl-Fischer-Titration misst das im lyophilisierten Kuchen gebundene hygroskopische Wasser. Ein typisches Forschungspeptid enthält 2–8 Masse-% Wasser. Ein hoher Wassergehalt in einem frisch erhaltenen Fläschchen kann auf eine schlechte Lyophilisierung hinweisen; Ein plötzlicher Anstieg beim erneuten Test weist auf einen Verlust der Siegelintegrität hin.

## Stabilität und erneuter Test

Die meisten lyophilisierten Peptid-COAs geben ein Wiederholungstestintervall von 24 Monaten bei –20 °C an, versiegelt und vor Licht geschützt. Eine erneute Prüfung ist nicht gleichbedeutend mit einem Ablaufdatum – es ist das Datum, bis zu dem die analytische Reinheit erneut bestätigt werden sollte.

Bei rekonstituierten Peptiden hängt das validierte Stabilitätsfenster vom Verdünnungsmittel und der Lagertemperatur ab. Standardmäßig sind Einmal-Aliquots bei −80 °C für die meisten Sequenzen 6–12 Monate haltbar; Gekühlte bakteriostatische Wasserlösungen sind in der Regel 2–4 Wochen haltbar.

## Wo Peptide Shop COAs leben

Jede Produktseite von Peptide Shop enthält einen Link zu einem HTML-Zertifikat pro Gebietsschema. Das Zertifikat wird aus dem hinterlegten Chargendatensatz erstellt und enthält alle oben genannten Felder. Wenn für ein Audit eine Papier- oder PDF-Version erforderlich ist, kontaktieren Sie uns unter Angabe der Chargennummer und des Standorts.

## Querverweise

- Mechanismus hinter der Umkehrphasen-HPLC: siehe [Was ≥99 % HPLC-Reinheit bedeutet](/learn/hplc-purity/).
- Praktische Rekonstitution: siehe [Leitfaden zur Rekonstitution und Verdünnung von Peptiden](/learn/reconstitution-guide/).
- Glossareinträge für **Nettopeptid**, **Gegenion**, **monoisotopische Masse**, **Karl Fischer**: siehe [das Glossar](/learn/glossary/).
