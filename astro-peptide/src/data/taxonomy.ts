// Research-area + use-case taxonomy.
// Authoritative source for /catalog/ hub navigation, mega-menu, and product mapping.

export type ResearchAreaSlug =
  | 'neuroscience'
  | 'cardiovascular'
  | 'diabetes'
  | 'cancer-apoptosis'
  | 'adhesion-ecm'
  | 'cell-tissue'
  | 'immunology'
  | 'epigenetics'
  | 'hormones'
  | 'cell-signaling'
  | 'protein-analysis'
  | 'cell-permeable';

export interface ResearchArea {
  slug: ResearchAreaSlug;
  name: string;
  short: string;
  description: string;
  icon: string; // simple identifier matched in the hub template
  keywords: string[];
}

export const researchAreas: ResearchArea[] = [
  {
    slug: 'neuroscience',
    name: 'Neuroscience & CNS',
    short: 'CNS, neuroprotection, cognition',
    description:
      'Reference peptides used in cognition, neuroprotection and CNS receptor studies — including nootropic candidates and sleep-related neuropeptides.',
    icon: 'brain',
    keywords: ['nootropic peptides', 'CNS research peptides', 'neuroprotective peptides'],
  },
  {
    slug: 'cardiovascular',
    name: 'Cardiovascular & Vascular',
    short: 'Endothelial, vascular tone, repair',
    description:
      'Peptides referenced in cardiovascular, endothelial-repair and vascular-tone research models.',
    icon: 'heart-pulse',
    keywords: ['cardiovascular research peptides', 'vascular repair peptides'],
  },
  {
    slug: 'diabetes',
    name: 'Diabetes & Metabolism',
    short: 'Glucose, insulin, GLP-1 / GIP / GCG',
    description:
      'GLP-1, GIP and dual/triple agonist reference compounds, plus insulin-sensitisation and adipocyte-metabolism candidates used in metabolic-disease research.',
    icon: 'droplet',
    keywords: ['GLP-1 research peptides', 'metabolic research peptides', 'incretin research'],
  },
  {
    slug: 'cancer-apoptosis',
    name: 'Cancer & Apoptosis',
    short: 'Apoptosis, anti-proliferative pathways',
    description:
      'Peptide reagents used in tumour-suppressor, apoptosis-induction and anti-proliferative cell-line work.',
    icon: 'shield',
    keywords: ['cancer research peptides', 'apoptosis assay peptides'],
  },
  {
    slug: 'adhesion-ecm',
    name: 'Adhesion & ECM',
    short: 'Cell adhesion, ECM & wound models',
    description:
      'Peptides involved in cell-adhesion, extracellular-matrix and wound-repair research.',
    icon: 'layers',
    keywords: ['cell adhesion peptides', 'ECM research peptides', 'wound healing peptide research'],
  },
  {
    slug: 'cell-tissue',
    name: 'Cell & Tissue Repair',
    short: 'Regeneration, gastric, tendon repair',
    description:
      'Reference peptides used in tendon, gastric and connective-tissue repair models.',
    icon: 'activity',
    keywords: ['tissue repair peptides', 'BPC-157 research', 'TB-500 research'],
  },
  {
    slug: 'immunology',
    name: 'Immunology',
    short: 'Innate / adaptive immunity, cytokines',
    description:
      'Immune-modulating reference peptides used in cytokine and innate/adaptive-immunity research.',
    icon: 'shield-check',
    keywords: ['immunomodulatory peptides', 'immunology research peptides'],
  },
  {
    slug: 'epigenetics',
    name: 'Epigenetics & Longevity',
    short: 'Telomere, sirtuin & chronobiology',
    description:
      'Reference compounds used in epigenetic-ageing, telomere and circadian-rhythm research.',
    icon: 'infinity',
    keywords: ['epitalon research', 'longevity peptides', 'epigenetic research peptides'],
  },
  {
    slug: 'hormones',
    name: 'Hormones & Growth Factors',
    short: 'GH, GHRH, ghrelin, melanocortin',
    description:
      'Growth-hormone, GHRH-analog, ghrelin-mimetic and melanocortin reference peptides for endocrinology research.',
    icon: 'flask',
    keywords: ['GHRP research peptides', 'GHRH research peptides', 'melanocortin research'],
  },
  {
    slug: 'cell-signaling',
    name: 'Cell Signaling',
    short: 'GPCR, kinase & second-messenger probes',
    description:
      'Peptide ligands and probes used to study receptor activation and downstream signalling pathways.',
    icon: 'radio',
    keywords: ['GPCR ligand peptides', 'signaling research peptides'],
  },
  {
    slug: 'protein-analysis',
    name: 'Protein Analysis & Standards',
    short: 'MS standards, controls, fragments',
    description:
      'Reference fragments and standards for mass-spectrometry, ELISA-control and protein-quantitation workflows.',
    icon: 'beaker',
    keywords: ['mass spec peptide standards', 'reference peptides'],
  },
  {
    slug: 'cell-permeable',
    name: 'Cell-Permeable & Cofactors',
    short: 'NAD⁺ precursors, cofactor analogs',
    description:
      'Cell-permeable cofactors and NAD⁺-pathway research compounds used in mitochondrial and metabolic studies.',
    icon: 'zap',
    keywords: ['NAD+ research', 'cofactor research compounds'],
  },
];

export type UseCaseSlug =
  | 'weight-loss'
  | 'muscle-recovery'
  | 'cognitive'
  | 'anti-aging'
  | 'tanning';

export interface UseCase {
  slug: UseCaseSlug;
  name: string;
  description: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'weight-loss',
    name: 'Weight-loss research',
    description:
      'GLP-1, GIP, glucagon and amylin agonist reference peptides used in weight-loss and metabolic-disease research.',
  },
  {
    slug: 'muscle-recovery',
    name: 'Muscle & tissue recovery research',
    description:
      'Reference peptides used in tendon, ligament and muscle-recovery research models.',
  },
  {
    slug: 'cognitive',
    name: 'Cognitive research',
    description:
      'Nootropic and CNS-active reference peptides used in cognition, neuroprotection and stress-response research.',
  },
  {
    slug: 'anti-aging',
    name: 'Longevity & anti-ageing research',
    description:
      'Telomere-related, growth-factor and NAD⁺-pathway reference compounds used in longevity research.',
  },
  {
    slug: 'tanning',
    name: 'Pigmentation research',
    description:
      'Melanocortin-receptor reference peptides used in pigmentation and photoprotection research.',
  },
];

export function getResearchArea(slug: string): ResearchArea | undefined {
  return researchAreas.find((a) => a.slug === slug);
}

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}
