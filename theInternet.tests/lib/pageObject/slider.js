const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const input = locators.sliderInput,
      range = '//*[@id="range"]'

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Slider(webdriver) {
    BasePage.call(this, webdriver)
}

Slider.prototype = Object.create(BasePage.prototype)
Slider.prototype.constructor = Slider

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


Slider.prototype.getInputElement = async function () {
    let getElement = await this.findByXpath(input)
    return getElement
}

Slider.prototype.getValue = async function () {
    let getElement = await this.findByXpath(range)
    let keys = await getElement.getText()
    return keys
}


module.exports = Slider