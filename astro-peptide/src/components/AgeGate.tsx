import { useEffect, useState } from 'react';

const STORAGE_KEY = 'peptide-age-verified';

interface AgeGateLabels {
  title: string;
  body: string;
  legalNote: string;
  confirm: string;
  deny: string;
  exitHref?: string;
}

interface AgeGateProps {
  labels: AgeGateLabels;
}

export default function AgeGate({ labels }: AgeGateProps) {
  // SSR-safe neutral state: render nothing until mount.
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const verified = localStorage.getItem(STORAGE_KEY) === 'true';
      if (!verified) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!mounted || !open) return null;

  function confirm() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  function deny() {
    window.location.href = labels.exitHref || 'https://www.google.com/';
  }

  return (
    <div
      className="age-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-body"
    >
      <div className="age-gate__backdrop" aria-hidden="true" />
      <div className="age-gate__panel">
        <span className="age-gate__badge" aria-hidden="true">18+</span>
        <h2 id="age-gate-title">{labels.title}</h2>
        <p id="age-gate-body">{labels.body}</p>
        <p className="age-gate__legal">{labels.legalNote}</p>
        <div className="age-gate__actions">
          <button type="button" className="btn btn-primary btn-block" onClick={confirm}>
            {labels.confirm}
          </button>
          <button type="button" className="btn btn-ghost btn-block" onClick={deny}>
            {labels.deny}
          </button>
        </div>
      </div>
      <style>{`
        .age-gate {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .age-gate__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(3, 4, 94, 0.78);
          backdrop-filter: blur(6px);
        }
        .age-gate__panel {
          position: relative;
          max-width: 460px;
          width: 100%;
          background: #fff;
          color: var(--color-ink, #0B132B);
          border-radius: 16px;
          padding: 28px 24px 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          text-align: center;
        }
        .age-gate__badge {
          display: inline-block;
          padding: 4px 12px;
          background: #03045E;
          color: #fff;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 999px;
          font-size: 13px;
          margin-bottom: 12px;
        }
        .age-gate__panel h2 {
          margin: 0 0 8px;
          font-size: 22px;
          line-height: 1.25;
        }
        .age-gate__panel p {
          margin: 0 0 12px;
          font-size: 15px;
          line-height: 1.45;
          color: #334155;
        }
        .age-gate__legal {
          font-size: 12px !important;
          color: #64748B !important;
          margin: 12px 0 18px !important;
        }
        .age-gate__actions {
          display: grid;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
