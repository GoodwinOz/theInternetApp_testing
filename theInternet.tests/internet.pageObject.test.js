require('chromedriver')
require('jest-environment-selenium')
const webdriver = require('selenium-webdriver')
const { Builder, By, Key, util } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()
const script = require('jest')
const assert = require('assert')
require('dotenv').config()

const locators = require('./lib/locators/locators')
const BasicAuthPage = require('./lib/pageObject/basicAuthPage')
const ChallengingDomPage = require('./lib/pageObject/challengingDom')
const Checkboxes = require('./lib/pageObject/checkboxes')
const DisappearingElements = require('./lib/pageObject/disappearingElements')
const DropdownMenu = require('./lib/pageObject/dropdownMenu')
const DyanmicContent = require('./lib/pageObject/dynamicContent')
const DyanamicElements = require('./lib/pageObject/dynamicElements')
const DynamicLoading = require('./lib/pageObject/dynamicLoading')
const EntryAd = require('./lib/pageObject/entryAd')
const FloatingMenu = require('./lib/pageObject/floatingMenu')
const LoginPage = require('./lib/pageObject/loginPage')
const Frames = require('./lib/pageObject/frames')
const Slider = require('./lib/pageObject/slider')
const Hovers = require('./lib/pageObject/hovers')
const Inputs = require('./lib/pageObject/inputs')
const JqueryUI = require('./lib/pageObject/jqueryobj')
const Alerts = require('./lib/pageObject/alerts')
const KeyPresses = require('./lib/pageObject/keyPresses')
const DomPage = require('./lib/pageObject/dom')
const Redirection = require('./lib/pageObject/redirection')
const ShadowDom = require('./lib/pageObject/shadowDom')
const Shifting = require('./lib/pageObject/shifting')
const Typos = require('./lib/pageObject/typos')
const Editor = require('./lib/pageObject/editor')



//Chrome capabilities for testing download functions
// let chromeCapabilities = webdriver.Capabilities.chrome();
// let chromeOptions = { 'args': ['--disable-infobars'] };
// chromeCapabilities.set('chromeOptions', chromeOptions);
// capabilities.setPageLoadStrategy('normal');


let driver
let mainUrl = 'https://the-internet.herokuapp.com/'

//Alternative:
//let mainUrl = process.env.URL



// it('should check a validation of input data to auth alert box', async (done) => {
//     basicAuthPage = new BasicAuthPage(driver)
//     const url = locators.basicAuthUrl,
//         expectedLoginText = locators.expectedLoginText

//     await driver.get(url)
//     await driver.sleep(3000)

//     const getTitle = await basicAuthPage.getTitle();
//     expect(getTitle).toContain('The Internet');

//     const loginText = await basicAuthPage.findLoginTextCss()
//     expect(loginText).toContain(expectedLoginText)

//     done()
// })


