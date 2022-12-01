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
	beforeEach(async () => {
		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
		// Type in a legal test email
		await driver.findElement(By.id('emailBox')).sendKeys('robbie@gmail.com', Key.RETURN)
		// Type in a test password that is correct
		await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
		// Submit
		await driver.findElement(By.id('submitButton')).click()
		// Make sure that the URL redirection occurs
		await driver.wait(until.urlContains('profile'), 1000)
		// Click on update User
		await driver.findElement(By.id('createBooking')).click()
	})

	// The create booking operation isn't idempotent, must figure out a good way to delete the listing
	it('should not allow a user to book their own listing', async () => {
		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
		// Type in a legal test email
		await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
		// Type in a test password that is correct
		await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
		// Submit
		await driver.findElement(By.id('submitButton')).click()
		// Make sure that the URL redirection occurs
		await driver.wait(until.urlContains('profile'), 1000)
		// Click on update User
		await driver.findElement(By.id('createBooking')).click()

		
	})

	it('should not show a listing the user cannot afford', async () => {
		// TODO Finish this
		// fill in the query parameter boxes
		const listingBlockElements = await driver.findElements(By.id('listingBlock'))
		for (block of listingBlockElements) {
			block.findElement(By.linkText('Price'))
		}
	})

	it('should allow the creation of a valid booking', async () => {
		//valid title 
		await driver.findElement(By.id('titleBox')).sendKeys('khoasTestListing', Key.RETURN)
		//valid startDate
		let startDate = Date.now()
		await driver.findElement(By.id('startDateBox')).sendKeys(startDate, Key.RETURN)
		//endDate
		let endDate = startDate + 200
		await driver.findElement(By.id('endDateBox')).sendKeys(endDate, Key.RETURN)
		//click on the create booking button
		await driver.findElement(By.id('listingBlock')).findElement(By.id('submitBooking')).click()
		//should redirect 
		await driver.wait(until.urlContains('profile'), 1000)
		//check to see if it appears in profile
		await driver.findElement(By.linkText('khoasTestListing'))
	})

	//assume that a valid booking was done before
	it('should not allow for the creation of booking due to time overlap', async () => {
		//valid title 
		await driver.findElement(By.id('titleBox')).sendKeys('khoasTestListing', Key.RETURN)
		//valid startDate
		let startDate = Date.now()
		await driver.findElement(By.id('startDateBox')).sendKeys(startDate, Key.RETURN)
		//endDate
		let endDate = startDate + 200
		await driver.findElement(By.id('endDateBox')).sendKeys(endDate, Key.RETURN)
		//click on the create booking button
		await driver.findElement(By.id('listingBlock')).findElement(By.id('submitBooking')).click()
		//should redirect 
		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	})
})
