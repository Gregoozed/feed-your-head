// Default `data` for newly-created sections, per type.

export const SECTION_TYPES = [
  'hero',
  'approche',
  'offres',
  'methode',
  'references',
  'temoignages',
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
    intro: {
      heading: { before: 'Trois manières de', italic: 'travailler', after: 'ensemble.' },
      subtitle: 'Sous-titre à rédiger.',
    },
    items: [],
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
