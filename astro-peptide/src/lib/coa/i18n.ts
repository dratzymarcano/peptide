/**
 * Peptide Shop — Certificate of Analysis i18n dictionaries.
 *
 * Strings are intentionally kept neutral, ISO-friendly, and free of idioms
 * so that machine and human translators can swap them safely. Add a new
 * locale by copying the `en` block, translating values only, and registering
 * it in `dictionaries` plus `SUPPORTED_LOCALES`.
 */

export type CoaLocale = 'en' | 'de' | 'nl' | 'fr' | 'it' | 'es';

export const SUPPORTED_LOCALES: CoaLocale[] = ['en', 'de', 'nl', 'fr', 'it', 'es'];
export const DEFAULT_LOCALE: CoaLocale = 'en';

export interface CoaStrings {
  documentTitle: string;
  ruoTitle: string;
  ruoSubtitle: string;
  metaDocNo: string;
  metaRevision: string;
  metaIssued: string;
  sectionIdentification: string;
  sectionPhysicalChemical: string;
  sectionAnalyticalData: string;
  sectionConclusion: string;
  fieldCatalogNo: string;
  fieldCasNo: string;
  fieldChemicalName: string;
  fieldNetContent: string;
  fieldPackage: string;
  fieldBatchNo: string;
  fieldManufactureDate: string;
  fieldRetestDate: string;
  fieldOrigin: string;
  fieldMolecularFormula: string;
  fieldMolecularWeight: string;
  fieldAppearance: string;
  fieldSolubility: string;
  fieldStorage: string;
  fieldSequence: string;
  storageLyo: string;
  storageRecon: string;
  notDetermined: string;
  conforms: string;
  pass: string;
  fail: string;
  tableParameter: string;
  tableMethod: string;
  tableSpecification: string;
  tableResult: string;
  tableStatus: string;
  testAppearance: string;
  testIdentityMs: string;
  testPurityHplc: string;
  testSingleImpurity: string;
  testAaa: string;
  testAcetate: string;
  testTfa: string;
  testWater: string;
  testNetPeptide: string;
  testEndotoxin: string;
  testBioburden: string;
  methodVisual: string;
  methodEsiMs: string;
  methodHplc220: string;
  methodAaa: string;
  methodIc: string;
  methodKf: string;
  methodCalc: string;
  methodLal: string;
  methodUsp61: string;
  specAppearance: string;
  specConformsToTheoretical: string;
  conclusionBody: (lot: string) => string;
  cautionBody: string;
  sigQc: string;
  sigQa: string;
  sigDate: string;
  footerContact: string;
  footerControl: string;
  footerPolicy: string;
  download: string;
  countryEu: string;
  notApplicable: string;
}

