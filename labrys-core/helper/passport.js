const LocalStrategy = require('passport-local').Strategy
const User = require('../dataService/userService/model/user')
const labrysCore = require('../../labrys-core')
const helper = require('./index')
const bcrypt = require('bcrypt')

module.exports = {
    initializePassport: async (passport) => {
        passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            const user = new User({ id: helper.encodeBase64(email), email })
            labrysCore.dataService.userService.get(user).then((myUser) => {
                if (!myUser) {
                    return done(null, false)
                }
                myUser = new User(myUser)
                bcrypt.compare(password, myUser.getPassword(), (err, result) => {
                    if (err) {
                        return done(err)
                    }
                    if (result) {
                        return done(null, myUser.getId())
                    } else {
                        return done(null, false)
                    }
                })
            }).catch((error) => {
                return done(error)
            })
        }))

        passport.serializeUser((user, done) => {
            done(null, user)
        })

        passport.deserializeUser((id, done) => {
            const user = new User({ id })
            labrysCore.dataService.userService.get(user).then((myUser) => {
                done(null, myUser)
            }).catch((error) => {
                done(error, null)
            })
        })
    },

    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    },

    isNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/login')
        }
        return next()
    }
}