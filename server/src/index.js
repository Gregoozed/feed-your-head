import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';

import authRouter from './routes/auth.js';
import contentRouter from './routes/content.js';
import sectionsRouter from './routes/sections.js';
import settingsRouter from './routes/settings.js';
import uploadsRouter from './routes/uploads.js';
import usersRouter from './routes/users.js';
import revisionsRouter from './routes/revisions.js';
import { getPort, isProd } from './lib/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const clientDist = path.resolve(__dirname, '../../client/dist');

const app = express();

// Trust reverse proxy headers (nginx) so req.ip works behind it in prod.
app.set('trust proxy', isProd() ? 1 : false);

app.use(
  helmet({
    contentSecurityPolicy: isProd()
      ? {
          useDefaults: true,
          directives: {
            // Allow Google Fonts + same-origin images (the SVG favicon and /uploads).
            'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            'img-src': ["'self'", 'data:', 'https://images.unsplash.com'],
            'script-src': ["'self'"],
          },
        }
      : false, // dev: CSP off so Vite HMR/eval works
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-site' },
  })
);

app.use(compression());
app.use(express.json({ limit: '256kb' }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);
app.use('/api/sections', sectionsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/uploads', uploadsRouter);
app.use('/api/users', usersRouter);
app.use('/api/revisions', revisionsRouter);

app.use('/uploads', express.static(path.join(root, 'uploads'), { maxAge: '7d' }));

// In production, serve the built client.
if (isProd()) {
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error('[server error]', err);
  res.status(500).json({ error: 'internal_error' });
});

const port = getPort();
app.listen(port, () => {
  console.log(`[fyh-server] listening on http://localhost:${port}`);
});
