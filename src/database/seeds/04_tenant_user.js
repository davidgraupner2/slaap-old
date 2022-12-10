/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes all existing tenant/user relationships
  await knex.withSchema('public').table('tenant_user').del();

  // Adds/updates Tenant User Records
  await knex
    .withSchema('public')
    .table('tenant_user')
    .insert([
      {
        tenant_id: '213d49dd-30de-4ca6-a4d5-c87823213add',
        user_id: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        created_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        updated_by: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
      },
    ]);
};
