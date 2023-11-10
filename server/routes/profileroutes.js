
const express   = require('express')
const router    = express.Router()
global.query    = require("../model/query")
global.respons  = require('../respons/respons')
const profile   = require('../controllers/profile')
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

router.post('/user/profile/:id', upload.single('file'), profile.insert)

module.exports = router