import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

router.get('/', async (_req, res) => {
  const [settingsRows, sectionsRows] = await Promise.all([
    db('settings').select('key', 'value_json'),
    db('sections').select('*').orderBy('order', 'asc'),
  ]);

  const settings = {};
  for (const row of settingsRows) {
    settings[row.key] = JSON.parse(row.value_json);
  }

  const sections = sectionsRows.map((s) => ({
    id: s.id,
    type: s.type,
    order: s.order,
    visible: Boolean(s.visible),
    data: JSON.parse(s.data_json),
  }));

  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.json({ settings, sections });
});

export default router;
