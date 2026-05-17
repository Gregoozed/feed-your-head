export default function References({ data }) {
  const intro = data.intro;
  const items = data.items ?? [];
  const loop = [...items, ...items];

  return (
    <section
      id="references"
      aria-label="Références"
      className="relative bg-forest text-cream py-14 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10 md:mb-12">
        <span className="kicker">{intro.kicker}</span>
        <p className="mt-4 font-display text-xl md:text-2xl text-cream max-w-2xl leading-snug">
          {intro.heading}
        </p>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 md:w-24 bg-gradient-to-r from-forest to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 md:w-24 bg-gradient-to-l from-forest to-transparent" />

        <div className="flex gap-12 md:gap-20 marquee-track">
          {loop.map((item, i) => (
            <Logo key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Logo({ item }) {
  if (item.logoUrl) {
    return (
      <div className="flex-shrink-0 h-12 md:h-14 flex items-center">
        <img
          src={item.logoUrl}
          alt={item.name}
          className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
        />
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 h-12 md:h-14 flex items-center">
      <span
        aria-label={item.name}
        className="font-display text-2xl md:text-3xl tracking-tight text-cream/40 hover:text-ochre transition-colors whitespace-nowrap"
      >
        {item.name}
      </span>
    </div>
  );
}
