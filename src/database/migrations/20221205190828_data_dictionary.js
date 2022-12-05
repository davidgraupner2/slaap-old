const constants = require('../constants.columntypes.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('data_definitions', function (table) {
    table.increments('id');
    table.string('table_name', 60).notNullable();
    table.string('column_name', 50).notNullable();
    table.string('column_type', 25).checkIn(Object.values(constants.COLUMNTYPES)).notNullable();
    table.string('column_description', 4000).nullable();
    table.integer('column_length').notNullable().defaultTo(0);
    table.integer('column_precision').notNullable().defaultTo(8);
    table.integer('column_scale').notNullable().defaultTo(2);
    table.primary(['table_name', 'column_name']);
    table.index(['table_name'], 'idx_table_name');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('data_dictionary');
};
