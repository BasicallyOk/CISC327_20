/**
 * Integration testing for the update listing page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: '../.env' })

describe('Update Listing Test', () => {
	let driver

	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.SAFARI).build()
	})

	describe('login and create listing', () => {
		it('should log in user', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
			// Type in a legal test email. For now must make sure that drake@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('drake@gmail.com', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword123', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to profile happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('profile'), 1000)
		})
		it('should create listing', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
			await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
			await driver.findElement(By.id('descriptionBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
			await driver.findElement(By.id('priceBox')).sendKeys(100, Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()
			await driver.wait(until.urlContains('listing/update'), 1000)
		})
	})

	// describe('Input partitioning', () => {
	// 	it('should allow an existing user to update listing if the correct credentials are given', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
	// 		await driver.findElement(By.id('descriptionBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should update
	// 		await driver.wait(until.elementLocated(By.id('successText')), 1000)
	// 	})
	// 	it('should fail to update if the price is decreased', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(10, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// 	it('should fail to update if the title is not alphanumeric-only', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('t!t|e', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// 	it('should fail to update if the title contains spaces as prefix or suffix', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys(' title ', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// 	it('should fail to update if the title is longer than 80 characters', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// 	it('should fail to update if the description is shorter than the title', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('abcdefghijklmnopqrstuvwxyz', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys('abcdefghijklmnopqrstuvwxy', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// 	it('should fail to update if the description is shorter than 20 characters', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys('abcdefgh', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// 	it('should fail to update if the description is longer than 2000 characters', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
	// 		await driver.findElement(By.id('descriptioBox')).sendKeys(Array(2002).join('a'), Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)
	// 		await driver.findElement(By.id('submitButton')).click()

	// 		// Should not update
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// })

	// // Breaks every once in a while as the page cant keep up with selenium, I think?
	// describe('Shotgun testing', () => {
	// 	const testTitle = ['title', 't!t|e', ' title ', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz, abcdefghijklmnopqrstuvwxyz']
	// 	const testDescription = ['this is a valid description that should work.', 'abcdefghijklmnopqrstuvwxy', '', 'abcdefgh', Array(2002).join('a')]
	// 	const testPrice = [0, 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

	// 	it('should behave as expected for random combinations of valid/invalid inputs', async () => {
	// 		// How many inputs are tested, should increase with a bigger test set
	// 		for (let i = 0; i < 20; i++) {
	// 			const titleIndex = Math.floor(Math.random() * testTitle.length)
	// 			const descriptionIndex = Math.floor(Math.random() * testDescription.length)
	// 			const priceIndex = Math.floor(Math.random() * testPrice.length)

	// 			await driver.findElement(By.id('titleBox')).sendKeys(testTitle[titleIndex], Key.RETURN)
	// 			await driver.findElement(By.id('descriptionBox')).sendKeys(testDescription[descriptionIndex], Key.RETURN)
	// 			await driver.findElement(By.id('priceBox')).sendKeys(testPrice[priceIndex], Key.RETURN)
	// 			await driver.findElement(By.id('submitButton')).click()

	// 			if (titleIndex !== 0 || descriptionIndex !== 0 || priceIndex !== 0) {
	// 				// fail state
	// 				await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 			} else {
	// 				// pass state
	// 				// Make sure that redirection to listing happens. May want to raise this number for CI.
	// 				await driver.wait(until.urlContains('listing'), 1000)
	// 			}
	// 			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		}
	// 	})
	// })

	// describe('Output coverage', () => {
	// 	it('should allow user to update listing if all inputs are legal', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		// Type in a legal test title. For now must make sure that title exists.
	// 		await driver.findElement(By.id('titleBox')).sendKeys('title', Key.RETURN)
	// 		// Type in test description. Description is legal and is correct
	// 		await driver.findElement(By.id('descritionBox')).sendKeys('this is a valid description that should work.', Key.RETURN)
	// 		// Type in a test price. Price is legal and is correct
	// 		await driver.findElement(By.id('priceBox')).sendKeys(500, Key.RETURN)

	// 		// Submit
	// 		await driver.findElement(By.id('submitButton')).click()
	// 		// Make sure that redirection to listing happens. May want to raise this number for CI.
	// 		await driver.wait(until.urlContains('listing'), 1000)
	// 	})

	// 	it('should not allow user to update listing if inputs are illegal', async () => {
	// 		await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/update`)
	// 		await driver.findElement(By.id('titleBox')).sendKeys(' title ', Key.RETURN)
	// 		await driver.findElement(By.id('descritionBox')).sendKeys('this.', Key.RETURN)
	// 		await driver.findElement(By.id('priceBox')).sendKeys(1, Key.RETURN)

	// 		// Submit
	// 		await driver.findElement(By.id('submitButton')).click()
	// 		// fail state
	// 		await driver.wait(until.elementLocated(By.id('failText')), 1000)
	// 	})
	// })

	afterAll(() => driver && driver.quit())
})
