const mongoose = require('mongoose')

require('dotenv').config({ path: '../.env' })

// TODO: use environment variable to allow for a separate testdb
let dbURI = process.env.DB_URI
if (process.env.DOCKERIZED === 'no') {
  dbURI = process.env.LOCAL_DB_URI
} 

const connectDb = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connection to database established')
    })
    .catch((err) => {
      console.error(err)
    })
}

const disconnectDb = async () => {
  await mongoose.connection.close()
}

module.exports = { connectDb, disconnectDb }
