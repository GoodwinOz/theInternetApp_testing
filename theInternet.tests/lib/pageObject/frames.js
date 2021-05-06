const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const body = locators.framesBottom,
      firstLink = locators.framesFirstLink,
      secondLink = locators.framesSecondLink,
      textFrameId = locators.framesInputWindowId



/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function Frames(webdriver) {
    BasePage.call(this, webdriver)
}

Frames.prototype = Object.create(BasePage.prototype)
Frames.prototype.constructor = Frames

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */

Frames.prototype.clickFirstLink = async function() {
    let link = await this.findByCss(firstLink)
    let click = await link.click()
    return click
}


Frames.prototype.getBodyText = async function() {
    let bodyText = await this.findByXpath(body)
    let getText = await bodyText.getText()
    return getText
}

Frames.prototype.backToHomePage = async function() {
    return await this.goToPreviousPage()
}

Frames.prototype.goToSecondLink = async function() {
    let input = await this.findByXpath(secondLink)
    let click = input.click()
    return click
}

Frames.prototype.sendKeysToInput = async function() {
    let input = await this.findById(textFrameId)
    let sendKeys = await input.sendKeys('Test Keys')
    return sendKeys
}

Frames.prototype.validateInputedText = async function() {
    let input = await this.findById(textFrameId)
    let getText = await input.getText()
    return getText
}




module.exports = Frames