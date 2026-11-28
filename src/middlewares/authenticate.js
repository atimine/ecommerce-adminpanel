const { verify } = require('jsonwebtoken')

async function authenticate(req, res, next) {
	const { token } = req.cookies

	if (!token) {
		return res.status(401).render('login', {
			layout: 'auth',
			pageTitle: 'Login',
			error: 'Token expired please login',
		})
	}

	const verified = verify(token, process.env.JWT_REFRESH_SECRET)

	if (!verified) {
		return res.status(401).render('login', {
			layout: 'auth',
			pageTitle: 'Login',
			error: 'Token expired please login',
		})
	}

	next()
}

module.exports = authenticate
