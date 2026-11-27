require('dotenv').config()
const { connectDatabase, mongoose } = require('../config/db')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

async function setDefaultAdmin() {
	const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)

	const defaultAdmin = await userModel.findOne({
		firstName: process.env.ADMIN_NAME,
	})

	if (!defaultAdmin) {
		console.log('Default admin was created!')
		return await userModel.create({
			firstName: process.env.ADMIN_NAME,
			password,
		})
	}

	console.log('Default admin is active')
}

connectDatabase().then(async () => {
	await setDefaultAdmin()
	mongoose.connection.close()
})
