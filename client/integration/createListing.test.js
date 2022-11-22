/**
 * Integration testing for the create listing page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: '../.env' })

describe('Create Listing Test', () => {
	let driver

	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
	})

	describe('Input partitioning', () => {
		beforeEach(async () => {
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
			await driver.findElement(By.id('createListing')).click()
		})
		it('should allow a user to create a listing if the correct parameters are given', async () => {
			// Type in a legal test title. For now must make sure that test works as a title.
			await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
			// Type in test description. the description is legal and is correct.
			await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
			// Type in a legal price. the price is legal and is correct.
			await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()
			await driver.wait(until.urlContains('profile'), 1000)
		})
		it('should fail to createListing if the credentials are illegal', async () => {
			// Type in a legal test title. For now must make sure that test works as a title.
			await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
			// Type in test description. the description is legal and is correct.
			await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
			// Type in an illegal price. the price is illegal and incorrect.
			await driver.findElement(By.id('priceBox')).sendKeys('-25', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not create listing
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('titleBox')).clear()
			await driver.findElement(By.id('descriptionBox')).clear()
			await driver.findElement(By.id('priceBox')).clear()

			await driver.findElement(By.id('titleBox')).sendKeys('l', Key.RETURN)
			await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
			await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not create listing
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('titleBox')).clear()
			await driver.findElement(By.id('descriptionBox')).clear()
			await driver.findElement(By.id('priceBox')).clear()

			await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
			await driver.findElement(By.id('descriptionBox')).sendKeys('l', Key.RETURN)
			await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not create listing
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('titleBox')).clear()
			await driver.findElement(By.id('descriptionBox')).clear()
			await driver.findElement(By.id('priceBox')).clear()
		})
	})
	describe('Shotgun testing', () => {
		beforeEach(async () => {
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
			await driver.findElement(By.id('createListing')).click()
		})
		const testTitles = ['test2', 't', 't', 't', '', 'this title is way too long and should not work as it goes beyond the required specifications of the title case', '12', '="lkl"']
		const testDescriptions = ['this is a test title2', 'd', '', '90909090', 'wrong']
		const testPrices = ['500', 'word', '-5', '5000000', '', '0', '5a', '909']

		it('should behave as expected for random combinations of valid/invalid inputs', async () => {
			// How many inputs are tested, should increase with a bigger test set
			for (let i = 0; i < 20; i++) {
				const titleIndex = Math.floor(Math.random() * testTitles.length)
				const descriptionIndex = Math.floor(Math.random() * testDescriptions.length)
				const priceIndex = Math.floor(Math.random() * testPrices.length)

				await driver.findElement(By.id('titleBox')).sendKeys(testTitles[titleIndex], Key.RETURN)
				await driver.findElement(By.id('descriptionBox')).sendKeys(testDescriptions[descriptionIndex], Key.RETURN)
				await driver.findElement(By.id('priceBox')).sendKeys(testPrices[priceIndex], Key.RETURN)
				await driver.findElement(By.id('submitButton')).click()

				if (titleIndex !== 0 || descriptionIndex !== 0 || priceIndex !== 0) {
					// fail state
					await driver.wait(until.elementLocated(By.id('failText')), 1000)
					await driver.findElement(By.id('titleBox')).clear()
					await driver.findElement(By.id('descriptionBox')).clear()
					await driver.findElement(By.id('priceBox')).clear()
				} else {
					// pass state
					await driver.wait(until.urlContains('profile'), 1000)
					await driver.findElement(By.id('createListing')).click()
				}
			}
		}, 20000)
	})

	describe('Output coverage testing', () => {
		beforeEach(async () => {
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
			await driver.findElement(By.id('createListing')).click()
		})
		it('should allow listing to be created if user enters correct parameters that are legal', async () => {
			// Type in a legal test title. For now must make sure that test works as a title.
			await driver.findElement(By.id('titleBox')).sendKeys('test3', Key.RETURN)
			// Type in test description. the description is legal and is correct.
			await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title3', Key.RETURN)
			// Type in a legal price. the price is legal and is correct.
			await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()
			await driver.wait(until.urlContains('profile'), 1000)
		})

		it('should fail to login if the price credentials are illegal', async () => {
			// Type in a legal test title. For now must make sure that test works as a title.
			await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
			// Type in test description. the description is legal and is correct.
			await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
			// Type in an illegal price. the price is illegal and incorrect.
			await driver.findElement(By.id('priceBox')).sendKeys('-25', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not create listing
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('titleBox')).clear()
			await driver.findElement(By.id('descriptionBox')).clear()
			await driver.findElement(By.id('priceBox')).clear()
		})
		it('should fail to login if the description credentials are illegal', async () => {
			// Type in a legal test title. For now must make sure that test works as a title.
			await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
			// Type in test description. the description is illegal and is not correct.
			await driver.findElement(By.id('descriptionBox')).sendKeys('l', Key.RETURN)
			// Type in an legal price. the price is legal and correct.
			await driver.findElement(By.id('priceBox')).sendKeys('500', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not create listing
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('titleBox')).clear()
			await driver.findElement(By.id('descriptionBox')).clear()
			await driver.findElement(By.id('priceBox')).clear()
		})
	})

	afterAll(() => driver && driver.quit())
})
