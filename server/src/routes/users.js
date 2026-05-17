import { Router } from 'express';
import argon2 from 'argon2';
import { z } from 'zod';
import { db } from '../db/index.js';
import { requireAuth } from '../auth/middleware.js';

const router = Router();

const safe = (u) => ({ id: u.id, email: u.email, name: u.name, created_at: u.created_at });

router.get('/', requireAuth, async (_req, res) => {
  const rows = await db('users').select('*').orderBy('created_at', 'asc');
  res.json({ items: rows.map(safe) });
});

const CreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120),
});

router.post('/', requireAuth, async (req, res) => {
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input', issues: parsed.error.issues });

  const { email, password, name } = parsed.data;
  const existing = await db('users').where({ email }).first();
  if (existing) return res.status(409).json({ error: 'email_taken' });

  const password_hash = await argon2.hash(password, { type: argon2.argon2id });
  const [id] = await db('users').insert({ email, password_hash, name });
  const row = await db('users').where({ id }).first();
  res.status(201).json({ user: safe(row) });
});

const PatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(120).optional(),
  password: z.string().min(8).optional(),
});

router.patch('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  const existing = await db('users').where({ id }).first();
  if (!existing) return res.status(404).json({ error: 'not_found' });

  const parsed = PatchSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input', issues: parsed.error.issues });

  const patch = {};
  if (parsed.data.name) patch.name = parsed.data.name;
  if (parsed.data.email && parsed.data.email !== existing.email) {
    const dup = await db('users').where({ email: parsed.data.email }).whereNot({ id }).first();
    if (dup) return res.status(409).json({ error: 'email_taken' });
    patch.email = parsed.data.email;
  }
  if (parsed.data.password) {
    patch.password_hash = await argon2.hash(parsed.data.password, { type: argon2.argon2id });
  }

  if (Object.keys(patch).length === 0) return res.json({ user: safe(existing) });

  await db('users').where({ id }).update(patch);
  const row = await db('users').where({ id }).first();
  res.json({ user: safe(row) });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid_id' });
  if (id === req.user.id) return res.status(400).json({ error: 'cannot_delete_self' });
  const existing = await db('users').where({ id }).first();
  if (!existing) return res.status(404).json({ error: 'not_found' });

  const count = await db('users').count({ c: '*' }).first();
  if ((count?.c ?? 0) <= 1) return res.status(400).json({ error: 'last_admin' });

  await db('users').where({ id }).del();
  res.json({ ok: true });
});

export default router;
