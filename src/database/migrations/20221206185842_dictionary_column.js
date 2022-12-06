const constants = require('../constants.columntypes.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('dictionary_column', function (table) {
    table.bigIncrements('id');
    table.bigint('table_id').unsigned().notNullable();
    table.foreign('table_id').references('dictionary_table.id').onDelete('CASCADE');
    table.string('name', 50).notNullable();
    table.string('type', 25).checkIn(Object.values(constants.COLUMNTYPES)).notNullable();
    table.string('description', 4000).nullable();
    table.integer('length').notNullable().defaultTo(0);
    table.integer('precision').notNullable().defaultTo(8);
    table.integer('scale').notNullable().defaultTo(2);
    table.unique(['table_id', 'name']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.withSchema('public').dropTable('dictionary_column');
};
