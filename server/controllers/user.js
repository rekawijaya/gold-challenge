// const { response } = require("express");

let self = module.exports = {
    // login
    login: async function(req, res) {
        let username    = (typeof req.body.username != 'undefined' && req.body.username !== '')? req.body.username: '' 
        let password    = (typeof req.body.password != 'undefined' && req.body.password !== '')? req.body.password: ''
        if (username === '' || password === '') {
            respons(res, { status: 'Failed', message: 'Username dan password harus diisi', data: [] });
            return
        }
        const getUser  = await query.select('user', {username: username}).then(list => list)
        if(getUser.length > 0){
            if(getUser[0].password === password){
                respons(res, {status: 'Success', message: 'login berhasil', data: []})
            }else{
                respons(res, {status: 'Failed', message: 'password tidak sama', data: []})
            }
        }else{
            respons(res, {status: 'Failed', message: 'login gagal', data: []})
        }
    },
    //registrasi
    postregist: async function(req, res) {
        let username    = (typeof req.body.username != 'undefined' && req.body.username !== '')? req.body.username: '' 
        let password    = (typeof req.body.password != 'undefined' && req.body.password !== '')? req.body.password: ''
        let email       = (typeof req.body.email != 'undefined' && req.body.email !== '')? req.body.email: ''
        let name = (typeof req.body.name != 'undefined' && req.body.name != '')? req.body.name: ''
        let city = (typeof req.body.city != 'undefined' && req.body.city != '')? req.body.city: ''
        let bday = (typeof req.body.bday != 'undefined' && req.body.bday != '')? req.body.bday: ''
        let gender = (typeof req.body.gender != 'undefined' && req.body.gender != '')? req.body.gender: ''
        const getUser   = await query.select('user', {username: username}).then(list => list)
        if(getUser.length > 0){
            respons(res, {status: 'Failed', message: 'username sudah terdaftar', data: []})
        }else if(username.length >= 15 || password>= 8 || name >= 35){
            respons(res, {status: 'filed', massage: 'max char username 15 password, name 35', data: []})
        }else{
            const insertUser  = await query.insert('user', {
                    username: username,
                    password: password,
                    email: email,
                    name: name,
                    city: city,
                    bday: bday,
                    gender: gender}).then(list => list)
            respons(res, {status: 'Success', message: 'pendaftaran berhasil', data: insertUser})
        }
    },
    //update username & password
    putupdate: async function(req, res) {
        let username    = (typeof req.body.username != 'undefined' && req.body.username !== '')? req.body.username: '' 
        let password    = (typeof req.body.password != 'undefined' && req.body.password !== '')? req.body.password: ''
        let email       = (typeof req.body.email != 'undefined' && req.body.email !== '')? req.body.email: ''
        const getUser   = await query.select('user', {email: email}).then(list => list);
        if(getUser.length <= 0){
            respons(res, {status: 'Failed', message: 'username tidak ada', data: []})
        }else if(username.length >= 15 || password>= 8){
            respons(res, {status: 'filed', massage: 'max char username 15 dan password', data: []})
        }else{
            const insertUser  = await query.update('user', {username: username, password: password, email: email}, {email: email}).then(list => list);
            respons(res, {status: 'Success', message: 'edit berhasil', data: insertUser})
            // res.render('updateduser', {username: username})
        }
    },
    delete: async function(req, res) {
        let username    = (typeof req.body.username != 'undefined' && req.body.username !== '')? req.body.username: '' 
        let password    = (typeof req.body.password != 'undefined' && req.body.password !== '')? req.body.password: ''
        const getUser   = await query.select('user', {username: username}).then(list => list)
        if(getUser.length > 0){
            const deleteUser = await query.delete('user', {username:username, password:password})
            respons(res, {status: 'succes', massage: 'akun telah dihapus', data: deleteUser})
        }else{
            respons(res, {status: 'filed', massage: 'data tidak ditemukan', data: []})
        }
    },
}
