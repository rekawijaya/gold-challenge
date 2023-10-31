/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema.createTable('coments', (table) => {
        table.increments('id').primary()
        table.string('coment')
        table.timestamp('time')
        table.integer('id_user').unsigned().references('id').inTable('user')
        table.integer('id_posting').unsigned().references('id').inTable('posting')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('coments')
};
