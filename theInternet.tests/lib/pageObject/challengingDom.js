const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const regularExpression = locators.challengingDomRegularExpression

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function ChallengingDomPage(webdriver) {
    BasePage.call(this, webdriver)
}

ChallengingDomPage.prototype = Object.create(BasePage.prototype)
ChallengingDomPage.prototype.constructor = ChallengingDomPage

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


ChallengingDomPage.prototype.regularExpressionClick = async function() {
   let buttons = await this.findByXpath(regularExpression)
   return buttons
}

ChallengingDomPage.prototype.elementsDetected = async function() {
   let buttons = await this.findByXpath(regularExpression)
   let buttonsText = await buttons.getText()
   return buttonsText
}

 module.exports = ChallengingDomPage