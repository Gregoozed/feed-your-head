# Feed Your Head — Site vitrine

Site one page éditorial pour une consultante RH indépendante.
One-pager + point de conversion (Calendly + formulaire Formspree).

## Stack

- Vite + React 18+ (JS, pas TypeScript)
- Tailwind CSS 3 (palette + typo custom)
- lucide-react (icônes)
- Polices Google : Fraunces (titres, italique signature) + Manrope (corps)

Aucun backend. Le formulaire de contact pointe vers Formspree.
L'agenda de prise de RDV pointe vers Calendly.

## Prérequis

- Node 18+ (recommandé : 20 LTS)
- npm 9+

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

→ Ouvre [http://localhost:5173](http://localhost:5173).
Hot Module Reload activé : toute modification dans `src/` est appliquée en direct.

## Build statique (production)

```bash
npm run build
```

→ Génère le dossier `dist/` prêt à uploader sur un hébergement statique (IONOS, OVH, Netlify, etc.).
Pour prévisualiser le build localement :

```bash
npm run preview
```

## Où modifier les textes

**Tout** le contenu éditable (textes, URLs, labels) est centralisé dans :

```
src/config/site.js
```

Ouvrir ce fichier et modifier les valeurs des champs `brand`, `contact`,
`hero`, `approche`, `offres`, `methode`, `temoignages`, `apropos`, etc.

Aucun texte n'est codé en dur dans les composants. Pas besoin de toucher au JSX
sauf pour modifier la structure ou le visuel.

## Brancher Formspree (formulaire de contact)

1. Créer un compte gratuit sur [https://formspree.io](https://formspree.io).
2. Créer un nouveau form (free plan : 50 soumissions/mois).
3. Copier l'endpoint fourni (de la forme `https://formspree.io/f/xxxxxxxx`).
4. Le coller dans `src/config/site.js` :

   ```js
   contact: {
     ...
     formspreeEndpoint: 'https://formspree.io/f/xxxxxxxx',
   },
   ```

5. Tester en envoyant un message depuis le site déployé.
   Formspree enverra un email de confirmation à l'adresse associée au compte.

## Brancher Calendly (prise de RDV)

1. Créer un compte sur [https://calendly.com](https://calendly.com).
2. Créer un type d'événement (ex. "Échange découverte – 30 min").
3. Copier l'URL publique de cet event (de la forme
   `https://calendly.com/<pseudo>/<event-slug>`).
4. La coller dans `src/config/site.js` :

   ```js
   contact: {
     ...
     calendlyUrl: 'https://calendly.com/feedyourhead/echange',
   },
   ```

## Remplacer la photo de la consultante

Pour l'instant, les zones photo (Hero et À propos) affichent des placeholders
graphiques (monogrammes). Pour intégrer une vraie photo :

1. Déposer le fichier dans `public/` (ex. `public/portrait.webp`).
   Format recommandé : **WebP**, ~1200×1500px, < 200 Ko.
2. Dans `src/components/APropos.jsx`, remplacer le bloc
   `<span>F</span>` par :

   ```jsx
   <img
     src="/portrait.webp"
     alt="Portrait de [Prénom Nom]"
     className="absolute inset-0 w-full h-full object-cover"
   />
   ```

3. Idem pour `src/components/Hero.jsx` si une photo doit remplacer le
   monogramme "FYH".

## Charte graphique

Couleurs (Tailwind utilities générées depuis `tailwind.config.js`) :

| Token        | Hex       | Usage                            |
| ------------ | --------- | -------------------------------- |
| `forest`     | `#1a3a2e` | Vert forêt — couleur principale  |
| `forest-light` | `#1f4434` | Variation vert pour gradients  |
| `sage`       | `#7a9b8a` | Vert sauge — accents doux        |
| `cream`      | `#f5f1ea` | Fond principal                   |
| `cream-dark` | `#e8e3d8` | Sections alternées, bordures     |
| `ochre`      | `#c47a28` | CTA, italiques signature         |
| `ink`        | `#1a1a1a` | Texte principal                  |
| `mute`       | `#4a4a4a` | Texte secondaire                 |

Typographie :

- `font-display` = Fraunces (titres, mot en italique ocre = signature visuelle)
- `font-body` = Manrope (corps de texte)

## Architecture

```
feed-your-head/
├── public/
│   ├── favicon.svg
│   └── og-image.png        ← à remplacer par une vraie OG image (1200×630)
├── src/
│   ├── components/         ← 9 composants : Nav, Hero, Approche, Offres,
│   │                         Methode, Temoignages, APropos, Contact, Footer
│   ├── config/site.js      ← source unique de vérité pour les textes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css           ← @tailwind + polices + utilitaires .grain / .kicker
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Prochaines étapes (hors périmètre v1)

- Vraie photo de la consultante (Hero + À propos)
- Vrais témoignages clients (`temoignages` dans `site.js`)
- Baseline et nom de consultante définitifs
- Achat & configuration du nom de domaine
- Déploiement IONOS (uploader `dist/` via FTP/SFTP)
- Page mentions légales / RGPD (obligatoire dès qu'il y a un formulaire)
- Tracking respectueux : Plausible ou Matomo (RGPD-friendly, pas Google Analytics)
- Vraie image Open Graph (`public/og-image.png`, 1200×630, ~150 Ko)
