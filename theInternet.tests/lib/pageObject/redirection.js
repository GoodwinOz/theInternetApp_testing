const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const mainLink = locators.redirectionMainLink,
      statusPageBody = locators.redirectionStatusBody,
      status200 = locators.redirection200Link,
      status301 = locators.redirection301Link,
      status404 = locators.redirection404Link,
      status500 = locators.redirection500Link

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Redirection(webdriver) {
    BasePage.call(this, webdriver)
}


Redirection.prototype = Object.create(BasePage.prototype)
Redirection.prototype.constructor = Redirection

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


Redirection.prototype.moveToMainPage = async function () {
    let location = await this.findByXpath(mainLink)
    let move = await location.click()
    return move
}

Redirection.prototype.checkStatus200 = async function () {
    let location = await this.findByXpath(status200)
    let click = await location.click()
    return click
}

Redirection.prototype.getStatusBodyText = async function () {
    let location = await this.findByXpath(statusPageBody)
    let text = await location.getText()
    return text
}

Redirection.prototype.checkStatus301 = async function () {
    let location = await this.findByXpath(status301)
    let click = await location.click()
    return click
}

Redirection.prototype.checkStatus404 = async function () {
    let location = await this.findByXpath(status404)
    let click = await location.click()
    return click
}

Redirection.prototype.checkStatus500 = async function () {
    let location = await this.findByXpath(status500)
    let click = await location.click()
    return click
}



module.exports = Redirection