// Cookieless, first-party analytics. We never store the raw IP address.
// Geolocation (country/region) is derived from the IP at request time via an
// offline GeoIP database, then the IP is discarded. `visitor_hash` is a
// daily-rotating salted hash used only to count unique visitors per day — it
// cannot be linked across days nor reversed to an IP (CNIL audience-measurement
// exemption: no cookie, no cross-site tracking, anonymized).

export async function up(knex) {
  await knex.schema.createTable('page_views', (t) => {
    t.increments('id').primary();
    t.string('path').notNullable();
    t.string('referrer_host'); // host only, null for direct/internal
    t.string('country'); // ISO 2-letter, null if unknown
    t.string('region'); // region code, null if unknown
    t.string('device').notNullable().defaultTo('desktop'); // mobile | tablet | desktop
    t.string('visitor_hash').notNullable(); // daily-rotating anonymous hash
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index(['created_at']);
    t.index(['path']);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('page_views');
}
