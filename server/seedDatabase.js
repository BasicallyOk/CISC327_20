/**
 * Seed database with necessary data for testing
 * Assumes the mongodb docker is already running in detached mode
 * Does not terminate automatically
 */

const mongoose = require('mongoose')
const User = require('./model/User')
const Listing = require('./model/Listing')

const seedDb = () => {
  const defaultUser = new User({
    email: 'khoa@gmail.com',
    password: 'P@ssword',
    username: 'khoaTester'
  })

  defaultUser.save((error, user) => {
    if (error) {
      console.error(error)
    }
    console.log('User seeded successfully')
    const defaultListing = new Listing({
      title: 'khoasTestListing',
      description: "Khoa's Test Listing. Definitely long enough to satisfy requirement",
      price: 100,
      lastModifiedDate: Date.now(),
      ownerId: user._id
    })
    defaultListing.save((error, listing) => {
      if (error) {
        console.error(error)
      }
      console.log('Listing seeded successfully')
      process.exit()
    })
  })
}

mongoose.connect('mongodb://localhost:27017/qbnb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to database established')
    seedDb()
  })
  .catch((err) => {
    console.error(err)
  })