describe('tests block', () => {
    beforeEach(async () => {
        driver = await new webdriver.Builder().forBrowser('chrome').build()
        await driver.get(mainUrl)
    })
    afterEach(async () => {
        await driver.close()
    }, 20000)


    describe('execute testing scenario of auth alert; #auth', () => { //Green
        it('should check a validation of input data to auth alert box', async (done) => {
            basicAuthPage = new BasicAuthPage(driver)
            const url = locators.basicAuthUrl,
                  expectedLoginText = locators.expectedLoginText

            await driver.get(url)

            const getTitle = await basicAuthPage.getTitle();
            expect(getTitle).toContain('The Internet');

            const loginText = await basicAuthPage.findLoginText()
            expect(loginText).toContain(expectedLoginText)

            done()
        })
    }, 10000)

    // //Broken image

    describe.skip('execute testing scenario of broken images', () => { //Green
        it('should check which images are broken', async (done) => {

            await driver.get(mainUrl + 'broken_images')

            await driver.get(mainUrl + 'asdf.jpg')
            let brokenImage1 = await driver.findElement(By.xpath('/html/body/h1')).getText()
            if (expect(brokenImage1).toBe('Not Found')) {
                console.log('Image detected')
            } else {

                console.log('Broken')
                await driver.executeScript("window.history.go(-1)")
            }

            await driver.get(mainUrl + 'hjkl.jpg')
            let brokenImage2 = await driver.findElement(By.xpath('/html/body/h1')).getText()
            expect(brokenImage2).toBe('Not Found')
            if (brokenImage2) {
                console.log('Image detected')
            } else {
                console.log('Broken')
                await driver.executeScript("window.history.go(-1)")
            }

            await driver.get(mainUrl + 'img/avatar-blank.jpg')
            imgVerification = await driver.getCurrentUrl()
            expect(imgVerification).toContain('img')

            done()
        })
    }, 20000)

    //Challenging DOM

    describe('execute testing scenario of finding elements (?)', () => { //Green     
        it('should check a valid answers of various buttons with pageObject pattern', async (done) => {
            try {
                challengingDom = new ChallengingDomPage(driver)
                const url = locators.challengingDomUrl
                await driver.get(url)

                let button = await challengingDom.regularExpressionClick()
                await button.click()
            } finally {
                done()
            }
        }, 10000)
    }, 20000)

    // Checkboxes

    describe('execute testing scenario of using checkboxes', () => { //Green
        it('should use a checkbox with pageObject pattern', async (done) => {
            challengingDom = new Checkboxes(driver)
            const url = locators.checkboxUrl
            await driver.get(url)

            const actions = await driver.actions({ async: true })

            await challengingDom.firstCheckbox()
            let secondCheckbox = await challengingDom.secondCheckbox()
            await actions.doubleClick(secondCheckbox).perform()

            let firstCheckboxValue = await challengingDom.firstCheckboxValue()
            let secondCheckboxValue = await challengingDom.secondCheckboxValue()
            expect(firstCheckboxValue).toBeTruthy()
            expect(secondCheckboxValue).toBeTruthy()

            done()
        }, 10000)
    }, 15000)

    // //Context Menu

    describe('execute testing scenario of using context menu', () => {
        it('should trigger the alert message', async (done) => { //Green
            await driver.get(mainUrl + 'context_menu')

            await driver.actions().contextClick(driver.findElement(By.id('hot-spot')), webdriver.Button.RIGHT).perform()

            let alert = await driver.switchTo().alert();
            let alertText = await driver.switchTo().alert().getText()
            expect(alertText).toBe('You selected a context menu')
            await alert.accept();

            done()
        }, 10000)
    })

    // //Digest Auth - 404

    // //Disappearing Elements
    // // .only - единичный запуск теста  .skip - пропуск теста (единичного)
    describe('execute testing scenario of moving mouse pointer on various elements', () => { //Green (Detectiong *gallery element* - commentet)
        it('should highlight various elements with pageObject pattern', async (done) => {
            disappearingElements = new DisappearingElements(driver)
            const url = locators.disappearinElemUrl
            await driver.get(url)

            await disappearingElements.moveToHome()
            let homeText = await disappearingElements.getHomeText()
            expect(homeText).toContain('Home')

            await disappearingElements.moveToAbout()
            let aboutText = await disappearingElements.getAboutText()
            expect(aboutText).toContain('About')

            await disappearingElements.moveToContact()
            let contactText = await disappearingElements.getContactText()
            expect(contactText).toContain('Contact Us')

            await disappearingElements.moveToPortfolio()
            let portfolioText = await disappearingElements.getPortfolioText()
            expect(portfolioText).toContain('Portfolio')

            done()
        }, 15000)
    }, 15000)

    // // Drag and drop

    describe('execute testing scenario of using drag and drop', () => { //Green
        //Drag&drop by coordinates of displayed element ()
        it.skip('should drag element "a" to position, where element "b" located', async (done) => {

            await driver.get(mainUrl + 'drag_and_drop')

            let elementA = await driver.findElement(By.id('column-a'))
            let elementB = await driver.findElement(By.id('column-b'))
            const actions = driver.actions({ async: true })
            let coordinatesElementA = await driver.findElement(By.xpath('//*[@id="column-a"]/header')).getText()
            let coordinatesElementB = await driver.findElement(By.xpath('//*[@id="column-b"]/header')).getText()

            let offset = await elementB.getRect()
            let x = await offset.x
            let y = await offset.y

            await actions.dragAndDrop(elementA, { x: parseInt(x), y: parseInt(y) }).perform()

            // await actions.move({origin:elementA}).press().perform()

            // await actions.move({origin:elementB}).release().perform()

            expect(coordinatesElementA).toBe('A')
            expect(coordinatesElementA).not.toBe('B')
            expect(coordinatesElementB).toBe('B')
            expect(coordinatesElementB).not.toBe('A')

            done()
        }, 7000)
    }, 10000)

    // //Dropdown List

    describe('execute testing scenario of dropdown menu', () => {  //Green
        it('should select values from dropdown menu with pageObjects', async (done) => {
            dropdownMenu = new DropdownMenu(driver)
            const url = locators.dropdownUrl
            await driver.get(url)

            await dropdownMenu.dropdownClick()
            await dropdownMenu.selectOption1()
            await dropdownMenu.dropdownClick()
            await dropdownMenu.selectOption2()
            let text = await dropdownMenu.dropdownGetText()

            expect(text).toContain('Option 2')

            done()
        }, 10000)
    }, 15000)

    // //Dynamyc content

    describe('execute scenario of testing dynamic content', () => { //Green
        it('should dynamically change text after clicking on link using pageObject pattern', async (done) => {
            dyanmicContent = new DyanmicContent(driver)
            const url = locators.dynamicContentUrl
            await driver.get(url)

            let referenceBeforeRefresh = await dyanmicContent.getText()
            await dyanmicContent.refreshButton()
            let referenceAfterRefresh = await dyanmicContent.getText()
            expect(referenceBeforeRefresh).not.toEqual(referenceAfterRefresh)

            done()
        })
    })

    //Dynamic controls

    describe('execute scenario of testing dynamic controls', () => { //Green
        it('should dynamically enable and disable elements on the page using pageObject pattern', async (done) => {
            dynamicElements = new DyanamicElements(driver)
            const url = locators.dynamicElementsUrl
            await driver.get(url)

            await dynamicElements.checkboxDoubleClick()
            await dynamicElements.removeCheckbox()
            let alertMessage = await dynamicElements.checkMsgText()
            expect(alertMessage).toContain("It's gone!")

            await dynamicElements.enableInput()
            let enableInput = await dynamicElements.getInputText()
            expect(enableInput).toContain('It\'s enabled!')

            let inputField = await dynamicElements.inputField()
            await inputField.sendKeys('Test Keys')

            done()
        }, 15000)
    })

    // Dynamically loaded elements

    describe('execute scenario of testing dynamically loaded elements and pages', () => { //Green
        it('should dynamically test elements on opened pages with pageObjects', async (done) => {
            dynamicLoading = new DynamicLoading(driver)
            const url = locators.dynamicLoadingUrl
            await driver.get(url)

            await dynamicLoading.clickOnFirstLink()
            await dynamicLoading.clickOnBtn()
            await driver.sleep(5500)
            let finishMsg = await dynamicLoading.getFinishText()
            expect(finishMsg).toContain('Hello World!')

            await dynamicLoading.goToPreviousPage()

            await dynamicLoading.clickOnSecondLink()
            await dynamicLoading.clickOnBtn()
            let secondFinishMsg = await dynamicLoading.getFinishText()
            expect(secondFinishMsg).toContain('Hello World!')

            done()
        }, 20000)
    }, 15000)

    // //Entry Ad

    describe('execute scenario of testing a modal window functions', () => {//Green
        it('should validate modal window info and reopen it with pageObjects', async (done) => {
            entryAd = new EntryAd(driver)
            const url = locators.entryAdUrl
            const titleText = locators.entryAdWindowTitleText
            const bodyText = locators.entryAdWindowBodyText

            await driver.get(url)

            await driver.sleep(1300)

            let getTitle = await entryAd.getAlertTitleText()
            let getBodyText = await entryAd.getAlertBodyText()
            expect(getTitle).toContain(titleText)
            expect(getBodyText).toContain(bodyText)
            await entryAd.closeAlertWindow()

            await entryAd.restartPage()

            await driver.sleep(1300)

            let getTitleAfterRestart = await entryAd.getAlertTitleText()
            let getBodyTextAfterRestart = await entryAd.getAlertBodyText()
            expect(getTitleAfterRestart).toContain(titleText)
            expect(getBodyTextAfterRestart).toContain(bodyText)
            await entryAd.closeAlertWindow()

            done()
        })
    })

    // // Exit intent

    // describe('execute scenario of testing exit intent function', () => { //Red
    //     it('should move cursor out of page borders and get alert window', async (done) => {

    //         await driver.get(mainUrl + 'exit_intent')

    //         // Store 'Exit Intent' anchor web element
    //         let link = driver.findElement(By.xpath('//*[@id="content"]/div[1]/h3'))
    //         // Capture offset positions of element
    //         let offset = await link.getRect()
    //         let x = await offset.x;
    //         let y = await offset.y;
    //         const actions = driver.actions({async: true})
    //         // Performs mouse move action onto the element
    //         await actions.move({x:parseInt(-100),y:parseInt(-50)}).pause(3000).perform();
    //         //Error here: MoveTargetOutOfBoundsError: move target out of bounds
    //         //Issue: use robot class?

    //         done()       
    //     })            
    // })

    // //File download

    // // Telling our chrome to never ask while saving files with content-type app./octet-stream
    // // options.setPreferences("browser.helperApps.neverAsk.saveToDist", "application/octet-stream") 
    describe('execute scenario of testing a download function; #download', () => { //Green without expect
        it('should download a file from test page', async (done) => { //Question: parse chrome://downloads data

            await driver.get(mainUrl + 'download')

            await driver.wait(webdriver.until.elementLocated(By.xpath('//*[@id="content"]/div/a[1]')))
            let fileName = await driver.findElement(By.xpath('//*[@id="content"]/div/a[1]')).getText()

            //Click on download link
            await driver.findElement(By.xpath('//*[@id="content"]/div/a[1]')).click()

            // await driver.get('chrome://downloads')
            // // await driver.sleep(2000)
            // await driver.wait(webdriver.until.elementLocated(By.xpath('//*[@id="content"]')), 20000)
            // let downloadFileName = await driver.findElement(By.xpath('/html/body/downloads-manager//div[2]/iron-list/downloads-item[1]//div[2]/div[2]/div[1]/span[1]')).getText()

            //Can't get downloadFileName from 'chrome://downloads (element can't be datected)

            // expect(fileName).toEqual(downloadFileName)

            // await driver.executeScript("window.history.go(-1)")  

            done()
        }, 10000)
    })

    // //File upload

    describe('execute scenario of testing a upload function', () => { //Green
        it('should upload a file to test page', async (done) => {
            const remote = require('selenium-webdriver/remote')

            await driver.setFileDetector(new remote.FileDetector)
            await driver.get(mainUrl + 'upload')

            //Click on download link
            let fileUploadInput = await driver.findElement(By.xpath('//*[@id="file-upload"]'))

            await fileUploadInput.sendKeys("/home/dev/Downloads/wl-op-25s.jpg")

            //Uploading file
            await driver.findElement(By.xpath('//*[@id="file-submit"]')).click()

            //Validate name of uploaded file
            let expectedFileName = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div')).getText()
            let title = await driver.findElement(By.xpath('//*[@id="content"]/div/h3')).getText()
            expect(expectedFileName).toBe('wl-op-25s.jpg')

            //Validate if file is uploaded        
            expect(title).toBe('File Uploaded!')

            done()
        }, 7000)
    })

    // //Floating menu
    // //Scroll by combination: ctrl + end; arrow down; actions.move()

    describe('execute scenario of testing a floating menu', () => { //Green
        it('should scroll down and click on floating menu bar with pageObject', async (done) => {
            floatingMenu = new FloatingMenu(driver)
            const url = locators.floatingMenuUrl

            await driver.get(url)

            let defaultUrl = await floatingMenu.getUrl()
            await floatingMenu.scrollDown()

            await floatingMenu.clickOnHome()
            let homeUrl = await floatingMenu.getCurrentUrl()
            expect(homeUrl).not.toEqual(defaultUrl)

            await floatingMenu.clickOnNews()
            let newsUrl = await floatingMenu.getCurrentUrl()
            expect(newsUrl).not.toEqual(defaultUrl)

            await floatingMenu.clickOnContacts()
            let contactUrl = await floatingMenu.getCurrentUrl()
            expect(contactUrl).not.toEqual(defaultUrl)

            await floatingMenu.clickOnAbout()
            let aboutUrl = await floatingMenu.getCurrentUrl()
            expect(aboutUrl).not.toEqual(defaultUrl)

            done()
        }, 10000)
    }, 10000)


    // //Forgot password

    describe('execute scenario of testing a forgot password input field', () => { //Green
        it('should input into a field an email and click a *retrieve* button', async (done) => {

            await driver.get(mainUrl + 'forgot_password')

            //Input email to input field
            await driver.findElement(By.id('email')).sendKeys('random_email@gmail.com')

            await driver.findElement(By.xpath('//*[@id="form_submit"]/i')).click()

            let expectedText = await driver.findElement(By.xpath('/html/body/h1')).getText()
            expect(expectedText).toEqual('Internal Server Error') //Because of error on the page (app side problems)

            done()
        }, 10000)
    })

    // //Login Page

    describe('execute scenario of testing login & logout functions', () => { //Green
        it('should input a valid username & pass -> check if logged in -> log out -> check if logged out with page object; #auth', async (done) => {
            loginPage = new LoginPage(driver)
            const url = locators.loginPageUrl

            await driver.get(url)

            await loginPage.inputLogin()
            await loginPage.inputPassword()
            await loginPage.clickLogin()
            let loginVerification = await loginPage.verifyIfLogin()
            await driver.sleep(1500)
            expect(loginVerification).toContain('Secure Area')
            await loginPage.logout()
            let logoutVerification = await loginPage.verifyIfLogout()
            expect(logoutVerification).toContain('Login Page')

            done()
        }, 10000)
    }, 15000)

    // //Frames

    describe('execute scenario of testing frames on page', () => { //Green
        it('should check frames on few pages', async (done) => {

            await driver.get(mainUrl + 'frames')

            //Check switching to frames *spoiler* See more at the bottom of doc.
            await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[1]/a')).click()

            await driver.switchTo().frame(1) //bottom
            let bot = await driver.findElement(By.xpath('/html/body')).getText()
            expect(bot).toBe('BOTTOM')

            //Get to the main page
            await driver.executeScript("window.history.go(-1)")

            //Switch to text input check
            await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[2]/a')).click()

            //Swtich to iFrame area with text input *spoiler* see more at the bottom of doc.
            await driver.switchTo().frame(driver.findElement(By.id('mce_0_ifr')))
            await driver.findElement(By.id('tinymce')).sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE)
            await driver.findElement(By.id('tinymce')).sendKeys('Test text')
            let inputedText = await driver.findElement(By.id('tinymce')).getText()
            expect(inputedText).toBe('Test text')

            done()
        }, 10000)
        // it('should check frames on few pages with pageObjects', async (done) => {
        //     frames = new Frames(driver)
        //     const url = locators.framesUrl
        //     const firstUrl = 'https://the-internet.herokuapp.com/nested_frames'

        //     await driver.get(url)

        //     await driver.get(firstUrl)

        //     // await frames.clickFirstLink()

        //     await driver.switchTo().frame(1)

        //     let expectedText = await frames.getBodyText()
        //     expect(expectedText).toContain('BOTTOM')

        //     await frames.backToHomePage()

        //     await frames.goToSecondLink()

        //     await frames.sendKeysToInput()

        //     let validation = await frames.validateInputedText()
        //     expect(validation).toContain('Test Keys')

        //     done()
        // })
    })

    // //Geolocation (Skipped); reason: no need to give geo.data

    // //Horizontal slider

    describe('execute scenario of testing a horizontal slider', () => { //Green 
        it('should slide a slider for generating a diffetent values with page object', async (done) => {
            slider = new Slider(driver)
            const url = locators.sliderUrl

            await driver.get(url)

            let firstInput = await slider.getInputElement()
            await firstInput.sendKeys(Key.ARROW_RIGHT, Key.ARROW_RIGHT, Key.ARROW_RIGHT)

            let firstValue = await slider.getValue()
            expect(firstValue).toBe('1.5')

            let secondInput = await slider.getInputElement()
            await secondInput.sendKeys(Key.ARROW_RIGHT, Key.ARROW_RIGHT, Key.ARROW_RIGHT)

            let secondValue = await slider.getValue()
            expect(secondValue).toBe('3')

            done()
        }, 10000)
    }, 10000)

    // //Hovers

    describe('execute scenario of testing a hover elements', () => { //Green
        it('should place a cursor on each element; information of each element should be displayed with page object', async (done) => {
            hovers = new Hovers(driver)
            const url = locators.hoversUrl

            await driver.get(url)

            await hovers.moveToUser1()
            let firstUserName = await hovers.getUser1Name()
            expect(firstUserName).toContain('name: user1')

            await hovers.moveToUser2()
            let secondUserName = await hovers.getUser2Name()
            expect(secondUserName).toContain('name: user2')

            await hovers.moveToUser3()
            let thirdUserName = await hovers.getUser3Name()
            expect(thirdUserName).toContain('name: user3')

            done()
        }, 10000)
    }, 10000)

    // //Infinite scroll

    describe('execute scenario of testing an infinite scroll', () => { //Green
        it.skip('should scroll a webpage', async (done) => {

            await driver.get(mainUrl + 'infinite_scroll')

            await driver.findElement(By.xpath('/html/body')).sendKeys(Key.SPACE, Key.SPACE)

            await driver.findElement(By.xpath('/html/body')).sendKeys(Key.PAGE_DOWN)

            //0 expects: text - random generated; probably can be an issue - locate changing of page coordinates
            done()
        }, 7000)
    })

    // //Inputs

    describe('execute scenario of testing input number function', () => { //Green
        it('should input a positive number, negative number, +# to number, -# to number with page object', async (done) => {
            //Refactored variant
            inputs = new Inputs(driver)
            const url = locators.inputsUrl

            await driver.get(url)

            let inputString = await driver.findElement(By.xpath(locators.inputsInputString))

            await inputString.sendKeys('10')

            // await driver.findElement(By.xpath('//*[@id="content"]/div/div/div/input')).sendKeys(Key.CONTROL, 'a', '-10') //Value invorrect
            await inputString.sendKeys(Key.CONTROL, 'a')
            await inputString.sendKeys('-10')
            await inputString.sendKeys(Key.CONTROL, 'a')
            await inputString.sendKeys('100')
            await inputString.sendKeys(Key.CONTROL, 'a')
            await inputString.sendKeys('-100')
            await inputString.sendKeys(Key.CONTROL, 'a')
            await inputString.sendKeys('0')
            await inputString.sendKeys(Key.ARROW_UP)

            await inputString.sendKeys(Key.ARROW_DOWN)
            await inputString.sendKeys('asdasd')
            let notValidText = await inputString.getText()
            expect(notValidText).not.toEqual('asdasd')

            done()
        })
    }, 15000)

    // //JQuery UI menu

    describe('execute scenario of testing JQuery UI menu', () => { // Green
        it('should check all menu positions/variables/buttons with page objects', async (done) => {
            jquery = new JqueryUI(driver)
            const url = locators.jqueryUrl

            await driver.get(url)

            await jquery.moveToEnable()
            await driver.sleep(200)
            let enableText = await jquery.getEnableText()
            expect(enableText).toBe('Enabled')

            await jquery.moveToDownloads()
            await driver.sleep(200)
            let downloadsText = await jquery.getDownloadsText()
            expect(downloadsText).toBe('Downloads')

            await jquery.moveToPdf()
            let pdfText = await jquery.getPdfText()
            expect(pdfText).toBe('PDF')

            await jquery.moveToCsv()
            let csvText = await jquery.getCsvText()
            expect(csvText).toBe('CSV')

            await jquery.moveToExcel()
            let excelText = await jquery.getExcelText()
            expect(excelText).toBe('Excel')

            await jquery.backBtnClick()

            done()
        }, 10000)
    }, 10000)

    // //JS alerts

    describe('execute scenatio of testing js alerts', () => {//Green
        it('it should test all js alerts with page Objects', async (done) => {
            alerts = new Alerts(driver)
            const url = locators.alertsUrl

            await driver.get(url)

            await alerts.firstAlertInit()
            let firstValidation = await alerts.verifyResult()
            expect(firstValidation).toBe('You successfully clicked an alert')

            await alerts.secondAlertAccept()
            let secondValidation = await alerts.verifyResult()
            expect(secondValidation).toBe('You clicked: Ok')

            await alerts.secondAlertDismiss()
            let secondValidationDismiss = await alerts.verifyResult()
            expect(secondValidationDismiss).toBe('You clicked: Cancel')

            await alerts.thirdAlertInit()
            let thirdValidation = await alerts.verifyResult()
            expect(thirdValidation).toBe('You entered: Test keys')

            done()
        }, 10000)
    }, 10000)

    // //JS injections - skipped
    // //var №1 - insert into console injection: javascript: alert(document.cookie)

    // //Key presses

    describe('execute scenatio of testing key presses', () => { //Green
        it('should display a last inputed into a string key with page Object', async (done) => {
            keyPresses = new KeyPresses(driver)
            const url = locators.keyPressesUrl

            await driver.get(url)

            await keyPresses.sendQ()
            let firstValidation = await keyPresses.getValue()
            expect(firstValidation).toBe('You entered: Q')

            await keyPresses.sendKeysToBody()
            //No key displayed

            await keyPresses.sendRussianKeys()
            let secondValidation = await keyPresses.getValue()
            expect(secondValidation).toBe('You entered:')

            await keyPresses.sendQ()
            await driver.findElement(By.xpath(locators.keyPressesTarget)).sendKeys(Key.BACK_SPACE)
            let thirdValidation = await keyPresses.getValue()
            expect(thirdValidation).toBe('You entered: BACK_SPACE')

            done()
        })
    })

    // //Large & Deep DOM 

    describe('execute scenario of testing a large DOM', () => { // Green
        it('should render a page on various "deep" and switch between "anchors" with page objects', async (done) => {
            dom = new DomPage(driver)
            const url = locators.domUrl

            await driver.get(url)


            await dom.moveToFirstElement()
            let firstElementName = await dom.getElementText(locators.domElement1)
            expect(firstElementName).toEqual('17.3')

            await dom.moveToSecondElement()
            let secondElementName = await dom.getElementText(locators.domElement2)
            expect(secondElementName).toEqual('30.3')

            await dom.moveToThirdElement()
            let thirdElementName = await dom.getElementText(locators.domElement3)
            expect(thirdElementName).toEqual('50.3')

            await dom.moveToFourthElement()
            let fourthElementName = await dom.getElementText(locators.domElement4)
            expect(fourthElementName).toEqual('38.1')

            await dom.moveToFifthElement()
            let fifthElementName = await dom.getElementText(locators.domElement5)
            expect(fifthElementName).toEqual('50.49')

            done()
        }, 15000)
    }, 15000)

    // //New window

    describe('execute scenario of testing opening a new window', () => {//Green
        it.skip('should open a new window after clicking a link and switch on it ', async (done) => {

            await driver.get(mainUrl + 'windows')
            const originalWindow = await driver.getWindowHandle()
            assert((await driver.getAllWindowHandles()).length === 1)

            await driver.wait(webdriver.until.elementLocated(By.xpath('//*[@id="content"]/div/a')), 10000)

            //Getting anchors
            await driver.findElement(By.xpath('//*[@id="content"]/div/a')).click()

            await driver.get(mainUrl + 'windows/new')
            await driver.wait(webdriver.until.elementLocated(By.xpath('/html/body/div[1]/h3')), 10000)
            let titleCheck = await driver.findElement(By.xpath('/html/body/div[1]/h3')).getText()
            expect(titleCheck).toBe('New Window')

            await driver.get(mainUrl + 'windows')

            //Wait for a new window handle
            await driver.wait(
                async () => (await driver.getAllWindowHandles()).length === 2,
                10000
            )
            //Switch back to original window
            await driver.switchTo().window(originalWindow)
            await driver.wait(webdriver.until.elementsLocated(By.xpath('//*[@id="content"]/div/h3')))
            let mainpageTitle = await driver.findElement(By.xpath('//*[@id="content"]/div/h3')).getText()
            expect(mainpageTitle).toEqual('Opening a new window')

            //Switch to a New window tab
            const windows = await driver.getAllWindowHandles()
            windows.forEach(async handle => {
                if (handle !== originalWindow) {
                    await driver.switchTo().window(handle)
                }
            })
            await driver.close()
            done()
        }, 10000)
    }, 10000)

    // //Nested Frames

    describe('execute scenario of testing nested frames on page', () => { //Green
        it('should check nested frames info on pages', async (done) => {

            await driver.get(mainUrl + 'nested_frames')

            //Bottom
            await driver.wait(webdriver.until.elementLocated(By.xpath('/html/frameset')), 10000)
            await driver.switchTo().frame(1)
            let bottom = await driver.findElement(By.xpath('/html/body')).getText()
            expect(bottom).toBe('BOTTOM')
            await driver.switchTo().defaultContent()


            //Was hard.
            await driver.switchTo().frame(0) //Switch to frameset
            await driver.switchTo().frame(0) //Switch to left frame
            let left = await driver.findElement(By.xpath('/html/body')).getText()
            expect(left).toBe('LEFT')

            await driver.switchTo().defaultContent()
            await driver.switchTo().frame(0) //Switch to frameset
            await driver.switchTo().frame(1) //Switch to middle frame
            let middle = await driver.findElement(By.xpath('/html/body')).getText()
            expect(middle).toBe('MIDDLE')

            await driver.switchTo().defaultContent()
            await driver.switchTo().frame(0) //Switch to frameset
            await driver.switchTo().frame(2) //Switch to right frame
            let right = await driver.findElement(By.xpath('/html/body')).getText()
            expect(right).toBe('RIGHT')

            done()
        }, 10000)
    }, 10000)

    // //Notification message

    describe('execute scenario of testing a notification message generator', () => { //Green
        it('should generate a various notification messages afret clicking on btn', async (done) => {

            await driver.get(mainUrl + 'notification_message_rendered')

            await driver.wait(webdriver.until.elementLocated(By.xpath('//*[@id="content"]/div/p/a')), 10000)

            await driver.findElement(By.xpath('//*[@id="content"]/div/p/a')).click()

            //Get text from flash message
            await driver.wait(webdriver.until.elementLocated(By.id('flash')), 10000)
            let notificationMessageText = await driver.findElement(By.id('flash')).getText()
            //Find element with multiple text variables included into notification -> || analogue
            //If such variable exist -> expect: true; if not: false
            let notificationMessageGeneratedText = await driver.findElement(By.xpath("//*[contains(text(), 'Action successful') or contains(text(), 'Action unsuccesful, please try again')]")).getText()
            expect(notificationMessageText).toBe(notificationMessageGeneratedText)

            done()
        }, 10000)
    })

    // //Redirection

    describe('execute scenario of testing a redirection', () => { //Green with question: parse http status from console, only with selenium/webdriver
        it('should redirect on pages with various statuses with page object', async (done) => {
            redirection = new Redirection(driver)
            const url = locators.redirectionUrl

            await driver.get(url)

            await redirection.moveToMainPage()
            await redirection.checkStatus200()
            let status200Text = await redirection.getStatusBodyText()
            expect(status200Text).toContain('This page returned a 200 status code.')

            await driver.executeScript("window.history.go(-1)")

            await redirection.checkStatus301()
            let status301Text = await redirection.getStatusBodyText()
            expect(status301Text).toContain('This page returned a 301 status code.')

            await driver.executeScript("window.history.go(-1)")

            await redirection.checkStatus404()
            let status404Text = await redirection.getStatusBodyText()
            expect(status404Text).toContain('This page returned a 404 status code.')

            await driver.executeScript("window.history.go(-1)")

            await redirection.checkStatus500()
            let status500Text = await redirection.getStatusBodyText()
            expect(status500Text).toContain('This page returned a 500 status code.')

            done()
        })
    })

    // //Secure downloading

    //Telling our chrome to never ask while saving files with content-type app./octet-stream
    // options.setPreferences("browser.helperApps.neverAsk.saveToDist", "application/octet-stream") 

    describe('execute scenario of testing a secured download function; #auth #download', () => { //Green with questions: alert is not handeled/detected
        it('should sign in like admin user and download a file', async (done) => {

            uname = 'admin'
            pass = 'admin'
            let url = "https://" + uname + ":" + pass + "@" + "the-internet.herokuapp.com/download_secure"
            await driver.get(url)
            expect(url).toEqual('https://admin:admin@the-internet.herokuapp.com/download_secure')

            await driver.wait(webdriver.until.elementLocated(By.xpath('//*[@id="content"]/div/a[1]')), 10000)
            await driver.findElement(By.xpath('//*[@id="content"]/div/a[1]')).click()


            // await driver.findElement(By.name("Username")).sendKeys("admin")

            // await driver.findElement(By.name("Password")).sendKeys("123")

            //Switching to alert
            // await driver.wait(webdriver.until.alertIsPresent())
            // let alert = await driver.switchTo().alert()
            // await alert.sendKeys('admin')
            // await alert.sendKeys(Key.TAB)
            // await alert.sendKeys('admin')


            done()
        }, 10000)
    }, 10000)

    // //Shadow DOM

    describe('execute scenario of testing text in shadow frame', () => {  //Green
        it('should get and check text from shadow frames with page object', async (done) => {
            shadowDom = new ShadowDom(driver)
            const url = locators.shadowDomUrl

            await driver.get(url)

            let spanValidation = await shadowDom.getTextFromSpan()
            expect(spanValidation).toContain('Let\'s have some different text!')

            let firstLiValidation = await shadowDom.getTextFromFirstLi()
            expect(firstLiValidation).toContain('Let\'s have some different text!')

            let secondLiValidation = await shadowDom.getTextFromSecondLi()
            expect(secondLiValidation).toContain('In a list!')


            done()
        }, 15000)
    }, 15000)

    // //Shifting content

    describe('execute scenario of testing a shifting buttons', () => { //Green with questions: parse html data after every page reload
        it('should move coursor on each shifted and unshifted button with page object', async (done) => {
            shifting = new Shifting(driver)
            const url = locators.shiftingUrl

            await driver.get(url)

            await shifting.goToFirstLink()
            await shifting.shiftMenuPixels()

            let releaseMenuTesting = async function () {
                await shifting.checkHome()
                await shifting.checkAbout()
                await shifting.checkContact()
                await shifting.checkPortfolio()
                await shifting.checkGallery()
            }
            await releaseMenuTesting()
            // await shifting.randomizeMenu()

            await driver.get(url)

            await shifting.goToSecondLink()

            let releaseImageTesting = async function () {
                await shifting.randomizeImg()
                await shifting.imgPixelShift()
                await shifting.imgRandomizePixelShift()
            }
            await releaseImageTesting()

            await driver.get(url)


            await shifting.goToThirdLink()
            let sampleBeforeReload = await shifting.getTextSample()
            await driver.navigate().refresh()
            let sampleAfterReload = await shifting.getTextSample()
            expect(sampleBeforeReload).not.toBe(sampleAfterReload)

            done()
        }, 20000)
    }, 15000)

    // //Slow Resources - skipped; reason: (after 30s - 503 error)

    // //Sortable data tables - skipped; reason: nothing to test, pushable buttons with 0 effect

    // //Status codes (duplicate of redirection)

    // //Typos

    describe('execute scenario of testing status codes page', () => { //Green with question: triggering if/else if statements
        it('should get and check text with pageObject', async (done) => {
            typos = new Typos(driver)
            const url = locators.typosUrl

            await driver.get(url)

            let magic = async function () {
                let text = await typos.getTextSample()
                if (
                    text = "Sometimes you'll see a typo, other times you won't."
                ) {
                    console.log('Nothing interested')
                }
                else if (
                    text = "Sometimes you'll see a typo, other times you won,t."
                ) {
                    console.log(`Magic happens with text! ${text}`)
                }
            }
            await magic()
            await driver.navigate().refresh()
            await magic()

            done()
        }, 20000)
    }, 15000)

    // //Editor

    describe('execute scenario of testing text editor', function () {
        it('should input text to editor and edit it with page object', async (done) => {
            editor = new Editor(driver)
            const url = locators.editorUrl

            await driver.get(url)

            await editor.switchToFrame(locators.editorFrameId)
            let textWindow = await editor.findMainElement()
            await textWindow.sendKeys(Key.CONTROL, 'a', Key.BACK_SPACE)
            await textWindow.sendKeys('Test text')
            let testText = await editor.getTextFromWindow()
            expect(testText).toBe('Test text')

            await textWindow.sendKeys(Key.CONTROL, 'a')
            await driver.switchTo().defaultContent()
            await editor.makeBold()
            await editor.alignToCenter()
            await editor.makeItalic()

            done()
        })
    }, 10000)
})