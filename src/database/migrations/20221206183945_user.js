/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('user', function (table) {
    table.bigIncrements('id').primary();
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('userName', 255).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password', 1024).notNullable();
    table.boolean('verified').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('users');
};
