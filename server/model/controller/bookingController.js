const Booking = require('../Booking')
const User = require('../User')
const Listing = require('../Listing')
// const mongoose = require('mongoose')

/**
 * Controller function for creating a booking in the database
 * @param {mongoose.ObjectId} listingId The id of the listing associated with the booking
 * @param {mongoose.ObjectId} userId The id of the user making the booking (not the listing owner)
 * @param {Number} guestNum The number of guests
 * @param {Date} startDate The start date (internal representation of the Datetime object, or ms from January 1st, 1970)
 * @param {Date} endDate The end date
 * @returns true if the booking was created successfully, false otherwise
 */
async function createBooking (listingId, userId, guestNum, startDate, endDate) {
    const listing = await Listing.findOne({ listingId })
	const ownerId = listing.ownerId
    const owner = await User.findById(ownerId)
    const booker = await User.findById(userId)
    const booking = await Booking.findOne({ $or: [{startDate: { $gte: startDate }}, { endDate: { $lte: endDate } }]})

    if (owner) {
        if (booker){
            if (userId == ownerId){
                return false
            }
            if (booker.balance<price) {
              return false
            }
        }
        else { // If user does not exist
            return false
        } 
    }
    else { // If owner does not exist
        return false
    }

    if (!listing) {
        return false // If listing does not exist
    }
    if (booking.length > 0){
        return false
    }

    const newBooking = new Booking({
        listingId, 
        userId, 
        guestNum, 
        startDate, 
        endDate
      })
    newBooking.save((error, booking) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`Booking for ${booking.price} successfully created`)
    }
    })
    return true
}

/**
 * Return an array of bookings under a specific user
 * @param {mongoose.ObjectId} userId The id of the user in question
 * @returns an array of bookings under the user, empty if none found
 */
async function getBookings (userId) {
	// Validate if input is empty
	if (userId === '') {
		return []
	}
	let bookings = Booking.find({userId})
	return bookings
}

module.exports = { createBooking, getBookings }
