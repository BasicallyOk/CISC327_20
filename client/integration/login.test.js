/**
 * Integration testing for the login page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

describe('Selenium Test', () => {
	let driver

	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.SAFARI).build()
	})

	describe('Input partitioning', () => {
		it('should allow an existing user to login if the correct credentials are given', async () => {
			await driver.get('http://localhost:8080/login')
			// Type in a legal test email. For now must make sure that khoa@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to profile happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('profile'), 1000)
		})
		it('should fail to login if the input credentials are illegal', async () => {
			await driver.get('http://localhost:8080/login')
			// User exists, password illegal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})

	afterAll(() => driver && driver.quit())
})
