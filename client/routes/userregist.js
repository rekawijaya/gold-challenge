const express       = require('express')
const router        = express.Router()
const path          = require("path")
const fs            = require("fs")
require('dotenv').config()
//var assets          = path.join(__dirname, 'assets')
const axios         = require('axios')
const session       = require('express-session')
router.use(express.json())
router.use(session({
    secret: 'binar',
    saveUninitialized: false,
    resave: true,
    cookie: {maxAge:7200000}
}));

router.get('/user', async (req, res) => {
    let sess = req.session 
    if(!sess.username){
        return res.redirect('/user')
    }else{
        res.render('newindex', {base_url : process.env.BASE_URL, data: []})
    }
})

router.get('/register', async (req, res) => {
    let sess = req.session 
    if(!sess.username){
        res.render('newregister', {base_url : process.env.BASE_URL, data: []})
    }else{
        return res.redirect('/user')
    }
})

router.get('/submit_register', async (req, res) =>{
    let data = JSON.stringify({"username": req.query.username, 
    "password": req.query.password, 
    "email": req.query.email,
    "name": req.query.name,
    "city": req.query.city,
    "bday": req.query.bday,
    "gender": req.query.gender
})
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/user/register',
        headers: { 
        'Content-Type': 'application/json'
        },
        data : data
    }

    let hasil = await axios.request(config) .then((response) => {
        return response.data;
    }).catch((error) => {
        return {"status":"Failed","message":"registrasi gagal","data":[]}
    });
    if(hasil.status == "Success"){
        req.session.username = req.query.username;
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Success", display_message: "registrasi success", data: ""}))
    }else{
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Failed", display_message: "registrasi gagal, username mximal 15 character dan password 8 character", data: ""}))
    }
})
module.exports = router
