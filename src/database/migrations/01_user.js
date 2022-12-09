/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('user', function (table) {
    // Identity and Primary Key
    table.bigIncrements('id').primary();

    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('userName', 255).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password', 1024).notNullable();
    table.boolean('verified').notNullable().defaultTo(false);

    // Indicates if the user is a MSP User
    // - MSP Users can belong to multiple tenants
    table.boolean('is_msp').notNullable().defaultTo(false);

    // add 'created_at' and 'updated_at' columns
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('user');
};
