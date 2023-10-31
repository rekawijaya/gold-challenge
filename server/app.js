const express     = require('express')
const app         = express()
const ejs         = require('ejs')
const cors        = require('cors')
require('dotenv').config({path: '../env/.env'})
const port        = process.env.PORT_SERVER
const user  = require('./routes/userroutes')
const posting = require('./routes/postingroutes')
const coments = require('./routes/comentsroutes')
const like = require('./routes/likeroutes')
const follow = require('./routes/followroutes')

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs')
app.use(user)
app.use(posting)
app.use(coments)
app.use(like)
app.use(follow)

app.listen(port, () => {
  console.log(`pinjem dulu ${port} mah ada x`)
})