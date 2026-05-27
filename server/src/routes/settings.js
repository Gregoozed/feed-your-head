import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db/index.js';
import { requireAuth } from '../auth/middleware.js';
import { recordRevision } from '../lib/revisions.js';

const router = Router();

const ALLOWED_KEYS = new Set(['brand', 'intro', 'contact', 'nav', 'footer', 'legal']);

const UpdateSchema = z.object({
  value: z.unknown(),
});

router.put('/:key', requireAuth, async (req, res) => {
  const key = req.params.key;
  if (!ALLOWED_KEYS.has(key)) return res.status(404).json({ error: 'unknown_key' });

  const parsed = UpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_input', issues: parsed.error.issues });
  }

  const existing = await db('settings').where({ key }).first();
  if (existing) {
    await recordRevision(db, {
      kind: 'settings',
      entity_id: key,
      snapshot: JSON.parse(existing.value_json),
      user_id: req.user.id,
    });

    await db('settings').where({ key }).update({
      value_json: JSON.stringify(parsed.data.value),
      updated_at: db.fn.now(),
    });
  } else {
    await db('settings').insert({
      key,
      value_json: JSON.stringify(parsed.data.value),
    });
  }

  res.json({ key, value: parsed.data.value });
});

export default router;
