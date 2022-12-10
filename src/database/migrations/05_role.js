/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('role', function (table) {
    // Identiity and primary key
    table.uuid('id').primary();
    // table.bigIncrements('id').primary();

    // Role name identification
    table.string('name', 255).notNullable();
    table.string('description', 255).notNullable();

    // Keep track of who/when created / updated
    // table.timestamps(true, true);
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
  return knex.schema.withSchema('public').dropTable('role');
};
