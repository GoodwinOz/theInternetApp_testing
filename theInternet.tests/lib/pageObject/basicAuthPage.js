const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const loginTextXpath = locators.loginTextSelector,
      loginTextCss = locators.loginTextCss

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function BasicAuthPage(webdriver) {
    BasePage.call(this, webdriver)
}

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */

BasicAuthPage.prototype = Object.create(BasePage.prototype)
BasicAuthPage.prototype.constructor = BasicAuthPage

BasicAuthPage.prototype.getTitle = async function () {
  const title = await this.driver.getTitle()
  return title
}

BasicAuthPage.prototype.findLoginText = async function() {
    let findElement = await this.findByXpath(loginTextXpath)
    let elementText = findElement.getText()
    return elementText
}

BasicAuthPage.prototype.findLoginTextCss = async function() {
    let findElement = await this.findByCss(loginTextCss)
    let elementText = findElement.getText()
    return elementText
}

module.exports = BasicAuthPage