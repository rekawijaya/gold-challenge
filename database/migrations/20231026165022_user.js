/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary()
        table.string('username');
        table.string('password');
        table.string('email');
        table.string('name');
        table.string('city');
        table.date('bday');
        table.string('gender');
        table.timestamp('created_at')
        table.timestamp('updated_at')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema.dropTable('user')
};
