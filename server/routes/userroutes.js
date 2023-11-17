const express   = require('express');
const router    = express.Router()
global.query    = require("../model/query");
global.respons  = require('../respons/respons')
const user      = require('../controllers/user');
router.get('/user/get/:id', user.getUser)
router.get('/user/login/page', user.loginPage)
router.get('/user/regist/page', user.registerPage)
router.get('/user/home/page', user.homepage)
router.get('/user', user.login)
router.post('/user/login/', user.login)
router.post('/user/login/auth', user.loginAuth)
router.post('/user/regist', user.registAuth)
router.post('/user/register', user.postregist)
router.put('/user/update/:id', user.putupdate)
router.delete('/user/delete/:id', user.delete)
module.exports = router