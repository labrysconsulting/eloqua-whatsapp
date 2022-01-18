const express = require('express')
const bodyParser = require('body-parser')
const router = require('./server/router')
const labrysCore = require('./labrys-core')
const passport = require('passport')
const session = require('express-session')
const helper = require('./labrys-core/helper/passport')

const init = async () => {
    const app = express()

    app.set('view engine', 'ejs')
    app.set('views', './client')

    await labrysCore.init()

    // await helper.initializePassport(passport)
    // app.use(session({
    //     secret: "SECRET_KEY",
    //     resave: false,
    //     saveUninitialized: false
    // }))
    // app.use(passport.initialize())
    // app.use(passport.session())

    const setLabrysCore = (req, res, next) => {
        req.labrysCore = labrysCore
        next()
    }

    app.use(setLabrysCore)
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(router)

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Listening Port: ${PORT}`)
    })
}
init()