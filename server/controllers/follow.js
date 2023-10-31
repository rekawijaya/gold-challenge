const respons = require("../respons/respons")

let self = module.exports = {
    follow: async function (req, res){
        const currenDate    = new Date
        const id            = req.params.id
        const id_follower   = req.params.id_follower
        const idFollowing   = await query.select('user', {id})
        const idFollower    = await query.select('user', {id: id})
        const getFollow     = await query.select('follow', {id})
        if (getFollow.length > 0) {
            respons.ERROR(res, { status: 'Gagal', message: 'anda sudah follow', data: [] })
        }else if (idFollowing.length > 0) {
            const insertFollow = {time: currenDate, id_user_following: id, id_user_follower: id_follower}
            await query.insert('follow', insertFollow)
            respons.CREATED(res, {ststus: 'success', message: 'follow sukses', data: insertFollow})
        }else{
            respons.ERROR(res, {status: 'filed', message: 'user tidak ditemukan', data: []})
        }
    }
}