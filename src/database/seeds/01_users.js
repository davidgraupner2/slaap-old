/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      firstName: 'David',
      lastName: 'Graupner',
      userName: 'grada17@gmail.com',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$hdC3gp/MFc6qIA6JujZqJA$KllHlfOoeZ+hnuiSblYvYALD8AiHyILFSEDbJHUC4ro',
    },
  ]);
};
