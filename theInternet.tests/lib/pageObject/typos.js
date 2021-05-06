const { secondCheckbox } = require('../locators/locators.js')
const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const textSample = locators.typosElementWithText
      

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Typos(webdriver) {
    BasePage.call(this, webdriver)
}


Typos.prototype = Object.create(BasePage.prototype)
Typos.prototype.constructor = Typos

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


 Typos.prototype.getTextSample = async function () {
    let location = await this.findByXpath(textSample)
    let text = await location.getText()
    return text
}


module.exports = Typos