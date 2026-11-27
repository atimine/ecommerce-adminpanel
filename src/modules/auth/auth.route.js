const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')

router.get('/login', authController.renderLogin)

router.post('/login', authController.login)
router.post('/logout', authController.logout)

module.exports = router
