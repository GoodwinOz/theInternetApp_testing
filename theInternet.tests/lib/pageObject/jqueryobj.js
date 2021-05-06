const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const enable = locators.jqueryEnable,
    downloads = locators.jqueryDownloads,
    pdf = locators.jqueryPdf,
    csv = locators.jqueryCsv,
    excel = locators.jqueryExcel,
    backBtn = locators.jqueryBackBtn

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function JqueryUI(webdriver) {
    BasePage.call(this, webdriver)
}


JqueryUI.prototype = Object.create(BasePage.prototype)
JqueryUI.prototype.constructor = JqueryUI

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


JqueryUI.prototype.moveToEnable = async function () {
    let location = await this.findByXpath(enable)
    await this.elementIsVisible(location)
    let move = await this.moveTo(location)
    return move
}

JqueryUI.prototype.moveToDownloads = async function () {
    let location = await this.findByXpath(downloads)
    await this.elementIsVisible(location)
    let move = await this.moveTo(location)
    return move
}

JqueryUI.prototype.moveToPdf = async function () {
    let location = await this.findByXpath(pdf)
    let move = await this.moveTo(location)
    return move
}

JqueryUI.prototype.moveToCsv = async function () {
    let location = await this.findByXpath(csv)
    let move = await this.moveTo(location)
    return move
}

JqueryUI.prototype.moveToExcel = async function () {
    let location = await this.findByXpath(excel)
    let move = await this.moveTo(location)
    return move
}

JqueryUI.prototype.getEnableText = async function () {
    let location = await this.findByXpath(enable)
    let text = await location.getText()
    return text
}

JqueryUI.prototype.getDownloadsText = async function () {
    let location = await this.findByXpath(downloads)
    let text = await location.getText()
    return text
}

JqueryUI.prototype.getPdfText = async function () {
    let location = await this.findByXpath(pdf)
    let text = await location.getText()
    return text
}

JqueryUI.prototype.getCsvText = async function () {
    let location = await this.findByXpath(csv)
    let text = await location.getText()
    return text
}

JqueryUI.prototype.getExcelText = async function () {
    let location = await this.findByXpath(excel)
    let text = await location.getText()
    return text
}

JqueryUI.prototype.backBtnClick = async function () {
    let location = await this.findByXpath(backBtn)
    let click = location.click()
    return click
}


module.exports = JqueryUI