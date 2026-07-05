import { useEffect, useRef } from 'react';
import { Monitor, Users, MessageCircle, ArrowLeftRight } from 'lucide-react';

// Adaptation React du mindmap Feed Your Crew : deux colonnes (Diagnostics à
// gauche, Solutions à droite) reliées par des courbes SVG à un hub central.
// Le contenu est stable (structure produit FYC), donc en dur.

const DIAG_COLOR = '#3f5e50'; // forest tinted for diagnostic accents
const SOL_COLOR = '#c47a28'; // ochre for solutions

const DIAGNOSTICS = [
  {
    Icon: Monitor,
    title: 'Diagnostic Tech & Organisation',
    body: (
      <>
        On analyse les outils métier (s'ils existent) et leur usage, les méthodes RH et les process.
        Livrable : un <strong className="text-forest">diagnostic</strong> clair et une{' '}
        <strong className="text-forest">feuille de route</strong>.
      </>
    ),
  },
  {
    Icon: Users,
    title: 'Diagnostic RH',
    body: (
      <>
        Risque de départ, criticité des savoirs, dynamiques d'équipe et besoins humains —
        structurés pour décider sur des faits.
      </>
    ),
  },
];

const SOLUTIONS = [
  {
    Icon: MessageCircle,
    accent: DIAG_COLOR,
    title: 'Accompagnement RH',
    body: (
      <>
        Développement professionnel (mentoring, tutoring), formation, coaching individuel &
        collectif, ateliers, conduite du changement, entretiens.
      </>
    ),
  },
  {
    Icon: ArrowLeftRight,
    accent: SOL_COLOR,
    title: 'Transmission des savoirs',
    body: (
      <>
        Le savoir critique passe d'une génération à l'autre —{' '}
        <strong className="text-forest">avant</strong> qu'il ne parte. Transmission
        intergénérationnelle, en partenariat avec la plateforme{' '}
        <a
          href="https://twelv.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ochre underline underline-offset-2 decoration-ochre/40 hover:decoration-ochre"
        >
          Twelv
        </a>
        .
      </>
    ),
  },
];

export default function FeedYourCrewMindMap() {
  const mapRef = useRef(null);
  const hubRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const svgRef = useRef(null);
  const leftPathRef = useRef(null);
  const rightPathRef = useRef(null);

  useEffect(() => {
    const draw = () => {
      const map = mapRef.current;
      const svg = svgRef.current;
      const hub = hubRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!map || !svg || !hub || !left || !right) return;

      const m = map.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${m.width} ${m.height}`);
      const h = hub.getBoundingClientRect();
      const hcx = h.left + h.width / 2;
      const hcy = h.top + h.height / 2;
      const vertical = window.innerWidth <= 860;

      const themes = [
        { el: left, path: leftPathRef.current },
        { el: right, path: rightPathRef.current },
      ];

      themes.forEach(({ el, path }) => {
        if (!path) return;
        const r = el.getBoundingClientRect();
        let d;
        if (vertical) {
          const sx = hcx - m.left;
          const sy = h.top - m.top;
          const ex = r.left + r.width / 2 - m.left;
          const ey = r.top - m.top;
          const my = (sy + ey) / 2;
          d = `M ${sx} ${sy} C ${sx} ${my} ${ex} ${my} ${ex} ${ey}`;
        } else if (r.left + r.width / 2 < hcx) {
          // left side
          const sx = h.left - m.left;
          const sy = hcy - m.top;
          const ex = r.right - m.left;
          const ey = r.top + r.height / 2 - m.top;
          const mx = (sx + ex) / 2;
          d = `M ${sx} ${sy} C ${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`;
        } else {
          const sx = h.right - m.left;
          const sy = hcy - m.top;
          const ex = r.left - m.left;
          const ey = r.top + r.height / 2 - m.top;
          const mx = (sx + ex) / 2;
          d = `M ${sx} ${sy} C ${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`;
        }
        path.setAttribute('d', d);
      });
    };

    draw();
    const t = setTimeout(draw, 300); // relayout after fonts/icons
    window.addEventListener('resize', draw, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', draw);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="relative grid items-center gap-7 md:gap-x-12 md:grid-cols-[1fr_minmax(180px,220px)_1fr]"
    >
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible pointer-events-none z-0"
      >
        <path
          ref={leftPathRef}
          fill="none"
          stroke={DIAG_COLOR}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          ref={rightPathRef}
          fill="none"
          stroke={SOL_COLOR}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* DIAGNOSTICS — order 2 mobile, 1 desktop */}
      <section
        ref={leftRef}
        className="relative z-10 grid gap-3.5 order-2 md:order-1"
      >
        <div>
          <span className="inline-block rounded-full border border-sage/40 bg-sage/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
            Diagnostics
          </span>
          <p className="mt-2 text-xs text-mute">Comprendre la situation, sur des faits.</p>
        </div>
        {DIAGNOSTICS.map(({ Icon, title, body }, i) => (
          <MindNode key={i} Icon={Icon} accent={DIAG_COLOR} title={title}>
            {body}
          </MindNode>
        ))}
      </section>

      {/* HUB — order 1 mobile, 2 desktop */}
      <div
        ref={hubRef}
        className="relative z-10 rounded-[22px] p-6 text-center text-cream shadow-[0_18px_40px_-24px_rgba(26,58,46,0.5)] order-1 md:order-2 mx-auto md:mx-0 max-w-[420px] md:max-w-none w-full"
        style={{
          backgroundImage:
            'radial-gradient(130% 130% at 70% -10%, #244c3a 0%, #1a3a2e 60%, #13271d 100%)',
        }}
      >
        <svg viewBox="0 0 32 32" width="64" height="64" aria-hidden="true" className="mx-auto mb-2 block">
          <g stroke="#7a9b8a" strokeWidth="1.4" strokeLinecap="round">
            <line x1="16" y1="15.5" x2="7" y2="10" />
            <line x1="16" y1="15.5" x2="25" y2="8" />
            <line x1="16" y1="15.5" x2="27" y2="20" />
            <line x1="16" y1="15.5" x2="21" y2="27" />
            <line x1="16" y1="15.5" x2="10" y2="25" />
          </g>
          <g fill="#cfe0d6">
            <circle cx="7" cy="10" r="2.6" />
            <circle cx="25" cy="8" r="2.2" />
            <circle cx="27" cy="20" r="2.8" />
            <circle cx="21" cy="27" r="2.4" />
            <circle cx="10" cy="25" r="2" />
          </g>
          <circle cx="16" cy="15.5" r="3.7" fill="#c47a28" stroke="#f5f1ea" strokeWidth="1" />
        </svg>
        <div className="font-display text-2xl leading-none text-white">
          Feed Your <em className="not-italic italic text-ochre">Crew</em>
        </div>
        <p className="mt-3 text-sm leading-snug text-cream/85">
          Aide à la décision RH pour anticiper les départs en termes de savoirs.
        </p>
      </div>

      {/* SOLUTIONS — order 3 both */}
      <section
        ref={rightRef}
        className="relative z-10 grid gap-3.5 order-3"
      >
        <div>
          <span className="inline-block rounded-full border border-ochre/40 bg-ochre/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ochre">
            Solutions complémentaires
          </span>
          <p className="mt-2 text-xs text-mute">Déployer les bons leviers, ensemble.</p>
        </div>
        {SOLUTIONS.map(({ Icon, accent, title, body }, i) => (
          <MindNode key={i} Icon={Icon} accent={accent} title={title}>
            {body}
          </MindNode>
        ))}
      </section>
    </div>
  );
}

function MindNode({ Icon, accent, title, children }) {
  return (
    <article
      className="rounded-2xl border border-cream-dark bg-white/70 p-4 shadow-[0_18px_40px_-24px_rgba(26,58,46,0.35)] transition-transform hover:-translate-y-0.5"
      style={{ borderLeft: `5px solid ${accent}` }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="grid h-8 w-8 flex-none place-items-center rounded-[10px]"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <h3 className="font-display text-base leading-tight text-forest">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-mute">{children}</p>
    </article>
  );
}
