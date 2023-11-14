
let self = module.exports = {
    // login
    getUser: async function (req, res){
        const id = req.params.id
        const getDataUser = await query.select('user', {id: id})
        if(getDataUser.length === 0){
            respons.OK(res, {status: 'failed', message: 'data tidak ada'})
        }else {
            respons.OK(res, {status: 'success', message: 'data berhasil diselect', data: getDataUser})
        }
    },
    
    login: async function(req, res) {
        const { username, password } = req.body
        
        if (!username || !password) {
            respons.ERROR(res, { status: 'Failed', message: 'Username dan password harus diisi', data: [] })
            return
        }
    
        const getUser = await query.select('user', { username })
    
        if (getUser.length > 0) {
            if (getUser[0].password === password) {
                respons.OK(res, { status: 'Success', message: 'Login berhasil', data: getUser })
            } else {
                respons.NOTFOUND(res, { status: 'Failed', message: 'Password tidak sesuai', data: [] })
            }
        } else {
            respons.ERROR(res, { status: 'Failed', message: 'Login gagal', data: [] })
        }
    },

    
    
    //registrasi
    postregist: async function(req, res) {
        const { username, password, email, name, city, bday, gender } = req.body
        const currentDate = new Date()
        
        if (!username || !password || !email || !name || !city || !bday || !gender) {
            respons.ERROR(res, { status: 'Gagal', message: 'Ada field yang belum diisi', data: [] })
        } else if (username.length > 25 || password.length > 25 || name.length > 35) {
            respons.ERROR(res, { status: 'Gagal', message: 'Maksimum karakter username 15, password 16, nama 35', data: [] })
        } else {
            const getUser = await query.select('user', { username })
            if (getUser.length > 0) {
                respons.ERROR(res, { status: 'Gagal', message: 'Username sudah terdaftar', data: [] })
            } else {
                const insertData = {username, password, email, name, city, bday, gender, created_at: currentDate, updated_at: currentDate}
                await query.insert('user', insertData)
                respons.CREATED(res, { status: 'success', message: 'Pendaftaran berhasil', data: insertData })
            }
        }
    },
    
    //update username & password
    putupdate: async function(req, res) {
        const { username, password, email, name, city, bday, gender } = req.body
        const currentDate = new Date()
    
        if (!email) {
            respons.NOTFOUND(res, { status: 'Failed', message: 'Email tidak ada', data: [] })
        } else if (username.length >= 15 || password.length >= 8 || name.length >= 35) {
            respons.ERROR(res, { status: 'Failed', message: 'Maksimum karakter username 15 dan password 8 dan nama 35', data: [] })
        } else {
            const getUser = await query.select('user', { email })
    
            if (getUser.length > 0) {
                const insertUser = {username, password, email, name, city, bday, gender, created_at: currentDate, updated_at: currentDate}
    
                await query.update('user', insertUser, { email })
                respons.OK(res, { status: 'Success', message: 'Update berhasil', data: insertUser })
            } else {
                respons.NOTFOUND(res, { status: 'Failed', message: 'Email tidak ditemukan', data: [] })
            }
        }
    },
    
    // delete user account
    delete: async function(req, res) {
        const { username, password } = req.body
        const criteria = { username, password }
    
        const getUser = await query.select('user', criteria)
        
        if (getUser.length > 0) {
            await query.delete('user', criteria)
            respons.OK(res, { status: 'Success', message: 'Akun telah dihapus', data: criteria })
        } else {
            respons.ERROR(res, { status: 'Failed', message: 'Data tidak ditemukan', data: [] })
        }
    },


    
    // monolitic
    loginPage: async function(req, res){
        let base_url = process.env.BASE_URL
        res.render('login' , {base_url})
    },

    registerPage: async function(req, res){
        let base_url = process.env.BASE_URL
        res.render('regist' , {base_url})
    },

    homepage: async function(req, res) {
        let user_id = req.session.userId
        let username    = req.session.username
        let data = await query.selectAll('user')
        let posting = await query.selectAll('posting')
        let base_url = process.env.BASE_URL
        res.render('index' , {base_url, data, posting, user_id, username})
    },
    

    loginAuth: async function(req, res) {
        try {
        const { username, password } = req.body;
        const user = await query.select('user', {username: username, password: password});
        if (user.length > 0) {
            if (user[0].password === password) {
                req.session.userId = user.id;
                res.redirect('/user/home/page');
            }else{
                console.log('erorr');
            }
            }
        } catch (error) {
        console.error(error);
        respons.ERROR(res, {status: 'failed', message: 'internal server error', data:[]})
        }
    },
    
    registAuth: async function(req, res) {
        try {
            const { username, password, email, name, city, bday, gender } = req.body
            const currentDate = new Date
            if (username.length >= 25 || password.length >= 15 || name.length >= 35) {
                respons.ERROR(res, {status: 'failed', message: 'username max 25, pasword max 15, name max 35 '})
            }else{
                const user =     await query.select('user',{username: username})
                if (user.length > 0) {
                    respons.ERROR(res, { status: 'Gagal', message: 'Username sudah terdaftar', data: [] })
                }else{
                    const insertData = {username: username, password: password, email: email, name: name, city: city, bday: bday, gender:gender, created_at: currentDate, updated_at: currentDate}
                    await query.insert('user', insertData)
                    // respons.CREATED(res, {status: 'success', masege: 'regist berhasil', data: insertData})
                    req.session.username = user.username;
                    res.redirect('/user/home/page')
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}
