#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dictDir = join(root, 'src/i18n/dictionaries');

const additions = {
  en: {
    common: { home: 'Home' },
    shopPage: {
      metaTitle: 'Shop Research Peptides | Peptide Shop',
      metaDescription: 'Browse research-grade peptides by research area, use case, price and purity. HPLC verified, COA supported and sold for research use only.',
      eyebrow: 'Shop',
      title: 'Research peptide catalogue.',
      lead: 'Filter by research area or use case. Results are server-rendered and shareable by URL.',
      controls: 'Catalogue controls',
      filters: 'Filters',
      filtersActive: 'Filters (active)',
      showing: 'Showing {shown} of {total} products',
      sortLabel: 'Sort products',
      sortFeatured: 'Sort: Featured',
      sortPriceAsc: 'Price: Low to high',
      sortPriceDesc: 'Price: High to low',
      sortNameAsc: 'Name: A-Z',
      sortPurity: 'Purity',
      viewMode: 'View mode',
      grid: 'Grid',
      table: 'Table',
      activeFilters: 'Active filters',
      removeArea: 'Remove research-area filter',
      removeUseCase: 'Remove use-case filter',
      clearAll: 'Clear all',
      productFilters: 'Product filters',
      closeFilters: 'Close filters',
      noProducts: 'No matching products',
      noProductsHelp: 'Try clearing one or more filters, or contact us for a custom research request.',
      clearFilters: 'Clear filters',
      resultsCaption: 'Research peptide catalogue results',
      tableProduct: 'Product',
      tableArea: 'Area',
      tablePurity: 'Purity',
      tablePackage: 'Package',
      tablePrice: 'Price',
      tableAction: 'Action',
      viewProduct: 'View'
    },
    productPage: {
      catalogue: 'Catalogue',
      browseCatalogue: 'Browse catalogue',
      ruoHeading: 'For research use only.',
      ruoDetail: 'Products sold by Peptide Shop are intended for in-vitro laboratory research only. Not for human or veterinary diagnostic, therapeutic, cosmetic or consumption purposes.',
      imageAlt: '{product} product vial',
      qualityBadges: 'Product quality badges',
      coaSupported: 'COA supported',
      molecularWeight: 'Molecular weight',
      storage: 'Storage',
      packageSizes: 'Package sizes',
      browseArea: 'Browse {area}',
      purchaseOptions: 'Product purchase options',
      selectOptions: 'Select options',
      coaPolicyRequests: 'COA policy and requests',
      shippingDetails: 'Shipping details',
      detailSections: 'Product detail sections',
      description: 'Description',
      sequenceData: 'Sequence & data',
      coa: 'COA',
      faqs: 'FAQs',
      productId: 'Product ID',
      notAssigned: 'Not assigned',
      sequence: 'Sequence',
      storageHandling: 'Storage & handling',
      storageHandlingBody: 'Keep lyophilised material sealed and protected from moisture. Reconstituted materials should be handled according to validated laboratory protocols and disposed of as research waste.',
      certificate: 'Certificate of analysis',
      coaBody: 'Batch-specific COA documentation is supplied according to the COA policy and may include HPLC purity, identity and lot information where available.',
      downloadCoa: 'Download CoA (PDF)',
      previewHtml: 'Preview HTML',
      coaPolicy: 'COA policy',
      otherLanguages: 'Other languages',
      relatedEyebrow: 'Related products',
      relatedTitle: 'More from {area}',
      relatedFallbackArea: 'this research area'
    }
  },
  de: {
    common: { home: 'Startseite' },
    shopPage: {
      metaTitle: 'Forschungspeptide kaufen | Peptide Shop',
      metaDescription: 'Durchsuchen Sie Forschungspeptide nach Forschungsbereich, Anwendung, Preis und Reinheit. HPLC-verifiziert, COA-gestützt und nur für Forschungszwecke.',
      eyebrow: 'Shop', title: 'Katalog für Forschungspeptide.', lead: 'Filtern Sie nach Forschungsbereich oder Anwendung. Die Ergebnisse werden serverseitig gerendert und per URL geteilt.', controls: 'Katalogsteuerung', filters: 'Filter', filtersActive: 'Filter (aktiv)', showing: '{shown} von {total} Produkten angezeigt', sortLabel: 'Produkte sortieren', sortFeatured: 'Sortierung: Empfohlen', sortPriceAsc: 'Preis: aufsteigend', sortPriceDesc: 'Preis: absteigend', sortNameAsc: 'Name: A-Z', sortPurity: 'Reinheit', viewMode: 'Ansichtsmodus', grid: 'Raster', table: 'Tabelle', activeFilters: 'Aktive Filter', removeArea: 'Forschungsbereich-Filter entfernen', removeUseCase: 'Anwendungsfilter entfernen', clearAll: 'Alle löschen', productFilters: 'Produktfilter', closeFilters: 'Filter schließen', noProducts: 'Keine passenden Produkte', noProductsHelp: 'Löschen Sie einen oder mehrere Filter oder kontaktieren Sie uns für eine individuelle Forschungsanfrage.', clearFilters: 'Filter löschen', resultsCaption: 'Ergebnisse des Forschungspeptid-Katalogs', tableProduct: 'Produkt', tableArea: 'Bereich', tablePurity: 'Reinheit', tablePackage: 'Packung', tablePrice: 'Preis', tableAction: 'Aktion', viewProduct: 'Ansehen'
    },
    productPage: {
      catalogue: 'Katalog', browseCatalogue: 'Katalog durchsuchen', ruoHeading: 'Nur für Forschungszwecke.', ruoDetail: 'Produkte von Peptide Shop sind ausschließlich für In-vitro-Laborforschung bestimmt. Nicht für diagnostische, therapeutische, kosmetische Zwecke oder den Verzehr bei Menschen oder Tieren.', imageAlt: '{product} Produktvial', qualityBadges: 'Produktqualitätskennzeichnungen', coaSupported: 'COA verfügbar', molecularWeight: 'Molekulargewicht', storage: 'Lagerung', packageSizes: 'Packungsgrößen', browseArea: '{area} durchsuchen', purchaseOptions: 'Produkt-Kaufoptionen', selectOptions: 'Optionen auswählen', coaPolicyRequests: 'COA-Richtlinie und Anfragen', shippingDetails: 'Versanddetails', detailSections: 'Produktdetailbereiche', description: 'Beschreibung', sequenceData: 'Sequenz & Daten', coa: 'COA', faqs: 'FAQs', productId: 'Produkt-ID', notAssigned: 'Nicht zugewiesen', sequence: 'Sequenz', storageHandling: 'Lagerung & Handhabung', storageHandlingBody: 'Lyophilisiertes Material versiegelt und vor Feuchtigkeit geschützt lagern. Rekonstituierte Materialien gemäß validierten Laborprotokollen handhaben und als Forschungsabfall entsorgen.', certificate: 'Analysezertifikat', coaBody: 'Chargenspezifische COA-Dokumentation wird gemäß COA-Richtlinie bereitgestellt und kann, sofern verfügbar, HPLC-Reinheit, Identität und Chargeninformationen enthalten.', downloadCoa: 'CoA herunterladen (PDF)', previewHtml: 'HTML-Vorschau', coaPolicy: 'COA-Richtlinie', otherLanguages: 'Weitere Sprachen', relatedEyebrow: 'Ähnliche Produkte', relatedTitle: 'Mehr aus {area}', relatedFallbackArea: 'diesem Forschungsbereich'
    }
  },
  nl: {
    common: { home: 'Home' },
    shopPage: {
      metaTitle: 'Onderzoekspeptiden kopen | Peptide Shop', metaDescription: 'Bekijk onderzoekspeptiden per onderzoeksgebied, toepassing, prijs en zuiverheid. HPLC-geverifieerd, met COA en uitsluitend voor onderzoeksgebruik.', eyebrow: 'Shop', title: 'Catalogus voor onderzoekspeptiden.', lead: 'Filter op onderzoeksgebied of toepassing. Resultaten worden server-side gerenderd en zijn deelbaar via URL.', controls: 'Catalogusbediening', filters: 'Filters', filtersActive: 'Filters (actief)', showing: '{shown} van {total} producten getoond', sortLabel: 'Producten sorteren', sortFeatured: 'Sorteren: Uitgelicht', sortPriceAsc: 'Prijs: laag naar hoog', sortPriceDesc: 'Prijs: hoog naar laag', sortNameAsc: 'Naam: A-Z', sortPurity: 'Zuiverheid', viewMode: 'Weergavemodus', grid: 'Raster', table: 'Tabel', activeFilters: 'Actieve filters', removeArea: 'Onderzoeksgebiedfilter verwijderen', removeUseCase: 'Toepassingsfilter verwijderen', clearAll: 'Alles wissen', productFilters: 'Productfilters', closeFilters: 'Filters sluiten', noProducts: 'Geen overeenkomende producten', noProductsHelp: 'Wis een of meer filters of neem contact op voor een aangepaste onderzoeksaanvraag.', clearFilters: 'Filters wissen', resultsCaption: 'Resultaten van de onderzoekspeptidecatalogus', tableProduct: 'Product', tableArea: 'Gebied', tablePurity: 'Zuiverheid', tablePackage: 'Verpakking', tablePrice: 'Prijs', tableAction: 'Actie', viewProduct: 'Bekijken'
    },
    productPage: {
      catalogue: 'Catalogus', browseCatalogue: 'Catalogus bekijken', ruoHeading: 'Alleen voor onderzoeksgebruik.', ruoDetail: 'Producten van Peptide Shop zijn uitsluitend bedoeld voor in-vitro laboratoriumonderzoek. Niet voor humane of veterinaire diagnostische, therapeutische, cosmetische doeleinden of consumptie.', imageAlt: '{product} productflacon', qualityBadges: 'Kwaliteitsbadges product', coaSupported: 'COA beschikbaar', molecularWeight: 'Molecuulgewicht', storage: 'Opslag', packageSizes: 'Verpakkingsgroottes', browseArea: '{area} bekijken', purchaseOptions: 'Aankoopopties product', selectOptions: 'Opties selecteren', coaPolicyRequests: 'COA-beleid en aanvragen', shippingDetails: 'Verzenddetails', detailSections: 'Productdetails', description: 'Beschrijving', sequenceData: 'Sequentie & data', coa: 'COA', faqs: 'FAQ', productId: 'Product-ID', notAssigned: 'Niet toegewezen', sequence: 'Sequentie', storageHandling: 'Opslag & hantering', storageHandlingBody: 'Bewaar gevriesdroogd materiaal afgesloten en beschermd tegen vocht. Gereconstitueerde materialen moeten worden behandeld volgens gevalideerde laboratoriumprotocollen en als onderzoeksafval worden afgevoerd.', certificate: 'Analysecertificaat', coaBody: 'Batchspecifieke COA-documentatie wordt geleverd volgens het COA-beleid en kan, indien beschikbaar, HPLC-zuiverheid, identiteit en lotinformatie bevatten.', downloadCoa: 'CoA downloaden (PDF)', previewHtml: 'HTML-voorbeeld', coaPolicy: 'COA-beleid', otherLanguages: 'Andere talen', relatedEyebrow: 'Gerelateerde producten', relatedTitle: 'Meer uit {area}', relatedFallbackArea: 'dit onderzoeksgebied'
    }
  },
  fr: {
    common: { home: 'Accueil' },
    shopPage: {
      metaTitle: 'Acheter des peptides de recherche | Peptide Shop', metaDescription: 'Parcourez les peptides de qualité recherche par domaine, application, prix et pureté. Vérifiés HPLC, avec COA, réservés à la recherche.', eyebrow: 'Boutique', title: 'Catalogue de peptides de recherche.', lead: 'Filtrez par domaine de recherche ou application. Les résultats sont rendus côté serveur et partageables par URL.', controls: 'Commandes du catalogue', filters: 'Filtres', filtersActive: 'Filtres (actifs)', showing: '{shown} produits affichés sur {total}', sortLabel: 'Trier les produits', sortFeatured: 'Tri : Sélection', sortPriceAsc: 'Prix : croissant', sortPriceDesc: 'Prix : décroissant', sortNameAsc: 'Nom : A-Z', sortPurity: 'Pureté', viewMode: 'Mode d’affichage', grid: 'Grille', table: 'Tableau', activeFilters: 'Filtres actifs', removeArea: 'Retirer le filtre domaine de recherche', removeUseCase: 'Retirer le filtre application', clearAll: 'Tout effacer', productFilters: 'Filtres produits', closeFilters: 'Fermer les filtres', noProducts: 'Aucun produit correspondant', noProductsHelp: 'Essayez de retirer un ou plusieurs filtres, ou contactez-nous pour une demande de recherche personnalisée.', clearFilters: 'Effacer les filtres', resultsCaption: 'Résultats du catalogue de peptides de recherche', tableProduct: 'Produit', tableArea: 'Domaine', tablePurity: 'Pureté', tablePackage: 'Conditionnement', tablePrice: 'Prix', tableAction: 'Action', viewProduct: 'Voir'
    },
    productPage: {
      catalogue: 'Catalogue', browseCatalogue: 'Parcourir le catalogue', ruoHeading: 'Réservé à la recherche.', ruoDetail: 'Les produits vendus par Peptide Shop sont destinés uniquement à la recherche in vitro en laboratoire. Non destinés à des usages diagnostiques, thérapeutiques, cosmétiques, vétérinaires ou à la consommation.', imageAlt: 'Flacon du produit {product}', qualityBadges: 'Badges qualité du produit', coaSupported: 'COA disponible', molecularWeight: 'Masse moléculaire', storage: 'Stockage', packageSizes: 'Formats', browseArea: 'Parcourir {area}', purchaseOptions: 'Options d’achat du produit', selectOptions: 'Sélectionner les options', coaPolicyRequests: 'Politique COA et demandes', shippingDetails: 'Détails de livraison', detailSections: 'Sections détaillées du produit', description: 'Description', sequenceData: 'Séquence et données', coa: 'COA', faqs: 'FAQ', productId: 'ID produit', notAssigned: 'Non attribué', sequence: 'Séquence', storageHandling: 'Stockage et manipulation', storageHandlingBody: 'Conserver le matériau lyophilisé fermé et protégé de l’humidité. Les matériaux reconstitués doivent être manipulés selon des protocoles de laboratoire validés et éliminés comme déchets de recherche.', certificate: 'Certificat d’analyse', coaBody: 'La documentation COA propre à chaque lot est fournie conformément à la politique COA et peut inclure, si disponible, la pureté HPLC, l’identité et les informations de lot.', downloadCoa: 'Télécharger le CoA (PDF)', previewHtml: 'Aperçu HTML', coaPolicy: 'Politique COA', otherLanguages: 'Autres langues', relatedEyebrow: 'Produits associés', relatedTitle: 'Plus de {area}', relatedFallbackArea: 'ce domaine de recherche'
    }
  },
  it: {
    common: { home: 'Home' },
    shopPage: {
      metaTitle: 'Acquista peptidi per ricerca | Peptide Shop', metaDescription: 'Sfoglia peptidi per ricerca per area, applicazione, prezzo e purezza. Verificati HPLC, con COA e solo per uso di ricerca.', eyebrow: 'Shop', title: 'Catalogo di peptidi per ricerca.', lead: 'Filtra per area di ricerca o applicazione. I risultati sono renderizzati lato server e condivisibili via URL.', controls: 'Controlli catalogo', filters: 'Filtri', filtersActive: 'Filtri (attivi)', showing: 'Mostrati {shown} di {total} prodotti', sortLabel: 'Ordina prodotti', sortFeatured: 'Ordina: In evidenza', sortPriceAsc: 'Prezzo: crescente', sortPriceDesc: 'Prezzo: decrescente', sortNameAsc: 'Nome: A-Z', sortPurity: 'Purezza', viewMode: 'Modalità vista', grid: 'Griglia', table: 'Tabella', activeFilters: 'Filtri attivi', removeArea: 'Rimuovi filtro area di ricerca', removeUseCase: 'Rimuovi filtro applicazione', clearAll: 'Cancella tutto', productFilters: 'Filtri prodotto', closeFilters: 'Chiudi filtri', noProducts: 'Nessun prodotto corrispondente', noProductsHelp: 'Prova a rimuovere uno o più filtri, oppure contattaci per una richiesta di ricerca personalizzata.', clearFilters: 'Cancella filtri', resultsCaption: 'Risultati del catalogo peptidi per ricerca', tableProduct: 'Prodotto', tableArea: 'Area', tablePurity: 'Purezza', tablePackage: 'Formato', tablePrice: 'Prezzo', tableAction: 'Azione', viewProduct: 'Vedi'
    },
    productPage: {
      catalogue: 'Catalogo', browseCatalogue: 'Sfoglia catalogo', ruoHeading: 'Solo per uso di ricerca.', ruoDetail: 'I prodotti venduti da Peptide Shop sono destinati esclusivamente alla ricerca di laboratorio in vitro. Non per uso diagnostico, terapeutico, cosmetico, veterinario o consumo umano.', imageAlt: 'Flaconcino prodotto {product}', qualityBadges: 'Badge qualità prodotto', coaSupported: 'COA disponibile', molecularWeight: 'Peso molecolare', storage: 'Conservazione', packageSizes: 'Formati', browseArea: 'Sfoglia {area}', purchaseOptions: 'Opzioni di acquisto prodotto', selectOptions: 'Seleziona opzioni', coaPolicyRequests: 'Politica COA e richieste', shippingDetails: 'Dettagli spedizione', detailSections: 'Sezioni dettagli prodotto', description: 'Descrizione', sequenceData: 'Sequenza e dati', coa: 'COA', faqs: 'FAQ', productId: 'ID prodotto', notAssigned: 'Non assegnato', sequence: 'Sequenza', storageHandling: 'Conservazione e manipolazione', storageHandlingBody: 'Conservare il materiale liofilizzato sigillato e protetto dall’umidità. I materiali ricostituiti devono essere gestiti secondo protocolli di laboratorio validati e smaltiti come rifiuti di ricerca.', certificate: 'Certificato di analisi', coaBody: 'La documentazione COA specifica per lotto viene fornita secondo la politica COA e può includere, ove disponibile, purezza HPLC, identità e informazioni sul lotto.', downloadCoa: 'Scarica CoA (PDF)', previewHtml: 'Anteprima HTML', coaPolicy: 'Politica COA', otherLanguages: 'Altre lingue', relatedEyebrow: 'Prodotti correlati', relatedTitle: 'Altro da {area}', relatedFallbackArea: 'questa area di ricerca'
    }
  },
  es: {
    common: { home: 'Inicio' },
    shopPage: {
      metaTitle: 'Comprar péptidos de investigación | Peptide Shop', metaDescription: 'Explora péptidos de grado investigación por área, aplicación, precio y pureza. Verificados por HPLC, con COA y solo para investigación.', eyebrow: 'Tienda', title: 'Catálogo de péptidos de investigación.', lead: 'Filtra por área de investigación o aplicación. Los resultados se renderizan en servidor y se pueden compartir por URL.', controls: 'Controles del catálogo', filters: 'Filtros', filtersActive: 'Filtros (activos)', showing: 'Mostrando {shown} de {total} productos', sortLabel: 'Ordenar productos', sortFeatured: 'Ordenar: Destacados', sortPriceAsc: 'Precio: menor a mayor', sortPriceDesc: 'Precio: mayor a menor', sortNameAsc: 'Nombre: A-Z', sortPurity: 'Pureza', viewMode: 'Modo de vista', grid: 'Cuadrícula', table: 'Tabla', activeFilters: 'Filtros activos', removeArea: 'Eliminar filtro de área de investigación', removeUseCase: 'Eliminar filtro de aplicación', clearAll: 'Borrar todo', productFilters: 'Filtros de producto', closeFilters: 'Cerrar filtros', noProducts: 'No hay productos coincidentes', noProductsHelp: 'Prueba a borrar uno o más filtros, o contáctanos para una solicitud de investigación personalizada.', clearFilters: 'Borrar filtros', resultsCaption: 'Resultados del catálogo de péptidos de investigación', tableProduct: 'Producto', tableArea: 'Área', tablePurity: 'Pureza', tablePackage: 'Formato', tablePrice: 'Precio', tableAction: 'Acción', viewProduct: 'Ver'
    },
    productPage: {
      catalogue: 'Catálogo', browseCatalogue: 'Explorar catálogo', ruoHeading: 'Solo para uso en investigación.', ruoDetail: 'Los productos vendidos por Peptide Shop están destinados únicamente a investigación de laboratorio in vitro. No son para fines diagnósticos, terapéuticos, cosméticos, veterinarios ni para consumo humano.', imageAlt: 'Vial del producto {product}', qualityBadges: 'Indicadores de calidad del producto', coaSupported: 'COA disponible', molecularWeight: 'Peso molecular', storage: 'Almacenamiento', packageSizes: 'Formatos', browseArea: 'Explorar {area}', purchaseOptions: 'Opciones de compra del producto', selectOptions: 'Seleccionar opciones', coaPolicyRequests: 'Política COA y solicitudes', shippingDetails: 'Detalles de envío', detailSections: 'Secciones de detalle del producto', description: 'Descripción', sequenceData: 'Secuencia y datos', coa: 'COA', faqs: 'FAQ', productId: 'ID de producto', notAssigned: 'No asignado', sequence: 'Secuencia', storageHandling: 'Almacenamiento y manipulación', storageHandlingBody: 'Mantener el material liofilizado sellado y protegido de la humedad. Los materiales reconstituidos deben manipularse según protocolos de laboratorio validados y eliminarse como residuos de investigación.', certificate: 'Certificado de análisis', coaBody: 'La documentación COA específica de lote se suministra según la política COA y puede incluir, cuando esté disponible, pureza HPLC, identidad e información de lote.', downloadCoa: 'Descargar CoA (PDF)', previewHtml: 'Vista previa HTML', coaPolicy: 'Política COA', otherLanguages: 'Otros idiomas', relatedEyebrow: 'Productos relacionados', relatedTitle: 'Más de {area}', relatedFallbackArea: 'esta área de investigación'
    }
  }
};

function merge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = merge(target[key] ?? {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

for (const [locale, patch] of Object.entries(additions)) {
  const path = join(root, 'src/i18n/dictionaries', `${locale}.json`);
  const current = JSON.parse(readFileSync(path, 'utf8'));
  const next = merge(current, patch);
  writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
}
