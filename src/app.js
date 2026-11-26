require('dotenv').config()
// const dns = require('node:dns')

// dns.setServers(['8.8.8.8', '1.1.1.1'])

const express = require('express')
const { engine } = require('express-handlebars')
// const cookieParser = require('cookie-parser')
// const { connectDatabase } = require('./config/db')
const path = require('path')
const app = express()

const PORT = process.env.PORT

// VIEW ENGINE CONFIG
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, '..', 'views/layouts'),
		partialsDir: path.join(__dirname, '..', 'views/partials'),
	}),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '..', 'views'))

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../uploads')))
app.use(express.static(path.join(__dirname, './public')))

// ROUTES
app.get('/', (req, res) => {
	res.render('dashboard', {
		pageTitle: 'Dashboard',
		pageDescription:
			'Manage inventory, analyze data, and track orders with ease',
	})
})

async function boost() {
	app.listen(PORT, err => {
		if (err) {
			console.log(err)
		}
		console.log('Express App running on: ', PORT)
	})

	// await connectDatabase()
}

boost()
