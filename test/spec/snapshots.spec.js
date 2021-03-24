const Jasmine = require('jasmine')

describe('Example', () => { //Green (Sometimes get diff. Probably because of diff. banners) //Fix: Each time delete previous images (even if website is same)
  beforeEach(() => {
      browser.url('https://webdriver.io');
  });

  it('should save a screen of page example', async () => {
    // Save a screen
    await browser.saveScreen('examplePaged', { /* some options */ });      
  });

  it('should compare a page example', async () => {
    // Check a screen
    expect(await browser.checkScreen('examplePaged', { /* some options */ })).toEqual(0);     
  });

  it('should make a full page screen and save it', async () => {
    // Save a full page screenshot
    await browser.saveFullPageScreen('fullPage', { /* some options */ });
  })

  it('should compare a saved screen of full page', async () => {
    // Check a full page screenshot
    expect(await browser.checkFullPageScreen('fullPage', { /* some options */ })).toEqual(0);
  })
});

//Examples

// Save an element
// await browser.saveElement($('#__docusaurus > nav.navbar.navbar--fixed-top > div.navbar__inner'), 'firstButtonElement', { /* some options */ });

// Check an element
// expect(await browser.checkElement($('#__docusaurus > nav.navbar.navbar--fixed-top > div.navbar__inner'), 'firstButtonElement', { /* some options */ })).toEqual(0);

// Save a full page screenshot with all tab executions
// await browser.saveTabbablePage('save-tabbable', { /* some options, use the same options as for saveFullPageScreen */ });

// Check a full page screenshot with all tab executions
// expect(await browser.checkTabbablePage('check-tabbable', { /* some options, use the same options as for checkFullPageScreen */ })).toEqual(0);
