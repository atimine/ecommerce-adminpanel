const express = require('express')
const overviewController = require('./overview.controller')
const router = express.Router()

router.get('/', overviewController.getOverviewInfo)

module.exports = router
