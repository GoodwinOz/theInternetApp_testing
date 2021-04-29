const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const checkbox1 = locators.firstCheckbox,
      checkbox2 = locators.secondCheckbox

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function Checkboxes(webdriver) {
    BasePage.call(this, webdriver)
}

Checkboxes.prototype = Object.create(BasePage.prototype)
Checkboxes.prototype.constructor = Checkboxes

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


Checkboxes.prototype.firstCheckbox = async function() {
let checkbox = await this.findByXpath(checkbox1)
let checkboxClick = await checkbox.click()
return checkboxClick
}

Checkboxes.prototype.secondCheckbox = async function() {
let checkbox = await this.findByXpath(checkbox2)
return checkbox
}

Checkboxes.prototype.firstCheckboxValue = async function() {
    let checkbox = await this.findByXpath(checkbox1)
    let value = await checkbox.getAttribute('checked')
    return value
}

Checkboxes.prototype.secondCheckboxValue = async function() {
    let checkbox = await this.findByXpath(checkbox2)
    let value = await checkbox.getAttribute('checked')
    return value
}

module.exports = Checkboxes