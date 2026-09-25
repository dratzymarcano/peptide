import React, { useState, useId } from 'react';
import { addCartItem } from '../scripts/cartStore';

interface SyringeConfig {
  name: string;
  volumeMl: number;
  totalUnits: number;
  stepUnits: number;
}

const SYRINGE_TYPES: Record<string, SyringeConfig> = {
  u100: { name: 'U-100 (1,0 ml – 100 Einheiten)', volumeMl: 1.0, totalUnits: 100, stepUnits: 10 },
  u50: { name: 'U-50 (0,5 ml – 50 Einheiten)', volumeMl: 0.5, totalUnits: 50, stepUnits: 5 },
  u30: { name: 'U-30 (0,3 ml – 30 Einheiten)', volumeMl: 0.3, totalUnits: 30, stepUnits: 5 },
};

export default function PeptideCalculator() {
  const [vialMg, setVialMg] = useState<number>(5);
  const [waterMl, setWaterMl] = useState<number>(2);
  const [doseMcg, setDoseMcg] = useState<number>(250);
  const [syringeKey, setSyringeKey] = useState<string>('u100');
  const [addedBac, setAddedBac] = useState<boolean>(false);

  const vialInputId = useId();
  const waterInputId = useId();
  const doseInputId = useId();
  const syringeSelectId = useId();

  const syringe = SYRINGE_TYPES[syringeKey] || SYRINGE_TYPES.u100;

  // Math:
  // Total vial mcg = vialMg * 1000
  // Concentration = (vialMg * 1000) / waterMl (mcg per ml)
  // Required volume in ml = doseMcg / concentration = doseMcg / ((vialMg * 1000) / waterMl)
  // Syringe units = (required volume in ml / syringe.volumeMl) * syringe.totalUnits
  // Since 1 unit in U-100 = 0.01 ml, units = required volume in ml * 100.
  const concentrationMcgPerMl = waterMl > 0 ? (vialMg * 1000) / waterMl : 0;
  const volumePerDoseMl = concentrationMcgPerMl > 0 ? doseMcg / concentrationMcgPerMl : 0;
  const unitsNeeded = volumePerDoseMl * 100;
  const totalDosesPerVial = doseMcg > 0 ? Math.floor((vialMg * 1000) / doseMcg) : 0;
  const mcgPerUnit = unitsNeeded > 0 ? doseMcg / unitsNeeded : 0;

  const isOverSyringeCapacity = unitsNeeded > syringe.totalUnits;
  const clampedUnits = Math.min(Math.max(unitsNeeded, 0), syringe.totalUnits);

  const handleAddBacWater = () => {
    addCartItem({
      id: 'bacteriostatic-water',
      title: 'Bakteriostatisches Wasser (30 ml)',
      price: 14.9,
      thumb_src: '/images/products/bacteriostatic-water.webp',
      thumb_alt: 'Bakteriostatisches Wasser 30ml für Peptidforschung',
      quantity: 1,
    });
    setAddedBac(true);
    setTimeout(() => setAddedBac(false), 3000);
  };

  return (
    <div className="calc-card card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid var(--color-surface-border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        
        {/* INPUTS COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor={vialInputId} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
              <span>1. Peptidmenge im Fläschchen</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{vialMg} mg</span>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {[2, 5, 10, 15].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setVialMg(mg)}
                  style={{
                    flex: 1,
                    padding: '0.45rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: vialMg === mg ? 'var(--color-primary)' : 'var(--color-surface-border)',
                    background: vialMg === mg ? 'var(--color-primary-subtle, #EFF8FC)' : '#ffffff',
                    color: vialMg === mg ? 'var(--color-primary)' : 'var(--color-ink-2)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {mg} mg
                </button>
              ))}
            </div>
            <input
              id={vialInputId}
              type="number"
              min="0.1"
              step="0.5"
              value={vialMg || ''}
              onChange={(e) => setVialMg(parseFloat(e.target.value) || 0)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--color-surface-border)', fontFamily: 'var(--font-mono)' }}
              placeholder="Benutzerdefinierte Menge in mg"
            />
          </div>

          <div>
            <label htmlFor={waterInputId} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
              <span>2. Zugefügtes BAC-Wasser</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{waterMl} ml</span>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {[1, 2, 3, 5].map((ml) => (
                <button
                  key={ml}
                  type="button"
                  onClick={() => setWaterMl(ml)}
                  style={{
                    flex: 1,
                    padding: '0.45rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: waterMl === ml ? 'var(--color-primary)' : 'var(--color-surface-border)',
                    background: waterMl === ml ? 'var(--color-primary-subtle, #EFF8FC)' : '#ffffff',
                    color: waterMl === ml ? 'var(--color-primary)' : 'var(--color-ink-2)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {ml} ml
                </button>
              ))}
            </div>
            <input
              id={waterInputId}
              type="number"
              min="0.1"
              step="0.5"
              value={waterMl || ''}
              onChange={(e) => setWaterMl(parseFloat(e.target.value) || 0)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--color-surface-border)', fontFamily: 'var(--font-mono)' }}
              placeholder="Wassermenge in ml"
            />
          </div>

          <div>
            <label htmlFor={doseInputId} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
              <span>3. Gewünschte Forschungsdosis</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{doseMcg} mcg ({(doseMcg / 1000).toFixed(2)} mg)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginBottom: '0.5rem' }}>
              {[100, 250, 500, 1000].map((mcg) => (
                <button
                  key={mcg}
                  type="button"
                  onClick={() => setDoseMcg(mcg)}
                  style={{
                    padding: '0.45rem 0.2rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: doseMcg === mcg ? 'var(--color-primary)' : 'var(--color-surface-border)',
                    background: doseMcg === mcg ? 'var(--color-primary-subtle, #EFF8FC)' : '#ffffff',
                    color: doseMcg === mcg ? 'var(--color-primary)' : 'var(--color-ink-2)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {mcg >= 1000 ? `${mcg / 1000} mg` : `${mcg} mcg`}
                </button>
              ))}
            </div>
            <input
              id={doseInputId}
              type="number"
              min="10"
              step="50"
              value={doseMcg || ''}
              onChange={(e) => setDoseMcg(parseFloat(e.target.value) || 0)}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--color-surface-border)', fontFamily: 'var(--font-mono)' }}
              placeholder="Dosis in Mikrogramm (mcg)"
            />
          </div>

          <div>
            <label htmlFor={syringeSelectId} style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
              4. Verwendeter Spritzentyp
            </label>
            <select
              id={syringeSelectId}
              value={syringeKey}
              onChange={(e) => setSyringeKey(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: '8px', border: '1px solid var(--color-surface-border)', fontSize: '0.9rem', color: 'var(--color-ink)', background: '#ffffff' }}
            >
              {Object.entries(SYRINGE_TYPES).map(([k, s]) => (
                <option key={k} value={k}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS & VISUAL SYRINGE COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          
          <div style={{ background: '#090E1A', color: '#ffffff', padding: '1.25rem', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10B981', fontWeight: 700 }}>
              Ergebnis / Aufzieh-Menge
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.4rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                {unitsNeeded > 0 ? unitsNeeded.toFixed(1) : '0'}
              </span>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#94A3B8' }}>
                Einheiten (IU) / {volumePerDoseMl.toFixed(3)} ml
              </span>
            </div>
            {isOverSyringeCapacity && (
              <p style={{ margin: '0.5rem 0 0', color: '#EF4444', fontSize: '0.8rem', fontWeight: 600 }}>
                ⚠️ Achtung: Benötigte Dosis ({unitsNeeded.toFixed(1)} IE) übersteigt das Volumen dieser Spritze ({syringe.totalUnits} IE). Reduzieren Sie die Wassermenge oder wählen Sie eine größere Spritze.
              </p>
            )}
          </div>

          {/* VISUAL SVG SYRINGE */}
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B', marginBottom: '0.5rem', fontWeight: 600 }}>
              <span>Skala: 0 bis {syringe.totalUnits} Einheiten</span>
              <span style={{ color: 'var(--color-primary)' }}>Markierung: {unitsNeeded.toFixed(1)} IE</span>
            </div>

            {/* Syringe SVG Graphic */}
            <div style={{ width: '100%', overflowX: 'auto', padding: '0.5rem 0' }}>
              <svg viewBox="0 0 420 70" style={{ width: '100%', minWidth: '340px', height: 'auto', display: 'block' }}>
                <defs>
                  <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0077B6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Needle & Hub */}
                <path d="M 10 35 L 45 35" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="45,26 55,29 55,41 45,44" fill="#0077B6" />

                {/* Syringe Barrel (Length: 300px, x: 55 to 355) */}
                <rect x="55" y="16" width="300" height="38" rx="3" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.5" />
                
                {/* Finger flange */}
                <rect x="353" y="10" width="6" height="50" rx="2" fill="#94A3B8" />

                {/* Fluid fill according to clampedUnits / totalUnits */}
                {clampedUnits > 0 && (
                  <rect
                    x="55"
                    y="17.5"
                    width={Math.min((clampedUnits / syringe.totalUnits) * 300, 300)}
                    height="35"
                    fill="url(#liquidGrad)"
                    style={{ transition: 'width 0.3s ease' }}
                  />
                )}

                {/* Graduation ticks */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const tickX = 55 + (i / 10) * 300;
                  const tickUnit = (i / 10) * syringe.totalUnits;
                  return (
                    <g key={i}>
                      <line x1={tickX} y1="16" x2={tickX} y2="26" stroke="#475569" strokeWidth="1.2" />
                      <text x={tickX} y="12" fontSize="7" fill="#475569" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">
                        {tickUnit}
                      </text>
                    </g>
                  );
                })}

                {/* Half ticks */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const tickX = 55 + (i + 0.5) * (300 / 10);
                  return (
                    <line key={i} x1={tickX} y1="16" x2={tickX} y2="22" stroke="#94A3B8" strokeWidth="0.8" />
                  );
                })}

                {/* Plunger Rubber Head Indicator */}
                {clampedUnits >= 0 && (
                  <g style={{ transform: `translateX(${(clampedUnits / syringe.totalUnits) * 300}px)`, transition: 'transform 0.3s ease' }}>
                    {/* Rubber stopper */}
                    <rect x="53" y="17.5" width="8" height="35" rx="1.5" fill="#0F172A" />
                    {/* Plunger rod going out to the right */}
                    <rect x="61" y="32" width="60" height="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.5" />
                    {/* Plunger thumb top */}
                    <rect x="120" y="24" width="4" height="22" rx="1" fill="#94A3B8" />

                    {/* Target highlight marker line */}
                    <line x1="55" y1="14" x2="55" y2="56" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* TELEMETRY SPECS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Konzentration</span>
              <strong style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
                {concentrationMcgPerMl.toFixed(0)} mcg/ml
              </strong>
            </div>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Dosen pro Vial</span>
              <strong style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
                {totalDosesPerVial} Dosen
              </strong>
            </div>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>1 Einheit entspricht</span>
              <strong style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
                {mcgPerUnit.toFixed(1)} mcg
              </strong>
            </div>
            <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Spritzenvolumen</span>
              <strong style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink)' }}>
                {syringe.volumeMl} ml ({syringe.totalUnits} IE)
              </strong>
            </div>
          </div>

          {/* QUICK CROSS-SELL BUTTON */}
          <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.88rem', color: '#065F46' }}>Bakteriostatisches Wasser benötigt?</strong>
              <span style={{ fontSize: '0.8rem', color: '#047857' }}>Reinstes Rekonstitutionswasser 30 ml (0,9 % Benzylalkohol)</span>
            </div>
            <button
              type="button"
              onClick={handleAddBacWater}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: addedBac ? '#059669' : '#047857',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {addedBac ? '✓ Im Warenkorb (14,90 €)' : '+ In den Warenkorb (14,90 €)'}
            </button>
          </div>

        </div>

      </div>

      {/* PROTOCOL GUIDELINES */}
      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-surface-border)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--color-ink)' }}>
          Wissenschaftlicher Standard für die Rekonstitution (RUO)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontSize: '0.88rem', color: 'var(--color-ink-2)' }}>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '0.25rem' }}>1. Sanftes Einfließenlassen</strong>
            Nadel an die Glasinnenwand anlegen. Durch das Vakuum wird das Lösungsmittel langsam eingesaugt.
          </div>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '0.25rem' }}>2. Niemals schütteln</strong>
            Peptidketten sind mechanisch empfindlich. Fläschchen sanft zwischen den Handflächen rollen, bis die Lösung klar ist.
          </div>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
            <strong style={{ color: 'var(--color-ink)', display: 'block', marginBottom: '0.25rem' }}>3. Kaltlagerung</strong>
            Nach Rekonstitution sofort bei 2–8 °C lagern. Vor direkter UV-Strahlung schützen.
          </div>
        </div>
      </div>
    </div>
  );
}
