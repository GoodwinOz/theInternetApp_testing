const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const checkbox = locators.dynamicElementsCheckbox,
      removeBtn = locators.dynamicElementsRemoveCheckbox,
      goneMessage = locators.dynamicElementsGoneMsg,
      buttonInput = locators.dynamicElementsInputBtn,
      enableMessage = locators.dynamicElementsEnableMsg,
      inputField = locators.dynamicElementsInputField 

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function DyanamicElements(webdriver) {
    BasePage.call(this, webdriver)
}

DyanamicElements.prototype = Object.create(BasePage.prototype)
DyanamicElements.prototype.constructor = DyanamicElements

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


DyanamicElements.prototype.checkboxDoubleClick = async function() {
    let checkboxCss = await this.findByCss(checkbox)
    let doubleClick = await this.doubleClick(checkboxCss)
    return doubleClick
}

DyanamicElements.prototype.removeCheckbox = async function() {
    let removeButton = await this.findByXpath(removeBtn)
    let click = await removeButton.click()
    return click
}

DyanamicElements.prototype.checkMsgText = async function() {
    let msg = await this.findByXpath(goneMessage)
    let getText = await msg.getText()
    return getText
}

DyanamicElements.prototype.enableInput = async function() {
    let btn2 = await this.findByXpath(buttonInput)
    let click = await btn2.click()
    return click
}

DyanamicElements.prototype.getInputText = async function() {
    let inputMsg = await this.findByXpath(enableMessage)
    let getText = await inputMsg.getText()
    return getText
}

DyanamicElements.prototype.inputField = async function() {
    let field = await this.findByXpath(inputField)
    return field
}










module.exports = DyanamicElements