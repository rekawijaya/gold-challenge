const routers    = require('express').Router()
const login     = require('./userlogin')
const regist    = require('./userregist')
routers.use('/', login)
routers.use('/user', regist)

module.exports = routers