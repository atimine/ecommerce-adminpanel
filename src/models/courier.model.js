const mongoose = require('mongoose')
const { Schema } = mongoose

const CourierSchema = new Schema(
	{
		name: { type: String, required: true, minLength: 2, maxLength: 50 },
		phone: { type: String, unique: true },
		telegramId: { type: String, unique: true },
		isConnected: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, autoSearchIndex: true },
)

module.exports = new mongoose.model('Courier', CourierSchema)
