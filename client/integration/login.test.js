const { Builder, Browser } = require('selenium-webdriver')

describe('Login', () => {
    let driver

    beforeAll(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build()
    })

    it('demo', async () => {
        await driver.get('https://www.google.com/ncr')
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
    })

	afterAll(() => driver && driver.quit())
})