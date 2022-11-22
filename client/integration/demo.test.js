/**
 * Tests if selenium is working as expected
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

describe('Selenium Test', () => {
	let driver

	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
	})

	it('Google Search', async () => {
		await driver.get('https://www.google.com/ncr')
		await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
		await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
	})

	afterAll(() => driver && driver.quit())
})
