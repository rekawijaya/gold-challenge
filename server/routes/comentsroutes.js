const express   = require('express')
const router    = express.Router()
global.query    = require("../model/query")
global.respons  = require('../respons/respons')
const coments   = require('../controllers/coments')

router.post('/user/coment/:id_user/:id/:coment', coments.insert)
router.get('/user/getcoment/:id', coments.get)
router.put('/user/update/:id_user/:id_posting/:coment', coments.update)
router.delete('/user/deletecoment/:id_user/:id_posting', coments.delete)


module.exports = router