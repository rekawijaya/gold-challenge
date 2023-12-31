const express   = require('express');
const router    = express.Router()
global.query    = require("../model/query");
global.respons  = require('../respons/respons')
const follow    = require('../controllers/follow');

router.post('/user/follow/:id/:id_follower', follow.follow)
router.delete('/user/follow/delete/:id/:id_follower', follow.deleteFollow)
module.exports = router