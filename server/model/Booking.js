const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  // The start date of the booking
  startDate: {
    type: Date,
    required: true
  },
  // The end date of the booking
  endDate: {
    type: Date,
    required: true
  },
  // The id of the user associated with this booking
  userId: {
    type: mongoose.ObjectId,
    required: true
  },
  // progress can be one of: awaiting approval, awaiting payment, ready, in progress, done
  progress: String,
  // Number of guest, default value is 1
  guest_num: {
    type: Number,
    min: 1,
    default: 1
  },
  // The id of the listing associated with this booking
  listingId: {
    type: mongoose.ObjectId,
    required: true
  },
  // The price of the booking
  price: {
    type: Number,
    required: true,
    min: 1
  }
})

module.exports = mongoose.model('Booking', BookingSchema)
