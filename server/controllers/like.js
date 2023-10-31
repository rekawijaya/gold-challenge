let self = module.exports = {
    like: async function (req, res) {
        const currenDate = new Date
        const id_user    = req.params.id_user
        const id         = req.params.id
        const idUser     = await query.select('user', {id: id})
        const idPosting  = await query.select('posting', { id })
        const getLke     = await query.select('like', {id})
        if (getLke.length > 0) {
            respons.ERROR(res, { status: 'Gagal', message: 'anda sudah like', data: [] })
        }else if (idPosting.length > 0) {
            const insertLike = await query.insert('like', { time: currenDate, id_user: id_user, id_posting: id })
            respons.OK(res, { status: 'success', message: 'like berhasil', data: insertLike })
        } else {
            respons.NOTFOUND(res, { status: 'filed', message: 'posting tidak ditemukan', data: [] })
        }
    }
}