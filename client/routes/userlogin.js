const express        = require('express')
const router        = express.Router()
require('dotenv').config()
const axios         = require('axios')
const session       = require('express-session')
router.use(express.json())
router.use(session({
    secret: 'binar',
    saveUninitialized: false,
    resave: true,
    cookie: {maxAge:7200000}
}));
router.get('/', async (req, res) => {
    let sess = req.session
    if(!sess.username){
        return res.redirect('/')
    }else{
        /*var config = {
            method: 'get',
            url: process.env.PORT_API + '/user',
            headers: { }
        };
        var data = await axios(config).then(function (response) {
            return response.data.data;
        }).catch(function (error) {
            return error
        });
        console.log("hasil read", data);*/
        res.render('newindex', {base_url: process.env.BASE_URL, data: [], username: req.session.username})
    }
})
router.get('/logoff', (req, res) => {
    req.session.username = null
    return res.redirect('/login')
})
router.get('/login', (req, res) => {
    let sess = req.session;
    if(!sess.username){
        res.render('newlogin', {base_url: process.env.BASE_URL, data: ""})
    }else{
        return res.redirect('/user/login')
    }
})
router.get('/submit_login', async (req, res) => {
    let data = JSON.stringify({"username": req.query.username, "password": req.query.password})
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/user/login',
        headers: { 
        'Content-Type': 'application/json'
        },
        data : data
    };

    let hasil = await axios.request(config) .then((response) => {
        return response.data;
    }).catch((error) => {
        return {"status":"Failed","message":"login Gagal","data":[]}
    });
    if(hasil.status == "Success"){
        req.session.username = req.query.username;
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Success", display_message: "login success", data: ""}))
    }else{
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Failed", display_message: "login gagal", data: ""}))
    }
})

module.exports = router