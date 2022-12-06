/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('tenant_user', function (table) {
    table.bigint('tenant_id').unsigned().notNullable();
    table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
    table.bigint('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user.id').onDelete('CASCADE');
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
