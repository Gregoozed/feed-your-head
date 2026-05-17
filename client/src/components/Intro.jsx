import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '../contexts/ContentContext.jsx';

const STORAGE_KEY = 'fyh-intro-seen';
const FADE_OUT_MS = 500;

const initialPhase = (intro) => {
  if (typeof window === 'undefined') return 'gone';
  if (!intro?.enabled) return 'gone';
  if (sessionStorage.getItem(STORAGE_KEY)) return 'gone';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'gone';
  return 'mounted';
};

export default function Intro() {
  const settings = useSettings();
  const intro = settings?.intro;
  const brand = settings?.brand;
  const [phase, setPhase] = useState('pending');

  // Initialise phase une fois que les settings sont chargés.
  useEffect(() => {
    if (!intro) return;
    if (phase !== 'pending') return;
    setPhase(initialPhase(intro));
  }, [intro, phase]);

  useEffect(() => {
    if (phase !== 'mounted' || !intro) return undefined;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fadeAt = Math.max(0, intro.durationMs - FADE_OUT_MS);
    const t1 = window.setTimeout(() => setPhase('fading'), fadeAt);
    const t2 = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setPhase('gone');
    }, intro.durationMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = prev;
    };
  }, [phase, intro]);

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
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
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

      <div className="relative w-[200px] h-[230px] md:w-[240px] md:h-[270px] flex items-end justify-center">
        <svg
          viewBox="0 0 140 160"
          width="100%"
          height="100%"
          aria-hidden="true"
          className="overflow-visible"
          style={{
            animation: 'plant-fade-out 500ms ease-in-out 1.9s forwards',
          }}
        >
          {/* sol — ligne discrète */}
          <line
            x1="20"
            y1="130"
            x2="120"
            y2="130"
            stroke="#7a9b8a"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.4"
          />

          {/* graine */}
          <ellipse
            cx="70"
            cy="128"
            rx="6"
            ry="8"
            fill="#c47a28"
            style={{
              transformOrigin: '70px 128px',
              animation: 'seed-drop 500ms cubic-bezier(0.16,1,0.3,1) 200ms both',
            }}
          />

          {/* tige */}
          <line
            x1="70"
            y1="128"
            x2="70"
            y2="60"
            stroke="#c47a28"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              transformOrigin: '70px 128px',
              animation:
                'stem-grow 800ms cubic-bezier(0.16,1,0.3,1) 700ms both',
            }}
          />

          {/* feuille gauche */}
          <path
            d="M70 78 Q 50 70, 42 56 Q 56 58, 70 76 Z"
            fill="#c47a28"
            style={{
              transformOrigin: '70px 76px',
              animation: 'leaf-appear 500ms cubic-bezier(0.16,1,0.3,1) 1300ms both',
            }}
          />

          {/* feuille droite */}
          <path
            d="M70 70 Q 90 62, 98 48 Q 84 50, 70 68 Z"
            fill="#c47a28"
            style={{
              transformOrigin: '70px 68px',
              animation: 'leaf-appear 500ms cubic-bezier(0.16,1,0.3,1) 1500ms both',
            }}
          />
        </svg>

        <h1
          className="absolute inset-0 flex items-center justify-center font-display font-medium text-cream text-4xl md:text-6xl tracking-tight whitespace-nowrap"
          style={{
            opacity: 0,
            animation: 'wordmark-in 700ms cubic-bezier(0.4,0,0.2,1) 2200ms forwards',
          }}
        >
          {brand.name}
          <span className="text-ochre">.</span>
        </h1>
      </div>
    </div>
  );
}
