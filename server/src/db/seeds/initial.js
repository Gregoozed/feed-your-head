import argon2 from 'argon2';
import { randomUUID } from 'node:crypto';
import { SITE_CONFIG } from './seed_data.js';

export async function seed(knex) {
  // --- users ---
  await knex('users').del();
  const email = process.env.ADMIN_EMAIL || 'admin@feedyourhead.fr';
  const password = process.env.ADMIN_PASSWORD || 'changeme';
  const name = process.env.ADMIN_NAME || 'Admin';
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  await knex('users').insert({ email, password_hash: hash, name });

  // --- settings (singletons) ---
  await knex('settings').del();
  const settings = {
    brand: SITE_CONFIG.brand,
    intro: SITE_CONFIG.intro,
    contact: SITE_CONFIG.contact, // email, linkedin, calendly, formspree
    nav: SITE_CONFIG.nav,
    footer: SITE_CONFIG.footer,
    legal: SITE_CONFIG.legal,
  };
  await knex('settings').insert(
    Object.entries(settings).map(([key, value]) => ({
      key,
      value_json: JSON.stringify(value),
    }))
  );

  // --- sections (ordered list) ---
  await knex('sections').del();
  const sections = [
    {
      type: 'hero',
      data: SITE_CONFIG.hero,
    },
    {
      type: 'approche',
      data: { ...SITE_CONFIG.approche, stats: SITE_CONFIG.stats },
    },
    {
      type: 'feedyourcrew',
      data: SITE_CONFIG.feedyourcrew,
    },
    {
      type: 'offres',
      data: SITE_CONFIG.offres,
    },
    {
      type: 'methode',
      data: { intro: SITE_CONFIG.methodeIntro, steps: SITE_CONFIG.methode },
    },
    {
      type: 'references',
      data: { intro: SITE_CONFIG.referencesIntro, items: SITE_CONFIG.references },
    },
    {
      type: 'temoignages',
      data: { intro: SITE_CONFIG.temoignagesIntro, items: SITE_CONFIG.temoignages },
    },
    {
      type: 'ressources',
      data: { intro: SITE_CONFIG.ressourcesIntro, items: SITE_CONFIG.ressources },
    },
    {
      type: 'apropos',
      data: SITE_CONFIG.apropos,
    },
    {
      type: 'contact',
      data: {
        heading: SITE_CONFIG.contact.heading,
        subtitle: SITE_CONFIG.contact.subtitle,
        calendlyLabel: SITE_CONFIG.contact.calendlyLabel,
        formLabels: SITE_CONFIG.contact.formLabels,
      },
    },
  ];

  await knex('sections').insert(
    sections.map((s, i) => ({
      id: randomUUID(),
      type: s.type,
      order: i,
      visible: true,
      data_json: JSON.stringify(s.data),
    }))
  );
}