const en: CoaStrings = {
  documentTitle: 'Certificate of Analysis',
  ruoTitle: 'Research Use Only',
  ruoSubtitle: 'Not for human or veterinary use',
  metaDocNo: 'Doc No.',
  metaRevision: 'Rev.',
  metaIssued: 'Issued',
  sectionIdentification: 'Product Identification',
  sectionPhysicalChemical: 'Physical and Chemical Properties',
  sectionAnalyticalData: 'Analytical Data',
  sectionConclusion: 'Conclusion',
  fieldCatalogNo: 'Catalog No.',
  fieldCasNo: 'CAS No.',
  fieldChemicalName: 'Chemical Name',
  fieldNetContent: 'Net Content per Vial',
  fieldPackage: 'Package Configuration',
  fieldBatchNo: 'Batch / Lot No.',
  fieldManufactureDate: 'Manufacture Date',
  fieldRetestDate: 'Retest Date',
  fieldOrigin: 'Country of Origin',
  fieldMolecularFormula: 'Molecular Formula',
  fieldMolecularWeight: 'Molecular Weight',
  fieldAppearance: 'Appearance',
  fieldSolubility: 'Solubility',
  fieldStorage: 'Storage Conditions',
  fieldSequence: 'Amino Acid Sequence',
  storageLyo: 'Lyophilized: −20 °C / 36 months · 4 °C / 24 months · 15 °C / 3 months',
  storageRecon: 'Reconstituted: −80 °C / 6 months · −20 °C / 1 month · 4 °C / 1 week',
  notDetermined: 'Not determined',
  conforms: 'Conforms',
  pass: 'Pass',
  fail: 'Fail',
  tableParameter: 'Test Parameter',
  tableMethod: 'Method',
  tableSpecification: 'Specification',
  tableResult: 'Result',
  tableStatus: 'Status',
  testAppearance: 'Appearance',
  testIdentityMs: 'Identity (Mass)',
  testPurityHplc: 'Purity (HPLC)',
  testSingleImpurity: 'Single Impurity (max.)',
  testAaa: 'Amino Acid Composition',
  testAcetate: 'Acetate Content',
  testTfa: 'TFA Content',
  testWater: 'Water Content',
  testNetPeptide: 'Net Peptide Content',
  testEndotoxin: 'Bacterial Endotoxins',
  testBioburden: 'Bioburden',
  methodVisual: 'Visual inspection',
  methodEsiMs: 'ESI-MS',
  methodHplc220: 'RP-HPLC, UV 220 nm',
  methodAaa: 'Acid hydrolysis / AAA',
  methodIc: 'Ion chromatography',
  methodKf: 'Karl Fischer',
  methodCalc: 'Calculated (HPLC × AAA × H₂O × counter-ion)',
  methodLal: 'LAL, gel-clot · USP <85>',
  methodUsp61: 'USP <61>',
  specAppearance: 'White to off-white lyophilized solid',
  specConformsToTheoretical: 'Conforms to theoretical ratios',
  conclusionBody: (lot) =>
    `Lot <strong>${lot}</strong> has been tested using validated analytical methods and complies with all listed specifications. This batch is <strong>released</strong> for research distribution.`,
  cautionBody:
    'Caution: This product is supplied for laboratory research use only. It has not been evaluated by any regulatory authority for safety or efficacy in humans or animals. Not for diagnostic, therapeutic, food, or cosmetic use. Handle in accordance with good laboratory practice.',
  sigQc: 'Quality Control Analyst',
  sigQa: 'Quality Assurance Approver',
  sigDate: 'Date',
  footerContact: 'Technical contact',
  footerControl:
    'Controlled document — reproduction outside the original PDF invalidates this certificate.',
  footerPolicy: 'See full CoA policy',
  download: 'Download PDF',
  countryEu: 'European Union',
  notApplicable: 'N/A',
};

const de: CoaStrings = {
  ...en,
  documentTitle: 'Analysenzertifikat',
  ruoTitle: 'Nur für Forschungszwecke',
  ruoSubtitle: 'Nicht zur Anwendung am Menschen oder Tier',
  metaDocNo: 'Dok.-Nr.',
  metaRevision: 'Rev.',
  metaIssued: 'Ausgestellt',
  sectionIdentification: 'Produktidentifikation',
  sectionPhysicalChemical: 'Physikalische und chemische Eigenschaften',
  sectionAnalyticalData: 'Analytische Daten',
  sectionConclusion: 'Schlussfolgerung',
  fieldCatalogNo: 'Katalog-Nr.',
  fieldCasNo: 'CAS-Nr.',
  fieldChemicalName: 'Chemische Bezeichnung',
  fieldNetContent: 'Nettoinhalt pro Vial',
  fieldPackage: 'Gebindekonfiguration',
  fieldBatchNo: 'Chargen-Nr.',
  fieldManufactureDate: 'Herstellungsdatum',
  fieldRetestDate: 'Nachprüfdatum',
  fieldOrigin: 'Herkunftsland',
  fieldMolecularFormula: 'Summenformel',
  fieldMolecularWeight: 'Molmasse',
  fieldAppearance: 'Erscheinungsbild',
  fieldSolubility: 'Löslichkeit',
  fieldStorage: 'Lagerbedingungen',
  fieldSequence: 'Aminosäuresequenz',
  storageLyo: 'Lyophilisiert: −20 °C / 36 Monate · 4 °C / 24 Monate · 15 °C / 3 Monate',
  storageRecon: 'Rekonstituiert: −80 °C / 6 Monate · −20 °C / 1 Monat · 4 °C / 1 Woche',
  notDetermined: 'Nicht bestimmt',
  conforms: 'Entspricht',
  pass: 'Bestanden',
  fail: 'Nicht bestanden',
  tableParameter: 'Prüfparameter',
  tableMethod: 'Methode',
  tableSpecification: 'Spezifikation',
  tableResult: 'Ergebnis',
  tableStatus: 'Status',
  testAppearance: 'Erscheinungsbild',
  testIdentityMs: 'Identität (Masse)',
  testPurityHplc: 'Reinheit (HPLC)',
  testSingleImpurity: 'Einzelverunreinigung (max.)',
  testAaa: 'Aminosäurezusammensetzung',
  testAcetate: 'Acetatgehalt',
  testTfa: 'TFA-Gehalt',
  testWater: 'Wassergehalt',
  testNetPeptide: 'Netto-Peptidgehalt',
  testEndotoxin: 'Bakterielle Endotoxine',
  testBioburden: 'Keimbelastung',
  methodVisual: 'Visuelle Prüfung',
  methodCalc: 'Berechnet (HPLC × AAA × H₂O × Gegenion)',
  specAppearance: 'Weißer bis cremefarbener lyophilisierter Feststoff',
  specConformsToTheoretical: 'Entspricht den theoretischen Verhältnissen',
  conclusionBody: (lot) =>
    `Charge <strong>${lot}</strong> wurde mit validierten analytischen Methoden geprüft und erfüllt alle aufgeführten Spezifikationen. Diese Charge ist für die <strong>Forschungsdistribution freigegeben</strong>.`,
  cautionBody:
    'Achtung: Dieses Produkt ist ausschließlich für Laborforschungszwecke bestimmt. Es wurde von keiner Regulierungsbehörde auf Sicherheit oder Wirksamkeit am Menschen oder Tier geprüft. Nicht für diagnostische, therapeutische, Lebensmittel- oder Kosmetikanwendungen. Behandlung gemäß guter Laborpraxis.',
  sigQc: 'Qualitätskontrolle (Analytik)',
  sigQa: 'Qualitätssicherung (Freigabe)',
  sigDate: 'Datum',
  footerContact: 'Technischer Kontakt',
  footerControl:
    'Kontrolliertes Dokument — die Reproduktion außerhalb des Originals invalidiert dieses Zertifikat.',
  footerPolicy: 'Vollständige CoA-Richtlinie ansehen',
  download: 'PDF herunterladen',
  countryEu: 'Europäische Union',
};

