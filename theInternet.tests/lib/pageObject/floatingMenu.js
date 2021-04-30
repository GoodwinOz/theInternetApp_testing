const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const bottomElement = locators.floatingMenuBottomElement,
      homeBtn = locators.floatingMenuHomeBtn,
      newsBtn = locators.floatingMenuNewsBtn,
      contactBtn = locators.floatingMenuContactBtn,
      aboutBtn = locators.floatingMenuAboutBtn

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function FloatingMenu(webdriver) {
    BasePage.call(this, webdriver)
}

FloatingMenu.prototype = Object.create(BasePage.prototype)
FloatingMenu.prototype.constructor = FloatingMenu

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


FloatingMenu.prototype.scrollDown = async function() {
    let scroll = await this.findByXpath(bottomElement)
    let move = await this.moveTo(scroll)
    return move
}

FloatingMenu.prototype.clickOnHome = async function() {
    let btn = await this.findByXpath(homeBtn)
    let click = await btn.click()
    return click
}

FloatingMenu.prototype.clickOnNews = async function() {
    let btn = await this.findByXpath(newsBtn)
    let click = await btn.click()
    return click
}

FloatingMenu.prototype.clickOnContacts = async function() {
    let btn = await this.findByXpath(contactBtn)
    let click = await btn.click()
    return click
}

FloatingMenu.prototype.clickOnAbout = async function() {
    let btn = await this.findByXpath(aboutBtn)
    let click = await btn.click()
    return click
}

FloatingMenu.prototype.getCurrentUrl = async function() {
    let url = this.getUrl()
    return url
}



module.exports = FloatingMenu