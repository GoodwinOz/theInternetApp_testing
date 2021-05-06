const { secondCheckbox } = require('../locators/locators.js')
const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const spanText = locators.shadowDomSpanText,
      firstLitext = locators.shadowDomFirstLiText,
      SecondLiText = locators.shadowDomSecondLiText

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function ShadowDom(webdriver) {
    BasePage.call(this, webdriver)
}


ShadowDom.prototype = Object.create(BasePage.prototype)
ShadowDom.prototype.constructor = ShadowDom

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


ShadowDom.prototype.getTextFromSpan = async function () {
    let location = await this.findByXpath(spanText)
    let text = await location.getText()
    return text
}

ShadowDom.prototype.getTextFromFirstLi = async function () {
    let location = await this.findByXpath(firstLitext)
    let text = await location.getText()
    return text
}

ShadowDom.prototype.getTextFromSecondLi = async function () {
    let location = await this.findByXpath(SecondLiText)
    let text = await location.getText()
    return text
}


module.exports = ShadowDom