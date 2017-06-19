import { NgxInputBrMasksPage } from './app.po';

describe('ngx-input-br-masks App', () => {
  let page: NgxInputBrMasksPage;

  beforeEach(() => {
    page = new NgxInputBrMasksPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
