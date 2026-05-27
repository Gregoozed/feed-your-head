import { useMemo, useState } from 'react';
import { ArrowUpRight, FileText, PlayCircle, MessageSquareQuote, Sparkles } from 'lucide-react';

// Type metadata: label + icon used on the badge.
const TYPE_META = {
  article: { label: 'Article', Icon: FileText },
  video: { label: 'Vidéo', Icon: PlayCircle },
  retex: { label: "Retour d'expérience", Icon: MessageSquareQuote },
  autre: { label: 'Autre', Icon: Sparkles },
};

function typeMeta(type) {
  return TYPE_META[type] ?? TYPE_META.autre;
}

export default function Ressources({ data }) {
  const intro = data?.intro ?? {};
  const items = data?.items ?? [];

  // Filter buttons: "Tout" + each type actually present, in a stable order.
  const presentTypes = useMemo(() => {
    const order = ['article', 'video', 'retex', 'autre'];
    const seen = new Set(items.map((i) => i.type ?? 'autre'));
    return order.filter((t) => seen.has(t));
  }, [items]);

  const [filter, setFilter] = useState('all');
  const visible =
    filter === 'all' ? items : items.filter((i) => (i.type ?? 'autre') === filter);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* header */}
        <div className="max-w-3xl">
          {intro.kicker && <span className="kicker">{intro.kicker}</span>}
          <h1 className="mt-6 font-display font-medium text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">
            {intro.heading}
          </h1>
          {intro.subtitle && (
            <p className="mt-6 text-mute text-lg leading-relaxed text-justify">{intro.subtitle}</p>
          )}
        </div>

        {/* filters */}
        {presentTypes.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-2">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
              Tout
            </FilterButton>
            {presentTypes.map((t) => (
              <FilterButton key={t} active={filter === t} onClick={() => setFilter(t)}>
                {typeMeta(t).label}
              </FilterButton>
            ))}
          </div>
        )}

        {/* grid */}
        {visible.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visible.map((item, i) => (
              <ResourceCard key={i} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-mute italic">Aucune ressource pour le moment.</p>
        )}
      </div>
    </section>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-forest text-cream'
          : 'bg-white border border-cream-dark text-mute hover:text-forest hover:border-ochre/50'
      }`}
    >
      {children}
    </button>
  );
}

function ResourceCard({ item }) {
  const { label, Icon } = typeMeta(item.type);
  const href = item.url || '#';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-cream-dark hover:border-ochre/40 hover:-translate-y-1 transition-all"
    >
      {/* thumbnail (or fallback) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-forest to-forest-light">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Icon
            size={48}
            strokeWidth={1.25}
            className="absolute inset-0 m-auto text-cream/40"
            aria-hidden="true"
          />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ochre text-forest px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
          <Icon size={13} aria-hidden="true" />
          {label}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-forest leading-snug">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-3 text-sm text-mute leading-relaxed text-justify flex-1">
            {item.description}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          {item.source && (
            <span className="text-xs uppercase tracking-wider text-mute/80 truncate">
              {item.source}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-forest group-hover:text-ochre transition-colors">
            Consulter
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
