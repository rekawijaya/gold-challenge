const multiparty      = require('multiparty')
const randomstring    = require('randomstring')
const path            = require('path')
const fs              = require('fs')
let self = module.exports = {
    get: async function(req, res) {
            let foto = (typeof req.params.foto != 'undefined' && req.params.foto != '')? req.params.foto.trim(): ""
            let dest = process.env.img_path + foto; foto = fs.createReadStream(dest)
            res.writeHead(200, {'Content-disposition': 'attachment; filename='+ req.params.foto})
            foto.pipe(res)
    },
    // upload posting
    upload: function(req, res) {
        let form = new multiparty.Form()
        form.parse(req, function(err, fields, files) {
            console.log("fields", fields)
            console.log("files", files);
            let ext = path.extname(files.foto[0].originalFilename);
            if(ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.jpg'){
                let caption     = (typeof fields.caption != 'undefined')? fields.caption[0]: ''
                let randstr     = randomstring.generate(7)
                let reader_temp = fs.createReadStream(files.foto[0].path);
                let dest        = path.join('C:/Users/wijay/OneDrive/Desktop/gold-challenge/client/assets/images/', randstr + ext)
                let write_file  = fs.createWriteStream(dest)
                reader_temp.pipe(write_file);
                query.insert('posting', {caption: caption, file: randstr + ext}).then(list => list)
                res.setHeader("Content-Type", "application/json")
                res.writeHead(200)
                res.end(JSON.stringify({status: 'success',massage: 'upload masuk'}))
            }else{
                res.setHeader("Content-Type", "application/json")
                res.writeHead(200)
                res.end(JSON.stringify({massage: 'upload gagal, format tidak sesuai'}))
            }
        })
    }
}
