const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const target = locators.keyPressesTarget,
      result = locators.keyPressesResult,
      body = locators.keyPressesBody


/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function keyPresses(webdriver) {
    BasePage.call(this, webdriver)
}


keyPresses.prototype = Object.create(BasePage.prototype)
keyPresses.prototype.constructor = keyPresses

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


keyPresses.prototype.sendQ = async function () {
    let location = await this.findByXpath(target)
    let keys = await location.sendKeys('q')
    return keys
}

keyPresses.prototype.getValue = async function () {
    let location = await this.findByXpath(result)
    let text = await location.getText()
    return text
}

keyPresses.prototype.sendKeysToBody = async function () {
    let location = await this.findByXpath(body)
    let text = await location.sendKeys('asd')
    return text
}

keyPresses.prototype.sendRussianKeys = async function () {
    let location = await this.findByXpath(target)
    let text = await location.sendKeys('й')
    return text
}




module.exports = keyPresses