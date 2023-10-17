const express     = require('express')
const app         = express()
const ejs         = require('ejs')
const cors        = require('cors');
require('dotenv').config()
const port        = 3000
const routeruser  = require('./routes/userroutes');
const router = require('./routes/postingroutes');
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs')
app.use(routeruser)
app.use(router)

app.listen(port, () => {
  console.log(`pinjem dulu ${port} mah ada x`)
})