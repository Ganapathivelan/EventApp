'use-strict';
describe('event-thumbnail directive unit test', function(){
  var elem, eventDetails;

  beforeEach(module('EventThumbnailView'));

  // import the relevant html used by the directive. If configured
  // correctly in Karma, copying the exact sting value from the
  // templateUrl of the directive into the spec should suffice
  beforeEach(module('templates/directives/EventThumbnail.html'));
  beforeEach(inject(function($rootScope, $compile){
    var scope = $rootScope.$new();
    // when unit testing, ALL data required to drive the directive's
    // view needs be created and placed into a test scope
    scope.event = {
      id: 11,
      name: 'Angular 2 Is Awesome',
      date: '27/09/2017',
      time: '09:30',
      location: {
        address: '24 Maddison Square Gardens',
        city: 'San Francisco',
        province: 'CA'
      }
    };
    //assign the directive to a local variable. At this point, the value
    // passed to angular.element is a string wrapped in JQuery/JQLite
    elem = angular.element('<event-thumbnail event-obj=\'event\' />');

    // the $compile method builds the directive component into HTML
    // the second $compile call assigns the test scope values to it
    $compile(elem)(scope);

    // to apply the values of the test scope to the rendered directive will requires
    // $digest cycle to run
    scope.$digest();

    // extract span elements containing event data
    eventDetails = elem.find('span').text();
  }));

  it('Should successfully bulid the <event-thumbnail> directive', function(){
    expect(elem).not.toBeUndefined();
  });

  // test to decipher if the test scope rendered to the directive has been applied
  // successfully
  it('Anchor tag href value should contain event id of 11', function(){
    var href = elem.find('a').attr('href');
    expect(href).toContain(11);
  });

  it('Event name should appears as \'Angular 2 Is Awesome\'', function(){
    var eventName = elem.find('a').text();
    expect(eventName).toEqual('Angular 2 Is Awesome');
  });

  it('Event date should appears as \'27/09/2017\'', function(){
    expect(eventDetails).toContain('27/09/2017');
  });
  it('Event time should appears as \'09:30\'', function(){
    expect(eventDetails).toContain('09:30');
  });
  it('Event location address should appears as \'24 Maddison Square Gardens\'', function(){
    expect(eventDetails).toContain('24 Maddison Square Gardens');
  });
  it('Event location city should appears as \'San Francisco\'', function(){
    expect(eventDetails).toContain('San Francisco');
  });
  it('Event location province should appears as \'CA\'', function(){
    expect(eventDetails).toContain('CA');
  });
});
