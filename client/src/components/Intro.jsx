import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '../contexts/ContentContext.jsx';

const STORAGE_KEY = 'fyh-intro-seen';
const FADE_OUT_MS = 600;
const LOGO_URL = '/LOGO 1x1-03.svg';

const initialPhase = (intro) => {
  if (typeof window === 'undefined') return 'gone';
  if (!intro?.enabled) return 'gone';
  if (sessionStorage.getItem(STORAGE_KEY)) return 'gone';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'gone';
  return 'mounted';
};

const prepareSvg = (raw) => {
  const doc = new DOMParser().parseFromString(raw, 'image/svg+xml');
  const svg = doc.querySelector('svg');
  if (!svg) return '';

  svg.querySelector('rect')?.remove();

  const strokes = Array.from(svg.querySelectorAll('path.cls-2, path.cls-3'));
  strokes.forEach((el, i) => {
    el.setAttribute('pathLength', '1');
    el.style.animationDelay = `${80 + i * 50}ms`;
  });

  const fills = Array.from(svg.querySelectorAll('path.cls-4'));
  fills.forEach((el, i) => {
    el.style.animationDelay = `${1100 + i * 60}ms`;
  });

  return svg.outerHTML;
};

export default function Intro() {
  const settings = useSettings();
  const intro = settings?.intro;
  const brand = settings?.brand;
  const [phase, setPhase] = useState('pending');
  const [logoMarkup, setLogoMarkup] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (!intro) return;
    if (phase !== 'pending') return;
    setPhase(initialPhase(intro));
  }, [intro, phase]);

  useEffect(() => {
    let cancelled = false;
    fetch(LOGO_URL)
      .then((r) => r.text())
      .then((raw) => {
        if (!cancelled) setLogoMarkup(prepareSvg(raw));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'mounted' || !intro) return undefined;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fadeAt = Math.max(0, intro.durationMs - FADE_OUT_MS);
    const t = window.setTimeout(() => setPhase('fading'), fadeAt);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [phase, intro]);

  useEffect(() => {
    if (phase !== 'fading') return undefined;
    const t = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setPhase('gone');
    }, FADE_OUT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === 'gone' || phase === 'pending' || !intro || !brand) return null;

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setPhase('fading');
    window.setTimeout(() => setPhase('gone'), FADE_OUT_MS);
  };

  return (
    <div
      role="dialog"
      aria-label="Animation d’accueil"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest text-cream transition-opacity duration-500 ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <button
        type="button"
        onClick={dismiss}
        className="group absolute top-5 right-5 md:top-7 md:right-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cream/60 hover:text-ochre transition-colors"
      >
        {intro.skipLabel}
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>

      <div className="relative flex flex-col items-center gap-10">
        <div className="relative w-[170px] h-[170px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px]">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-ochre/25 blur-3xl"
            style={{ animation: 'logo-halo 2400ms ease-out 200ms forwards' }}
          />
          <div
            ref={containerRef}
            className="intro-logo absolute inset-0"
            style={{ animation: 'logo-float 4s ease-in-out 2.2s infinite' }}
            dangerouslySetInnerHTML={{ __html: logoMarkup }}
          />
        </div>

        <h1
          className="font-display font-medium text-cream text-3xl sm:text-4xl md:text-6xl tracking-tight whitespace-nowrap px-4 text-center"
          style={{
            opacity: 0,
            animation: 'wordmark-in 700ms cubic-bezier(0.4,0,0.2,1) 1900ms forwards',
          }}
        >
          {brand.name}
          <span className="text-ochre">.</span>
        </h1>
      </div>
    </div>
  );
}
