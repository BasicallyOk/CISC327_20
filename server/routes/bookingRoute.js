const express = require('express')
// const mongoose = require('mongoose')
// const Booking = require('../model/Booking')

const router = express.Router() // set up express router

const { createBooking, getBookings } = require('../model/controller/bookingController')

router.get('/ping', async (req, res) => res.send('Booking route')) // ping

/**
 * Create Booking router
 *
 * @param {Object} req
 * @param {Object} req.body
 * @param {mongoose.ObjectId} req.body.listingId The id for the listing that the user is booking
 * @param {mongoose.ObjectId} req.body.userId The id of the user doing the booking
 * @param {Number} req.body.guestNum The number of guest for the booking
 * @param {Date} req.body.startDate The start Date of the booking
 * @param {Date} req.body.endDate The end Date of the booking
 */
router.post('/create', async (req, res) => {
  const status = await createBooking(req.body.listingId, req.body.userId, req.body.guestNum, req.body.startDate, req.body.endDate)
  if (status) {
    res.status(200).json({ success: `Successfully create booking of listing ${req.body.listingId} for user ${req.body.userId}` })
  } else {
    res.status(400).json({ error: `Unable to create booking of listing ${req.body.listingId} for user ${req.body.userId}` })
  }
})

/**
 * Get Bookings router
 *
 * @param {mongoose.ObjectId} req.params.userId URL query parameter. Represent the id of the user in question
 */
router.get('/:userId', async (req, res) => {
  const bookings = await getBookings(req.params.userId)
  if (bookings.length > 0) {
    res.status(200).json({
      success: `Found bookings associated with user ${req.params.userId}`,
      bookings
    })
  } else {
    res.status(400).json({
      error: `No associated booking were found for user ${req.params.userId}`
    })
  }
})

module.exports = router
