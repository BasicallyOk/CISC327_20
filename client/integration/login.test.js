/**
 * Integration testing for the login page
 */

const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
require('dotenv').config({ path: '../.env' })

describe('Login Functionality Test', () => {
	let driver

	// For now, it is made with the assumption that my user will always be there, will update with register code
	beforeAll(async () => {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
	})

	describe('Input partitioning', () => {
		it('should allow an existing user to login if the correct credentials are given', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
			// Type in a legal test email. For now must make sure that khoa@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to profile happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('profile'), 1000)
		}, 10000)
		it('should fail to login if the password credentials are illegal', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
			// User exists, password illegal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// Illegal email, password legal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('khoagmail.com', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// Illegal email, illegal password according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('khoagmail.com', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// User email does not exist, password legal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('shouldnotexist@gmail.com', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})

	// Breaks every once in a while as the page cant keep up with selenium, I think?
	describe('Shotgun testing', () => {
		const testEmails = ['khoa@gmail.com', 'shouldnotexist@gmail.com', 'khoagmail.com', 'P@ssword', '', 'i_like_underscore@but_its_not_allowed_in_this_part.example.com', 'this\\ still\\"not\\\\allowed@example.com', 'a"b(c)d,e:f;g<h>i[j\\k]l@example.com']
		const testPasswords = ['P@ssword', 'notavalidpassword', '', 'P@SSWORD', 'Password']

		it('should behave as expected for random combinations of valid/invalid inputs', async () => {
			// How many inputs are tested, should increase with a bigger test set
			for (let i = 0; i < 20; i++) {
				const emailIndex = Math.floor(Math.random() * testEmails.length)
				const passwordIndex = Math.floor(Math.random() * testPasswords.length)

				await driver.findElement(By.id('emailBox')).sendKeys(testEmails[emailIndex], Key.RETURN)
				await driver.findElement(By.id('passwordBox')).sendKeys(testPasswords[passwordIndex], Key.RETURN)
				await driver.findElement(By.id('submitButton')).click()

				if (emailIndex !== 0 || passwordIndex !== 0) {
					// fail state
					await driver.wait(until.elementLocated(By.id('failText')), 1000)
				} else {
					// pass state
					// Make sure that redirection to profile happens. May want to raise this number for CI.
					await driver.wait(until.urlContains('profile'), 1000)
				}
				await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
			}
		}, 20000)
	})

	describe('Output coverage testing', () => {
		it('should allow login if user exists, email and passwords both legal and match user credentials', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
			// Type in a legal test email. For now must make sure that khoa@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to profile happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('profile'), 1000)
		})

		it('should not allow login if user does not exist, credentials do not match, or illegal input credentials', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/login`)
			// Type in a legal test email. For now must make sure that khoa@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('khoa@gmail.com', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('invalidPassword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// fail state
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})

	afterAll(() => driver && driver.quit())
})
