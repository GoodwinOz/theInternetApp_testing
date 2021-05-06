const { secondCheckbox } = require('../locators/locators.js')
const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const firstLink = locators.shiftingFirstLink,
      menuPixelShift = locators.shiftingMenuPixelShiftBtn,
      home = locators.shiftingMenuHome,
      about = locators.shiftingMenuAbout,
      contact = locators.shiftingMenuContact,
      portfolio = locators.shiftingMenuPortfolio,
      gallery = locators.shiftingMenuGallery,
      randomizeMenu = locators.shiftingMenuRandomize,
      secondLink = locators.shiftingSecondLink,
      imageRandomize = locators.shifringImageRandomize,
      imagePixelShift = locators.shiftingImagePixelShift,
      imageRandomPixelShift = locators.shiftingImageRandomPixelShift,
      imageSample = locators.shiftingImageSimple,
      thirdLink = locators.shiftingThirdLink,
      textSample = locators.shiftingTextSample
      

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Shifting(webdriver) {
    BasePage.call(this, webdriver)
}


Shifting.prototype = Object.create(BasePage.prototype)
Shifting.prototype.constructor = Shifting

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


Shifting.prototype.goToFirstLink = async function () {
    let location = await this.findByXpath(firstLink)
    let click = await location.click()
    return click
}

Shifting.prototype.shiftMenuPixels = async function () {
    let location = await this.findByXpath(menuPixelShift)
    let click = await location.click()
    return click
}

Shifting.prototype.checkHome = async function () {
    let location = await this.findByXpath(home)
    let move = await this.moveTo(location)
    return move
}

Shifting.prototype.checkAbout = async function () {
    let location = await this.findByXpath(about)
    let move = await this.moveTo(location)
    return move
}

Shifting.prototype.checkContact = async function () {
    let location = await this.findByXpath(contact)
    let move = await this.moveTo(location)
    return move
}

Shifting.prototype.checkPortfolio = async function () {
    let location = await this.findByXpath(portfolio)
    let move = await this.moveTo(location)
    return move
}

Shifting.prototype.checkGallery = async function () {
    let location = await this.findByXpath(gallery)
    let move = await this.moveTo(location)
    return move
}

Shifting.prototype.randomizeMenu = async function () {
    let location = await this.visit(randomizeMenu)
    return location
}

Shifting.prototype.goToSecondLink = async function () {
    let location = await this.findByXpath(secondLink)
    let click = await location.click()
    return click
}

Shifting.prototype.randomizeImg = async function () {
    let location = await this.visit(imageRandomize)
    return location
}

Shifting.prototype.imgPixelShift = async function () {
    let location = await this.visit(imagePixelShift)
    return location
}

Shifting.prototype.imgRandomizePixelShift = async function () {
    let location = await this.visit(imageRandomPixelShift)
    return location
}

Shifting.prototype.goToThirdLink = async function () {
    let location = await this.findByXpath(thirdLink)
    let click = await location.click()
    return click
}

Shifting.prototype.getTextSample = async function () {
    let text = await this.findByXpath(textSample)
    return text
}


module.exports = Shifting