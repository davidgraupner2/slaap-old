/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('tenant', function (table) {
    table.bigIncrements('id');
    table.string('name', 255).notNullable().unique();
    table.string('schema_name', 255).notNullable().unique();
    table.string('description', 4000).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema.dropTable('tenant');
};
