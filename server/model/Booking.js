import mongoose, { Schema, ObjectId } from 'mongoose'

const BookingSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  bookerId: {
    type: ObjectId,
    required: true
  },
  progress: String,
  guest_num: {
    type: Number,
    min: 1,
    default: 1
  },
  listingId: {
    type: ObjectId,
    required: true
  },
  payment: Number // We'll deal with this later, absolute necessity for now
})

module.exports = mongoose.model('Booking', BookingSchema)
