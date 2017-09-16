import { LightWizardPage } from './app.po';

describe('light-wizard App', () => {
  let page: LightWizardPage;

  beforeEach(() => {
    page = new LightWizardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
