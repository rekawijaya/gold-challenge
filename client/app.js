const express       = require('express')
const path          = require("path")
const fs            = require("fs")
require('dotenv').config({path: '../env/.env'})
const port          = process.env.PORT_CLIENT
//let assets          = path.join(__dirname, 'assets')
const app           = express();
app.use(express.static(__dirname + '/assets'));
const routers        = require('../client/routes/index')

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

app.use(routers)
app.listen(port, () => {
console.log(`dunia sedang tidak baik baik ${port} saja`)
})