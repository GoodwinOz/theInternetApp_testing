//Here will be defined all element selectors
let basicAuthUserName = 'admin'
let basicAuthPassword = 'admin'
let mainUrl = 'https://the-internet.herokuapp.com/'
module.exports = {
    //basic Auth
    loginTextSelector: '//*[@id="content"]/div/p',
    loginTextCss: '#content > div > p',
    homePageUrl: 'https://the-internet.herokuapp.com/',
    basicAuthUrl: "https://" + basicAuthUserName + ":" + basicAuthPassword + "@" + "the-internet.herokuapp.com/basic_auth",
    expectedLoginText: 'Congratulations! You must have the proper credentials.',
    //Challenging DOM
    challengingDomWaitBeforeActions: '//*[@id="content"]/div/div/div/div[1]',
    challengingDomRegularExpression: "//*[contains(text(),'foo') or contains(text(),'bar') or contains(text(),'baz') or contains(text(),'qux')]",
    challengingDomUrl: mainUrl + 'challenging_dom',
    //Checkboxes
    checkboxUrl: mainUrl + 'checkboxes',
    firstCheckbox: '//*[@id="checkboxes"]/input[1]',
    secondCheckbox: '//*[@id="checkboxes"]/input[2]',
    //Disppearing elements
    disappearinElemUrl: mainUrl + 'disappearing_elements',
    disappearinElemHome: '//*[@id="content"]/div/ul/li[1]/a',
    disappearinElemAbout: '//*[@id="content"]/div/ul/li[2]/a',
    disappearinElemContactUs: '//*[@id="content"]/div/ul/li[3]/a',
    disappearinElemPortfolio: '//*[@id="content"]/div/ul/li[4]/a',
    //Dropdown menu
    dropdownUrl: mainUrl + 'dropdown',
    dropdownId: 'dropdown',
    option1css: '#dropdown>option[value=\'1\']',
    option2css: '#dropdown>option[value=\'2\']',
    //Dynamic Content
    dynamicContentUrl: mainUrl + 'dynamic_content?with_content=static',
    textReference: '//*[@id="content"]/div[3]/div[2]',
    refreshButton: '//*[@id="content"]/div/p[2]/a',
    //Dynamic elements
    dynamicElementsUrl: mainUrl + 'dynamic_controls',
    dynamicElementsCheckbox: 'input[type=\'checkbox\']',
    dynamicElementsRemoveCheckbox: '//*[@id="checkbox-example"]/button',
    dynamicElementsGoneMsg: '//*[@id="message"]',
    dynamicElementsInputBtn: '/html/body/div[2]/div/div[1]/form[2]/button',
    dynamicElementsEnableMsg: '/html/body/div[2]/div/div[1]/form[2]/p',
    dynamicElementsInputField: '//*[@id="input-example"]/input',
        
}