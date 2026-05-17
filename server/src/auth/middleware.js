import jwt from 'jsonwebtoken';
import { getSecret } from '../lib/config.js';

export const COOKIE_NAME = 'fyh_session';

export function signSession(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    getSecret(),
    { expiresIn: '7d' }
  );
}

export function readSession(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  const payload = readSession(token);
  if (!payload) return res.status(401).json({ error: 'unauthorized' });
  req.user = { id: payload.sub, email: payload.email, name: payload.name };
  next();
}

export function attachUser(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    const payload = readSession(token);
    if (payload) {
      req.user = { id: payload.sub, email: payload.email, name: payload.name };
    }
  }
  next();
}
