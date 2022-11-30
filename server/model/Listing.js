const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
	// One of the 4 entities required
	title: {
		type: String,
		required: true
	},

	address: {
		type: String
	},
	// Required entity
	description: {
		type: String,
		required: true
	},
	// Required entity
	price: {
		type: Number,
		required: true
	},

	pictureUrl: {
		type: String
	},
	// Required entity
	ownerId: {
		type: mongoose.ObjectId,
		required: true
	},

	reviewScore: {
		type: Number
	},
	// Required entity
	lastModifiedDate: {
		type: Number,
		required: true
	}

})

module.exports = mongoose.model('Listing', ListingSchema)
