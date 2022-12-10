/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('tenant', function (table) {
    // Identity and Primary Key
    // table.bigIncrements('id');
    table.uuid('id').primary();

    // Identification fields
    table.string('name', 255).notNullable().unique();
    table.string('schema_name', 255).notNullable().unique();
    table.string('description', 4000).nullable();

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
  return knex.schema.withSchema.dropTable('tenant');
};
