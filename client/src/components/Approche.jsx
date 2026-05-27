export default function Approche({ data }) {
  const stats = data.stats ?? [];
  return (
    <section
      id="approche"
      className="relative grain bg-forest text-cream py-24 md:py-32"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <span className="kicker">L’approche</span>
          <h2 className="mt-6 font-display font-medium text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">
            {data.heading.line1}{' '}
            <em className="not-italic font-display italic text-ochre">
              {data.heading.line2Italic}
            </em>{' '}
            {data.heading.line3}
          </h2>
        </div>

        <div className="md:col-span-8 md:pt-4">
          <div className="space-y-6 text-cream/85 text-lg leading-relaxed max-w-2xl text-justify">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {stats.map((s, i) => (
              <div key={i} className="pt-6 border-t border-sage/40">
                <dt className="font-display text-4xl md:text-5xl text-ochre">
                  {s.number}
                </dt>
                <dd className="mt-2 text-sm text-cream/70 leading-snug">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
