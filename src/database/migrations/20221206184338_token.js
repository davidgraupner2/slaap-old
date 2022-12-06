/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('token', function (table) {
    table.bigIncrements('id');
    table.bigint('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user.id').onDelete('CASCADE');
    table.boolean('revoked').defaultTo(false).notNullable();
    table.uuid('access_token_id').notNullable();
    table.uuid('refresh_token_id').notNullable();
    table.string('refresh_token', 1024).notNullable();
    table.timestamp('revoked_at').nullable();
    table.timestamps(true, true);
    table.string('revoke_reason', 50).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('token');
};
