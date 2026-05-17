import { useSettings } from '../contexts/ContentContext.jsx';

export default function Footer() {
  const settings = useSettings();
  if (!settings) return null;
  const { brand, contact, footer } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a
          href="#top"
          className="font-display text-lg tracking-tight text-forest"
        >
          {brand.name}
          <span className="text-ochre">.</span>
        </a>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-mute">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ochre transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-ochre transition-colors"
          >
            {contact.email}
          </a>
          <span>
            © {year} {brand.name}. {footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
