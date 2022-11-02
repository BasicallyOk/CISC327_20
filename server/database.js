const mongoose = require('mongoose')

require('dotenv').config({path: '../.env'})

// TODO: use environment variable to allow for a separate testdb
const dbURI = process.env.DB_URI

const connectDb = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
}

const disconnectDb = async () => {
  await mongoose.connection.close()
}

module.exports = { connectDb, disconnectDb }
