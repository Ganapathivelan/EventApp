'use strict';
describe('Event Details page 1', function(){
  var URL = 'http://localhost:4001/event/1',
      courseDifficulty, orderBySelectEl, eventSessions;

  // as testing is focussed on http://localhost:4001/event/1
  // we fixate the URL inside a beforeAll function to ensure
  // that this value remains consistent before any it() block
  // is run
  beforeAll(function(){
    browser.get(URL);
  });

  beforeEach(function(){
    courseDifficulty = element(by.model('eventCtrl.difficulty.level'));
    orderBySelectEl = element(by.model('eventCtrl.sortOrder'));
    eventSessions = element.all(by.repeater('session in eventCtrl.event.sessions'));
  });

  afterEach(function(){
    // reset the click events to their default states to make sure
    // that their new clicked states don't interfere with the future
    // unit tests here

    orderBySelectEl.$('[value="+name"]').click();
    courseDifficulty.$('[value=""]').click();
  });

  it('Should navigate to http://localhost:4001/event/1', function(){
    expect(browser.getCurrentUrl()).toBe(URL);
  });

  it('Should display a maximum of two classes for the Angular Boot Camp course when \'Order by:\' is set to \'Name\' and \'Level:\' set to \'All\' by default', function(){
    expect(eventSessions.count()).toBe(2);
  });

  it('Should display \'Angular Boot Camp\' in uppercase letters', function(){
    var eventName = element(by.binding('eventCtrl.event.name'));
    expect(eventName.getText()).toBe('ANGULAR BOOT CAMP');
  });

  it('Should set new value to \'Creator\' when the Creator option is selected from the Order by: drop down menu', function(){
    // to trigger a click event to change the value within a drop down menu for example,
    // reference the new value to be clicked, then fire the click() method to
    orderBySelectEl.$('[value="+creatorName"]').click();
    expect(orderBySelectEl.$('[value="+creatorName"]').isSelected()).toEqual(true);
  });

  it('Should show one session, John Doe\'s \'Scopes for fun and profit session \' when Level: \'Beginner\' is selected from the drop down menu', function(){
    courseDifficulty.$('[value="Introductory"]').click();
    expect(courseDifficulty.$('[value="Introductory"]').isSelected()).toEqual(true);
    expect(eventSessions.count()).toEqual(1);

    eventSessions.then(function(arr){
      // although the binding for the session-card's attribute session-title
      // is {{ session.name }} on the EventDetails.html page, the real binding
      // is can be found inside the template property of session-card directive
      // (collapsibleDirectiveWithTransclusion.html ) as {{ title }}. Using this
      // binding will return the session title as expected
      expect(arr[0].element(by.binding('title')).getText()).toBe('Scopes for fun and profit');
      expect(arr[0].element(by.binding('session.creatorName')).getText()).toBe('John Doe');
    });

  });

  it('Should increment vote count by \'1\' when the up vote count button is clicked', function(){
    // first get the elements which are divs containing the CSS class 'votingButton'
    // as the UpVote directive is inside a repeater, there will be a collection of
    // divs containing this particular class
    var firstUpVoteCountBtn = element.all(by.deepCss('div.votingButton'));

    // next get the first div containing the votingButton class by using the first() method
    // and and trigger the click event to increment the vote to string value '1'
    firstUpVoteCountBtn.first().click();

    // find the binding responsible for display the number of votes {{ totalVotes }}
    // and select the first element respectively from the collection using the first()
    // method
    var firstUpVoteTotalVoteCounts = element.all(by.binding('totalVotes')).first();

    // write out expectations as normal
    expect(firstUpVoteTotalVoteCounts.getText()).toBe('1');
  });

  it('Should decrement vote count by 1 to 0 when the down vote count button is clicked', function(){
    // remember, this returns ALL divs with class containing votingButton. In this case, this includes
    // both up vote AND down vote divs
    var firstDownVoteCountBtn = element.all(by.css('div.votingButton'));

    // the first downVote button will be at position 1, so get the element from the collection
    // at position 1
    firstDownVoteCountBtn.get(1).click();

    var firstDownVoteTotalVoteCounts = element.all(by.binding('totalVotes')).get(1);

    // write out expectations as normal. Note, that as the upVote from the previous unit testing
    // was never reset, the value for the totalVotes binding is set to 1 hence, why the
    // totalVotes value for this unit test is 0 rather than -1.

    // If value need to be reset, perform such resetin the afterEach() method
    expect(firstDownVoteTotalVoteCounts.getText()).toBe('0');
  });

});
