import { ArrowUpRight, Sparkles, Users, Compass } from 'lucide-react';
import FeedYourCrewMindMap from './FeedYourCrewMindMap.jsx';

// Icônes tournantes pour les 3 features (par ordre) — si l'utilisateur en
// ajoute une 4ᵉ ou +, on retombe sur Sparkles.
const FEATURE_ICONS = [Users, Compass, Sparkles];

export default function FeedYourCrew({ data }) {
  const {
    kicker = 'Notre outil',
    heading = { before: 'Anticiper avec', italic: 'Feed Your Crew' },
    tagline = '',
    paragraphs = [],
    features = [],
    cta,
    logoUrl = '',
  } = data || {};

  return (
    <section id="feedyourcrew" className="bg-cream py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Éditorial */}
          <div className="md:col-span-5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Feed Your Crew"
                className="h-10 w-auto mb-6"
              />
            ) : (
              <span className="inline-block font-display italic text-ochre text-lg mb-6">
                Feed Your Crew<span className="text-forest">.</span>
              </span>
            )}

            {kicker && <span className="kicker">{kicker}</span>}

            <h2 className="mt-4 font-display font-medium text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">
              {heading.before}{' '}
              <em className="not-italic font-display italic text-ochre">{heading.italic}</em>
            </h2>

            {tagline && (
              <p className="mt-4 font-display italic text-mute text-lg md:text-xl">{tagline}</p>
            )}

            {paragraphs.length > 0 && (
              <div className="mt-6 space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-mute leading-relaxed text-justify">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {features.length > 0 && (
              <ul className="mt-8 space-y-3">
                {features.map((f, i) => {
                  const Icon = FEATURE_ICONS[i] ?? Sparkles;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg bg-ochre/15 text-ochre">
                        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="leading-snug">
                        <span className="block font-medium text-forest">{f.title}</span>
                        {f.description && (
                          <span className="block text-sm text-mute">{f.description}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {cta?.label && cta?.href && (
              <a
                href={cta.href}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-forest text-cream px-7 py-4 text-sm md:text-base font-medium hover:bg-forest-light transition-all"
              >
                {cta.label}
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>

          {/* Mindmap */}
          <div className="md:col-span-7">
            <FeedYourCrewMindMap />
            <p className="mt-4 text-center text-[11px] italic text-mute">
              Outil d'aide à la décision. La décision relève du responsable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
