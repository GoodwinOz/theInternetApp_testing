const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const textReference = locators.textReference,
      refreshButton = locators.refreshButton

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function DyanmicContent(webdriver) {
    BasePage.call(this, webdriver)
}

DyanmicContent.prototype = Object.create(BasePage.prototype)
DyanmicContent.prototype.constructor = DyanmicContent

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


DyanmicContent.prototype.getText = async function() {
    let textArea = await this.findByXpath(textReference)
    let getText = await textArea.getText()
    return getText
}

DyanmicContent.prototype.refreshButton = async function() {
    let button = await this.findByXpath(refreshButton)
    let click = await button.click()
    return click
}


module.exports = DyanmicContent