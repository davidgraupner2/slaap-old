/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('tenant_user', function (table) {
    // Links an existing user to an existing tenant
    table.bigint('tenant_id').unsigned().notNullable();
    table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
    table.bigint('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user.id').onDelete('CASCADE');

    // Keep track of who/when created / updated
    table.bigInteger('created_by').unsigned().notNullable();
    table.bigInteger('updated_by').unsigned().notNullable();
    table.foreign('created_by').references('user.id').onDelete('CASCADE');
    table.foreign('updated_by').references('user.id').onDelete('CASCADE');
    table.timestamps(true, true);

    // Ensure same user cannot belong to same tenant more than once
    table.primary(['tenant_id', 'user_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('tenant_user');
};
