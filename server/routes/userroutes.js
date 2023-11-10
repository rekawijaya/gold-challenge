const express   = require('express');
const router    = express.Router()
global.query    = require("../model/query");
global.respons  = require('../respons/respons')
const user      = require('../controllers/user');
router.get('/user/get/:id', user.getUser)
router.get('/user', user.login)
router.post('/user/login', user.login)
router.post('/user/register', user.postregist)
router.put('/user/update', user.putupdate)
router.delete('/user/delete', user.delete)
module.exports = router