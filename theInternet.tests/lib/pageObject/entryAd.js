const locators = require('../locators/locators.js')
let BasePage = require('./basePage')

/**
 * Locators for the elemtents on this page
 * @type {string}
 */

const windowTitle = locators.entryAdWindowTitle,
      windowBody = locators.entryAdWindowBody,
      closeAlertCss = locators.entryAdCloseAlertBtnCss,
      restartPageCss = locators.entryAdCloseRestartPageCss

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */

 function EntryAd(webdriver) {
    BasePage.call(this, webdriver)
}

EntryAd.prototype = Object.create(BasePage.prototype)
EntryAd.prototype.constructor = EntryAd

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */


EntryAd.prototype.getAlertTitleText = async function() {
    let alertTitle = await this.findByXpath(windowTitle)
    let text = await alertTitle.getText()
    return text
}

EntryAd.prototype.getAlertBodyText = async function() {
    let alertBody = await this.findByXpath(windowBody)
    let text = await alertBody.getText()
    return text
}

EntryAd.prototype.getAlertBodyText = async function() {
    let alertBody = await this.findByXpath(windowBody)
    let text = await alertBody.getText()
    return text
}

EntryAd.prototype.closeAlertWindow = async function() {
    let alertWindow = await this.findByCss(closeAlertCss)
    let btn = await alertWindow.click()
    return btn
}

EntryAd.prototype.restartPage = async function() {
    let btn = await this.findByCss(restartPageCss)
    let click = await btn.click()
    return click
}




module.exports = EntryAd