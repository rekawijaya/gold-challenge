const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data')
const fs = require('fs');
const session       = require('express-session')
router.use(express.json())
// router.use(session({
//     secret: 'binar',
//     saveUninitialized: false,
//     resave: true,
//     cookie: {maxAge:7200000}
// }));

router.post('/submit_upload', async (req, res) =>{
  let data = JSON.stringify({"posting": req.query.caption, 
  "file": req.query.file, 
  "location": req.query.location
})
  let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/posting/upload',
      headers: { 
      'Content-Type': 'application/json'
      },
      data : data
  }

  let hasil = await axios.request(config).then((response) => {
      return response.data;
  }).catch((error) => {
      return {"status":"Failed","message":"registrasi gagal","data":[]}
  });
  if(hasil.status == "Success"){
    //   req.session.username = req.query.caption;
      res.setHeader("Content-Type", "application/json")
      res.writeHead(200);
      res.end(JSON.stringify({status: "Success", display_message: "upload success", data: ""}))
  }else{
      res.setHeader("Content-Type", "application/json")
      res.writeHead(200);
      res.end(JSON.stringify({status: "Failed", display_message: "upload gagal, username mximal 15 character dan password 8 character", data: ""}))
  }
})

module.exports = router;
