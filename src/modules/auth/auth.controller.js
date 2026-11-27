const bcrypt = require('bcrypt')
const userModel = require('../../models/user.model')
const signToken = require('../../utils/signToken')

class AuthController {
	async renderLogin(req, res) {
		res.render('login', {
			layout: 'auth',
			pageTitle: 'Login',
		})
	}

	async login(req, res) {
		const { username, password } = req.body

		const existingAdmin = await userModel.findOne({ firstName: username })

		if (!existingAdmin) {
			res.status(404).render('login', {
				layout: 'auth',
				pageTitle: 'Login',
				error: 'Could not find the user',
			})
		}

		const checkedPassword = await bcrypt.compare(
			password,
			existingAdmin.password,
		)

		if (!checkedPassword)
			return res.status(400).render('login', {
				layout: 'auth',
				pageTitle: 'Login',
				error: 'Password is wrong',
			})

		const { _id, firstName } = existingAdmin
		const token = signToken({ _id, firstName })

		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 6.048e8,
			secure: true,
			sameSite: true,
		})

		res.redirect('/')
	}

	async logout() {}
}

module.exports = new AuthController()
