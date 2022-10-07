const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
  // One of the 4 entities required
  title: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
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

  picture_url: {
    type: String
  },
  // Required entity
  owner_id: {
    type: Number,
    required: true
  },

  review_score: {
    type: Number
  },
  // Required entity
  last_modified_date: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Listing', ListingSchema)
