export const SITE_CONFIG = {
  intro: {
    // Animation d'accueil "graine qui germe". Affichée une fois par session.
    // Pour la désactiver totalement : mettre `enabled: false`.
    enabled: true,
    durationMs: 3500,
    skipLabel: 'Entrer',
  },
  brand: {
    name: 'Feed Your Head',
    baseline: 'Conseil RH humaniste',
    consultantName: '[Prénom Nom]',
    consultantRole: 'Consultante RH',
  },
  contact: {
    email: 'contact@feedyourhead.fr',
    linkedin: 'https://www.linkedin.com/in/feedyourhead',
    calendlyUrl: 'https://calendly.com/feedyourhead/echange',
    formspreeEndpoint: 'https://formspree.io/f/YOUR_ID_HERE',
  },
  nav: [
    { label: 'Approche', href: '#approche' },
    { label: 'Offres', href: '#offres' },
    { label: 'Méthode', href: '#methode' },
    { label: 'Témoignages', href: '#temoignages' },
  ],
  hero: {
    title: {
      before: 'Penser',
      italic: 'autrement',
      after: 'vos enjeux RH.',
    },
    subtitle:
      'Audit, accompagnement et conduite du changement pour DRH et dirigeants qui veulent dépasser le prêt-à-penser managérial.',
    ctaPrimary: { label: 'Réserver un échange', href: '#contact' },
    ctaSecondary: { label: 'Découvrir les offres', href: '#offres' },
  },
  approche: {
    heading: { line1: 'Une lecture', line2Italic: 'sensible', line3: 'des organisations.' },
    paragraphs: [
      "La fonction RH ne se résume pas à des processus. Elle articule des trajectoires individuelles, des dynamiques collectives et des décisions stratégiques — souvent dans l'inconfort.",
      "Mon métier : éclairer ces zones de tension, proposer des arbitrages tenables et accompagner leur mise en œuvre — avec exigence, sans posture.",
    ],
  },
  stats: [
    { number: '15+', label: "années d'expérience RH" },
    { number: '30+', label: 'organisations accompagnées' },
    { number: '100%', label: 'missions sur-mesure' },
  ],
  offresIntro: {
    heading: { before: 'Trois manières de', italic: 'travailler', after: 'ensemble.' },
    subtitle:
      'Une mission ponctuelle, un accompagnement dans la durée ou une transformation à piloter — chaque intervention est calibrée à votre contexte.',
  },
  offres: [
    {
      num: '01',
      title: 'Audit RH',
      description:
        "État des lieux structuré et sans complaisance des pratiques RH de votre organisation.",
      bullets: ['Diagnostic 360°', 'Restitution actionnable', 'Plan de route partagé'],
    },
    {
      num: '02',
      title: 'Accompagnement managers & DRH',
      description:
        "Appui opérationnel sur la durée, en présentiel ou à distance. Sparring partner pour les décisions sensibles.",
      bullets: ['Coaching individuel', 'Co-développement', 'Médiation'],
    },
    {
      num: '03',
      title: 'Conduite du changement',
      description:
        "Piloter une transformation qui engage réellement les équipes plutôt que de la subir.",
      bullets: ['Cadrage stratégique', 'Ingénierie participative', 'Suivi & ancrage'],
    },
  ],
  methodeIntro: {
    heading: { before: 'Comment', italic: 'ça se passe.' },
    subtitle: 'Un cadre clair, du premier échange à la fin de mission.',
  },
  methode: [
    {
      num: '01',
      title: 'Rencontre',
      description:
        "Premier échange sans engagement pour comprendre votre contexte et vos enjeux.",
    },
    {
      num: '02',
      title: 'Cadrage',
      description:
        "Proposition d'intervention sur-mesure : périmètre, livrables, modalités, calendrier.",
    },
    {
      num: '03',
      title: 'Intervention',
      description:
        "Mise en œuvre en proximité avec les équipes, avec des points d'étape réguliers.",
    },
    {
      num: '04',
      title: 'Ancrage',
      description:
        'Transfert de compétences et supervision post-mission pour pérenniser les acquis.',
    },
  ],
  referencesIntro: {
    kicker: 'Références',
    heading:
      'Quelques organisations qui m’ont fait confiance, en France et à l’international.',
  },
  // Pour remplacer un nom par un vrai logo : ajoutez `logoUrl: '/logos/nom.svg'`
  // (déposer le fichier dans `public/logos/`). Format recommandé : SVG monochrome,
  // hauteur ~40px. À défaut de logoUrl, le nom est rendu en wordmark Fraunces.
  references: [
    { name: 'Référence 01' },
    { name: 'Référence 02' },
    { name: 'Référence 03' },
    { name: 'Référence 04' },
    { name: 'Référence 05' },
    { name: 'Référence 06' },
    { name: 'Référence 07' },
    { name: 'Référence 08' },
  ],
  temoignagesIntro: {
    heading: { before: 'Quelques', italic: 'retours.' },
    subtitle: 'Ce qu’en disent celles et ceux qui ont franchi le pas.',
  },
  temoignages: [
    {
      verbatim: 'À compléter — un verbatim client courrra ici dès que la mission sera publiable.',
      initials: 'AB',
      name: 'À compléter',
      role: 'DRH',
      company: 'Entreprise à venir',
    },
    {
      verbatim: 'À compléter — placeholder pour un deuxième témoignage client.',
      initials: 'CD',
      name: 'À compléter',
      role: 'Directrice générale',
      company: 'Entreprise à venir',
    },
    {
      verbatim: 'À compléter — placeholder pour un troisième témoignage client.',
      initials: 'EF',
      name: 'À compléter',
      role: 'Responsable RH',
      company: 'Entreprise à venir',
    },
  ],
  apropos: {
    heading: { name: '[Prénom Nom]', italic: 'Consultante RH' },
    paragraphs: [
      "À compléter — un premier paragraphe biographique présentant votre parcours, vos terrains et la philosophie de votre pratique.",
      "À compléter — un second paragraphe sur vos convictions, vos formations ou vos centres d'intérêt qui nourrissent votre approche.",
    ],
  },
  contact: {
    heading: { before: 'Parlons de votre', italic: 'contexte.' },
    subtitle:
      "Un premier échange de 30 minutes, sans engagement, pour explorer ensemble si une collaboration a du sens.",
    calendlyLabel: 'Réserver directement',
    formLabels: {
      name: 'Nom',
      email: 'Email',
      company: 'Entreprise',
      message: 'Votre message',
      submit: 'Envoyer le message',
      sending: 'Envoi…',
      sent: 'Message envoyé. Je reviens vers vous sous 48h ouvrées.',
      error:
        "Une erreur est survenue. Réessayez ou écrivez directement à l'adresse ci-contre.",
    },
  },
  footer: {
    rights: 'Tous droits réservés.',
  },
};
