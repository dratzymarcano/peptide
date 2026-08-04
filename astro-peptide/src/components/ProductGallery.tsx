import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Product image viewer.
 *
 * The image is the thing a shopper looks at first, so it gets the largest
 * single element on the page, a hover/press zoom, and a full-screen lightbox.
 * Everything is driven by pointer position rather than controls, so there is
 * no UI to read.
 */
interface ProductGalleryProps {
  images: string[];
  alt: string;
  labels?: {
    zoomHint?: string;
    close?: string;
    previous?: string;
    next?: string;
    viewLarger?: string;
    thumbnailFor?: string;
  };
}

export default function ProductGallery({ images, alt, labels }: ProductGalleryProps) {
  const shots = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  // `document` is unavailable during SSR, so the portal only mounts client-side.
  const [mounted, setMounted] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const text = {
    zoomHint: labels?.zoomHint ?? 'Hover to zoom · click to enlarge',
    close: labels?.close ?? 'Close image viewer',
    previous: labels?.previous ?? 'Previous image',
    next: labels?.next ?? 'Next image',
    viewLarger: labels?.viewLarger ?? 'View larger image',
    thumbnailFor: labels?.thumbnailFor ?? 'View image',
  };

  const step = useCallback(
    (delta: number) => setActive((current) => (current + delta + shots.length) % shots.length),
    [shots.length],
  );

  // Pointer-driven magnification: transform-origin follows the cursor so the
  // area under the pointer is the area that grows.
  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  useEffect(() => {
    if (!lightbox) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(false);
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox, step]);

  if (shots.length === 0) return null;

  return (
    <div className="pgallery">
      <div
        ref={frameRef}
        className="pgallery__frame"
        onMouseMove={handleMove}
        onMouseLeave={() => setOrigin(null)}
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        aria-label={text.viewLarger}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setLightbox(true);
          }
        }}
      >
        <img
          src={shots[active]}
          alt={alt}
          width="1200"
          height="1200"
          decoding="async"
          fetchPriority="high"
          style={
            origin
              ? { transform: 'scale(1.75)', transformOrigin: `${origin.x}% ${origin.y}%` }
              : undefined
          }
        />
        <span className="pgallery__hint" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.2-3.2M11 8.5v5M8.5 11h5" />
          </svg>
          {text.zoomHint}
        </span>
      </div>

      {shots.length > 1 && (
        <div className="pgallery__thumbs">
          {shots.map((shot, index) => (
            <button
              key={shot}
              type="button"
              className={`pgallery__thumb${index === active ? ' is-active' : ''}`}
              aria-label={`${text.thumbnailFor} ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
            >
              <img src={shot} alt="" width="120" height="120" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}

      {/*
        Portalled to <body>. The gallery sits inside a `position: sticky`
        column, and sticky always creates a stacking context — which trapped
        the overlay beneath the sticky header no matter how high its z-index
        went. Rendering outside that subtree is the only reliable fix.
      */}
      {lightbox && mounted && createPortal(
        <div className="pgallery__lightbox" role="dialog" aria-modal="true" aria-label={alt}>
          {/* Backdrop first in DOM so it paints under the controls without a
              negative z-index, which escaped the stacking context and let the
              sticky header (z-index 10011) show through the overlay. */}
          <div className="pgallery__backdrop" onClick={() => setLightbox(false)} />
          <button ref={closeRef} type="button" className="pgallery__close" onClick={() => setLightbox(false)} aria-label={text.close}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {shots.length > 1 && (
            <button type="button" className="pgallery__nav pgallery__nav--prev" onClick={() => step(-1)} aria-label={text.previous}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
          )}
          <img className="pgallery__full" src={shots[active]} alt={alt} />
          {shots.length > 1 && (
            <button type="button" className="pgallery__nav pgallery__nav--next" onClick={() => step(1)} aria-label={text.next}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}
