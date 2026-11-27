const mongoose = require('mongoose')
const { Schema } = mongoose

const LocationSchema = new Schema({
	lat: Number,
	lang: Number,
	address: String,
})

const UserSchema = new Schema(
	{
		firstName: { type: String, required: true, minLength: 2, maxLength: 50 },
		lastName: { type: String, minLength: 2, maxLength: 50 },
		phone: { type: String, unique: true },
		telegramId: { type: String, unique: true },
		password: { type: String, required: true },
		location: {
			type: { LocationSchema },
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		tokenVersion: { type: Number, default: 0 },
	},
	{ timestamps: true, autoSearchIndex: true },
)

module.exports = new mongoose.model('User', UserSchema)
