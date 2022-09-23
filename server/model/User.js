import mongoose, { Schema, ObjectId } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  listingID: {
    type: ObjectId,
    required: true
  },
  wallet: {
    type: Number,
    min: 1,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)
