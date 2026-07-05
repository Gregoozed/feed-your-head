import { useContent } from '../contexts/ContentContext.jsx';
import Intro from './Intro.jsx';
import CookieBanner from './CookieBanner.jsx';
import Nav from './Nav.jsx';
import ScrollUI from './ScrollUI.jsx';
import Footer from './Footer.jsx';
import Hero from './Hero.jsx';
import Approche from './Approche.jsx';
import FeedYourCrew from './FeedYourCrew.jsx';
import Offres from './Offres.jsx';
import Methode from './Methode.jsx';
import References from './References.jsx';
import Temoignages from './Temoignages.jsx';
import APropos from './APropos.jsx';
import Contact from './Contact.jsx';

const REGISTRY = {
  hero: Hero,
  approche: Approche,
  feedyourcrew: FeedYourCrew,
  offres: Offres,
  methode: Methode,
  references: References,
  temoignages: Temoignages,
  apropos: APropos,
  contact: Contact,
};

export default function SiteRenderer() {
  const { content, loading, error } = useContent();

  if (!content && loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="h-2 w-32 rounded-full bg-cream-dark overflow-hidden">
          <div className="h-full w-1/3 bg-ochre animate-pulse" />
        </div>
      </div>
    );
  }

  if (!content && error) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-display text-2xl text-forest">Contenu indisponible</h1>
        <p className="text-mute max-w-md">
          Impossible de charger le contenu du site. Vérifiez votre connexion ou réessayez dans quelques instants.
        </p>
      </div>
    );
  }

  const sections = content.sections
    .filter((s) => s.visible && REGISTRY[s.type])
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Intro />
      <ScrollUI />
      <Nav />
      <main>
        {sections.map((section) => {
          const Comp = REGISTRY[section.type];
          return <Comp key={section.id} data={section.data} />;
        })}
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
