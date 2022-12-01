/**
 * Integration testing for the create booking page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: '../.env' })

describe('Create Booking Test', () => {
	let driver

	// Made with the assumption that seedDatabase.js has been run beforehands
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
	})
	// The create booking operation isn't idempotent, must figure out a good way to delete the listing
	it('should not allow a user to book their own listing', () => {

	})
})
