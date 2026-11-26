const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema(
	{
		name: { type: String, required: true, minLength: 2, maxLength: 120 },
		description: { type: String, maxLength: 200 },
		price: { type: Number },
		telegramId: { type: String, unique: true },
		category: {
			type: { LocationSchema },
		},
		inStock: {
			type: Boolean,
			default: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true, autoSearchIndex: true },
)

module.exports = new mongoose.model('Product', ProductSchema)
