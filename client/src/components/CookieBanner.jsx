import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const STORAGE_KEY = 'fyh-cookie-ack';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Information cookies"
      className="fixed bottom-4 inset-x-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md z-[90]"
    >
      <div className="bg-forest text-cream rounded-2xl shadow-2xl px-5 py-4 md:px-6 md:py-5 flex items-start gap-4">
        <div className="flex-1 text-sm leading-relaxed text-justify">
          <p>
            Ce site n'utilise <strong>aucun cookie de traçage</strong>, ni outil d'analyse tiers.
            Seuls des cookies strictement nécessaires (admin) peuvent être déposés.{' '}
            <Link
              to="/mentions-legales"
              className="underline underline-offset-2 hover:text-ochre transition-colors"
            >
              En savoir plus
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-3 inline-flex items-center rounded-full bg-ochre text-forest px-4 py-1.5 text-xs font-medium uppercase tracking-wider hover:bg-cream transition-colors"
          >
            J'ai compris
          </button>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fermer"
          className="text-cream/60 hover:text-cream transition-colors -mr-1 -mt-1"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
