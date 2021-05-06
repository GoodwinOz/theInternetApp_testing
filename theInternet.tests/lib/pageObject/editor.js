const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const frameId = locators.editorFrameId,
      mainElementId = locators.editorMainElementId,
      bold = locators.editorBold,
      alignCenter = locators.edtiorAlignCenter,
      italic = locators.editorItalic
      

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Editor(webdriver) {
    BasePage.call(this, webdriver)
}


Editor.prototype = Object.create(BasePage.prototype)
Editor.prototype.constructor = Editor

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


Editor.prototype.switchFrame = async function () {
    let frame = await this.switchToFrame(frameId)
    return frame
}

Editor.prototype.findMainElement = async function () {
    let frame = await this.findById(mainElementId)
    return frame
}

Editor.prototype.makeBold = async function () {
    let element = await this.findByXpath(bold)
    let click = await element.click()
    return click
}

Editor.prototype.alignToCenter = async function () {
    let element = await this.findByXpath(alignCenter)
    let click = await element.click()
    return click
}

Editor.prototype.makeItalic = async function () {
    let element = await this.findByXpath(italic)
    let click = await element.click()
    return click
}

Editor.prototype.getTextFromWindow = async function () {
    let element = await this.findById(mainElementId)
    let text = await element.getText()
    return text
}

module.exports = Editor