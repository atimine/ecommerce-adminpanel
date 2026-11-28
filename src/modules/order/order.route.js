const express = require('express')
const orderController = require('./order.controller')
const router = express.Router()

router.get('/', orderController.getOrders)
router.get('/edit', orderController.editOrder)

// router.post('/logout', authController.logout)

module.exports = router
