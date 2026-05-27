import { ArrowRight, ArrowDown } from 'lucide-react';
import HeroNetwork from './HeroNetwork.jsx';
import { useSettings } from '../contexts/ContentContext.jsx';

export default function Hero({ data }) {
  const settings = useSettings();
  const baseline = settings?.brand?.baseline ?? '';

  return (
    <section
      id="top"
      className="relative grain overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7 z-10">
          <span className="kicker">{baseline}</span>

          <h1 className="mt-6 font-display font-medium text-forest text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] sm:leading-[0.95] tracking-tight">
            {data.title.before}{' '}
            <em className="not-italic font-display italic text-ochre">
              {data.title.italic}
            </em>{' '}
            {data.title.after}
          </h1>

          <p className="mt-8 text-lg md:text-xl text-mute max-w-xl leading-relaxed text-justify">
            {data.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={data.ctaPrimary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-forest text-cream px-7 py-4 text-sm md:text-base font-medium hover:bg-forest-light transition-all"
            >
              {data.ctaPrimary.label}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={data.ctaSecondary.href}
              className="group inline-flex items-center gap-2 rounded-full border border-forest/40 text-forest px-7 py-4 text-sm md:text-base font-medium hover:bg-forest hover:text-cream hover:border-forest transition-all"
            >
              {data.ctaSecondary.label}
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-5 relative z-10">
          <div className="relative max-w-md mx-auto md:mx-0">
            <div aria-hidden="true" className="absolute -top-6 -right-6 w-full h-full border-2 border-ochre rounded-tl-[40%] rounded-tr-[10%] rounded-bl-[10%] rounded-br-[40%]" />
            <div className="relative aspect-[4/5] bg-gradient-to-br from-forest to-forest-light rounded-tl-[40%] rounded-tr-[10%] rounded-bl-[10%] rounded-br-[40%] overflow-hidden">
              <HeroNetwork />
              <div className="absolute inset-0 grain pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
