let self = module.exports = {
    updateProfile: async function (req, res) {
        console.log('massook');
        let name = (typeof req.body.name != 'undefined' && req.body.name != '')? req.body.name: ''
        let city = (typeof req.body.city != 'undefined' && req.body.city != '')? req.body.city: ''
        let bday = (typeof req.body.bday != 'undefined' && req.body.bday != '')? req.body.bday: ''
        let gender = (typeof req.body.gender != 'undefined' && req.body.gender != '')? req.body.gender: ''

        if (name === '' || city === '' || bday === '' || gender === '') {
            respons(res, {status: 'filed', message: 'fild tidak boleh kosong', data: []})
            return
        }
        
        if (name.length >= 25) {
            respon(res, {status: 'filed', message: 'character melebihi kapasitas', data: []})
        }else{
            const insertProfile = await query.insert('user', {name: name, city: city, bday: bday, gender: gender}).then(list => list)
            respons(res, {status: 'succes', message: 'data profile berhasil di input', data: insertProfile })
        }
    }
}