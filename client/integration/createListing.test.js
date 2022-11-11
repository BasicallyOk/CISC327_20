/**
 * Integration testing for the create listing page
 */

 const { Builder, Browser, By, Key, until } = require('selenium-webdriver')

 describe('Selenium Test', () => {
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
         it('should fail to login if the input credentials are illegal', async () => {
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