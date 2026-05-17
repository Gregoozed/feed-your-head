import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { db } from '../db/index.js';
import { requireAuth } from '../auth/middleware.js';
import { recordRevision } from '../lib/revisions.js';
import { SECTION_TYPES, SECTION_TEMPLATES } from '../lib/sectionTemplates.js';

const router = Router();

const UpdateSchema = z.object({
  data: z.record(z.unknown()).optional(),
  visible: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

const CreateSchema = z.object({
  type: z.enum(SECTION_TYPES),
});

const ReorderSchema = z.object({
  order: z.array(z.string()).min(1),
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input', issues: parsed.error.issues });

  const { type } = parsed.data;
  const maxOrder = await db('sections').max({ m: 'order' }).first();
  const nextOrder = (maxOrder?.m ?? -1) + 1;
  const id = randomUUID();

  await db('sections').insert({
    id,
    type,
    order: nextOrder,
    visible: 1,
    data_json: JSON.stringify(SECTION_TEMPLATES[type]),
  });

  const row = await db('sections').where({ id }).first();
  res.status(201).json({
    section: {
      id: row.id,
      type: row.type,
      order: row.order,
      visible: Boolean(row.visible),
      data: JSON.parse(row.data_json),
    },
  });
});

router.post('/reorder', requireAuth, async (req, res) => {
  const parsed = ReorderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input' });

  const ids = parsed.data.order;
  // Verify all referenced ids exist
  const existing = await db('sections').whereIn('id', ids).select('id');
  if (existing.length !== ids.length) return res.status(400).json({ error: 'unknown_section_ids' });

  await db.transaction(async (trx) => {
    for (let i = 0; i < ids.length; i += 1) {
      await trx('sections').where({ id: ids[i] }).update({ order: i });
    }
  });

  res.json({ ok: true });
});

router.put('/:id', requireAuth, async (req, res) => {
  const parsed = UpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_input', issues: parsed.error.issues });
  }

  const id = req.params.id;
  const existing = await db('sections').where({ id }).first();
  if (!existing) return res.status(404).json({ error: 'not_found' });

  await recordRevision(db, {
    kind: 'section',
    entity_id: id,
    snapshot: {
      type: existing.type,
      order: existing.order,
      visible: Boolean(existing.visible),
      data: JSON.parse(existing.data_json),
    },
    user_id: req.user.id,
  });

  const patch = { updated_at: db.fn.now() };
  if (parsed.data.data !== undefined) patch.data_json = JSON.stringify(parsed.data.data);
  if (parsed.data.visible !== undefined) patch.visible = parsed.data.visible ? 1 : 0;
  if (parsed.data.order !== undefined) patch.order = parsed.data.order;

  await db('sections').where({ id }).update(patch);

  const updated = await db('sections').where({ id }).first();
  res.json({
    section: {
      id: updated.id,
      type: updated.type,
      order: updated.order,
      visible: Boolean(updated.visible),
      data: JSON.parse(updated.data_json),
    },
  });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = req.params.id;
  const existing = await db('sections').where({ id }).first();
  if (!existing) return res.status(404).json({ error: 'not_found' });

  await recordRevision(db, {
    kind: 'section',
    entity_id: id,
    snapshot: {
      type: existing.type,
      order: existing.order,
      visible: Boolean(existing.visible),
      data: JSON.parse(existing.data_json),
      _deleted: true,
    },
    user_id: req.user.id,
  });

  await db('sections').where({ id }).del();
  res.json({ ok: true });
});

export default router;
