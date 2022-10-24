const express = require('express')
const router = express.Router()

const listingUtils = require('../model/utils/listingUtils')

router.get('/', async (req, res) => res.send('Listing route'))

router.post('/create', async (req, res) => {
    const status = await listingUtils.createListing(req.body.title, req.body.description, req.body.price, req.body.lastModifiedDate, req.ownerID)
    if (status) {
        res.status(200).json({ success: `Successfully created ${req.body.title}` })
    } else {
        res.status(400).json({ error: `Unable to create ${req.body.title}` })
    }
})

router.post('/update', async (req, res) => {
    const status = await listingUtils.updateListing(req.body.title, req.body.description, req.body.price)
    if (status) {
        res.status(200).json({ success: `Successfully updated ${req.body.title}` })
    } else {
        res.status(400).json({ error: `Unable to update ${req.body.title}` })
    }
})

module.exports = router