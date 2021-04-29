const {Builder, By, Key, util, until} = require('selenium-webdriver')

function BasePage(webdriver) {
    this.driver = webdriver
    let driver = this.driver
    let actions = driver.actions({ bridge: true })

    //Visit website
    this.visit = async function(Url) {
        return await driver.get(Url)
    }
    this.close = async function() {
        return await driver.close()
    }
    this.findById = async function(id) {
        await driver.wait(until.elementLocated(By.id(id)), 10000, 'Wait for id element')
        return await driver.findElement(By.id(id))
    }

    this.findByXpath = async function (xpath) {
        await driver.wait(until.elementLocated(By.xpath(xpath)), 10000, 'wait for Xpath element');
        return await driver.findElement(By.xpath(xpath))
    }

    this.findByCss = async function (css) {
        await driver.wait(until.elementLocated(By.css(css)), 10000, 'wait for Xpath element');
        return await driver.findElement(By.css(css))
    }

    this.findByClassName = async function(className) {
        await driver.wait(until.elementLocated(By.className(className)), 10000, 'Wait for className element')
        return await driver.findElement(By.className(className))
    }

    this.findAllElements = async function(xpath) {
        await driver.wait(until.elementsLocated(By.xpath(xpath)), 10000, 'Wait for Xpath elements')
    }

    this.click = async function (element) {
        return await driver.executeScript("return atguments[0].click()", element)
    }

    this.doubleClick = async function (element) {
        return await actions.doubleClick(element).perform()
    }

    this.write = async function (element, txt) {
        return await element.sendKeys(txt)
    }

    this.moveTo = async function (locator) {
        return await driver.actions().move({origin: locator}).perform()
    }

    this.elementIsVisible = async function(locator) {
        let isElementVisible = await locator.getCssValue("height")
        while(!(isElementVisible)) {
            return await driver.wait(until.elementIsEnabled(locator), 10000)
        }
        return isElementVisible
    }
}

module.exports = BasePage