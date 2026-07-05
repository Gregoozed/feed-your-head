import { ArrowRight } from 'lucide-react';

export default function Offres({ data }) {
  const {
    kicker = 'Offres',
    heading = { before: 'Cinq domaines pour', italic: 'transformer', after: ' les RH.' },
    subtitle = '',
    items = [],
    cta,
  } = data || {};

  return (
    <section
      id="offres"
      className="relative grain bg-forest text-cream py-24 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10">
        {/* header */}
        <div className="max-w-3xl">
          {kicker && <span className="kicker">{kicker}</span>}
          <h2 className="mt-6 font-display font-medium text-4xl md:text-5xl lg:text-6xl leading-tight text-cream">
            {heading.before}{' '}
            <em className="not-italic font-display italic text-ochre">{heading.italic}</em>
            {heading.after}
          </h2>
          {subtitle && (
            <p className="mt-6 text-cream/75 text-lg leading-relaxed text-justify">{subtitle}</p>
          )}
        </div>

        {/* liste des domaines */}
        {items.length > 0 && (
          <ol className="mt-16 divide-y divide-cream/10 border-y border-cream/10">
            {items.map((it, i) => (
              <li
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 md:py-12"
                style={{
                  animation: `fade-in-up 500ms cubic-bezier(0.16,1,0.3,1) ${80 + i * 70}ms both`,
                }}
              >
                <div className="md:col-span-3">
                  <span
                    aria-hidden="true"
                    className="font-display italic text-ochre text-6xl md:text-7xl leading-none block"
                  >
                    {it.num}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl md:text-3xl text-cream leading-snug">
                    {it.title}
                  </h3>
                  {it.description && (
                    <p className="mt-4 text-cream/80 leading-relaxed text-justify">
                      {it.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* CTA */}
        {cta?.label && cta?.href && (
          <div className="mt-14 flex justify-center">
            <a
              href={cta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-ochre text-forest px-7 py-4 text-sm md:text-base font-medium hover:bg-ochre/90 transition-colors"
            >
              {cta.label}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
