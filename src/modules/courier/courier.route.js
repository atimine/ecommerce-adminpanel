const express = require('express')
const courierController = require('./courier.controller')
const router = express.Router()

router.get('/', courierController.getCouriers)
router.get('/history', courierController.getHistory)

module.exports = router
