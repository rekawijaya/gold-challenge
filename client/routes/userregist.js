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
    }
})

router.get('/register', async (req, res) => {
    let sess = req.session 
    if(!sess.username){
        res.render('newregister', {base_url : process.env.BASE_URL, data: ""})
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
        url: process.env.PORT_API + '/user/register',
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
         req.session.username    = hasil.data[0].username
        req.session.user_id     = hasil.data[0].id
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Success", display_message: "registrasi Success", data: ""}))
    }else{
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        res.end(JSON.stringify({status: "Failed", display_message: "registrasi gagal, username mximal 15 character dan password 8 character wawawaw", data: ""}))
    }
})
module.exports = router
