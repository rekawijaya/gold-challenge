const express       = require('express')
const router        = express.Router()
require('dotenv').config({path: ('../env/.env')})
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
        return res.redirect('/login')
    }else{
        let response = await axios({ method: 'get', url: process.env.PORT_API + '/user/get/'+ req.session.user_id, headers: { }}).then(response => response);
        let posting  = await axios({ method: 'get', url: process.env.PORT_API + '/user/get/post/'+ req.session.user_id, headers: { }}).then(response => response);
        res.render('newindex', {base_url: process.env.BASE_URL, data: response.data.data, posting: posting.data.data, user_id: req.session.user_id})
        console.log(response.data.data, "user");
        console.log(posting.data.data, 'userpost');
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
        return res.redirect('/login')
    }
})
router.get('/submit_login', async (req, res) => {
    let data = JSON.stringify({"username": req.query.username, "password": req.query.password})
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.PORT_API + '/user/login',
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

    console.log(hasil, 'hasil');
    if(hasil.status == "Success"){
        console.log("hasil.data", hasil.data)
        req.session.username    = hasil.data[0].username;
        req.session.user_id     = hasil.data[0].id;
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "success", display_message: "login success", data: ""}))
    }else{
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Failed", display_message: "login gagal", data: ""}))
    }
})

module.exports = router