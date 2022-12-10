/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes all existing tenant/user relationships
  await knex.withSchema('public').table('role_user').del();

  // Adds/updates Tenant User Records
  await knex
    .withSchema('public')
    .table('role_user')
    .insert([
      {
        role_id: '97c026c7-98a4-4315-8126-c2b42a510120',
        user_id: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        created_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        updated_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
      },
    ]);
};
