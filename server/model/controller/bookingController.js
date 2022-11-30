const Booking = require('../Booking')
const mongoose = require('mongoose')
const Listing = require('../Listing')
const User = require('../User')

async function createBooking (startDate, endDate, userId, listingId, price, ownerId) {
    if (startDate){}
    if (endDate){}
    if (userId){}
    if (listingId){}
    if (price){}

    ownerId = mongoose.Types.ObjectId(ownerId)
    userId = mongoose.Types.ObjectId(userId)
    const owner = await User.findById(ownerId)
    const user = await User.findById(userId)
    const listing = await Listing.findOne({ ownerId, title })
    const booking = await Booking.findOne({ startDate, endDate })

    if (owner) {
        if (user){
            if (userId == ownerId){
                return false
            }
            if (user.balance<price) {
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

    if (listing) {
        if (listing.lastModifiedDate<startDate){
            return false
        }
        if (listing.lastModifiedDate>endDate){
            return false
        }
      return false
    }
    const newBooking = new Booking({
        startDate,
        endDate,
        userId,
        listingId,
        price
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
module.exports = { createBooking }