/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posting', (table) => {
    table.increments('id').primary()
    table.text('description')
    table.string('file')
    table.date('date')
    table.integer('budget')
    table.string('location')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.integer('id_user').unsigned().references('id').inTable('user')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('posting')
};
