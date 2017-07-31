import { NewproPage } from './app.po';

describe('newpro App', () => {
  let page: NewproPage;

  beforeEach(() => {
    page = new NewproPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
