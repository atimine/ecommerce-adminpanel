const express = require('express')
const router = express.Router()
const profileController = require('./profile.controller')

router.get('/', profileController.getProfileInfo)

module.exports = router
