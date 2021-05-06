const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const firstAlert = locators.alertsFirstAlert,
      result = locators.alertsResult,
      secondAlert = locators.alertsSecondAlert,
      thirdAlert = locators.alertsThirdAlert

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

function Alerts(webdriver) {
    BasePage.call(this, webdriver)
}


Alerts.prototype = Object.create(BasePage.prototype)
Alerts.prototype.constructor = Alerts

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


 Alerts.prototype.firstAlertInit = async function () {
    let location = await this.findByXpath(firstAlert)
    await location.click()
    let accept = await this.acceptAlert()
    return accept
}

Alerts.prototype.verifyResult = async function () {
    let location = await this.findByXpath(result)
    let text = await location.getText()
    return text
}

Alerts.prototype.secondAlertAccept = async function () {
    let location = await this.findByXpath(secondAlert)
    await location.click()
    let accept = await this.acceptAlert()
    return accept
}

Alerts.prototype.secondAlertDismiss = async function () {
    let location = await this.findByXpath(secondAlert)
    await location.click()
    let dismiss = await this.dismissAlert()
    return dismiss
}

Alerts.prototype.thirdAlertInit = async function () {
    let location = await this.findByXpath(thirdAlert)
    await location.click()
    let waits = await this.waitForAlert()
    await waits.sendKeys('Test keys')
    let accept = await this.acceptAlert()
    return accept
}




module.exports = Alerts