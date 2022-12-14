const Booking = require('../Booking')
const User = require('../User')
const Listing = require('../Listing')

const { createBooking, getBookings } = require('../controller/bookingController')
const { connectDb, disconnectDb } = require('../../database')

beforeAll(() => {
	connectDb()
})

afterAll(async () => {
	await disconnectDb()
})

describe('Booking', () => {
	// The object that will store the booker object
	let booker
	let listingOwner
	let affordableListing
	let expensiveListing

	// Assuming that the user khoa@gmail.com always exists
	// Assuming that khoasTestListing always exists
	beforeAll(async () => {
		// Create the second user that will acquire the booking
		booker = await User.findOne({
			email: 'robbie@gmail.com'
		})

		listingOwner = await User.findOne({
			email: 'khoa@gmail.com'
		})

		affordableListing = await Listing.findOne({
			title: 'khoasTestListing',
			ownerId: listingOwner._id
		})

		expensiveListing = await Listing.findOne({
			title: 'khoasExpensiveListing',
			ownerId: listingOwner._id
		})
	})

	describe('Create Booking', () => {
		it('should allow a user to book a valid listing', async () => {
			const startDate = Date.now()
			const endDate = startDate + 10

			const status = await createBooking(affordableListing._id, booker._id, 1, startDate, endDate)
			expect(status).toBe(true)

			// Remove the created booking
			await Booking.findOneAndRemove({
				startDate,
				endDate,
				userId: booker._id,
				listingId: affordableListing._id
			})
		})

		it('should not allow a user to book their own listing', async () => {
			const status = await createBooking(affordableListing._id, listingOwner._id, 1, Date.now(), Date.now() + 10)
			expect(status).toBe(false)
		})

		it('should not allow a user to book a listing they cannot afford', async () => {
			const status = await createBooking(expensiveListing._id, listingOwner._id, 1, Date.now(), Date.now() + 10)
			expect(status).toBe(false)
		})

		it('should not allow a user to book a listing that already have a booking at the specify time', async () => {
			const bookedTimeStart = Date.now()
			const bookedTimeEnd = bookedTimeStart + 10

			const existingBooking = new Booking({
				startDate: bookedTimeStart,
				endDate: bookedTimeEnd,
				userId: booker._id,
				listingId: affordableListing._id,
				guest_num: 1,
				price: affordableListing.price
			})
			const booking = await existingBooking.save()

			// Input partitioning
			// Time is exactly the same
			let status = await createBooking(affordableListing._id, booker._id, 1, bookedTimeStart, bookedTimeEnd)
			expect(status).toBe(false)

			// Complete overlap of booking time
			status = await createBooking(affordableListing._id, booker._id, 1, bookedTimeStart - 1000, bookedTimeEnd + 1000)
			expect(status).toBe(false)

			// Partial head overlap of booking time
			status = await createBooking(affordableListing._id, booker._id, 1, bookedTimeStart + 2, bookedTimeEnd + 1000)
			expect(status).toBe(false)

			// Partial tail overlap of booking time
			status = await createBooking(affordableListing._id, booker._id, 1, bookedTimeStart - 1000, bookedTimeEnd - 2)
			expect(status).toBe(false)

			// Remove the existing booking
			await Booking.findByIdAndRemove(booking._id)
		})
	})

	describe('Get Booking', () => {
		let affordableListing_2
		let bookingToGet
		beforeAll(async () => {
			affordableListing_2 = await Listing.findOne({
				title: 'khoasTestListing_2',
				ownerId: listingOwner._id
			  })

			const existingBooking = new Booking({
				startDate: Date.now(),
				endDate: Date.now() + 10,
				userId: booker._id,
				listingId: affordableListing_2._id,
				guest_num: 1,
				price: affordableListing_2.price
			  })

			bookingToGet = await existingBooking.save()
		})

        afterAll(async () => {
            await Listing.findByIdAndDelete(bookingToGet._id)
        })

		it('should return the booking that the user holds', async () => {
			const bookingList = await getBookings(booker._id)
            console.log(bookingList)
            let contains = false
            for (let booking of bookingList) {
                if (booking.listingId == bookingToGet.listingId) {
                    contains = true
                    break
                }
            }
			expect(contains).toBe(true)
		})

		it('should not return any bookings if the user being queried does not have any booking attached', async () => {
			const bookingList = await getBookings(listingOwner._id)
			expect(bookingList).toEqual([])
		})
	})
})
