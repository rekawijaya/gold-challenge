let self = module.exports = {
    // login
    login: async function(req, res) {
        const { username, password } = req.body
        
        if (!username || !password) {
            respons(res, { status: 'Failed', message: 'Username dan password harus diisi', data: [] })
            return;
        }
    
        const getUser = await query.select('user', { username })
    
        if (getUser.length > 0) {
            if (getUser[0].password === password) {
                respons.OK(res, { status: 'Success', message: 'Login berhasil', data: getUser })
            } else {
                respons.NOTFOUND(res, { status: 'Failed', message: 'Password tidak sesuai', data: [] })
            }
        } else {
            respons.ERRORs(res, { status: 'Failed', message: 'Login gagal', data: [] })
        }
    },
    
    //registrasi
    postregist: async function(req, res) {
        const { username, password, email, name, city, bday, gender } = req.body
        const currentDate = new Date()
        
        if (!username || !password || !email || !name || !city || !bday || !gender) {
            respons.ERROR(res, { status: 'Gagal', message: 'Ada field yang belum diisi', data: [] })
        } else if (username.length >= 15 || password.length >= 8 || name.length >= 35) {
            respons.ERROR(res, { status: 'Gagal', message: 'Maksimum karakter username 15, password 8, nama 35', data: [] })
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
    }    
}
