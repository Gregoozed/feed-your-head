import { Quote } from 'lucide-react';

export default function Temoignages({ data }) {
  const intro = data.intro;
  const items = data.items ?? [];
  return (
    <section id="temoignages" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="kicker">Ils en parlent</span>
          <h2 className="mt-6 font-display font-medium text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">
            {intro.heading.before}{' '}
            <em className="not-italic font-display italic text-ochre">
              {intro.heading.italic}
            </em>
          </h2>
          <p className="mt-6 text-mute text-lg leading-relaxed text-justify">{intro.subtitle}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((t, i) => (
            <figure key={i} className="bg-forest text-cream rounded-3xl p-8 md:p-9 flex flex-col">
              <Quote size={36} className="text-ochre" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="mt-6 font-display italic text-lg md:text-xl leading-snug text-cream/95 flex-1">
                « {t.verbatim} »
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-sage/30 flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-ochre text-forest font-medium text-sm">
                  {t.initials}
                </span>
                <span className="text-sm leading-tight">
                  <span className="block font-medium text-cream">{t.name}</span>
                  <span className="block text-cream/70">{t.role} · {t.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