const nl: CoaStrings = {
  ...en,
  documentTitle: 'Analysecertificaat',
  ruoTitle: 'Alleen voor onderzoeksdoeleinden',
  ruoSubtitle: 'Niet voor humaan of veterinair gebruik',
  metaDocNo: 'Doc.nr.',
  metaRevision: 'Rev.',
  metaIssued: 'Uitgegeven',
  sectionIdentification: 'Productidentificatie',
  sectionPhysicalChemical: 'Fysische en chemische eigenschappen',
  sectionAnalyticalData: 'Analytische gegevens',
  sectionConclusion: 'Conclusie',
  fieldCatalogNo: 'Catalogusnr.',
  fieldCasNo: 'CAS-nr.',
  fieldChemicalName: 'Chemische naam',
  fieldNetContent: 'Netto-inhoud per vial',
  fieldPackage: 'Verpakkingsconfiguratie',
  fieldBatchNo: 'Batch-/lotnr.',
  fieldManufactureDate: 'Productiedatum',
  fieldRetestDate: 'Hertestdatum',
  fieldOrigin: 'Land van herkomst',
  fieldMolecularFormula: 'Molecuulformule',
  fieldMolecularWeight: 'Molecuulgewicht',
  fieldAppearance: 'Uiterlijk',
  fieldSolubility: 'Oplosbaarheid',
  fieldStorage: 'Opslagcondities',
  fieldSequence: 'Aminozuursequentie',
  storageLyo: 'Gelyofiliseerd: −20 °C / 36 maanden · 4 °C / 24 maanden · 15 °C / 3 maanden',
  storageRecon: 'Gereconstitueerd: −80 °C / 6 maanden · −20 °C / 1 maand · 4 °C / 1 week',
  notDetermined: 'Niet bepaald',
  conforms: 'Conform',
  pass: 'Geslaagd',
  fail: 'Niet geslaagd',
  tableParameter: 'Testparameter',
  tableMethod: 'Methode',
  tableSpecification: 'Specificatie',
  tableResult: 'Resultaat',
  tableStatus: 'Status',
  testAppearance: 'Uiterlijk',
  testIdentityMs: 'Identiteit (massa)',
  testPurityHplc: 'Zuiverheid (HPLC)',
  testSingleImpurity: 'Individuele onzuiverheid (max.)',
  testAaa: 'Aminozuursamenstelling',
  testAcetate: 'Acetaatgehalte',
  testTfa: 'TFA-gehalte',
  testWater: 'Watergehalte',
  testNetPeptide: 'Netto peptidegehalte',
  testEndotoxin: 'Bacteriële endotoxinen',
  testBioburden: 'Bioburden',
  methodVisual: 'Visuele inspectie',
  methodCalc: 'Berekend (HPLC × AAA × H₂O × tegenion)',
  specAppearance: 'Wit tot gebroken wit gelyofiliseerd vast materiaal',
  specConformsToTheoretical: 'Conform theoretische verhoudingen',
  conclusionBody: (lot) =>
    `Lot <strong>${lot}</strong> is getest met gevalideerde analytische methoden en voldoet aan alle vermelde specificaties. Deze batch is <strong>vrijgegeven</strong> voor onderzoeksdistributie.`,
  cautionBody:
    'Let op: dit product wordt uitsluitend geleverd voor laboratoriumonderzoek. Het is door geen enkele regelgevende instantie beoordeeld op veiligheid of werkzaamheid bij mensen of dieren. Niet voor diagnostisch, therapeutisch, voedings- of cosmetisch gebruik. Behandel volgens goede laboratoriumpraktijken.',
  sigQc: 'Kwaliteitscontrole-analist',
  sigQa: 'Goedkeurder kwaliteitsborging',
  sigDate: 'Datum',
  footerContact: 'Technisch contact',
  footerControl:
    'Gecontroleerd document — reproductie buiten de originele PDF maakt dit certificaat ongeldig.',
  footerPolicy: 'Volledig CoA-beleid bekijken',
  download: 'PDF downloaden',
  countryEu: 'Europese Unie',
};

