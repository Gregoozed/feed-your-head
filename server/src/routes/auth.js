import { Router } from 'express';
import argon2 from 'argon2';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { db } from '../db/index.js';
import {
  COOKIE_NAME,
  signSession,
  requireAuth,
} from '../auth/middleware.js';
import { isProd } from '../lib/config.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too_many_attempts' },
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/login', loginLimiter, async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_input' });

  const { email, password } = parsed.data;
  const user = await db('users').where({ email }).first();
  if (!user) return res.status(401).json({ error: 'invalid_credentials' });

  const ok = await argon2.verify(user.password_hash, password);
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' });

  const token = signSession(user);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd(),
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
