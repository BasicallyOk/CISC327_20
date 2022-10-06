const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  //email that is used to assign to user
  email: {
    type: String,
    required: true
  },
  //username that is used to assign to user 
  username: {
    type: String,
    required: true
  },
  //passowrd that is used to assign to user 
  password: {
    type: String,
    required: true
  },
  //balance that is used to assign to user 
  balance: {
    type: Number,
    default: 100,
    required: false
  },
  //billing address that is used to assign to user 
  billingAddress: {
    type: String,
    required: true
  },
  //postal code that is used to assign to uer 
  postalCode: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)
