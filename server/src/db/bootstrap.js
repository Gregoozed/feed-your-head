import fs from 'node:fs/promises';
import path from 'node:path';
import { db } from './index.js';
import { seed } from './seeds/initial.js';
import config from './knexfile.js';

// Runs at server start. Idempotent: safe to call on every boot.
// 1. Ensure the data dir exists (volume may be empty on first deploy).
// 2. Apply pending migrations.
// 3. Seed only if the DB has no users yet (first boot / empty volume).
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
}