const fr: CoaStrings = {
  ...en,
  documentTitle: 'Certificat d’analyse',
  ruoTitle: 'Réservé à la recherche',
  ruoSubtitle: 'Ne pas utiliser chez l’homme ou l’animal',
  metaDocNo: 'N° de doc.',
  metaRevision: 'Rév.',
  metaIssued: 'Émis le',
  sectionIdentification: 'Identification du produit',
  sectionPhysicalChemical: 'Propriétés physico-chimiques',
  sectionAnalyticalData: 'Données analytiques',
  sectionConclusion: 'Conclusion',
  fieldCatalogNo: 'N° de catalogue',
  fieldCasNo: 'N° CAS',
  fieldChemicalName: 'Nom chimique',
  fieldNetContent: 'Contenu net par flacon',
  fieldPackage: 'Conditionnement',
  fieldBatchNo: 'N° de lot',
  fieldManufactureDate: 'Date de fabrication',
  fieldRetestDate: 'Date de recontrôle',
  fieldOrigin: 'Pays d’origine',
  fieldMolecularFormula: 'Formule moléculaire',
  fieldMolecularWeight: 'Masse moléculaire',
  fieldAppearance: 'Aspect',
  fieldSolubility: 'Solubilité',
  fieldStorage: 'Conditions de stockage',
  fieldSequence: 'Séquence d’acides aminés',
  storageLyo: 'Lyophilisé : −20 °C / 36 mois · 4 °C / 24 mois · 15 °C / 3 mois',
  storageRecon: 'Reconstitué : −80 °C / 6 mois · −20 °C / 1 mois · 4 °C / 1 semaine',
  notDetermined: 'Non déterminé',
  conforms: 'Conforme',
  pass: 'Conforme',
  fail: 'Non conforme',
  tableParameter: 'Paramètre',
  tableMethod: 'Méthode',
  tableSpecification: 'Spécification',
  tableResult: 'Résultat',
  tableStatus: 'Statut',
  testAppearance: 'Aspect',
  testIdentityMs: 'Identité (masse)',
  testPurityHplc: 'Pureté (HPLC)',
  testSingleImpurity: 'Impureté unique (max.)',
  testAaa: 'Composition en acides aminés',
  testAcetate: 'Teneur en acétate',
  testTfa: 'Teneur en TFA',
  testWater: 'Teneur en eau',
  testNetPeptide: 'Teneur nette en peptide',
  testEndotoxin: 'Endotoxines bactériennes',
  testBioburden: 'Charge microbienne',
  methodVisual: 'Inspection visuelle',
  methodCalc: 'Calculé (HPLC × AAA × H₂O × contre-ion)',
  specAppearance: 'Solide lyophilisé blanc à blanc cassé',
  specConformsToTheoretical: 'Conforme aux ratios théoriques',
  conclusionBody: (lot) =>
    `Le lot <strong>${lot}</strong> a été testé selon des méthodes analytiques validées et est conforme à toutes les spécifications listées. Ce lot est <strong>libéré</strong> pour distribution à des fins de recherche.`,
  cautionBody:
    'Attention : ce produit est fourni à des fins de recherche en laboratoire uniquement. Il n’a été évalué par aucune autorité réglementaire pour son innocuité ou son efficacité chez l’homme ou l’animal. Ne convient pas à un usage diagnostique, thérapeutique, alimentaire ou cosmétique. Manipuler conformément aux bonnes pratiques de laboratoire.',
  sigQc: 'Analyste contrôle qualité',
  sigQa: 'Approbateur assurance qualité',
  sigDate: 'Date',
  footerContact: 'Contact technique',
  footerControl:
    'Document contrôlé — toute reproduction hors du PDF original invalide ce certificat.',
  footerPolicy: 'Voir la politique CoA complète',
  download: 'Télécharger le PDF',
  countryEu: 'Union européenne',
};

