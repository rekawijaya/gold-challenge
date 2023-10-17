const express   = require('express')
const router    = express.Router()
global.query    = require("../model/query")
global.respons  = require('../respons/respons')
const posting    = require('../controllers/posting')
router.get('/posting/:foto', posting.get)
router.post('/posting/upload', posting.upload)
module.exports = router