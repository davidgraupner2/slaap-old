/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { id: 1, firstName: 'Ian', lastName: 'Delport', email: 'ian@delport.com' },
    {
      id: 2,
      firstName: 'Maryke',
      lastName: 'Delport',
      email: 'maryke@delpport.com',
    },
    {
      id: 3,
      firstName: 'Nicky',
      lastName: 'Graupner',
      email: 'nickyg@cool.com',
    },
  ]);
};
