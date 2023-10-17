const knex = require('knex')({
    client: 'pg',
    version: '14.9',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'rekawijaya',
    database : 'sosmed'
    }
});
let self = module.exports = {
    select: function(table, where) {
        return knex.select('*').from(table).where(where)
            .then((data) => {
                return data
            }).catch((error) => {
                console.error("Gagal mengambil data dari tabel:", error)
                throw error
            })
    },
    insert: function ( table, data) {
        return new Promise(function (resolve, reject) {
            knex(table)
                .insert(data)
                .then((post) => {
                    resolve(post)
                })
                .catch((error) => {
                    console.error("Gagal menyisipkan data ke dalam tabel:", error)
                    reject(error)
                })
        })
    },
    update: function (table, data, where) {
        return new Promise(function (resolve, reject) {
            knex(table)
                .update(data).where(where)
                .then((post) => {
                    resolve(post)
                })
                .catch((error) => {
                    console.error("Gagal menyisipkan data ke dalam tabel:", error)
                    reject(error)
                })
        })
    },
    delete: function (table, criteria) {
        return new Promise(function (resolve, reject) {
            knex(table)
                .where(criteria)
                .del() 
                .then((deletedCount) => {
                    resolve(deletedCount)
                })
                .catch((error) => {
                    console.error("Gagal menghapus data dari tabel:", error)
                    reject(error)
                })
        })
    }
    
    
}
