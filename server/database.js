const mongoose = require('mongoose')

require('dotenv').config({ path: '../.env' })

// TODO: use environment variable to allow for a separate testdb
const dbURI = process.env.DB_URI

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
