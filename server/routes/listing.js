const express = require('express')
const router = express.Router() // set up express router

const listingUtils = require('../model/controller/listingUtils')

router.get('/', async (req, res) => res.send('Listing route'))

router.post('/create', async (req, res) => {
  const status = await listingUtils.createListing(req.body.title, req.body.description, req.body.price, req.body.lastModifiedDate, req.body.ownerId)
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
    res.status(400).json({ error: `Unable to updaste ${req.body.title}` })
  }
})

router.delete('/delete', async (req, res) => {})

module.exports = router
