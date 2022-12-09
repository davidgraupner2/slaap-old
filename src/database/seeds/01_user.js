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
        id: 1,
        firstName: 'MSP',
        lastName: 'Admin',
        userName: 'msp.admin@localhost',
        email: 'msp.admin@localhost',
        password: '$argon2id$v=19$m=65536,t=3,p=4$hdC3gp/MFc6qIA6JujZqJA$KllHlfOoeZ+hnuiSblYvYALD8AiHyILFSEDbJHUC4ro',
        is_msp: true,
      },
      {
        id: 2,
        firstName: 'David',
        lastName: 'Graupner',
        userName: 'grada17@gmail.com',
        email: 'grada17@gmail.com',
        password: '$argon2id$v=19$m=65536,t=3,p=4$hdC3gp/MFc6qIA6JujZqJA$KllHlfOoeZ+hnuiSblYvYALD8AiHyILFSEDbJHUC4ro',
        is_msp: false,
      },
    ]);
};
