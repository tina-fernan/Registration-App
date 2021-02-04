const express = require('express')
const { Session } = require('express-session')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const { use } = require('./router')
const app = express()
const router = require('./router')

let sessionOption = session({
    secret: "JavaScript is sooooooooooooooo cooool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOption)
app.use(flash())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views','views')
app.set('view engine', 'ejs')



app.use('/', router)


module.exports = app

