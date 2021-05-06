const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const element1 = locators.domElement1,
      element2 = locators.domElement2,
      element3 = locators.domElement3,
      element4 = locators.domElement4,
      element5 = locators.domElement5

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function DomPage(webdriver) {
    BasePage.call(this, webdriver)
}


DomPage.prototype = Object.create(BasePage.prototype)
DomPage.prototype.constructor = DomPage

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


 DomPage.prototype.moveToFirstElement = async function () {
    let location = await this.findByXpath(element1)
    let move = await this.moveTo(location)
    return move
}
DomPage.prototype.moveToSecondElement = async function () {
    let location = await this.findByXpath(element2)
    let move = await this.moveTo(location)
    return move
}
DomPage.prototype.moveToThirdElement = async function () {
    let location = await this.findByXpath(element3)
    let move = await this.moveTo(location)
    return move
}
DomPage.prototype.moveToFourthElement = async function () {
    let location = await this.findByXpath(element4)
    let move = await this.moveTo(location)
    return move
}
 DomPage.prototype.moveToFifthElement = async function () {
    let location = await this.findByXpath(element5)
    let move = await this.moveTo(location)
    return move
}

module.exports = DomPage