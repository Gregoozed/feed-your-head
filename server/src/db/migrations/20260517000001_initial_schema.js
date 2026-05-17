export async function up(knex) {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('email').notNullable().unique();
    t.string('password_hash').notNullable();
    t.string('name').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('settings', (t) => {
    t.string('key').primary();
    t.text('value_json').notNullable();
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('sections', (t) => {
    t.string('id').primary();
    t.string('type').notNullable();
    t.integer('order').notNullable();
    t.boolean('visible').notNullable().defaultTo(true);
    t.text('data_json').notNullable();
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('uploads', (t) => {
    t.increments('id').primary();
    t.string('filename').notNullable();
    t.string('url').notNullable();
    t.string('mime').notNullable();
    t.integer('size').notNullable();
    t.string('alt').defaultTo('');
    t.integer('uploaded_by').references('id').inTable('users').onDelete('SET NULL');
    t.timestamp('uploaded_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('revisions', (t) => {
    t.increments('id').primary();
    t.string('kind').notNullable(); // 'section' | 'settings'
    t.string('entity_id').notNullable(); // section id or settings key
    t.text('snapshot_json').notNullable();
    t.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.index(['kind', 'entity_id']);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('revisions');
  await knex.schema.dropTableIfExists('uploads');
  await knex.schema.dropTableIfExists('sections');
  await knex.schema.dropTableIfExists('settings');
  await knex.schema.dropTableIfExists('users');
}
