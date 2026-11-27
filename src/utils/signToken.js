require('dotenv').config()
const { sign } = require('jsonwebtoken')

async function signToken(payload) {
	const token = sign(payload, process.env.JWT_REFRESH_SECRET)
	return token
}

module.exports = signToken
