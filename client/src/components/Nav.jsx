import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSettings } from '../contexts/ContentContext.jsx';
import Logo from './Logo.jsx';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const settings = useSettings();
  if (!settings) return null;
  const { brand, nav } = settings;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-cream/80 backdrop-blur-md border-b border-cream-dark/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" aria-label={brand.name} className="flex items-center text-forest">
          {/* full lockup on tablet/desktop */}
          <Logo variant="lockup" className="hidden sm:block h-9 w-auto" />
          {/* mark only on mobile */}
          <Logo variant="mark" className="sm:hidden h-9 w-9" />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-mute hover:text-forest transition-colors"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ochre transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-forest text-cream px-5 py-2.5 text-sm font-medium hover:bg-forest-light transition-colors"
          >
            Échanger
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-forest p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream-dark/60 bg-cream">
          <div className="px-6 py-6 flex flex-col gap-5">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base text-ink hover:text-ochre transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest text-cream px-5 py-3 text-sm font-medium"
            >
              Échanger
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
