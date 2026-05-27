import { Router } from 'express';
import { createHash } from 'node:crypto';
import geoip from 'geoip-lite';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { db } from '../db/index.js';
import { requireAuth } from '../auth/middleware.js';
import { getSecret } from '../lib/config.js';

const router = Router();

// ── helpers ─────────────────────────────────────────────────────────

function deviceFromUA(ua = '') {
  if (/bot|crawl|spider|slurp|bingpreview|facebookexternalhit|preview/i.test(ua)) return 'bot';
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Daily-rotating, salted, one-way hash. The date component means yesterday's
// hash for the same visitor differs from today's → no cross-day tracking.
function visitorHash(ip, ua) {
  const day = new Date().toISOString().slice(0, 10);
  return createHash('sha256')
    .update(`${day}|${getSecret()}|${ip || ''}|${ua || ''}`)
    .digest('hex')
    .slice(0, 32);
}

// Keep only the host of an external referrer; drop internal navigations.
function referrerHost(referrer, selfHost) {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname;
    if (!host || host === selfHost) return null;
    return host.replace(/^www\./, '');
  } catch {
    return null;
  }
}

// ── public tracking endpoint ────────────────────────────────────────

const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60, // generous; per-IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too_many_requests' },
});

const TrackSchema = z.object({
  path: z.string().min(1).max(512),
  referrer: z.string().max(2048).optional().nullable(),
});

router.post('/track', trackLimiter, async (req, res) => {
  const parsed = TrackSchema.safeParse(req.body);
  if (!parsed.success) return res.status(204).end(); // fail silently, never block the visitor

  let { path, referrer } = parsed.data;

  // Don't track the admin back office.
  if (path.startsWith('/admin')) return res.status(204).end();
  // Normalize: strip query/hash, keep a clean path.
  path = path.split(/[?#]/)[0] || '/';
  if (path.length > 1) path = path.replace(/\/+$/, '') || '/';

  const ua = req.get('user-agent') || '';
  const device = deviceFromUA(ua);
  if (device === 'bot') return res.status(204).end(); // ignore crawlers

  const ip = req.ip || '';
  const geo = ip ? geoip.lookup(ip) : null;

  try {
    await db('page_views').insert({
      path,
      referrer_host: referrerHost(referrer, req.hostname),
      country: geo?.country || null,
      region: geo?.region || null,
      device,
      visitor_hash: visitorHash(ip, ua),
    });
  } catch {
    // analytics must never break the site — swallow errors
  }
  res.status(204).end();
});

// ── protected stats endpoint ────────────────────────────────────────

const RANGES = { '7d': 7, '30d': 30, '90d': 90, '365d': 365 };

router.get('/stats', requireAuth, async (req, res) => {
  const rangeKey = RANGES[req.query.range] ? req.query.range : '30d';
  const days = RANGES[rangeKey];
  const since = db.raw("datetime('now', ?)", [`-${days} days`]);
  const base = () => db('page_views').where('created_at', '>=', since);

  const [totals, series, pages, countries, regions, devices, referrers] = await Promise.all([
    base()
      .select(
        db.raw('count(*) as views'),
        db.raw('count(distinct visitor_hash) as visitors')
      )
      .first(),
    base()
      .select(db.raw('date(created_at) as day'))
      .select(
        db.raw('count(*) as views'),
        db.raw('count(distinct visitor_hash) as visitors')
      )
      .groupByRaw('date(created_at)')
      .orderBy('day', 'asc'),
    base().select('path').count({ views: '*' }).groupBy('path').orderBy('views', 'desc').limit(12),
    base()
      .whereNotNull('country')
      .select('country')
      .count({ views: '*' })
      .groupBy('country')
      .orderBy('views', 'desc')
      .limit(12),
    base()
      .whereNotNull('region')
      .andWhere('region', '<>', '')
      .select('country', 'region')
      .count({ views: '*' })
      .groupBy('country', 'region')
      .orderBy('views', 'desc')
      .limit(12),
    base().select('device').count({ views: '*' }).groupBy('device').orderBy('views', 'desc'),
    base()
      .whereNotNull('referrer_host')
      .select('referrer_host')
      .count({ views: '*' })
      .groupBy('referrer_host')
      .orderBy('views', 'desc')
      .limit(12),
  ]);

  res.set('Cache-Control', 'no-store');
  res.json({
    range: rangeKey,
    days,
    totals: {
      views: Number(totals?.views || 0),
      visitors: Number(totals?.visitors || 0),
    },
    series: series.map((r) => ({ day: r.day, views: Number(r.views), visitors: Number(r.visitors) })),
    pages: pages.map((r) => ({ path: r.path, views: Number(r.views) })),
    countries: countries.map((r) => ({ country: r.country, views: Number(r.views) })),
    regions: regions.map((r) => ({ country: r.country, region: r.region, views: Number(r.views) })),
    devices: devices.map((r) => ({ device: r.device, views: Number(r.views) })),
    referrers: referrers.map((r) => ({ host: r.referrer_host, views: Number(r.views) })),
  });
});

export default router;
