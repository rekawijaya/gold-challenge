/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('follow', (table) => {
        table.increments('id').primary()
        table.timestamp('time')
        table.integer('id_user_following').unsigned().references('id').inTable('user')
        table.integer('id_user_follower').unsigned().references('id').inTable('user')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('follow')
};
