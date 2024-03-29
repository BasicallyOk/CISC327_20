/**
 * Integration testing for the register page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: '../.env' })

describe('Register Functionality Test', () => {
	let driver

	// For now, it is made with the assumption that my user will always be there, will update with register code
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
	})

	describe('Input partitioning', () => {
		it('should allow a user to register if the correct credentials are given', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// Type in a legal test email. For now must make sure that ammarTest@gmail.com can be created.
			await driver.findElement(By.id('emailBox')).sendKeys('registerTest@gmail.com', Key.RETURN)
			// Type in a legal username.
			await driver.findElement(By.id('usernameBox')).sendKeys('registerTest', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			await driver.wait(until.urlContains('login'), 1000)
		})
		it('should fail to login if the credentials are illegal', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// User works, password illegal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('registerTest2@gmail.com', Key.RETURN)
			await driver.findElement(By.id('usernameBox')).sendKeys('ammarTest', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not register
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('emailBox')).clear()
			await driver.findElement(By.id('usernameBox')).clear()
			await driver.findElement(By.id('passwordBox')).clear()

			// Illegal email, password legal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('ammargmailcom', Key.RETURN)
			await driver.findElement(By.id('usernameBox')).sendKeys('ammarTest', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not register
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('emailBox')).clear()
			await driver.findElement(By.id('usernameBox')).clear()
			await driver.findElement(By.id('passwordBox')).clear()

			// Legal email, password legal, username illegal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('registerTest2@gmail.com', Key.RETURN)
			await driver.findElement(By.id('usernameBox')).sendKeys('@@@', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not register
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('emailBox')).clear()
			await driver.findElement(By.id('usernameBox')).clear()
			await driver.findElement(By.id('passwordBox')).clear()

			// Illegal email, illegal password, illegal username according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('ammargmailcom', Key.RETURN)
			await driver.findElement(By.id('usernameBox')).sendKeys('@@@', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not register
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
			await driver.findElement(By.id('emailBox')).clear()
			await driver.findElement(By.id('usernameBox')).clear()
			await driver.findElement(By.id('passwordBox')).clear()
		}, 20000)
	})

	describe('Shotgun testing', () => {
		const testEmails = ['registerTest3@gmail.com', 'ammartestcom', 'ammarTest.com', '1234', '', 'ab12c3', 'hello123$.com', '!@#$%^&*']
		const testUsernames = ['ammarTest', '!@qw', '', '!@#$%', ' ']
		const testPasswords = ['P@ssword', 'notavalidpassword', '', 'P@SSWORD', 'Password']

		it('looping through random combinations of valid/invalid inputs', async () => {
			// How many inputs are tested, should increase with a bigger test set
			for (let i = 0; i < 20; i++) {
				const emailIndex = Math.floor(Math.random() * testEmails.length)
				const usernameIndex = Math.floor(Math.random() * testUsernames.length)
				const passwordIndex = Math.floor(Math.random() * testPasswords.length)

				await driver.findElement(By.id('emailBox')).sendKeys(testEmails[emailIndex], Key.RETURN)
				await driver.findElement(By.id('usernameBox')).sendKeys(testUsernames[usernameIndex], Key.RETURN)
				await driver.findElement(By.id('passwordBox')).sendKeys(testPasswords[passwordIndex], Key.RETURN)
				await driver.findElement(By.id('submitButton')).click()

				if (emailIndex !== 0 || passwordIndex !== 0 || usernameIndex !== 0) {
					// fail state
					await driver.wait(until.elementLocated(By.id('failText')), 1000)
					await driver.findElement(By.id('emailBox')).clear()
					await driver.findElement(By.id('usernameBox')).clear()
					await driver.findElement(By.id('passwordBox')).clear()
				} else {
					// pass state
					await driver.wait(until.urlContains('login'), 1000)
				}
				await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			}
		}, 20000)
	})

	describe('Output coverage testing', () => {
		it('should allow user to register if email username and password all legal', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// Type in a legal test email. For now must make sure that ammarTest@gmail.com is able to register.
			await driver.findElement(By.id('emailBox')).sendKeys('registerTest4@gmail.com', Key.RETURN)
			// Type in a legal username. Should allow user to register
			await driver.findElement(By.id('usernameBox')).sendKeys('ammarTest', Key.RETURN)
			// Type in test password. Password is legal
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()

			await driver.wait(until.urlContains('login'), 1000)
		})

		it('should not allow user to register if illegal input credentials', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// Type in a legal test email. For now must make sure that ammarTest@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			// Type in a legal username. Should allow register.
			await driver.findElement(By.id('usernameBox')).sendKeys('ammarTest', Key.RETURN)
			// Type in test password. Password is illegal
			await driver.findElement(By.id('passwordBox')).sendKeys('invalidPassword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// fail state
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			await driver.findElement(By.id('emailBox')).clear()
			await driver.findElement(By.id('usernameBox')).clear()
			await driver.findElement(By.id('passwordBox')).clear()
		})
	})

	afterAll(() => {
		driver && driver.quit()
	})
})