const it: CoaStrings = {
  ...en,
  documentTitle: 'Certificato di Analisi',
  ruoTitle: 'Solo per uso di ricerca',
  ruoSubtitle: 'Non per uso umano o veterinario',
  metaDocNo: 'N. doc.',
  metaRevision: 'Rev.',
  metaIssued: 'Emesso',
  sectionIdentification: 'Identificazione del prodotto',
  sectionPhysicalChemical: 'Proprietà fisiche e chimiche',
  sectionAnalyticalData: 'Dati analitici',
  sectionConclusion: 'Conclusione',
  fieldCatalogNo: 'N. catalogo',
  fieldCasNo: 'N. CAS',
  fieldChemicalName: 'Nome chimico',
  fieldNetContent: 'Contenuto netto per vial',
  fieldPackage: 'Configurazione confezione',
  fieldBatchNo: 'N. batch/lotto',
  fieldManufactureDate: 'Data di produzione',
  fieldRetestDate: 'Data di ritest',
  fieldOrigin: 'Paese di origine',
  fieldMolecularFormula: 'Formula molecolare',
  fieldMolecularWeight: 'Peso molecolare',
  fieldAppearance: 'Aspetto',
  fieldSolubility: 'Solubilità',
  fieldStorage: 'Condizioni di conservazione',
  fieldSequence: 'Sequenza amminoacidica',
  storageLyo: 'Liofilizzato: −20 °C / 36 mesi · 4 °C / 24 mesi · 15 °C / 3 mesi',
  storageRecon: 'Ricostituito: −80 °C / 6 mesi · −20 °C / 1 mese · 4 °C / 1 settimana',
  notDetermined: 'Non determinato',
  conforms: 'Conforme',
  pass: 'Superato',
  fail: 'Non superato',
  tableParameter: 'Parametro di prova',
  tableMethod: 'Metodo',
  tableSpecification: 'Specifica',
  tableResult: 'Risultato',
  tableStatus: 'Stato',
  testAppearance: 'Aspetto',
  testIdentityMs: 'Identità (massa)',
  testPurityHplc: 'Purezza (HPLC)',
  testSingleImpurity: 'Impurezza singola (max.)',
  testAaa: 'Composizione amminoacidica',
  testAcetate: 'Contenuto di acetato',
  testTfa: 'Contenuto di TFA',
  testWater: 'Contenuto d’acqua',
  testNetPeptide: 'Contenuto netto di peptide',
  testEndotoxin: 'Endotossine batteriche',
  testBioburden: 'Carica microbica',
  methodVisual: 'Ispezione visiva',
  methodCalc: 'Calcolato (HPLC × AAA × H₂O × controione)',
  specAppearance: 'Solido liofilizzato da bianco a bianco sporco',
  specConformsToTheoretical: 'Conforme ai rapporti teorici',
  conclusionBody: (lot) =>
    `Il lotto <strong>${lot}</strong> è stato testato con metodi analitici validati ed è conforme a tutte le specifiche elencate. Questo batch è <strong>rilasciato</strong> per la distribuzione a fini di ricerca.`,
  cautionBody:
    'Attenzione: questo prodotto è fornito esclusivamente per uso di ricerca in laboratorio. Non è stato valutato da alcuna autorità regolatoria per sicurezza o efficacia in esseri umani o animali. Non per uso diagnostico, terapeutico, alimentare o cosmetico. Manipolare secondo le buone pratiche di laboratorio.',
  sigQc: 'Analista controllo qualità',
  sigQa: 'Responsabile approvazione QA',
  sigDate: 'Data',
  footerContact: 'Contatto tecnico',
  footerControl:
    'Documento controllato — la riproduzione al di fuori del PDF originale invalida questo certificato.',
  footerPolicy: 'Vedi la politica CoA completa',
  download: 'Scarica PDF',
  countryEu: 'Unione Europea',
};

