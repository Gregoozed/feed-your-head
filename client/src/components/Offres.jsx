import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

function TwelvMark({ className = '' }) {
  return (
    <span className={`font-display italic font-medium ${className}`}>
      Twelv<span className="text-ochre">.</span>
    </span>
  );
}

export default function Offres({ data }) {
  const {
    kicker = 'En partenariat avec Twelv',
    heading = { before: '4 offres.', italic: '1 ambition.' },
    subtitle = '',
    pitch = '',
    formulas = [],
    closer = '',
    cta,
  } = data || {};

  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);
  const tablistRef = useRef(null);

  const moveIndicator = () => {
    const btn = tabRefs.current[active];
    const list = tablistRef.current;
    if (!btn || !list) return;
    const listRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({
      left: btnRect.left - listRect.left + list.scrollLeft,
      width: btnRect.width,
    });
  };

  useLayoutEffect(() => {
    moveIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, formulas.length]);

  useEffect(() => {
    const onResize = () => moveIndicator();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const onKeyDown = (e) => {
    if (!formulas.length) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((i) => (i + 1) % formulas.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive((i) => (i - 1 + formulas.length) % formulas.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(formulas.length - 1);
    }
  };

  const current = formulas[active];

  return (
    <section
      id="offres"
      className="relative bg-cream text-forest py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ochre/50 bg-cream/60 backdrop-blur-sm px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-ochre">
            <span className="h-1.5 w-1.5 rounded-full bg-ochre animate-pulse" />
            En partenariat avec&nbsp;
            <TwelvMark className="normal-case tracking-normal text-ochre" />
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-forest">
            {heading.before}{' '}
            <em className="not-italic font-display italic text-ochre">{heading.italic}</em>
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg md:text-xl text-forest/75 font-display italic">
              {subtitle}
            </p>
          )}
          {pitch && (
            <p className="mt-6 text-mute leading-relaxed max-w-2xl mx-auto">{pitch}</p>
          )}
        </div>

        {/* tabs */}
        {formulas.length > 0 && (
          <>
            <div className="mt-14 flex justify-center">
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Formules du partenariat"
              onKeyDown={onKeyDown}
              className="relative inline-flex gap-1 max-w-full overflow-x-auto md:overflow-visible scrollbar-none border-b border-forest/10"
            >
              {formulas.map((f, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={i}
                    ref={(el) => (tabRefs.current[i] = el)}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`offres-panel-${i}`}
                    id={`offres-tab-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`group relative shrink-0 px-5 md:px-6 py-4 text-left transition-colors ${
                      isActive ? 'text-forest' : 'text-forest/40 hover:text-forest/70'
                    }`}
                  >
                    <span className="block font-display italic text-xl md:text-2xl leading-none">
                      {f.num}
                    </span>
                    <span className="mt-2 block text-[12px] md:text-sm font-medium max-w-[140px] md:max-w-[220px] leading-snug">
                      {f.title}
                    </span>
                    <span
                      className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        isActive
                          ? 'bg-ochre text-forest'
                          : 'bg-forest/5 text-forest/50 group-hover:bg-forest/10'
                      }`}
                    >
                      {f.duration}
                    </span>
                  </button>
                );
              })}
              <span
                aria-hidden="true"
                className="absolute bottom-0 h-[2px] bg-ochre transition-all duration-500 ease-out"
                style={{ left: indicator.left, width: indicator.width }}
              />
            </div>
            </div>

            {/* panel */}
            {current && (
              <div
                key={active}
                role="tabpanel"
                id={`offres-panel-${active}`}
                aria-labelledby={`offres-tab-${active}`}
                className="mt-12 md:mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 animate-[fade-in-up_350ms_cubic-bezier(0.16,1,0.3,1)]"
              >
                <div className="md:col-span-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-ochre">
                    Formule {current.num} · {current.duration}
                  </p>
                  <h3 className="mt-4 font-display italic text-5xl md:text-6xl text-ochre leading-none">
                    {current.verb}
                  </h3>
                  <p className="mt-3 text-forest/85 text-lg leading-relaxed text-justify">{current.verbDesc}</p>
                  <p className="mt-6 font-display italic text-mute text-lg">
                    {current.tagline}
                  </p>
                </div>

                <div className="md:col-span-7">
                  <h4 className="font-display text-2xl md:text-3xl text-forest">{current.title}</h4>
                  <ul className="mt-6 space-y-3">
                    {current.bullets?.map((b, i) => (
                      <li
                        key={i}
                        className="group flex items-start gap-3 text-forest/85"
                        style={{
                          animation: `fade-in-up 400ms cubic-bezier(0.16,1,0.3,1) ${
                            120 + i * 70
                          }ms both`,
                        }}
                      >
                        <ChevronRight
                          size={18}
                          className="mt-1 shrink-0 text-ochre transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed text-justify">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        {/* closer */}
        {closer && (
          <div className="mt-16 md:mt-20 relative grain rounded-3xl bg-forest text-cream px-6 md:px-12 py-10 md:py-14 text-center overflow-hidden">
            <p className="relative font-display italic text-2xl md:text-4xl leading-snug">
              {closer}
            </p>
          </div>
        )}

        {cta?.label && cta?.href && (
          <div className="mt-10 flex justify-center">
            <a
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-forest text-cream px-6 py-3 text-sm font-medium hover:bg-forest-light transition-colors"
            >
              {cta.label}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
