import {ITersUiPage} from "./app.po";

describe('iters-ui App', function () {
  let page: ITersUiPage;

  beforeEach(() => {
    page = new ITersUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
