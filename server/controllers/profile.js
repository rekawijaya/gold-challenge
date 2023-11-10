let self = module.exports = {
    insert: async function (req, res) {
        const currenDate = new Date
        const file = req.file
        const id_user   = req.params.id
        const getUser   = await query.select('user', {id: id_user})
        const getProfile = await query.select('profile', { id_user : id_user})
        if (getProfile.length > 0) {
            respons.ERROR(res, {status: 'filed', message: 'gagal upload'})
        }else {
            const data = {time: currenDate, file: file.path, id_user: id_user}
            await query.insert('profile', data)
            respons.OK(res, {status: 'success', message: 'profile berhasil diupload', data: data})
        }
    }
}