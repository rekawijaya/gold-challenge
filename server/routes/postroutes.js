
const express   = require('express')
const router    = express.Router()
global.query    = require("../model/query")
global.respons  = require('../respons/respons')
const post      = require('../controllers/post')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({ 
    cloud_name: 'dcsvaufjv', 
    api_key: '791932154452294', 
    api_secret: process.env.API_SECRET
    });

    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
        folder: 'profile',
        allowedFormats: ['jpeg', 'png', 'jpg']
        }
    });
    const upload = multer({ storage: storage });

router.post('/user/post/:id_user', upload.single('file'), post.uploadPosting)
router.put('/user/updateposting/:id_user/:id', upload.single('file'), post.updatePosting)
router.delete('/user/deleteposting/:id_posting/:id_user', post.dletePosting)

module.exports = router