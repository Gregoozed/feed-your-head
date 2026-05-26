import fs from 'node:fs/promises';
import path from 'node:path';
import argon2 from 'argon2';
import { db } from './index.js';
import { seed } from './seeds/initial.js';
import config from './knexfile.js';

// Reset / (re)create the admin account from env vars. Gated by ADMIN_RESET so
// it only runs when explicitly requested (set ADMIN_RESET=true in Railway,
// redeploy, log in, then remove the variable).
// - If a user with ADMIN_EMAIL exists → its password & name are reset.
// - Otherwise → the account is created.
async function maybeResetAdmin() {
  const flag = String(process.env.ADMIN_RESET || '').toLowerCase();
  if (flag !== 'true' && flag !== '1') return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'Admin';
  if (!email || !password) {
    console.warn('[bootstrap] ADMIN_RESET set but ADMIN_EMAIL/ADMIN_PASSWORD missing — skipping');
    return;
  }

  const password_hash = await argon2.hash(password, { type: argon2.argon2id });
  const existing = await db('users').where({ email }).first();
  if (existing) {
    await db('users').where({ id: existing.id }).update({ password_hash, name });
    console.log(`[bootstrap] ADMIN_RESET: password reset for existing admin ${email}`);
  } else {
    await db('users').insert({ email, password_hash, name });
    console.log(`[bootstrap] ADMIN_RESET: created admin ${email}`);
  }
  console.warn('[bootstrap] ADMIN_RESET done — REMOVE the ADMIN_RESET variable now.');
}

// Runs at server start. Idempotent: safe to call on every boot.
// 1. Ensure the data dir exists (volume may be empty on first deploy).
// 2. Apply pending migrations.
// 3. Seed only if the DB has no users yet (first boot / empty volume).
// 4. Optionally reset/create the admin account when ADMIN_RESET is set.
export async function bootstrap() {
  const filename = config.connection.filename;
  await fs.mkdir(path.dirname(filename), { recursive: true });

  await db.migrate.latest();

  const { n } = (await db('users').count('* as n').first()) ?? { n: 0 };
  if (Number(n) === 0) {
    console.log('[bootstrap] empty database detected, running initial seed…');
    await seed(db);
    console.log('[bootstrap] seed complete');
  } else {
    console.log('[bootstrap] database already populated, skipping seed');
  }

  await maybeResetAdmin();
}
