const mongoose = require('mongoose')
const Listing = require('../Listing')
const User = require('../User')

async function findListings(title) {
	const listing = Listing.find(title)
	return listing
}

async function createListing (title, description, price, lastModifiedDate, ownerId) {
	// Validate if input is empty
	const alphanumeric = /^[^\s!@#$%^&*)(':;][a-zA-Z0-9\s]*[^\s!@#$%^&*)(':;]$/gm
	const dateBefore = new Date('2025-01-02')
	const dateAfter = new Date('2021-01-02')
	lastModifiedDate = new Date(lastModifiedDate)
	price = parseInt(price)
	if (!title.match(alphanumeric)) {
		// console.log('Listing title not alphanumeric')
		return false
	}
	if (title.length > 80) {
		// console.log('Listing title too long')
		return false
	}
	if ((description.length < 20 || description.length > 2000)) {
		// console.log('Listing description does not satisfy length requirement')
		return false
	}
	if (description.length < title.length) {
		// console.log('Listing description shorter than title')
		return false
	}
	if (isNaN(price) || price < 10 || price > 10000) {
		// console.log('Listing price does not satisfy requirement')
		return false
	}
	if ((lastModifiedDate < dateAfter || lastModifiedDate > dateBefore)) {
		// console.log('This listing have yet to be created in this timeline')
		return false
	}
	if (!ownerId) {
		// console.log('Impossible! Users that havent logged in cannot create listings')
		return false
	}

	ownerId = mongoose.Types.ObjectId(ownerId)

	const user = await User.findById(ownerId)
	if (user) {
		if (!user.email) {
			return false
		}
	} else { // If user does not exist
		return false
	}
	const listing = await Listing.findOne({ ownerId, title })
	if (listing) {
		return false
	}

	const newListing = new Listing({
		title,
		description,
		price,
		lastModifiedDate,
		ownerId
	})
	newListing.save((error, listing) => {
		if (error) {
			console.error(error)
		} else {
			// console.log(`Listing ${listing.title} successfully created`)
		}
	})
	return true
}

/**
 * R4-1: The title of the product has to be alphanumeric-only, and space allowed only if it is not as prefix and suffix.
 * R4-2: The title of the product is no longer than 80 characters.
 * @param {String} title
 * @returns
 */
const validateTitle = (title) => {
	// R4-1
	if (title.startsWith(' ') || title.endsWith(' ')) {
		return false
	}
	if (!title.match(/^[0-9a-zA-Z ]+$/)) {
		return false
	}
	// R4-2
	if (title.length > 80) {
		return false
	}
	return true
}
/**
 * R4-3: The description of the product can be arbitrary characters, with a minimum length of 20 characters and a maximum of 2000 characters.
 * R4-4: Description has to be longer than the product's title.
 * @param {String} description
 */
const validateDescription = (description, title) => {
	// R4-3
	if (description.match(/^[.+]$/i)) {
		return false
	}
	if (description.length < 20 || description.length > 2000) {
		return false
	}
	// R4-4
	if (description.length < title.length) {
		return false
	}
	return true
}

/**
 * R4-5: Price has to be of range [10, 10000].
 * @param {Number} price
 * @returns
 */
const validatePrice = (price) => {
	if (price < 10 || price > 10000) {
		return false
	}
	return true
}

/**
 * R4-6: last_modified_date must be after 2021-01-02 and before 2025-01-02.
 * @param {String} lastModifiedDate
 * @returns
 */
const validateDate = (lastModifiedDate) => {
	if (lastModifiedDate > '2025-01-02' || lastModifiedDate < '2021-01-02') {
		return false
	}
	return true
}

async function updateListing (title, description, price) {
	if (title === '' || description === '' || price === '') {
		return false
	}
	if (!validateTitle(title)) {
		return false
	}
	if (!validateDescription(description, title)) {
		return false
	}
	if (!validatePrice(price)) {
		return false
	}
	const listing = await Listing.findOne({ title, description })
	if (listing) {
		if (listing.price > price) {
			return false
		}
	} else {
		return false
	}

	// Update Price
	listing.price = price

	// Update last modified date
	const currentDate = Date.now()
	if (!validateDate(currentDate)) { // To specification, weird condition imo
		return false
	}

	listing.lastModifiedDate = currentDate
	listing.save()

	return true
}

module.exports = { createListing, updateListing, findListings }
