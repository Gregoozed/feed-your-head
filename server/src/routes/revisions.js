import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { db } from '../db/index.js';
import { requireAuth } from '../auth/middleware.js';
import { recordRevision } from '../lib/revisions.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const query = db('revisions')
    .leftJoin('users', 'users.id', 'revisions.user_id')
    .select(
      'revisions.id',
      'revisions.kind',
      'revisions.entity_id',
      'revisions.created_at',
      'users.name as user_name',
      'users.email as user_email'
    )
    .orderBy('revisions.created_at', 'desc')
    .limit(200);

  if (req.query.kind) query.where('revisions.kind', String(req.query.kind));
  if (req.query.entity_id) query.where('revisions.entity_id', String(req.query.entity_id));

  const rows = await query;
  res.json({ items: rows });
});

router.get('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  const row = await db('revisions').where({ id }).first();
  if (!row) return res.status(404).json({ error: 'not_found' });
  res.json({
    revision: {
      ...row,
      snapshot: JSON.parse(row.snapshot_json),
    },
  });
});

router.post('/:id/restore', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  const rev = await db('revisions').where({ id }).first();
  if (!rev) return res.status(404).json({ error: 'not_found' });

  const snapshot = JSON.parse(rev.snapshot_json);

  if (rev.kind === 'settings') {
    const existing = await db('settings').where({ key: rev.entity_id }).first();
    if (existing) {
      await recordRevision(db, {
        kind: 'settings',
        entity_id: rev.entity_id,
        snapshot: JSON.parse(existing.value_json),
        user_id: req.user.id,
      });
      await db('settings').where({ key: rev.entity_id }).update({
        value_json: JSON.stringify(snapshot),
        updated_at: db.fn.now(),
      });
    } else {
      await db('settings').insert({
        key: rev.entity_id,
        value_json: JSON.stringify(snapshot),
      });
    }
    return res.json({ ok: true });
  }

  if (rev.kind === 'section') {
    const existing = await db('sections').where({ id: rev.entity_id }).first();
    if (existing) {
      // Snapshot current state before overwrite
      await recordRevision(db, {
        kind: 'section',
        entity_id: rev.entity_id,
        snapshot: {
          type: existing.type,
          order: existing.order,
          visible: Boolean(existing.visible),
          data: JSON.parse(existing.data_json),
        },
        user_id: req.user.id,
      });

      const patch = {
        data_json: JSON.stringify(snapshot.data),
        updated_at: db.fn.now(),
      };
      if (typeof snapshot.visible === 'boolean') patch.visible = snapshot.visible ? 1 : 0;
      if (typeof snapshot.order === 'number') patch.order = snapshot.order;
      await db('sections').where({ id: rev.entity_id }).update(patch);
    } else {
      // The section was deleted — re-create it.
      await db('sections').insert({
        id: rev.entity_id,
        type: snapshot.type,
        order: snapshot.order ?? 0,
        visible: snapshot.visible === false ? 0 : 1,
        data_json: JSON.stringify(snapshot.data),
      });
    }
    return res.json({ ok: true });
  }

  res.status(400).json({ error: 'unknown_kind' });
});

export default router;
