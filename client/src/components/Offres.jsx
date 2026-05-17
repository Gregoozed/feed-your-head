import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function Offres({ data }) {
  const intro = data.intro;
  const items = data.items ?? [];
  return (
    <section id="offres" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="kicker">Les offres</span>
            <h2 className="mt-6 font-display font-medium text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">
              {intro.heading.before}{' '}
              <em className="not-italic font-display italic text-ochre">
                {intro.heading.italic}
              </em>{' '}
              {intro.heading.after}
            </h2>
          </div>
          <p className="md:col-span-5 text-mute text-base md:text-lg leading-relaxed">
            {intro.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((o, i) => (
            <article
              key={i}
              className="group bg-white border border-cream-dark rounded-3xl p-8 md:p-9 transition-all duration-300 hover:-translate-y-1 hover:border-ochre/40 hover:shadow-[0_20px_60px_-30px_rgba(26,58,46,0.25)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-display italic text-sage text-2xl">{o.num}</span>
                <ArrowUpRight size={22} className="text-ochre transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="mt-8 font-display text-2xl md:text-3xl text-forest leading-snug">{o.title}</h3>
              <p className="mt-4 text-mute leading-relaxed">{o.description}</p>
              <ul className="mt-8 space-y-3">
                {(o.bullets ?? []).map((b, j) => (
                  <li key={j} className="flex items-center gap-3 pt-3 border-t border-cream-dark text-sm text-ink">
                    <ChevronRight size={16} className="text-ochre flex-shrink-0" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
