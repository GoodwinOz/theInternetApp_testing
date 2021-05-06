const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const usernameId = locators.loginPageUsernameId,
      passwordId = locators.loginPagePasswordId,
      loginBtn = locators.loginPageLoginBtn,
      loginMsg = locators.loginPageLoginMsg,
      logoutBtn = locators.loginPageLogoutBtn,
      logoutMsg = locators.loginPageLogoutMsg,
      usernameKeys = locators.loginPageUsernameKeys,
      passwordKeys = locators.loginPagePasswordkeys


/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function LoginPage(webdriver) {
    BasePage.call(this, webdriver)
}

LoginPage.prototype = Object.create(BasePage.prototype)
LoginPage.prototype.constructor = LoginPage

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


LoginPage.prototype.inputLogin = async function() {
    let input = await this.findById(usernameId)
    let sendkeys = await input.sendKeys(usernameKeys)
    return sendkeys
}

LoginPage.prototype.inputPassword = async function() {
    let input = await this.findById(passwordId)
    let sendkeys = await input.sendKeys(passwordKeys)
    return sendkeys
}

LoginPage.prototype.clickLogin = async function() {
    let btn = await this.findByXpath(loginBtn)
    let click = await btn.click()
    return click
}

LoginPage.prototype.verifyIfLogin = async function() {
    let input = await this.findByXpath(loginMsg)
    let getText = await input.getText()
    return getText
}

LoginPage.prototype.logout = async function() {
    let btn = await this.findByXpath(logoutBtn)
    let click = await btn.click()
    return click
}

LoginPage.prototype.verifyIfLogout = async function() {
    let input = await this.findByXpath(logoutMsg)
    let getText = await input.getText()
    return getText
}




module.exports = LoginPage