import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function ScrollUI() {
  const [progress, setProgress] = useState(0);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setShowCta(y > window.innerHeight * 0.7 && y < max - 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-[3px] z-[60] pointer-events-none"
      >
        <div
          className="h-full bg-ochre origin-left transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <a
        href="#contact"
        aria-label="Prendre rendez-vous"
        className={`group fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-ochre text-white px-5 py-3 text-sm font-medium shadow-lg shadow-forest/20 hover:bg-ochre/90 hover:gap-3 transition-all duration-300 ${
          showCta
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <Calendar size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Prendre rendez-vous</span>
        <span className="sm:hidden">RDV</span>
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        />
      </a>
    </>
  );
}
