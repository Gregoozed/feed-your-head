// Create a revision snapshot before an update.
// Keeps the last MAX_REVISIONS per (kind, entity_id) and trims older ones.

const MAX_REVISIONS = 50;

export async function recordRevision(db, { kind, entity_id, snapshot, user_id }) {
  await db('revisions').insert({
    kind,
    entity_id,
    snapshot_json: JSON.stringify(snapshot),
    user_id: user_id ?? null,
  });

  const olderIds = await db('revisions')
    .where({ kind, entity_id })
    .orderBy('created_at', 'desc')
    .offset(MAX_REVISIONS)
    .select('id');

  if (olderIds.length > 0) {
    await db('revisions')
      .whereIn('id', olderIds.map((r) => r.id))
      .del();
  }
}
