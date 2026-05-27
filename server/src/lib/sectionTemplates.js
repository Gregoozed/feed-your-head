// Default `data` for newly-created sections, per type.

export const SECTION_TYPES = [
  'hero',
  'approche',
  'offres',
  'methode',
  'references',
  'temoignages',
  'ressources',
  'apropos',
  'contact',
];

export const SECTION_TEMPLATES = {
  hero: {
    title: { before: 'Nouveau', italic: 'titre', after: '.' },
    subtitle: 'Sous-titre à rédiger.',
    ctaPrimary: { label: 'Réserver un échange', href: '#contact' },
    ctaSecondary: { label: 'Découvrir les offres', href: '#offres' },
  },
  approche: {
    heading: { line1: 'Une lecture', line2Italic: 'sensible', line3: 'des organisations.' },
    paragraphs: ['Premier paragraphe à rédiger.'],
    stats: [],
  },
  offres: {
    kicker: 'En partenariat avec Twelv',
    heading: { before: '4 offres.', italic: '1 ambition.' },
    subtitle: 'Capitaliser les savoirs en performance durable.',
    pitch: 'À compléter.',
    formulas: [],
    closer: 'Pas de réussite technologique sans aventure humaine.',
    cta: { label: 'Échanger sur ce partenariat', href: '#contact' },
  },
  methode: {
    intro: { heading: { before: 'Comment', italic: 'ça se passe.' }, subtitle: 'Sous-titre.' },
    steps: [],
  },
  references: {
    intro: { kicker: 'Références', heading: 'Quelques organisations qui m’ont fait confiance.' },
    items: [],
  },
  temoignages: {
    intro: { heading: { before: 'Quelques', italic: 'retours.' }, subtitle: 'Sous-titre.' },
    items: [],
  },
  ressources: {
    intro: {
      kicker: 'Ressources',
      heading: 'À lire, voir & écouter.',
      subtitle: 'Articles, retours d’expérience et contenus vidéo sur les sujets qui traversent mon métier.',
    },
    items: [],
  },
  apropos: {
    heading: { name: '[Prénom Nom]', italic: 'Consultante RH' },
    paragraphs: ['À compléter.'],
  },
  contact: {
    heading: { before: 'Parlons de votre', italic: 'contexte.' },
    subtitle: 'Un premier échange sans engagement.',
    calendlyLabel: 'Réserver directement',
    formLabels: {
      name: 'Nom',
      email: 'Email',
      company: 'Entreprise',
      message: 'Votre message',
      submit: 'Envoyer le message',
      sending: 'Envoi…',
      sent: 'Message envoyé. Je reviens vers vous sous 48h ouvrées.',
      error: 'Une erreur est survenue. Réessayez ou écrivez directement à l’adresse ci-contre.',
    },
  },
};

// hero & contact are typically singletons — but admin can still create duplicates if desired.
// Nothing is hardcoded as "protected" at type level; protection lives in DELETE handler.
