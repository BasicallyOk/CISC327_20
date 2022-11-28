const Booking = require('../Booking')
const User = require('../User')
const Listing = require('../Listing')
const mongoose = require('mongoose')

/**
 * Controller function for creating a booking in the database
 * @param {mongoose.ObjectId} listingId The id of the listing associated with the booking
 * @param {mongoose.ObjectId} userId The id of the user making the booking (not the listing owner)
 * @param {Number} guestNum The number of guests
 * @param {Number} startDate The start date (internal representation of the Datetime object, or ms from January 1st, 1970)
 * @param {Number} endDate The end date
 * @returns true if the booking was created successfully, false otherwise
 */
async function createBooking(listingId, userId, guestNum, startDate, endDate) {
    return true
}

/**
 * Return an array of bookings under a specific user
 * @param {mongoose.ObjectId} userId The id of the user in question
 * @returns an array of bookings under the user, empty if none found
 */
async function getBookings(userId) {
    return []
}

module.exports = { createBooking, getBookings }