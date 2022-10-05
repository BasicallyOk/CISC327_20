const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    min: 1,
    required: true
  },
  billingAddress: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)