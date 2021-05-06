const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const inputString = locators.inputsInputString

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Inputs(webdriver) {
    BasePage.call(this, webdriver)
}

Inputs.prototype = Object.create(BasePage.prototype)
Inputs.prototype.constructor = Inputs

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


// Inputs.prototype.inputLocation = async function() {
//     let location = await this.findByXpath(inputString)
//     return location
// }


module.exports = Inputs