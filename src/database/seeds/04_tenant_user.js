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
        tenant_id: 1,
        user_id: 1,
        created_by: 1,
        updated_by: 1,
      },
    ]);
};
