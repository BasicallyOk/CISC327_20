/**
 * Integration testing for the create listing page
 */

 const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

 describe('Create Listing Test', () => {
     let driver
 
     beforeAll(async () => {
         driver = await new Builder().forBrowser(Browser.CHROME).build()
     })

     describe('Input partitioning', () => {
         it('should allow a user to create a listing if the correct parameters are given', async () => {
             await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
             // Type in a legal test title. For now must make sure that test works as a title.
             await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
             // Type in test description. the description is legal and is correct.
             await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
              // Type in a legal price. the price is legal and is correct.
             await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
             // Submit
             await driver.findElement(By.id('submitButton')).click()
             // Make sure that redirection to update listing happens. May want to raise this number for CI.
             await driver.wait(until.urlContains('listing/update'), 1000)
         })
         it('should fail to login if the price credentials are illegal', async () => {
             await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
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
         })
         it('should fail to login if the title credentials are illegal', async () => {
            await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
            await driver.findElement(By.id('titleBox')).sendKeys('l', Key.RETURN)
            await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
            await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
            // Submit
            await driver.findElement(By.id('submitButton')).click()
 
            // Should not create listing
            await driver.wait(until.elementLocated(By.id('failText')), 1000)
        })
         it('should fail to login if the description credentials are illegal', async () => {
            await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
            await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
            await driver.findElement(By.id('descriptionBox')).sendKeys('l', Key.RETURN)
            await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
            // Submit
            await driver.findElement(By.id('submitButton')).click()
 
            // Should not create listing
            await driver.wait(until.elementLocated(By.id('failText')), 1000)
        })
     })
     describe('Shotgun testing', () => {
		const testTitles = ['test', 't', 't', 't', '', 'this title is way too long and should not work as it goes beyond the required specifications of the title case', '12', '="lkl"']
		const testDescriptions = ['this is a test title', 'd', '', '90909090', 'wrong']
		const testPrices = ['5000', 'word', '-5', '5000000', '', '0', '5a', '909']

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

				if (titleIndex !== 0 || descriptionIndex !== 0 || priceIndex !==0) {
					// fail state
					await driver.wait(until.elementLocated(By.id('failText')), 1000)
				} else {
					// pass state
					// Make sure that redirection to profile happens. May want to raise this number for CI.
                    await driver.wait(until.urlContains('listing/update'), 1000)
				}
				await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
			}
		})
	})

    describe('Output coverage testing', () => {
		it('should allow listing to be created if user enters correct parameters that are legal', async () => {
			await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
            // Type in a legal test title. For now must make sure that test works as a title.
			await driver.findElement(By.id('titleBox')).sendKeys('test', Key.RETURN)
            // Type in test description. the description is legal and is correct.
            await driver.findElement(By.id('descriptionBox')).sendKeys('this is a test title', Key.RETURN)
            // Type in a legal price. the price is legal and is correct.
            await driver.findElement(By.id('priceBox')).sendKeys('5000', Key.RETURN)
            // Submit
            await driver.findElement(By.id('submitButton')).click()
            // Make sure that redirection to update listing happens. May want to raise this number for CI.
            await driver.wait(until.urlContains('listing/update'), 1000)
		})

         it('should fail to login if the price credentials are illegal', async () => {
             await driver.get(`http://localhost:${process.env.CLIENT_PORT}/listing/create`)
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
		})
	})

     afterAll(() => driver && driver.quit())
 })