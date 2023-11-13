

let self = module.exports ={
    getPost: async function (req, res){
        const id = req.params.id
        const getIdUser = await query.select('posting', {id_user: id})
        if(getIdUser.length === 0){
            respons.OK(res, {status: 'failed', message: 'data tidak ada', data: []})
        }else {
            respons.OK(res, {status: 'success', message: 'data berhasil diselect', data: getIdUser})
        }
    },
    uploadPosting: async function (req, res) {
        const {description, date, budget, location} = req.body
        const file  = req.file
        const created_at    = new Date
        const updated_at    = new Date
        const id_user       = req.params.id_user
        const getUser       = await query.select('user', {id: id_user})
        if (getUser.length > 0) {
            const insertPosting = {
                description: description,
                file: file.path, 
                date: date,
                budget: budget, 
                location: location,
                created_at: created_at,
                updated_at: updated_at,
                id_user: id_user
            }
            await query.insert('posting', insertPosting)
            respons.OK(res, {status: 'success', message: 'upload berhasil', data: insertPosting})
        }else{
            respons.ERROR(res, {ststus: 'filed', message: 'upload gagal, user tidak ditemukan'})
        }
    },
    
    updatePosting: async function (req, res) {
        const {description, date, budget, location} = req.body
        // const id_user       = req.params.id_user
        const id_posting    = req.params.id
        const file          = req.file
        const created_at    = new Date
        const updated_at    = new Date
        // const getUser       = await query.select('user', {id: id_user})
        const getIdPosting  = await query.select('posting', {id: id_posting})
        if (getIdPosting.length > 0) {
            const dataUpdate = {
                description: description,
                file: file.path, 
                date: date,
                budget: budget, 
                location: location,
                created_at: created_at,
                updated_at: updated_at,
            }
            await query.update('posting', dataUpdate, {id: id_posting})
            respons.CREATED(res, {status: 'success', message: 'posting berhasil diupdate', data: dataUpdate})
        }else {
            respons.ERROR(res, {ststus: 'filed', message: 'gagal update, posting tidak ditemukan'})
        }
    },

    dletePosting: async function (req, res){
        const id_posting   = req.params.id_posting
        const getPosting = await query.select('posting', {id: id_posting})

        if (getPosting.length > 0) {
            await query.delete('posting', {id: id_posting})
            respons.OK(res, {ststus:'success', message: 'berhasil menghapus posting', data: getPosting})
        }else{
            respons.OK(res, {status: 'filed', message: 'posting tidak ditemukan'})
        }
    }
}