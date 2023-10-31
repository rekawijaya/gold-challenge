const multiparty      = require('multiparty')
const randomstring    = require('randomstring')
const path            = require('path')
const fs              = require('fs')
require('dotenv').config({path: ('../env/.env')})
let self = module.exports = {
    // select file posting
    get: async function(req, res) {
        let file = (typeof req.params.file != 'undefined' && req.params.file != '')? req.params.file.trim(): ''
        let dest = process.env.IMG_PATH + file; 
        file = fs.createReadStream(dest)
        res.writeHead(200, {'Content-disposition': 'attachment; filename='+ req.params.file})
        file.pipe(res)
},
    // upload posting
    upload: async function(req, res) {
        let form = new multiparty.Form()
        form.parse(req, function(err, fields, files) {
            let ext = path.extname(files.file[0].originalFilename);
            if(ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.jpg'){
                let description = (typeof fields.description != 'undefined')? fields.description[0]: ''
                let randstr     = randomstring.generate(7)
                let reader_temp = fs.createReadStream(files.file[0].path);
                let dest        = path.join('C:/Users/wijay/OneDrive/Desktop/gold-challenge/client/assets/images/', randstr + ext)
                let write_file  = fs.createWriteStream(dest)
                let inputDate   = fields.date ? fields.date[0]: 0
                let date        = new Date(inputDate)
                let budget      = fields.budget ? parseInt(fields.budget[0]): 0
                let location    = (typeof fields.location != 'undefined')? fields.location[0]: ''
                let created_at  = new Date
                let updated_at  = new Date
                let id_user     = req.params.id_user
                reader_temp.pipe(write_file);
                const insertData = {description: description, file: randstr + ext, date: date, budget: budget, location: location, created_at: created_at, updated_at: updated_at, id_user: id_user}
                query.insert('posting', insertData)
                respons.CREATED(res, {status: 'succes', message: 'upload berhasil', data: insertData})
            }else{
            respons.ERROR(res, {message: 'upload gagal, format tidak sesuai'})
            }
        })
    },
    // update posting
    update: async function(req, res) {
        let form = new multiparty.Form()
        form.parse(req, function(err, fields, files) {
            let ext = path.extname(files.file[0].originalFilename);
            if(ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.jpg'){
                let description = (typeof fields.description != 'undefined')? fields.description[0]: ''
                let randstr     = randomstring.generate(7)
                let reader_temp = fs.createReadStream(files.file[0].path);
                let dest        = path.join('C:/Users/wijay/OneDrive/Desktop/gold-challenge/client/assets/images/', randstr + ext)
                let write_file  = fs.createWriteStream(dest)
                let inputDate   = fields.date ? fields.date[0]: 0
                let date        = new Date(inputDate)
                let budget      = fields.budget ? parseInt(fields.budget[0]): 0
                let location    = (typeof fields.location != 'undefined')? fields.location[0]: ''
                let created_at  = new Date
                let updated_at  = new Date
                let id_user     = req.params.id_user
                let id          = req.params.id
                reader_temp.pipe(write_file);
                const insertData = {description: description, file: randstr + ext, date: date, budget: budget, location: location, created_at: created_at, updated_at: updated_at, id_user: id_user}
                query.update('posting', insertData, {id})
                respons.CREATED(res, {status: 'succes', message: 'update berhasil', data: insertData})
            }else{
            respons.ERROR(res, {message: 'upload gagal, format tidak sesuai'})
            }
        })
    },
    // delete posting
    delete: async function (req, res){
        const {id, id_user} = req.params
        const criterria = {id, id_user}
        const getPosting = await query.select('posting', criterria)

        if (getPosting.length > 0) {
            await query.delete('posting', criterria)
            respons.OK(res, {ststus:'success', message: 'berhasil menghapus posting', data: getPosting})
        }else{
            respons.OK(res, {status: 'filed', message: 'posting tidak ditemukan'})
        }
    }
}
