const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
	// One of the 4 entities required
	user_id: {
		type: Number,
		required: true
	},

	// Required entity
	listingId: {
		type: Number,
		required: true
	},

	// Required entity
	reviewText: {
		type: String,
		required: true
	},

	// Required entity
	date: {
		type: Date,
		default: Date.now,
		required: true
	},

	comments: [{
		body: String,
		date: Date
	}],

	hidden: Boolean,

	meta: {
		score: Number
	}
})

module.exports = mongoose.model('Review', ReviewSchema)
