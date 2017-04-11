describe('Events page', function(){
  // ensure that the following are running, #1: webdriver manager - webdriver-manager start,
  // and the web application. Then run protractor in another terminal to begin end-2-end testing
  // protractor path/to/protractor.conf.js file

  beforeEach(function(){
    // tell protractor which URL to navigate to before
    // each spec is run. Again, ensure that the web application
    // is running otherwise this will not work
    browser.get('http://localhost:4001/events');
  });

  it('Should verify the URL as \'http://localhost:4001/events\'', function(){
    expect(browser.getCurrentUrl()).toBe('http://localhost:4001/events');
  });

  it('Should list four events on the events page', function(){
    var events = element.all(by.repeater('event in eventsListingCtrl.events'));
    expect(events.count()).toBe(4);
  });

  it('Should have \'Code Camp\' as the second event on the events page', function(){
    var CodeRetreatEvent = element(by.repeater('event in eventsListingCtrl.events')
                           .row(2).column('event.name'));
    expect(CodeRetreatEvent.getText()).toBe('Code Retreat');
  });
});