const es: CoaStrings = {
  ...en,
  documentTitle: 'Certificado de Análisis',
  ruoTitle: 'Solo para uso en investigación',
  ruoSubtitle: 'No apto para uso humano o veterinario',
  metaDocNo: 'N.º de doc.',
  metaRevision: 'Rev.',
  metaIssued: 'Emitido',
  sectionIdentification: 'Identificación del producto',
  sectionPhysicalChemical: 'Propiedades físicas y químicas',
  sectionAnalyticalData: 'Datos analíticos',
  sectionConclusion: 'Conclusión',
  fieldCatalogNo: 'N.º de catálogo',
  fieldCasNo: 'N.º CAS',
  fieldChemicalName: 'Nombre químico',
  fieldNetContent: 'Contenido neto por vial',
  fieldPackage: 'Configuración del envase',
  fieldBatchNo: 'N.º de lote',
  fieldManufactureDate: 'Fecha de fabricación',
  fieldRetestDate: 'Fecha de retesteo',
  fieldOrigin: 'País de origen',
  fieldMolecularFormula: 'Fórmula molecular',
  fieldMolecularWeight: 'Masa molecular',
  fieldAppearance: 'Aspecto',
  fieldSolubility: 'Solubilidad',
  fieldStorage: 'Condiciones de almacenamiento',
  fieldSequence: 'Secuencia de aminoácidos',
  storageLyo: 'Liofilizado: −20 °C / 36 meses · 4 °C / 24 meses · 15 °C / 3 meses',
  storageRecon: 'Reconstituido: −80 °C / 6 meses · −20 °C / 1 mes · 4 °C / 1 semana',
  notDetermined: 'No determinado',
  conforms: 'Conforme',
  pass: 'Cumple',
  fail: 'No cumple',
  tableParameter: 'Parámetro',
  tableMethod: 'Método',
  tableSpecification: 'Especificación',
  tableResult: 'Resultado',
  tableStatus: 'Estado',
  testAppearance: 'Aspecto',
  testIdentityMs: 'Identidad (masa)',
  testPurityHplc: 'Pureza (HPLC)',
  testSingleImpurity: 'Impureza individual (máx.)',
  testAaa: 'Composición de aminoácidos',
  testAcetate: 'Contenido de acetato',
  testTfa: 'Contenido de TFA',
  testWater: 'Contenido de agua',
  testNetPeptide: 'Contenido neto de péptido',
  testEndotoxin: 'Endotoxinas bacterianas',
  testBioburden: 'Carga microbiana',
  methodVisual: 'Inspección visual',
  methodCalc: 'Calculado (HPLC × AAA × H₂O × contraión)',
  specAppearance: 'Sólido liofilizado blanco a blanquecino',
  specConformsToTheoretical: 'Conforme a las proporciones teóricas',
  conclusionBody: (lot) =>
    `El lote <strong>${lot}</strong> se ha analizado mediante métodos analíticos validados y cumple con todas las especificaciones indicadas. Este lote queda <strong>liberado</strong> para distribución con fines de investigación.`,
  cautionBody:
    'Precaución: este producto se suministra exclusivamente para uso en investigación de laboratorio. Ninguna autoridad reguladora ha evaluado su seguridad o eficacia en humanos o animales. No apto para uso diagnóstico, terapéutico, alimentario ni cosmético. Manipular conforme a las buenas prácticas de laboratorio.',
  sigQc: 'Analista de Control de Calidad',
  sigQa: 'Aprobador de Aseguramiento de Calidad',
  sigDate: 'Fecha',
  footerContact: 'Contacto técnico',
  footerControl:
    'Documento controlado — la reproducción fuera del PDF original invalida este certificado.',
  footerPolicy: 'Ver política completa de CoA',
  download: 'Descargar PDF',
  countryEu: 'Unión Europea',
};

const dictionaries: Record<CoaLocale, CoaStrings> = { en, de, nl, fr, it, es };

export function getCoaStrings(locale: string | undefined): CoaStrings {
  const key = (locale ?? DEFAULT_LOCALE).toLowerCase() as CoaLocale;
  return dictionaries[key] ?? dictionaries[DEFAULT_LOCALE];
}

export function normalizeLocale(input: string | undefined | null): CoaLocale {
  const v = (input ?? '').toLowerCase();
  return (SUPPORTED_LOCALES as string[]).includes(v) ? (v as CoaLocale) : DEFAULT_LOCALE;
}
