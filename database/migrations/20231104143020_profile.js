/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profile', table => {
    table.increments('id').primary()
    table.timestamp('time')
    table.string('file')
    table.integer('id_user').unsigned().references('id').inTable('user')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('profile')
};
