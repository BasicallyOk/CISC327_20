const express = require('express')
const bodyParser = require('body-parser')
const { connectDb } = require('./database')

// Import the routers
const usersRouter = require('./routes/user')
const listingRouter = require('./routes/listing')

const port = 8080 // Server will listen to port 8080
const app = express()

// Configuration
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // allow requests from anyone
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH')
  next()
})

// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function main () {
  connectDb()

  console.log('Connected to Database')

  // Ping server
  app.get('/', (req, res) => res.send('Ping'))

  // Set up express routers
  app.use('/user', usersRouter)
  app.use('/listing', listingRouter)

  // Set up server listener on port
  app.listen(port, () => {
    console.log(`This Server running on port ${port}`)
  })
}

main()
