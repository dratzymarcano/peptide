/**
 * Real lot data registry for Certificates of Analysis.
 *
 * A CoA is a laboratory record. Nothing in this module invents one: every
 * value rendered onto a certificate must originate from an actual analytical
 * report supplied by the testing laboratory and transcribed into
 * `src/data/coa-lots.json`. Products with no entry render a
 * "certificate available on request" page instead of a certificate.
 *
 * This replaces an earlier implementation that derived batch numbers, purity
 * results, water/acetate content and QC/QA signatory names from a hash of the
 * product slug. Those documents were indistinguishable from genuine
 * certificates and are not recoverable as a data source — the registry starts
 * empty and is filled in from real reports.
 *
 * To publish a certificate:
 *   1. Obtain the analytical report for the lot from the testing laboratory.
 *   2. Add an entry keyed by product slug to src/data/coa-lots.json.
 *   3. Transcribe every result verbatim. Do not round, infer or backfill.
 *   4. Run `npm run coa:check` to validate the entry before building.
 */
import rawLots from '../../data/coa-lots.json';

/** One analytical determination as reported by the laboratory. */
export interface CoaResultRow {
  /** Test performed, e.g. "Purity (HPLC)". Free text, shown verbatim. */
  parameter: string;
  /** Analytical method, e.g. "RP-HPLC, 220 nm". */
  method: string;
  /** Release specification, e.g. "≥ 99.0 %". */
  specification: string;
  /** Reported result, e.g. "99.994 %". Transcribe exactly as reported. */
  result: string;
  /** Whether the reported result met the specification. */
  status: 'pass' | 'fail';
  /** Right-align the specification/result cells for numeric values. */
  numeric?: boolean;
}

/** The laboratory that performed the analysis. */
export interface CoaLaboratory {
  /** Registered lab name, e.g. "Janoshik Analytical s.r.o.". */
  name: string;
  /** City and country of the testing site. */
  location: string;
  /** Optional accreditation reference, e.g. "ISO/IEC 17025:2017". */
  accreditation?: string;
  /** Optional public URL for the lab's own copy of the report. */
  reportUrl?: string;
  /** The lab's own report/reference number. */
  reportNumber?: string;
}

/** A signatory who actually approved the certificate. */
export interface CoaSignatory {
  /** Full name as it appears on the laboratory report. */
  name: string;
  /** Role, e.g. "Quality Control Analyst". */
  role: string;
  /** ISO date the signatory approved the document. */
  date: string;
}

export interface CoaLot {
  /** Manufacturer batch/lot number exactly as printed on the vial label. */
  batchNo: string;
  /** Internal document number for this certificate. */
  docNo: string;
  /** Document revision, e.g. "1.0". */
  revision: string;
  /** ISO date the certificate was issued. */
  issuedDate: string;
  /** ISO date of manufacture. */
  manufactureDate: string;
  /** ISO date by which the lot must be retested. */
  retestDate: string;
  /** Country/region of manufacture, shown in the identification block. */
  origin?: string;
  /** The laboratory that produced the analytical data. */
  laboratory: CoaLaboratory;
  /** Analytical results, rendered in the order given. */
  results: CoaResultRow[];
  /** Real people who approved the document. Omit if the lab report is unsigned. */
  signatories?: CoaSignatory[];
}

type LotRegistry = Record<string, CoaLot[]>;

const REQUIRED_LOT_FIELDS: (keyof CoaLot)[] = [
  'batchNo',
  'docNo',
  'revision',
  'issuedDate',
  'manufactureDate',
  'retestDate',
  'laboratory',
  'results',
];

/**
 * Validate a candidate lot record. Returns the list of problems found; an
 * empty list means the record is safe to render onto a certificate.
 */
export function validateLot(slug: string, lot: unknown, index: number): string[] {
  const problems: string[] = [];
  const where = `${slug}[${index}]`;

  if (typeof lot !== 'object' || lot === null) {
    return [`${where}: expected an object`];
  }
  const candidate = lot as Partial<CoaLot>;

  for (const field of REQUIRED_LOT_FIELDS) {
    if (candidate[field] === undefined || candidate[field] === null || candidate[field] === '') {
      problems.push(`${where}.${field}: required`);
    }
  }

  if (candidate.laboratory) {
    if (!candidate.laboratory.name) problems.push(`${where}.laboratory.name: required`);
    if (!candidate.laboratory.location) problems.push(`${where}.laboratory.location: required`);
  }

  if (candidate.results !== undefined) {
    if (!Array.isArray(candidate.results) || candidate.results.length === 0) {
      problems.push(`${where}.results: expected a non-empty array of analytical results`);
    } else {
      candidate.results.forEach((row, rowIndex) => {
        for (const field of ['parameter', 'method', 'specification', 'result'] as const) {
          if (!row?.[field]) problems.push(`${where}.results[${rowIndex}].${field}: required`);
        }
        if (row?.status !== 'pass' && row?.status !== 'fail') {
          problems.push(`${where}.results[${rowIndex}].status: must be "pass" or "fail"`);
        }
      });
    }
  }

  for (const field of ['issuedDate', 'manufactureDate', 'retestDate'] as const) {
    const value = candidate[field];
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      problems.push(`${where}.${field}: expected an ISO date (YYYY-MM-DD), got "${value}"`);
    }
  }

  return problems;
}

const registry = rawLots as LotRegistry;

/** Every lot on record for a product, newest issue date first. */
export function getLotsForProduct(slug: string): CoaLot[] {
  const lots = registry[slug];
  if (!Array.isArray(lots)) return [];
  return [...lots].sort((a, b) => (a.issuedDate < b.issuedDate ? 1 : -1));
}

/**
 * The lot a bare /coa/<slug> URL resolves to: the most recently issued one.
 * Returns null when no real analytical data exists for the product, which is
 * the signal to render the "available on request" page instead.
 */
export function getCurrentLot(slug: string): CoaLot | null {
  return getLotsForProduct(slug)[0] ?? null;
}

/** Slugs that currently have at least one valid lot on record. */
export function productsWithLots(): string[] {
  return Object.keys(registry).filter((slug) => getLotsForProduct(slug).length > 0);
}

export { registry as lotRegistry };
