import { useState } from 'react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import { useSettings } from '../contexts/ContentContext.jsx';

function LinkedinGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

const initialFields = { name: '', email: '', company: '', message: '', website: '' };

export default function Contact({ data }) {
  const settings = useSettings();
  const contactInfo = settings?.contact ?? {};
  const labels = data.formLabels;

  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState('idle');

  const update = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const submit = async () => {
    if (status === 'sending') return;
    if (!fields.name || !fields.email || !fields.message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('Form submission failed');
      setStatus('sent');
      setFields(initialFields);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-5">
          <span className="kicker">Contact</span>
          <h2 className="mt-6 font-display font-medium text-forest text-4xl md:text-5xl lg:text-6xl leading-tight">
            {data.heading.before}{' '}
            <em className="not-italic font-display italic text-ochre">{data.heading.italic}</em>
          </h2>
          <p className="mt-6 text-mute text-lg leading-relaxed text-justify">{data.subtitle}</p>

          {contactInfo.calendlyUrl && (
            <a
              href={contactInfo.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-forest text-cream px-7 py-4 text-sm md:text-base font-medium hover:bg-forest-light transition-all"
            >
              <Calendar size={18} aria-hidden="true" />
              {data.calendlyLabel}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}

          <ul className="mt-10 space-y-4">
            {contactInfo.email && (
              <li className="pt-4 border-t border-cream-dark">
                <a href={`mailto:${contactInfo.email}`} className="group inline-flex items-center gap-3 text-ink hover:text-ochre transition-colors">
                  <Mail size={18} className="text-ochre" aria-hidden="true" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
            )}
            {contactInfo.linkedin && (
              <li className="pt-4 border-t border-cream-dark">
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-ink hover:text-ochre transition-colors">
                  <LinkedinGlyph className="text-ochre" />
                  <span>LinkedIn</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="md:col-span-7">
          <div className="bg-white border border-cream-dark rounded-3xl p-7 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field id="name" label={labels.name} value={fields.name} onChange={update('name')} required />
              <Field id="email" type="email" label={labels.email} value={fields.email} onChange={update('email')} required />
            </div>
            <div className="mt-5">
              <Field id="company" label={labels.company} value={fields.company} onChange={update('company')} />
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-mute font-medium">{labels.message}</label>
              <textarea id="message" rows={5} value={fields.message} onChange={update('message')} required className="mt-2 w-full rounded-xl border border-cream-dark bg-cream/50 px-4 py-3 text-ink placeholder:text-mute/60 focus:bg-white focus:border-ochre/60 transition-colors resize-none" />
            </div>

            {/* honeypot anti-spam : champ caché, jamais rempli par un humain */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Ne pas remplir</label>
              <input id="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={update('website')} />
            </div>

            <button type="button" onClick={submit} disabled={status === 'sending'} className="group mt-7 inline-flex items-center gap-3 rounded-full bg-ochre text-white px-7 py-4 text-sm md:text-base font-medium hover:bg-ochre/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all">
              {status === 'sending' ? labels.sending : labels.submit}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            {status === 'sent' && <p className="mt-5 text-sm text-forest bg-sage/20 border border-sage/40 rounded-xl px-4 py-3">{labels.sent}</p>}
            {status === 'error' && <p className="mt-5 text-sm text-ochre bg-ochre/10 border border-ochre/30 rounded-xl px-4 py-3">{labels.error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest text-mute font-medium">
        {label}{required && <span className="text-ochre"> *</span>}
      </label>
      <input id={id} type={type} value={value} onChange={onChange} required={required} className="mt-2 w-full rounded-xl border border-cream-dark bg-cream/50 px-4 py-3 text-ink placeholder:text-mute/60 focus:bg-white focus:border-ochre/60 transition-colors" />
    </div>
  );
}
