import { TextField, TextAreaField, NumberField, CheckboxField, ListField, Section } from '../components/Form.jsx';

const set = (obj, key, value) => ({ ...(obj ?? {}), [key]: value });

// ──────────────────────────────────────────────────────────────────
//  BRAND (settings.brand)
// ──────────────────────────────────────────────────────────────────
function BrandEditor({ value, onChange }) {
  return (
    <Section title="Identité de marque">
      <TextField label="Nom de marque" value={value.name} onChange={(v) => onChange(set(value, 'name', v))} />
      <TextField label="Baseline (kicker du Hero)" value={value.baseline} onChange={(v) => onChange(set(value, 'baseline', v))} />
      <TextField label="Nom de la consultante" value={value.consultantName} onChange={(v) => onChange(set(value, 'consultantName', v))} />
      <TextField label="Fonction" value={value.consultantRole} onChange={(v) => onChange(set(value, 'consultantRole', v))} />
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  INTRO (settings.intro)
// ──────────────────────────────────────────────────────────────────
function IntroEditor({ value, onChange }) {
  return (
    <Section title="Animation d'accueil">
      <CheckboxField
        label="Activer l'animation d'intro"
        description="Affichée une fois par session. Les visiteurs récurrents la voient à nouveau dans une nouvelle session."
        value={value.enabled}
        onChange={(v) => onChange(set(value, 'enabled', v))}
      />
      <NumberField label="Durée totale (ms)" value={value.durationMs} min={1000} max={10000} step={100} onChange={(v) => onChange(set(value, 'durationMs', v))} />
      <TextField label="Libellé du bouton Skip" value={value.skipLabel} onChange={(v) => onChange(set(value, 'skipLabel', v))} />
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  CONTACT INFO (settings.contact)
// ──────────────────────────────────────────────────────────────────
function ContactInfoEditor({ value, onChange }) {
  return (
    <Section title="Coordonnées & services tiers">
      <TextField label="Email de contact" type="email" value={value.email} onChange={(v) => onChange(set(value, 'email', v))} />
      <TextField label="URL LinkedIn" value={value.linkedin} onChange={(v) => onChange(set(value, 'linkedin', v))} />
      <TextField label="URL Calendly" value={value.calendlyUrl} onChange={(v) => onChange(set(value, 'calendlyUrl', v))} placeholder="https://calendly.com/…" />
      <TextField label="Endpoint Formspree" value={value.formspreeEndpoint} onChange={(v) => onChange(set(value, 'formspreeEndpoint', v))} placeholder="https://formspree.io/f/XXXX" />
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  NAV (settings.nav)
// ──────────────────────────────────────────────────────────────────
function NavEditor({ value, onChange }) {
  return (
    <Section title="Menu de navigation">
      <ListField
        items={value ?? []}
        onChange={onChange}
        newItem={() => ({ label: 'Nouveau lien', href: '#' })}
        addLabel="Ajouter un lien"
        renderItem={(item, setItem) => (
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Libellé" value={item.label} onChange={(v) => setItem({ ...item, label: v })} />
            <TextField label="Ancre (#section)" value={item.href} onChange={(v) => setItem({ ...item, href: v })} />
          </div>
        )}
      />
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────
//  FOOTER (settings.footer)
// ──────────────────────────────────────────────────────────────────
function FooterEditor({ value, onChange }) {
  return (
    <Section title="Pied de page">
      <TextField label="Mention de droits" value={value.rights} onChange={(v) => onChange(set(value, 'rights', v))} />
    </Section>
  );
}

export const SETTINGS_EDITORS = {
  brand: BrandEditor,
  intro: IntroEditor,
  contact: ContactInfoEditor,
  nav: NavEditor,
  footer: FooterEditor,
};

export const SETTINGS_LABELS = {
  brand: 'Marque & consultante',
  intro: 'Intro animée',
  contact: 'Coordonnées',
  nav: 'Menu de navigation',
  footer: 'Pied de page',
};
