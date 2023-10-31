const routers    = require('express').Router()
const login     = require('./userlogin')
const regist    = require('./userregist')
const posting   = require('./posting')
routers.use('/', login)
routers.use('/user', regist)
routers.use('/posting', posting)

module.exports = routers