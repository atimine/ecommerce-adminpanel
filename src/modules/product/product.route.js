const express = require('express')
const productController = require('./product.controller')
const router = express.Router()

router.get('/', productController.getProducts)
router.get('/create', productController.createProduct)

// router.post('/logout', authController.logout)

module.exports = router
