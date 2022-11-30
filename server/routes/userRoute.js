const express = require('express')
const User = require('../model/User')
const router = express.Router() // set up express router

const userController = require('../model/controller/userController')

router.get('/', async (req, res) => res.send('User route'))

router.post('/register', async (req, res) => {
	const status = await userController.register(req.body.email, req.body.password, req.body.username)
	if (status) {
		res.status(200).json({ success: `Successfully registered ${req.body.email}` })
	} else {
		res.status(400).json({ error: `Unable to register ${req.body.email}` })
	}
})

/**
 * Login router
 *
 * Expects email and password in request body
 */
router.post('/login', async (req, res) => {
	// console.log(req)
	const user = await userController.login(req.body.email, req.body.password)
	if (user) {
		res.status(200).json({
			success: `Sucessfully login' ${req.body.email}`,
			user
		})
	} else {
		res.status(400).json({ error: `Unable to login ${req.body.email}` })
	}
})
/**
 * Delete user router
 *
 * Expects email and password in request body
 */
router.delete('/delete/email/:email', async (req, res) => {
	// console.log(req)
	const deleteCount = await User.deleteOne({ email: req.params.email })
	if (deleteCount.deletedCount > 0) {
		res.status(200).json({
			success: `Sucessfully deleted' ${req.params.email}`
		})
	} else {
		res.status(400).json({ error: `Unable to delete ${req.params.email}` })
	}
})

/**
 * Delete user router
 *
 * Expects email and password in request body
 */
router.delete('/delete/email/:email', async (req, res) => {
	// console.log(req)
	const deleteCount = await User.deleteOne({ email: req.params.email })
	if (deleteCount.deletedCount > 0) {
		res.status(200).json({
			success: `Sucessfully deleted' ${req.params.email}`
		})
	} else {
		res.status(400).json({ error: `Unable to delete ${req.params.email}` })
	}
})

// route to the update user page
router.post('/update', async (req, res) => {
	const update = await userController.update(req.body.username, req.body.email, req.body.billingAddress, req.body.postalCode)
	if (update) {
		res.status(200).json({ success: `Sucessfully updated user ${req.body.email}` })
	} else {
		res.status(400).json({ error: `Unable to update ${req.body.email}` })
	}
})

module.exports = router
