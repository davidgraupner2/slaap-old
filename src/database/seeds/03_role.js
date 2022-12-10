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
        id: '97c026c7-98a4-4315-8126-c2b42a510120',
        name: 'msp.admin',
        description: 'Manages Services Administrator role',
        created_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        updated_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
      },
    ]);
};
