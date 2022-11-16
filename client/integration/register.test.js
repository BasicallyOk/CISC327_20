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
			await driver.findElement(By.id('emailBox')).sendKeys('ammarTest@gmail.com', Key.RETURN)
			// Type in test password. Password is legal and is correct
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to login happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('login'), 1000)
            await fetch(`http://localhost:${SERVER_PORT}/user/delete/email/ammarTest@gmail.com`)
		})
		it('should fail to login if the password credentials are illegal', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// User works, password illegal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('ammarTest@gmail.com', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not register
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// Illegal email, password legal according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('ammargmailcom', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)

			// Illegal email, illegal password according to R1-4
			await driver.findElement(By.id('emailBox')).sendKeys('ammargmailcom', Key.RETURN)
			await driver.findElement(By.id('passwordBox')).sendKeys('password', Key.RETURN)
			await driver.findElement(By.id('submitButton')).click()

			// Should not login
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})

	describe('Shotgun testing', () => {
		const testEmails = ['ammarTest@gmail.com', 'ammartestcom', 'ammarTest.com', '1234', '', 'ab12c3', 'hello123$.com', '!@#$%^&*']
		const testPasswords = ['P@ssword', 'notavalidpassword', '', 'P@SSWORD', 'Password']

		it('looping through random combinations of valid/invalid inputs', async () => {
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
					// Make sure that redirection to login happens. May want to raise this number for CI.
					await driver.wait(until.urlContains('login'), 1000)
					await fetch(`http://localhost:${SERVER_PORT}/user/delete/email/ammarTest@gmail.com`)
				}
				await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			}
		})
	})

	describe('Output coverage testing', () => {
		it('should allow user to register if email and passwords both legal', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// Type in a legal test email. For now must make sure that ammarTest@gmail.com is able to register.
			await driver.findElement(By.id('emailBox')).sendKeys('ammarTest@gmail.com', Key.RETURN)
			// Type in test password. Password is legal
			await driver.findElement(By.id('passwordBox')).sendKeys('P@ssword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// Make sure that redirection to login happens. May want to raise this number for CI.
			await driver.wait(until.urlContains('login'), 1000)
            await fetch(`http://localhost:${SERVER_PORT}/user/delete/email/ammarTest@gmail.com`)
		})

		it('should not allow user to register if illegal input credentials', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/register`)
			// Type in a legal test email. For now must make sure that ammarTest@gmail.com exists.
			await driver.findElement(By.id('emailBox')).sendKeys('ammarTest@gmail.com', Key.RETURN)
			// Type in test password. Password is illegal
			await driver.findElement(By.id('passwordBox')).sendKeys('invalidPassword', Key.RETURN)

			// Submit
			await driver.findElement(By.id('submitButton')).click()
			// fail state
			await driver.wait(until.elementLocated(By.id('failText')), 1000)
		})
	})

	afterAll(() => {
        driver && driver.quit()
    })
})
