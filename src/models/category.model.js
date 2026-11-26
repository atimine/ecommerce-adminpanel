const mongoose = require('mongoose')
const { Schema } = mongoose

const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			minLength: 2,
			maxLength: 60,
		},
	},
	{ timestamps: true, autoSearchIndex: true },
)

module.exports = new mongoose.model('Category', CategorySchema)
