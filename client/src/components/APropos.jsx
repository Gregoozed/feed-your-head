export default function APropos({ data }) {
  const portraitUrl = data.portraitUrl || '/Virginie_1.jpeg';
  return (
    <section id="apropos" className="relative grain bg-forest text-cream py-24 md:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5 order-2 md:order-1">
          <div className="relative max-w-sm mx-auto md:mx-0">
            <div aria-hidden="true" className="absolute -inset-3 rounded-full border border-ochre/40" />
            <div className="relative aspect-square rounded-full bg-forest-light overflow-hidden">
              <img
                src={portraitUrl}
                alt={`Portrait de ${data.heading.name}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 grain pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="md:col-span-7 order-1 md:order-2">
          <span className="kicker">À propos</span>
          <h2 className="mt-6 font-display font-medium text-cream text-4xl md:text-5xl lg:text-6xl leading-tight">
            {data.heading.name}
            <br />
            <em className="not-italic font-display italic text-ochre">
              {data.heading.italic}
            </em>
          </h2>
          <div className="mt-8 space-y-5 text-cream/85 text-lg leading-relaxed max-w-2xl">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
