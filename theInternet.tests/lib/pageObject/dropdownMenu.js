const { option1css } = require('../locators/locators.js')
const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const mainMenu = locators.dropdownId,
      option1 = locators.option1css,
      option2 = locators.option2css

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function DropdownMenu(webdriver) {
    BasePage.call(this, webdriver)
}

DropdownMenu.prototype = Object.create(BasePage.prototype)
DropdownMenu.prototype.constructor = DropdownMenu

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


DropdownMenu.prototype.dropdownClick = async function() {
    let menu = await this.findById(mainMenu)
    let menuClick = await menu.click()
    return menuClick
}

DropdownMenu.prototype.selectOption1 = async function() {
    let option1locator = await this.findByCss(option1)
    let click = await option1locator.click()
    return click
}

DropdownMenu.prototype.selectOption2 = async function() {
    let option2locator = await this.findByCss(option2)
    let click = await option2locator.click()
    return click
}

DropdownMenu.prototype.dropdownGetText = async function() {
    let menu = await this.findById(mainMenu)
    let getText = await menu.getText()
    return getText
}



module.exports = DropdownMenu