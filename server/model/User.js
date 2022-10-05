const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  listingID: {
    type: mongoose.ObjectId,
    required: true
  },
  wallet: {
    type: Number,
    min: 1,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)