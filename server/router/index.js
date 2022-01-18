const express = require('express')
const lifecycle = require('../controller/lifecycle')
const action = require('../controller/action')
const router = express.Router()
const passport = require('passport')
const passportHelper = require('../../labrys-core/helper/passport')

router.get('/', passportHelper.isAuthenticated, async (req, res) => {
    res.render('index')
})

router.get('/index', async (req, res) => { res.render('index') })
// router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }))
// router.get('/logout', async (req, res) => { req.logOut(); res.redirect('/login') })

router.post('/lifecycle/enable', lifecycle.enable)
router.get('/lifecycle/configure', lifecycle.configure)
router.post('/lifecycle/status', lifecycle.status)
router.post('/lifecycle/uninstall', lifecycle.uninstall)

router.post('/action/create', action.create)
// router.get('/action/configure', passportHelper.isAuthenticated, action.configure)
// router.post('/action/configure', passportHelper.isAuthenticated, action.saveInstance)
router.get('/action/configure', action.configure)
router.post('/action/configure', action.saveInstance)
router.post('/action/delete', action.delete)
router.post('/action/notification', action.notification)

module.exports = router