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
        id: '213d49dd-30de-4ca6-a4d5-c87823213add',
        name: 'public',
        schema_name: 'public',
        created_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        updated_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
      },
    ]);
};
