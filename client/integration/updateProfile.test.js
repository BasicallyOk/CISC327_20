/*
 * Integration testing for update User
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: '../.env' })

describe('Update user profile Functionality Test', () => {
	let driver

	beforeAll(async () => {
		// directly register user into database without going through register page
		// axios.post('/user/register', {
		//     email: 'updateProfile@gmail.com',
		//     username: 'UpdateUserPage',
		//     password: 'P@assword1234'
		// }).then(res => {
		//     console.log(res.data.success)
		// }).catch(e => {
		//     console.log(e.response.data.error)
		//     alert('Unable to register')
		// })

		// const response = await fetch('/user/register', {
		//     method: 'POST',
		//     body: JSON.stringify(params)
		// })
		// console.log('Success:', data (user));

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
			await driver.findElement(By.id('updateUser')).click()
		})
		it('should allow an existing user to login if the correct credentials are given', async () => {
			// Type in a legal User name
			await driver.findElement(By.id('userBox')).sendKeys('UpdateUserPageeee', Key.RETURN)
			// Type in a legal address
			await driver.findElement(By.id('billingBox')).sendKeys('address', Key.RETURN)
			// Type in a legal postal code
			await driver.findElement(By.id('postalBox')).sendKeys('M1W 3T1', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Success state
			await driver.wait(until.elementLocated(By.id('successText')), 1000)
		})
		it('should fail to update user if the username does not satifiy requirements', async () => {
			// username does not meet requirement R1-5
			await driver.findElement(By.id('userBox')).sendKeys('U', Key.RETURN)
			await driver.findElement(By.id('billingBox')).sendKeys('address', Key.RETURN)
			await driver.findElement(By.id('postalBox')).sendKeys('M1W 3T1', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// Postal code does not meet the requirement R3-2
			await driver.findElement(By.id('userBox')).sendKeys('UpdateUserPageeee', Key.RETURN)
			await driver.findElement(By.id('billingBox')).sendKeys('address', Key.RETURN)
			await driver.findElement(By.id('postalBox')).sendKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// username and postal code does not meet requirement
			await driver.findElement(By.id('userBox')).sendKeys('U', Key.RETURN)
			await driver.findElement(By.id('billingBox')).sendKeys('address', Key.RETURN)
			await driver.findElement(By.id('postalBox')).sendKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Key.RETURN)
			// Submit
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
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
			await driver.findElement(By.id('updateUser')).click()
		})

		const testUsername = ['testUser', '', 'u', 'username1234567890123456', ' testfail', 'testUser1', 'testUser2', 'testUser3']
		const testPostalCode = ['M2Q 3T1', '012 345', 'L6A4X4', '6T 5L5', 'ABC DEF', '!@# $%^']

		it('should behave as expected for random combinations of valid/invalid inputs', async () => {
			for (let i = 0; i < 20; i++) {
				const userNameIndex = Math.floor(Math.random() * testUsername.length)
				const postalCodeIndex = Math.floor(Math.random() * testPostalCode.length)

				// await driver.findElement(By.id('userBox')).clear()
				// await driver.findElement(By.id('billingBox')).clear()
				// await driver.findElement(By.id('postalBox')).clear()

				await driver.findElement(By.id('userBox')).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE, testUsername[userNameIndex], Key.RETURN)
				await driver.findElement(By.id('billingBox')).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE, 'address', Key.RETURN)
				await driver.findElement(By.id('postalBox')).sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE, testPostalCode[postalCodeIndex], Key.RETURN)
				// Submit
				await driver.findElement(By.id('submitButton')).click()

				if (userNameIndex !== 0 || postalCodeIndex !== 0) {
					await driver.wait(until.elementLocated(By.id('failText')), 1000)
					await driver.findElement(By.id('userBox')).clear()
					await driver.findElement(By.id('billingBox')).clear()
					await driver.findElement(By.id('postalBox')).clear()
				} else {
					await driver.wait(until.urlContains('profile'), 1000)
				}
			}
		}, 20000)
	})

	describe('Ouput coverage testing', () => {
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
			await driver.findElement(By.id('updateUser')).click()
		})

		it('should allow update User if username and postal code meet requirement', async () => {
			await driver.findElement(By.id('userBox')).sendKeys('UpdateUserPageeeee', Key.RETURN)
			await driver.findElement(By.id('billingBox')).sendKeys('address', Key.RETURN)
			await driver.findElement(By.id('postalBox')).sendKeys('M1W 3T1', Key.RETURN)

			await driver.findElement(By.id('submitButton')).click()
			await driver.wait(until.urlContains('updateUser'), 1000)
		})

		it('should not allow update user if username and postal code do not meet requirement', async () => {
			await driver.findElement(By.id('userBox')).sendKeys('U', Key.RETURN)
			await driver.findElement(By.id('billingBox')).sendKeys('address', Key.RETURN)
			await driver.findElement(By.id('postalBox')).sendKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ', Key.RETURN)

			await driver.findElement(By.id('submitButton')).click()
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})
	afterAll(() => driver && driver.quit())
})
