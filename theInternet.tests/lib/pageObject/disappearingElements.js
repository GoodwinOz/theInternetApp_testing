const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const home = locators.disappearinElemHome,
      about = locators.disappearinElemAbout,
      contact = locators.disappearinElemContactUs,
      portfolio = locators.disappearinElemPortfolio

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function DisappearingElements(webdriver) {
    BasePage.call(this, webdriver)
}

DisappearingElements.prototype = Object.create(BasePage.prototype)
DisappearingElements.prototype.constructor = DisappearingElements

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */

DisappearingElements.prototype.moveToHome = async function() {
    let homeIcon = await this.findByXpath(home)
    let moveTo = await this.moveTo(homeIcon)
    return moveTo
}

DisappearingElements.prototype.moveToAbout = async function() {
    let aboutIcon = await this.findByXpath(about)
    let moveTo = await this.moveTo(aboutIcon)
    return moveTo
}

DisappearingElements.prototype.moveToContact = async function() {
    let contactIcon = await this.findByXpath(contact)
    let moveTo = await this.moveTo(contactIcon)
    return moveTo
}

DisappearingElements.prototype.moveToPortfolio = async function() {
    let portfolioIcon = await this.findByXpath(portfolio)
    let moveTo = await this.moveTo(portfolioIcon)
    return moveTo
}

DisappearingElements.prototype.getHomeText = async function() {
    let homeIcon = await this.findByXpath(home)
    let getText = await homeIcon.getText()
    return getText
}

DisappearingElements.prototype.getAboutText = async function() {
    let aboutIcon = await this.findByXpath(about)
    let getText = await aboutIcon.getText()
    return getText
}

DisappearingElements.prototype.getContactText = async function() {
    let contactIcon = await this.findByXpath(contact)
    let getText = await contactIcon.getText()
    return getText
}

DisappearingElements.prototype.getPortfolioText = async function() {
    let portfolioIcon = await this.findByXpath(portfolio)
    let getText = await portfolioIcon.getText()
    return getText
}

module.exports = DisappearingElements