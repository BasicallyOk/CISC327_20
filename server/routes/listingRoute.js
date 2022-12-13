const express = require('express')
const Listing = require('../model/Listing')

const router = express.Router() // set up express router

const listingController = require('../model/controller/listingController')

router.get('/', async (req, res) => res.send('Listing route'))

router.get('/find/title/:title', async (req, res) => {
	const listings = await listingController.findListings(req.params.title)
	if (listings.length > 0) {
		res.status(200).json({ 
			listings,
			success: `Successfully found ${req.params.title}` 
		})
	} else {
		res.status(400).json({ error: `Unable to find any listing with ${req.params.title}` })
	}
})

router.get('/get', async (res) => {
	const listings = await listingController.getListings()
	if (listings.length > 0) {
		res.status(200).json({ 
			listings,
			success: `Successfully found listings` 
		})
	} else {
		res.status(400).json({ error: `Unable to find any listings` })
	}
})

router.post('/create', async (req, res) => {
	const status = await listingController.createListing(req.body.title, req.body.description, req.body.price, req.body.lastModifiedDate, req.body.ownerId)
	if (status) {
		res.status(200).json({ success: `Successfully created ${req.body.title}` })
	} else {
		res.status(400).json({ error: `Unable to create ${req.body.title}` })
	}
})
/**
 * Delete title router
 *
 * Expects title in request body
 */
router.delete('/delete/title/:title', async (req, res) => {
	// console.log(req)
	const deleteCount = await Listing.deleteOne({ title: req.params.title })
	if (deleteCount.deletedCount > 0) {
		res.status(200).json({
			success: `Sucessfully deleted' ${req.params.title}`
		})
	} else {
		res.status(400).json({ error: `Unable to delete ${req.params.title}` })
	}
})

router.post('/update', async (req, res) => {
	const status = await listingController.updateListing(req.body.title, req.body.description, req.body.price)
	if (status) {
		res.status(200).json({ success: `Successfully updated ${req.body.title}` })
	} else {
		res.status(400).json({ error: `Unable to updaste ${req.body.title}` })
	}
})
module.exports = router
