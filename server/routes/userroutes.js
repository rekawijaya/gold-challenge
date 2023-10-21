const express   = require('express');
const router    = express.Router()
global.query    = require("../model/query");
global.respons  = require('../respons/respons')
const user      = require('../controllers/user');
const profile   = require('../controllers/userprofile')
router.get('/user', user.login)
router.post('/user/login', user.login)
router.get('/user/read', profile.updateProfile)
router.post('/user/register', user.postregist)
router.post('/user/update', user.putupdate)
router.delete('/user/delete', user.delete)
router.post('/user/profile', profile.updateProfile)
module.exports = router