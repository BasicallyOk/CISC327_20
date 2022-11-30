/**
 * Seed database with necessary data for testing
 * Assumes the mongodb docker is already running in detached mode
 * Does not terminate automatically
 */

const mongoose = require('mongoose')
const User = require('./model/User')
const Listing = require('./model/Listing')

const seedDb = () => {
	// Drop the current database
	mongoose.connection.db.dropDatabase()
		.then((result) => {
			console.log(result)
			const defaultUser = new User({
				email: 'khoa@gmail.com',
				password: 'P@ssword',
				username: 'khoaTester'
			})

			const secondUser = new User({
				email: 'robbie@gmail.com',
				password: 'P@ssword',
				username: 'robbieTester',
				balance: 200 // Rob do be richer than me fr
			})

			secondUser.save((error, user) => {
				if (error) {
					console.error(error)
				}
				console.log(`User ${user.email} seeded successfully`)
			})

			defaultUser.save((error, user) => {
				if (error) {
					console.error(error)
				}
				console.log(`User ${user.email} seeded successfully`)
				const defaultListing = new Listing({
					title: 'khoasTestListing',
					description: "Khoa's Test Listing. Definitely long enough to satisfy requirement",
					price: 100,
					lastModifiedDate: Date.now(),
					ownerId: user._id
				})
				const defaultListing_2 = new Listing({
					title: 'khoasTestListing_2',
					description: "khoa's second Test Listing. Definitely long enough to satifsy requirement",
					price: 100,
					lastModifiedDate: Date.now(),
					ownerId: user._id
				})
				defaultListing_2.save((error, listing) => {
					if (error) {
						console.error(error)
					}
					console.log('Listing seeded sucessfully')
					process.exit()
				})
				defaultListing.save((error, listing) => {
					if (error) {
						console.error(error)
					}
					console.log('Listing seeded successfully')
					process.exit()
				})

				const expensiveListing = new Listing({
					title: 'khoasExpensiveListing',
					description: "Khoa's Expensive Test Listing. Definitely long enough to satisfy requirement",
					price: 1000,
					lastModifiedDate: Date.now(),
					ownerId: user._id
				})
				expensiveListing.save((error, listing) => {
					if (error) {
						console.error(error)
					}
					console.log('Expensive listing seeded successfully')
					process.exit()
				})
			})
		})
		.catch(err => {
			console.error(err)
		})
}

mongoose.connect('mongodb://localhost:27017/qbnb', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connection to database established')
		seedDb()
	})
	.catch((err) => {
		console.error(err)
	})
