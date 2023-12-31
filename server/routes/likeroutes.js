const express   = require('express');
const router    = express.Router()
global.query    = require("../model/query");
global.respons  = require('../respons/respons')
const like      = require('../controllers/like');

router.post('/user/like/:id_user/:id', like.like)
router.delete('/user/like/delete/:id_user/:id', like.likeDelete)
module.exports = router