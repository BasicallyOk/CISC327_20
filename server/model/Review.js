import mongoose, { Schema } from 'mongoose'

const ReviewSchema = new Schema({
  listing: String,
  user: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    score: Number
  }
})

module.exports = mongoose.model('Review', ReviewSchema)
