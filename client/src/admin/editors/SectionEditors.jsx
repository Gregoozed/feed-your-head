import { TextField, TextAreaField, SelectField, ListField, Section } from '../components/Form.jsx';
import { ImagePicker } from '../components/MediaPicker.jsx';

// Small helper to keep deep-set concise
const set = (obj, key, value) => ({ ...obj, [key]: value });
const setIn = (obj, path, value) => {
  if (path.length === 1) return set(obj, path[0], value);
  return set(obj, path[0], setIn(obj[path[0]] ?? {}, path.slice(1), value));
};

// ──────────────────────────────────────────────────────────────────
//  HERO
// ──────────────────────────────────────────────────────────────────
function HeroEditor({ data, onChange }) {
  return (
    <>
      <Section title="Titre principal">
        <TextField label="Avant l'italique" value={data.title?.before} onChange={(v) => onChange(setIn(data, ['title', 'before'], v))} />
        <TextField label="Mot en italique (ocre)" value={data.title?.italic} onChange={(v) => onChange(setIn(data, ['title', 'italic'], v))} />
        <TextField label="Après l'italique" value={data.title?.after} onChange={(v) => onChange(setIn(data, ['title', 'after'], v))} />
      </Section>
      <Section title="Sous-titre">
        <TextAreaField label="Sous-titre" value={data.subtitle} onChange={(v) => onChange(set(data, 'subtitle', v))} rows={3} />
      </Section>
      <Section title="CTA principal (bouton vert)">
        <TextField label="Libellé" value={data.ctaPrimary?.label} onChange={(v) => onChange(setIn(data, ['ctaPrimary', 'label'], v))} />
        <TextField label="Lien (ancre ou URL)" value={data.ctaPrimary?.href} onChange={(v) => onChange(setIn(data, ['ctaPrimary', 'href'], v))} />
      </Section>
      <Section title="CTA secondaire (bouton bordure)">
        <TextField label="Libellé" value={data.ctaSecondary?.label} onChange={(v) => onChange(setIn(data, ['ctaSecondary', 'label'], v))} />
        <TextField label="Lien (ancre ou URL)" value={data.ctaSecondary?.href} onChange={(v) => onChange(setIn(data, ['ctaSecondary', 'href'], v))} />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  APPROCHE
// ──────────────────────────────────────────────────────────────────
function ApprocheEditor({ data, onChange }) {
  return (
    <>
      <Section title="Titre (3 lignes)">
        <TextField label="Ligne 1" value={data.heading?.line1} onChange={(v) => onChange(setIn(data, ['heading', 'line1'], v))} />
        <TextField label="Ligne 2 (italique ocre)" value={data.heading?.line2Italic} onChange={(v) => onChange(setIn(data, ['heading', 'line2Italic'], v))} />
        <TextField label="Ligne 3" value={data.heading?.line3} onChange={(v) => onChange(setIn(data, ['heading', 'line3'], v))} />
      </Section>
      <Section title="Paragraphes">
        <ListField
          items={data.paragraphs ?? []}
          onChange={(items) => onChange(set(data, 'paragraphs', items))}
          newItem={() => ''}
          addLabel="Ajouter un paragraphe"
          renderItem={(item, set) => (
            <TextAreaField label="Paragraphe" value={item} onChange={set} rows={3} />
          )}
        />
      </Section>
      <Section title="Statistiques">
        <ListField
          items={data.stats ?? []}
          onChange={(items) => onChange(set(data, 'stats', items))}
          newItem={() => ({ number: '', label: '' })}
          addLabel="Ajouter une statistique"
          renderItem={(item, setItem) => (
            <div className="space-y-3">
              <TextField label="Chiffre" value={item.number} onChange={(v) => setItem({ ...item, number: v })} />
              <TextField label="Libellé" value={item.label} onChange={(v) => setItem({ ...item, label: v })} />
            </div>
          )}
        />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  OFFRES (partenariat Twelv — 4 formules en onglets)
// ──────────────────────────────────────────────────────────────────
function OffresEditor({ data, onChange }) {
  return (
    <>
      <Section title="En-tête">
        <TextField label="Kicker (uppercase ocre)" value={data.kicker} onChange={(v) => onChange(set(data, 'kicker', v))} />
        <TextField label="Titre — avant l'italique" value={data.heading?.before} onChange={(v) => onChange(setIn(data, ['heading', 'before'], v))} />
        <TextField label="Mot en italique (ocre)" value={data.heading?.italic} onChange={(v) => onChange(setIn(data, ['heading', 'italic'], v))} />
        <TextAreaField label="Sous-titre" value={data.subtitle} onChange={(v) => onChange(set(data, 'subtitle', v))} rows={2} />
        <TextAreaField label="Pitch" value={data.pitch} onChange={(v) => onChange(set(data, 'pitch', v))} rows={4} />
      </Section>
      <Section title="Formules (onglets)">
        <ListField
          items={data.formulas ?? []}
          onChange={(items) => onChange(set(data, 'formulas', items))}
          newItem={() => ({
            num: '',
            duration: '',
            title: '',
            verb: '',
            verbDesc: '',
            tagline: '',
            bullets: [''],
          })}
          addLabel="Ajouter une formule"
          renderItem={(item, setItem) => (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <TextField label="N° (ex. 01)" value={item.num} onChange={(v) => setItem({ ...item, num: v })} />
                <TextField label="Durée (ex. 20 jours)" value={item.duration} onChange={(v) => setItem({ ...item, duration: v })} />
              </div>
              <TextField label="Titre" value={item.title} onChange={(v) => setItem({ ...item, title: v })} />
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Verbe d'action (ex. Accélérer)" value={item.verb} onChange={(v) => setItem({ ...item, verb: v })} />
                <TextField label="Tagline (italique)" value={item.tagline} onChange={(v) => setItem({ ...item, tagline: v })} />
              </div>
              <TextAreaField label="Description du verbe" value={item.verbDesc} onChange={(v) => setItem({ ...item, verbDesc: v })} rows={2} />
              <ListField
                items={item.bullets ?? []}
                onChange={(b) => setItem({ ...item, bullets: b })}
                newItem={() => ''}
                addLabel="Ajouter un point"
                label="Points clés"
                renderItem={(b, setB) => <TextField label="" value={b} onChange={setB} />}
              />
            </div>
          )}
        />
      </Section>
      <Section title="Bandeau final">
        <TextAreaField label="Phrase de clôture" value={data.closer} onChange={(v) => onChange(set(data, 'closer', v))} rows={2} />
      </Section>
      <Section title="Bouton d'appel à l'action">
        <TextField label="Libellé" value={data.cta?.label} onChange={(v) => onChange(setIn(data, ['cta', 'label'], v))} />
        <TextField label="Lien (ancre ou URL)" value={data.cta?.href} onChange={(v) => onChange(setIn(data, ['cta', 'href'], v))} />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  METHODE
// ──────────────────────────────────────────────────────────────────
function MethodeEditor({ data, onChange }) {
  const intro = data.intro ?? { heading: {}, subtitle: '' };
  return (
    <>
      <Section title="Introduction">
        <TextField label="Titre — début" value={intro.heading?.before} onChange={(v) => onChange(setIn(data, ['intro', 'heading', 'before'], v))} />
        <TextField label="Italique" value={intro.heading?.italic} onChange={(v) => onChange(setIn(data, ['intro', 'heading', 'italic'], v))} />
        <TextAreaField label="Sous-titre" value={intro.subtitle} onChange={(v) => onChange(setIn(data, ['intro', 'subtitle'], v))} />
      </Section>
      <Section title="Étapes">
        <ListField
          items={data.steps ?? []}
          onChange={(items) => onChange(set(data, 'steps', items))}
          newItem={() => ({ num: '', title: '', description: '' })}
          addLabel="Ajouter une étape"
          renderItem={(item, setItem) => (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <TextField label="N°" value={item.num} onChange={(v) => setItem({ ...item, num: v })} />
                <div className="col-span-2"><TextField label="Titre" value={item.title} onChange={(v) => setItem({ ...item, title: v })} /></div>
              </div>
              <TextAreaField label="Description" value={item.description} onChange={(v) => setItem({ ...item, description: v })} rows={2} />
            </div>
          )}
        />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  REFERENCES
// ──────────────────────────────────────────────────────────────────
function ReferencesEditor({ data, onChange }) {
  const intro = data.intro ?? { kicker: '', heading: '' };
  return (
    <>
      <Section title="Introduction">
        <TextField label="Kicker (uppercase ocre)" value={intro.kicker} onChange={(v) => onChange(setIn(data, ['intro', 'kicker'], v))} />
        <TextAreaField label="Phrase d'accroche" value={intro.heading} onChange={(v) => onChange(setIn(data, ['intro', 'heading'], v))} />
      </Section>
      <Section title="Références">
        <ListField
          items={data.items ?? []}
          onChange={(items) => onChange(set(data, 'items', items))}
          newItem={() => ({ name: 'Nouvelle référence' })}
          addLabel="Ajouter une référence"
          renderItem={(item, setItem) => (
            <div className="space-y-3">
              <TextField label="Nom (affiché en wordmark si pas de logo)" value={item.name} onChange={(v) => setItem({ ...item, name: v })} />
              <ImagePicker
                label="Logo (optionnel)"
                value={item.logoUrl}
                onChange={(v) => setItem({ ...item, logoUrl: v })}
              />
            </div>
          )}
        />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  TEMOIGNAGES
// ──────────────────────────────────────────────────────────────────
function TemoignagesEditor({ data, onChange }) {
  const intro = data.intro ?? { heading: {}, subtitle: '' };
  return (
    <>
      <Section title="Introduction">
        <TextField label="Titre — début" value={intro.heading?.before} onChange={(v) => onChange(setIn(data, ['intro', 'heading', 'before'], v))} />
        <TextField label="Italique" value={intro.heading?.italic} onChange={(v) => onChange(setIn(data, ['intro', 'heading', 'italic'], v))} />
        <TextAreaField label="Sous-titre" value={intro.subtitle} onChange={(v) => onChange(setIn(data, ['intro', 'subtitle'], v))} />
      </Section>
      <Section title="Témoignages">
        <ListField
          items={data.items ?? []}
          onChange={(items) => onChange(set(data, 'items', items))}
          newItem={() => ({ verbatim: '', initials: '', name: '', role: '', company: '' })}
          addLabel="Ajouter un témoignage"
          renderItem={(item, setItem) => (
            <div className="space-y-3">
              <TextAreaField label="Verbatim" value={item.verbatim} onChange={(v) => setItem({ ...item, verbatim: v })} rows={3} />
              <div className="grid grid-cols-3 gap-3">
                <TextField label="Initiales" value={item.initials} onChange={(v) => setItem({ ...item, initials: v })} />
                <div className="col-span-2"><TextField label="Nom" value={item.name} onChange={(v) => setItem({ ...item, name: v })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Fonction" value={item.role} onChange={(v) => setItem({ ...item, role: v })} />
                <TextField label="Entreprise" value={item.company} onChange={(v) => setItem({ ...item, company: v })} />
              </div>
            </div>
          )}
        />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  RESSOURCES (page dédiée /ressources — articles, vidéos, retours d'expérience)
// ──────────────────────────────────────────────────────────────────
const RESSOURCE_TYPES = [
  { value: 'article', label: 'Article' },
  { value: 'video', label: 'Vidéo' },
  { value: 'retex', label: "Retour d'expérience" },
  { value: 'autre', label: 'Autre' },
];

function RessourcesEditor({ data, onChange }) {
  const intro = data.intro ?? { kicker: '', heading: '', subtitle: '' };
  return (
    <>
      <Section title="Introduction">
        <TextField label="Kicker (uppercase ocre)" value={intro.kicker} onChange={(v) => onChange(setIn(data, ['intro', 'kicker'], v))} />
        <TextField label="Titre" value={intro.heading} onChange={(v) => onChange(setIn(data, ['intro', 'heading'], v))} />
        <TextAreaField label="Sous-titre" value={intro.subtitle} onChange={(v) => onChange(setIn(data, ['intro', 'subtitle'], v))} rows={2} />
      </Section>
      <Section title="Ressources">
        <ListField
          items={data.items ?? []}
          onChange={(items) => onChange(set(data, 'items', items))}
          newItem={() => ({ title: '', type: 'article', url: '', thumbnailUrl: '', description: '', source: '' })}
          addLabel="Ajouter une ressource"
          renderItem={(item, setItem) => (
            <div className="space-y-3">
              <TextField label="Titre" value={item.title} onChange={(v) => setItem({ ...item, title: v })} />
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Type" value={item.type} onChange={(v) => setItem({ ...item, type: v })} options={RESSOURCE_TYPES} />
                <TextField label="Source (optionnel)" value={item.source} onChange={(v) => setItem({ ...item, source: v })} />
              </div>
              <TextField label="Lien (URL, ouvert dans un nouvel onglet)" value={item.url} onChange={(v) => setItem({ ...item, url: v })} />
              <TextAreaField label="Description" value={item.description} onChange={(v) => setItem({ ...item, description: v })} rows={2} />
              <ImagePicker label="Vignette (optionnelle)" value={item.thumbnailUrl} onChange={(v) => setItem({ ...item, thumbnailUrl: v })} />
            </div>
          )}
        />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  À PROPOS
// ──────────────────────────────────────────────────────────────────
function AProposEditor({ data, onChange }) {
  return (
    <>
      <Section title="Titre">
        <TextField label="Nom de la consultante" value={data.heading?.name} onChange={(v) => onChange(setIn(data, ['heading', 'name'], v))} />
        <TextField label="Sous-titre (italique ocre)" value={data.heading?.italic} onChange={(v) => onChange(setIn(data, ['heading', 'italic'], v))} />
      </Section>
      <Section title="Biographie">
        <ListField
          items={data.paragraphs ?? []}
          onChange={(items) => onChange(set(data, 'paragraphs', items))}
          newItem={() => ''}
          addLabel="Ajouter un paragraphe"
          renderItem={(item, setItem) => <TextAreaField label="Paragraphe" value={item} onChange={setItem} rows={3} />}
        />
      </Section>
      <Section title="Photo">
        <ImagePicker
          label="Portrait de la consultante"
          value={data.portraitUrl}
          onChange={(v) => onChange(set(data, 'portraitUrl', v))}
        />
      </Section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────
//  CONTACT (section)
// ──────────────────────────────────────────────────────────────────
function ContactEditor({ data, onChange }) {
  const labels = data.formLabels ?? {};
  return (
    <>
      <Section title="Titre">
        <TextField label="Titre — début" value={data.heading?.before} onChange={(v) => onChange(setIn(data, ['heading', 'before'], v))} />
        <TextField label="Italique" value={data.heading?.italic} onChange={(v) => onChange(setIn(data, ['heading', 'italic'], v))} />
        <TextAreaField label="Sous-titre" value={data.subtitle} onChange={(v) => onChange(set(data, 'subtitle', v))} rows={2} />
        <TextField label="Libellé bouton Calendly" value={data.calendlyLabel} onChange={(v) => onChange(set(data, 'calendlyLabel', v))} />
      </Section>
      <Section title="Libellés du formulaire">
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Nom" value={labels.name} onChange={(v) => onChange(setIn(data, ['formLabels', 'name'], v))} />
          <TextField label="Email" value={labels.email} onChange={(v) => onChange(setIn(data, ['formLabels', 'email'], v))} />
          <TextField label="Entreprise" value={labels.company} onChange={(v) => onChange(setIn(data, ['formLabels', 'company'], v))} />
          <TextField label="Message" value={labels.message} onChange={(v) => onChange(setIn(data, ['formLabels', 'message'], v))} />
          <TextField label="Bouton envoyer" value={labels.submit} onChange={(v) => onChange(setIn(data, ['formLabels', 'submit'], v))} />
          <TextField label="État envoi en cours" value={labels.sending} onChange={(v) => onChange(setIn(data, ['formLabels', 'sending'], v))} />
        </div>
        <TextAreaField label="Message de confirmation (succès)" value={labels.sent} onChange={(v) => onChange(setIn(data, ['formLabels', 'sent'], v))} rows={2} />
        <TextAreaField label="Message d'erreur" value={labels.error} onChange={(v) => onChange(setIn(data, ['formLabels', 'error'], v))} rows={2} />
      </Section>
    </>
  );
}

export const SECTION_EDITORS = {
  hero: HeroEditor,
  approche: ApprocheEditor,
  offres: OffresEditor,
  methode: MethodeEditor,
  references: ReferencesEditor,
  temoignages: TemoignagesEditor,
  ressources: RessourcesEditor,
  apropos: AProposEditor,
  contact: ContactEditor,
};

export const SECTION_LABELS = {
  hero: 'Hero',
  approche: 'Approche',
  offres: 'Offres',
  methode: 'Méthode',
  references: 'Références',
  temoignages: 'Témoignages',
  ressources: 'Ressources',
  apropos: 'À propos',
  contact: 'Contact',
};
