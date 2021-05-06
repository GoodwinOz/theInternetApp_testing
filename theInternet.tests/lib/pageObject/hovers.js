const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const user1img = locators.hoverUser1Img,
      user2img = locators.hoverUser2Img,
      user3img = locators.hoverUser3Img,
      user1name = locators.hoverUser1Name,
      user2name = locators.hoverUser2Name,
      user3name = locators.hoverUser3Name

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Hovers(webdriver) {
    BasePage.call(this, webdriver)
}

Hovers.prototype = Object.create(BasePage.prototype)
Hovers.prototype.constructor = Hovers

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


Hovers.prototype.moveToUser1 = async function () {
    let getElement = await this.findByXpath(user1img)
    let move = await this.moveTo(getElement)
    return move
}

Hovers.prototype.getUser1Name = async function () {
    let getElement = await this.findByXpath(user1name)
    let name = await getElement.getText()
    return name
}

Hovers.prototype.moveToUser2 = async function () {
    let getElement = await this.findByXpath(user2img)
    let move = await this.moveTo(getElement)
    return move
}

Hovers.prototype.getUser2Name = async function () {
    let getElement = await this.findByXpath(user2name)
    let name = await getElement.getText()
    return name
}

Hovers.prototype.moveToUser3 = async function () {
    let getElement = await this.findByXpath(user3img)
    let move = await this.moveTo(getElement)
    return move
}

Hovers.prototype.getUser3Name = async function () {
    let getElement = await this.findByXpath(user3name)
    let name = await getElement.getText()
    return name
}






module.exports = Hovers