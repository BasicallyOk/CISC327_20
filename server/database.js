const mongoose = require('mongoose')

// TODO: use environment variable to allow for a separate testdb
const dbURI = 'mongodb+srv://test:test@cluster0.bt5g3.mongodb.net/QBNB?retryWrites=true&w=majority'

const connectDb = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
}

const disconnectDb = async () => {
  await mongoose.connection.close()
}

module.exports = { connectDb, disconnectDb }
