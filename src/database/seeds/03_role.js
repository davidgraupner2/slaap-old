/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.withSchema('public').table('role').del();

  // Inserts new tenants into the tenant table
  await knex
    .withSchema('public')
    .table('role')
    .insert([
      {
        id: 1,
        name: 'msp.admin',
        description: 'Manages Services Administrator role',
        created_by: 1,
        updated_by: 1,
      },
    ]);
};
