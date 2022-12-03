const { table } = require('console');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tokens', function (table) {
    table.increments('id');
    table.bigint('user_id').unsigned().notNullable();
    table.boolean('revoked').defaultTo(false).notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.uuid('access_token_id').notNullable();
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
exports.down = function (knex) {};
