export default function Methode({ data }) {
  const intro = data.intro;
  const steps = data.steps ?? [];
  return (
    <section id="methode" className="bg-cream-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="kicker">La méthode</span>
          <h2 className="mt-6 font-display font-medium text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">
            {intro.heading.before}{' '}
            <em className="not-italic font-display italic text-ochre">
              {intro.heading.italic}
            </em>
          </h2>
          <p className="mt-6 text-mute text-lg leading-relaxed">{intro.subtitle}</p>
        </div>

        <div className="relative mt-16 md:mt-20">
          <div aria-hidden="true" className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-sage/50" />
          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <li key={i} className="text-center md:text-left">
                <div className="flex md:block justify-center">
                  <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest text-ochre font-display text-lg ring-8 ring-cream-dark">
                    {step.num}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl md:text-2xl text-forest">{step.title}</h3>
                <p className="mt-3 text-sm md:text-base text-mute leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
