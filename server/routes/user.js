const express = require('express')
const router = express.Router() // set up express router

const userUtils = require('../model/utils/userUtils')

router.get('/', async (req, res) => res.send('User route'))

router.post('/register', async (req, res) => {
  const status = await userUtils.register(req.body.email, req.body.password, req.body.username)
  if (status) {
    res.status(200).json({ success: `Successfully registered ${req.body.email}` })
  } else {
    res.status(400).json({ error: `Unable to register ${req.body.email}` })
  }
})

module.exports = router
