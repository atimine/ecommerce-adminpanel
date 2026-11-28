const express = require('express')
const clientOrder = require('./client.controller')
const router = express.Router()

router.get('/', clientOrder.getClients)

module.exports = router
