import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/ContentContext.jsx';
import Logo from './Logo.jsx';

export default function LegalPage() {
  const settings = useSettings();
  const brand = settings?.brand?.name ?? 'Feed Your Head';
  const email = settings?.contact?.email ?? 'contact@feedyourhead.fr';

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" aria-label={brand} className="text-forest">
            <Logo variant="lockup" className="h-8 w-auto" />
          </Link>
          <Link
            to="/"
            className="text-sm text-mute hover:text-ochre transition-colors"
          >
            ← Retour au site
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl text-forest mb-2">
          Mentions légales & confidentialité
        </h1>
        <p className="text-mute text-sm mb-12">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>

        <section className="space-y-4 mb-12">
          <h2 className="font-display text-2xl text-forest">Éditeur du site</h2>
          <p className="text-mute leading-relaxed">
            Le présent site <strong className="text-ink">{brand}</strong> est édité par
            Virginie Coulange, consultante RH indépendante.
          </p>
          <p className="text-mute leading-relaxed">
            Contact :{' '}
            <a href={`mailto:${email}`} className="text-forest hover:text-ochre transition-colors">
              {email}
            </a>
          </p>
          <p className="text-mute leading-relaxed text-sm">
            Numéro SIRET, adresse postale et forme juridique : à compléter par l'éditrice.
          </p>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-display text-2xl text-forest">Hébergement</h2>
          <p className="text-mute leading-relaxed">
            Le site est hébergé par <strong className="text-ink">IONOS SARL</strong>, 7 place de la Gare, 57200 Sarreguemines, France.
          </p>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-display text-2xl text-forest">Propriété intellectuelle</h2>
          <p className="text-mute leading-relaxed">
            L'ensemble des contenus (textes, images, logos, identité visuelle) présents sur ce site
            sont la propriété de leur auteur respectif. Toute reproduction, même partielle, est
            interdite sans autorisation préalable.
          </p>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-display text-2xl text-forest">Données personnelles</h2>
          <p className="text-mute leading-relaxed">
            Lorsque vous nous contactez par le formulaire ou par e-mail, vos données (nom, adresse
            e-mail, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont
            ni revendues, ni partagées avec des tiers, et sont conservées pendant la durée nécessaire
            au suivi de l'échange (3 ans maximum après le dernier contact).
          </p>
          <p className="text-mute leading-relaxed">
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit
            d'accès, de rectification, d'opposition et de suppression sur vos données. Pour
            l'exercer, écrivez à{' '}
            <a href={`mailto:${email}`} className="text-forest hover:text-ochre transition-colors">
              {email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-display text-2xl text-forest">Cookies</h2>
          <p className="text-mute leading-relaxed">
            Ce site <strong className="text-ink">n'utilise aucun cookie de mesure d'audience, de
            publicité, ni de traceur tiers</strong>. Seuls des cookies strictement nécessaires au
            fonctionnement de l'espace d'administration (authentification) peuvent être déposés —
            ils ne concernent pas les visiteurs du site public.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-forest">Liens externes</h2>
          <p className="text-mute leading-relaxed">
            Ce site peut contenir des liens vers des sites tiers (notamment LinkedIn). Nous ne
            sommes pas responsables du contenu ou de la politique de confidentialité de ces sites.
          </p>
        </section>
      </main>

      <footer className="border-t border-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-8 text-sm text-mute">
          © {new Date().getFullYear()} {brand}.{' '}
          <Link to="/" className="hover:text-ochre transition-colors">
            Retour au site
          </Link>
        </div>
      </footer>
    </div>
  );
}
