import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../contexts/ContentContext.jsx';
import Logo from './Logo.jsx';

function LinkedinGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

export default function Footer() {
  const settings = useSettings();
  const onHome = useLocation().pathname === '/';
  if (!settings) return null;
  const { brand, contact, footer } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {onHome ? (
          <a href="#top" aria-label={brand.name} className="text-forest">
            <Logo variant="lockup" className="h-8 w-auto" />
          </a>
        ) : (
          <Link to="/" aria-label={brand.name} className="text-forest">
            <Logo variant="lockup" className="h-8 w-auto" />
          </Link>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-mute">
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 hover:text-ochre transition-colors"
            >
              <LinkedinGlyph />
              <span>LinkedIn</span>
            </a>
          )}
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-ochre transition-colors"
          >
            {contact.email}
          </a>
          <Link
            to="/mentions-legales"
            className="hover:text-ochre transition-colors"
          >
            Mentions légales
          </Link>
          <span>
            © {year} {brand.name}. {footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
