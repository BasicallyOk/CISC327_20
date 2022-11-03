/**
 * Integration testing for the update listing page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

describe('Selenium Test', () => {
	let driver

	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.SAFARI).build()
	})

	describe('Input partitioning', () => {
		it('should allow an existing user to update listing if the correct credentials are given', async () => {
			await driver.get('http://localhost:8080/login')
			// Type in a legal test title. For now must make sure that title exists.
			await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
			// Type in test description. Description is legal and is correct
			await driver.findElement(By.id('descritionBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
			// Type in a test price. Price is legal and is correct
			await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to profile happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('profile'), 1000)
		})
		it('should fail to update if the input credentials are illegal', async () => {
			await driver.get('http://localhost:8080/login')
			// listing exists, price cannot be lower than starting price
			await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
			await driver.findElement(By.id('descriptioBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
			await driver.findElement(By.id('priceBox')).sendKeys(10000, Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not update
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})

	afterAll(() => driver && driver.quit())
})
