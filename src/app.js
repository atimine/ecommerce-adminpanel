require('dotenv').config()

// const dns = require('node:dns')
// dns.setServers(['8.8.8.8', '1.1.1.1'])

const express = require('express')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const { connectDatabase } = require('./config/db')
const path = require('path')
const app = express()

const authRouter = require('./modules/auth/auth.route')
const overviewRouter = require('./modules/overview/overview.route')
const productRouter = require('./modules/product/product.route')
const orderRouter = require('./modules/order/order.route')
const clientRouter = require('./modules/client/client.route')
const courierRouter = require('./modules/courier/courier.route')
const categoryRouter = require('./modules/category/category.route')
const profileRouter = require('./modules/profile/profile.route')

const authenticate = require('./middlewares/authenticate')

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
app.set('view options', {
	layout: 'layouts/main',
})
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '..', 'views'))

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../uploads')))
app.use(express.static(path.join(__dirname, './public')))
app.use(cookieParser())

// ROUTES
app.use('/auth', authRouter)
app.use('/overview', authenticate, overviewRouter)
app.use('/products', authenticate, productRouter)
app.use('/orders', authenticate, orderRouter)
app.use('/clients', authenticate, clientRouter)
app.use('/couriers', authenticate, courierRouter)
app.use('/categories', authenticate, categoryRouter)
app.use('/profile', authenticate, profileRouter)
app.get('/', (req, res) => res.redirect('/overview'))

async function boost() {
	app.listen(PORT, err => {
		if (err) {
			console.log(err)
		}
		console.log('Express App running on: ', PORT)
	})

	await connectDatabase()
}

boost()
