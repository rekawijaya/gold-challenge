// require('dotenv').config('../env/.env')

const respons = require("../respons/respons")

let self = module.exports = {
    get: async function getCommentsById(req, res) {
        const id = req.params.id;
    
        if (!id) {
            return respons.ERROR(res, { status: 'failed', message: 'ID tidak boleh kosong' });
        }
    
        const getComent = await query.select('coments', { id_user: id }); // Ganti dengan kondisi yang sesuai
    
        if (getComent.length === 0) {
            return respons.ERROR(res, { status: 'failed', message: 'Komentar tidak ditemukan', data: [] });
        } else if (getComent.length < id) {
            return respons.ERROR(res, { status: 'failed', message: 'Data tidak ditemukan', data: [] });
        }
    
        return respons.OK(res, { status: 'success', message: 'Data komentar berhasil diambil', data: getComent });    
    },

    insert: async function (req, res){
        const coment        = req.params.coment
        const currentDate   = new Date
        const id_user       = req.params.id_user
        const id            = req.params.id
        const idUser        = await query.select('user', {id: id})
        const idPosting     = await query.select('posting', {id})

        if (!coment) {
            respons.ERROR(res, {ststus:'filed', massage:'coment tidak boleh kosong'})
        }else if (coment.length >= 255){
            respons.ERROR(res, {ststus:'filed', message:'comentar melebihi kapasitas character', data:[]})
        }else if(idPosting.length > 0){
            const inserComent = {coment: coment, time: currentDate, id_user: id_user, id_posting: id}
            await query.insert('coments', inserComent)
            respons.CREATED(res, {ststus:'success', message: 'coment telah masuk', data: inserComent})
        }else {
            respons.ERROR(res, {ststus:'filed', message: 'postingan tidak ditemukan', data: []})
        }
    },

    update: async function (req, res) {
        const {id_user, id_posting, coment} = req.params
        const currentDate = new Date()
    
        if (!id_user || !id_posting) {
            respons.NOTFOUND(res, { status: 'failed', message: 'Komentar tidak ditemukan', data: [] })
        } else {
            const getComment = await query.select('coments', {id_user, id_posting})
            if (getComment.length > 0) {
                const updateComment = { coment: coment, time: currentDate }
                await query.update('coments', updateComment, {id_user, id_posting})
                respons.CREATED(res, { status: 'success', message: 'Komentar berhasil diperbarui', data: updateComment })
            } else {
                respons.NOTFOUND(res, { status: 'failed', message: 'Komentar tidak ditemukan', data: [] })
            }
        }
    },

    delete: async function (req, res) {
        const {id_user, id_posting} = req.params
        const criteria = {id_user, id_posting}

        const getComentToDelete = await query.select('coments', criteria)
        
        if (getComentToDelete.length > 0) {
            await query.delete('coments', criteria)
            respons.OK(res, {status: 'succes', message: 'berhasil dihapus', data: criteria})
        }else {
            respons.ERROR(res, {status: 'filed', message: 'coment tidak ditemukan', data: criteria})
        }
    }
    
}