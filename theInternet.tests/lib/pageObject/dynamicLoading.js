const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const 

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


 DyanamicLoading.prototype.checkboxDoubleClick = async function() {
    let checkboxCss = await this.findByCss(checkbox)
    let doubleClick = await this.doubleClick(checkboxCss)
    return doubleClick
}


module.exports = DyanamicLoading