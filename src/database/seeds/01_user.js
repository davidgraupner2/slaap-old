/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing users
  await knex.withSchema('public').table('user').del();

  // Adds new users
  await knex
    .withSchema('public')
    .table('user')
    .insert([
      {
        id: '18e56058-8f2e-468b-9d10-c9a65586dfa6',
        firstName: 'MSP',
        lastName: 'Admin',
        userName: 'msp.admin@localhost',
        email: 'msp.admin@localhost',
        password: '$argon2id$v=19$m=65536,t=3,p=4$hdC3gp/MFc6qIA6JujZqJA$KllHlfOoeZ+hnuiSblYvYALD8AiHyILFSEDbJHUC4ro',
        is_msp: true,
      },
      {
        id: '5e1e5ea2-7e84-4bb6-a300-82861af704c7',
        firstName: 'David',
        lastName: 'Graupner',
        userName: 'grada17@gmail.com',
        email: 'grada17@gmail.com',
        password: '$argon2id$v=19$m=65536,t=3,p=4$hdC3gp/MFc6qIA6JujZqJA$KllHlfOoeZ+hnuiSblYvYALD8AiHyILFSEDbJHUC4ro',
        is_msp: false,
      },
    ]);
};
