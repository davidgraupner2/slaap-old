/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('dictionary_table', function (table) {
    table.bigIncrements('id');
    table.bigint('tenant_id').unsigned().notNullable();
    table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
    table.string('name', 60).notNullable();
    table.string('description', 4000).nullable();
    table.unique(['tenant_id', 'name']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('dictionary_table');
};
