const constants = require('../constants/constants.columntypes.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.withSchema('public').createTable('dictionary_column', function (table) {
    // table.bigIncrements('id');
    table.uuid('id').primary();
    // table.bigint('table_id').unsigned().notNullable();
    table.uuid('table_id').unsigned().notNullable().primary();
    table.foreign('table_id').references('dictionary_table.id').onDelete('CASCADE');
    table.string('name', 50).notNullable();
    table.string('type', 25).checkIn(Object.values(constants.COLUMNTYPES)).notNullable();
    table.string('description', 4000).nullable();
    table.integer('length').notNullable().defaultTo(0);
    table.integer('precision').notNullable().defaultTo(8);
    table.integer('scale').notNullable().defaultTo(2);
    table.unique(['table_id', 'name']);

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
  return knex.schema.withSchema('public').dropTable('dictionary_column');
};
