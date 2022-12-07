/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.withSchema('public').table('tenant').del();

  // Inserts new tenants into the tenant table
  await knex
    .withSchema('public')
    .table('tenant')
    .insert([
      {
        id: 1,
        name: 'public',
        schema_name: 'public',
      },
    ]);
};
