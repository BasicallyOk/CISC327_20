const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  progress: String,
  guest_num: {
    type: Number,
    min: 1,
    default: 1
  },
  listingId: {
    type: mongoose.ObjectId,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  }
})

module.exports = mongoose.model('Booking', BookingSchema)
