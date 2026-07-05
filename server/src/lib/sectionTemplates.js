// Default `data` for newly-created sections, per type.

export const SECTION_TYPES = [
  'hero',
  'approche',
  'feedyourcrew',
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
    ctaSecondary: { label: 'Découvrir Feed Your Crew', href: '#feedyourcrew' },
  },
  approche: {
    heading: { line1: 'Une lecture', line2Italic: 'sensible', line3: 'des organisations.' },
    paragraphs: ['Premier paragraphe à rédiger.'],
    stats: [],
  },
  offres: {
    kicker: 'Offres',
    heading: { before: 'Cinq domaines pour', italic: 'transformer', after: ' les RH.' },
    subtitle: '',
    items: [
      { num: '01', title: 'Titre du domaine', description: 'Description à compléter.' },
    ],
    cta: { label: 'Échanger sur ces domaines', href: '#contact' },
  },
  feedyourcrew: {
    kicker: 'Notre outil',
    heading: { before: 'Anticiper avec', italic: 'Feed Your Crew' },
    tagline: "Outil d'aide à la décision RH · user-friendly",
    paragraphs: [
      "Feed Your Crew éclaire les décisions RH sensibles avant qu'elles ne deviennent des urgences : anticipation des départs, cartographie des savoirs critiques, gestion des compétences.",
    ],
    features: [
      { title: 'Risque de départ', description: 'Identifier les fragilités avant la crise.' },
      { title: 'Criticité du savoir', description: 'Cartographier les savoirs vitaux à préserver.' },
      { title: 'Gestion des compétences', description: 'Piloter les évolutions et les transmissions.' },
    ],
    cta: { label: 'Découvrir feedyourcrew.com', href: 'https://feedyourcrew.com' },
    logoUrl: '',
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
