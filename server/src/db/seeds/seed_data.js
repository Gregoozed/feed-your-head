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
    linkedin: 'https://www.linkedin.com/in/virginie-coulange/',
    calendlyUrl: 'https://calendly.com/feedyourhead/echange',
    formspreeEndpoint: 'https://formspree.io/f/YOUR_ID_HERE',
  },
  nav: [
    { label: 'Approche', href: '#approche' },
    { label: 'Offres', href: '#offres' },
    { label: 'Méthode', href: '#methode' },
    { label: 'À propos', href: '#apropos' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Ressources', href: '/ressources' },
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
  offres: {
    kicker: 'En partenariat avec Twelv',
    heading: { before: '4 offres.', italic: '1 ambition.' },
    subtitle: 'Capitaliser les savoirs en performance durable.',
    pitch:
      "Transmettre, c'est assurer l'avenir de votre entreprise. Avec Feed Your Head et Twelv, alliez tech et humain pour ancrer durablement les compétences au sein de vos équipes.",
    formulas: [
      {
        num: '01',
        duration: '20 jours',
        title: 'Transfert des savoirs critiques',
        verb: 'Accélérer',
        verbDesc: "l'intégration et la montée en compétences.",
        tagline: 'Intervention express, impact immédiat.',
        bullets: [
          'Diagnostic express des savoirs critiques',
          'Identification des priorités',
          'Ateliers ciblés & pragmatiques',
          'Transfert accéléré vers Twelv',
          "Plan d'action express et sécurisé",
        ],
      },
      {
        num: '02',
        duration: '30 jours',
        title: 'Managers : transmetteurs de savoirs',
        verb: 'Sécuriser',
        verbDesc: 'la transmission des savoirs.',
        tagline: 'Les piliers de la performance.',
        bullets: [
          'Diagnostic des pratiques managériales',
          'Formation des managers',
          "Mise en place de rituels et d'outils simples",
          'Twelv comme base de transmission',
        ],
      },
      {
        num: '03',
        duration: '40 jours',
        title: 'La continuité des savoirs',
        verb: 'Mobiliser',
        verbDesc: 'les équipes dans la transmission.',
        tagline: 'La bonne connaissance, au bon niveau, à chaque étape.',
        bullets: [
          'Diagnostic des processus',
          'Conception des parcours de transmission',
          'Formation des relais',
          'Déploiement multi-équipes de Twelv',
          'Pilotage & optimisation des parcours',
        ],
      },
      {
        num: '04',
        duration: '60 jours',
        title: 'Gestion intégrale du savoir',
        verb: 'Performer',
        verbDesc: "durablement grâce à l'intelligence collective.",
        tagline: 'Visibilité totale des savoirs.',
        bullets: [
          'Diagnostic complet de la gestion des savoirs',
          'Architecture de transmission, modélisation des flux de savoirs',
          'Déploiement et structuration de Twelv',
          'Formation & accompagnement',
          'Pilotage stratégique des savoirs',
        ],
      },
    ],
    closer: 'Pas de réussite technologique sans aventure humaine.',
    cta: { label: 'Échanger sur ce partenariat', href: '#contact' },
  },
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
  ressourcesIntro: {
    kicker: 'Ressources',
    heading: 'À lire, voir & écouter.',
    subtitle:
      "Articles, retours d'expérience et contenus vidéo sur les sujets qui traversent mon métier.",
  },
  ressources: [
    {
      title: "Exemple — un article de fond sur la fonction RH",
      type: 'article',
      url: 'https://example.com',
      thumbnailUrl: '',
      description:
        "À compléter — décrivez en une ou deux phrases ce que le lecteur trouvera dans cette ressource.",
      source: 'Source à compléter',
    },
    {
      title: "Exemple — un retour d'expérience de mission",
      type: 'retex',
      url: 'https://example.com',
      thumbnailUrl: '',
      description:
        "À compléter — un retour d'expérience concret, anonymisé si besoin.",
      source: 'Feed Your Head',
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
  legal: {
    editorName: 'Virginie Coulange',
    editorStatus: 'consultante RH indépendante',
    siret: '990 850 125 00016',
    address: '',
    hostName: 'IONOS SARL',
    hostAddress: '7 place de la Gare, 57200 Sarreguemines, France',
  },
};
