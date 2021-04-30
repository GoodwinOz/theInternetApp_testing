const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const firstLink = locators.dynamicLoadingFirstLink,
      startBtn = locators.dynamicLoadingStartBtn,
      textField = locators.dynamicLoadingFinishTextId,
      secondLink = locators.dynamicLoadingSecondLink

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function DyanamicLoading(webdriver) {
    BasePage.call(this, webdriver)
}

DyanamicLoading.prototype = Object.create(BasePage.prototype)
DyanamicLoading.prototype.constructor = DyanamicLoading

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


DyanamicLoading.prototype.clickOnFirstLink = async function() {
    let link = await this.findByXpath(firstLink)
    let click = await link.click()
    return click
}

DyanamicLoading.prototype.clickOnBtn = async function() {
    let link = await this.findByXpath(startBtn)
    let click = await link.click()
    return click
}

DyanamicLoading.prototype.getFinishText = async function() {
    let link = await this.findById(textField)
    await this.elementIsDisplayed(link)
    let getText = await link.getText()
    return getText
}

DyanamicLoading.prototype.clickOnSecondLink = async function() {
    let link = await this.findByXpath(secondLink)
    let click = await link.click()
    return click
}





module.exports = DyanamicLoading