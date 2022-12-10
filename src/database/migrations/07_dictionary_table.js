/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('dictionary_table', function (table) {
    // table.bigIncrements('id');
    table.uuid('id').primary();
    // table.bigint('tenant_id').unsigned().notNullable();
    table.uuid('tenant_id').unsigned().notNullable();
    table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
    table.string('name', 60).notNullable();
    table.string('description', 4000).nullable();
    table.unique(['tenant_id', 'name']);

    // Keep track of who/when created / updated
    table.timestamps(true, true);
    // table.bigInteger('created_by').unsigned().notNullable();
    // table.bigInteger('updated_by').unsigned().notNullable();
    table.uuid('created_by').unsigned().notNullable();
    table.uuid('updated_by').unsigned().notNullable();
    table.foreign('created_by').references('user.id').onDelete('CASCADE');
    table.foreign('updated_by').references('user.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('dictionary_table');
};
