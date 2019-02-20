import { browser, logging, by, element } from 'protractor';

// The REAL backend service must be running for the e2e test to work..
describe('workspace-project App', () => {
  // beforeEach(() => {

  // });

  it('should display title on top of page', () => {
    browser.get('/');
    expect(element(by.css('.mat-toolbar')).getText()).toContain('Homes App');
  });

  it('should login by clicking login-button and check loaded content', async () => {

    await element(by.id('home-component-login')).click();

    const findLoadedText = await element(by.css('.mat-card-content'));

    expect(findLoadedText.getText()).toContain('Vardagsrum');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
