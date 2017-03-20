'use strict';

describe('EventsListingController', function(){
  // variables to be passed to each it function
  var ctrl, scope, mockEventData, returnMockEvent, route, q;

  beforeEach(function(){
    // first we load the angular app by its name
    module('eventsApp');
    mockEventData = sinon.stub({ getAllEvents: function(){} });
    // the returnMockEvent is the fake data that will be returned
    // from the promise and assigned to the EventsListingController's
    // self.events property upon success of the promise
    returnMockEvent = [{
      events: [{
        'id': 1, 'event': 'Fake Event One'
      }, {
        'id': 2, 'event': 'Fake Event One'
      }]
    }];
  });

  // Step #2: inject the controller and ALL its required dependencies for the
  // EventListController to function
  beforeEach(inject(function($controller, $rootScope, $q){
    ctrl = $controller, q = $q,
    scope = $rootScope.$new(),
    route = {
      current: {
        locals: {
          event: {}
        }
      }
    };
  }));

  // Step #3: Start testing your controllers
  it('EventsListingController to be defined', function(){
    // Re-create the promise called on the $route object
    // the deferred.resolve method is invoked to return the pre defined
    // fake data to the promise on success. Respectively deferred.reject(reason)
    // can be invoked the same way to force a promise to fail
    var deferred = q.defer(),
    promise = deferred.promise;
    deferred.resolve(returnMockEvent);

    // we stub the EventData service to enable manipulation of the
    // return value under differing circumstances
    mockEventData.getAllEvents.returns(promise);

    // Re-create the $route object, passing the stubbed EventData
    // to the EventsList controller to call
    route.current.locals.event.$promise = mockEventData.getAllEvents();

    // Initialise an instance of the EventsListingController controller
    // passing in the pre defined variables set above. Although scope is
    // not injected into the EventsListingController, it's a dependency of
    // using angular mock's $q (promises) as scope.$apply() assigns the promises
    // to the controller
    var EventsListingController = ctrl('EventsListingController', {
      '$route': route,
      '$scope': scope
    });
    // Applies the output of the promise to the controller's scope
    // This enables us to perform the required expectations/assertions
    // If this isn't called, the outcome of the promise returned will
    // not be applied to the controller's scope
    scope.$apply();

    // write expectations here
    expect(EventsListingController).toBeDefined();
  });

  it('EventsListingController should resolve promise on success', function(){
    var deferred = q.defer(),
    promise = deferred.promise;
    deferred.resolve(returnMockEvent);

    mockEventData.getAllEvents.returns(promise);
    route.current.locals.event.$promise = mockEventData.getAllEvents();

    var EventsListingController = ctrl('EventsListingController', {
      '$route': route,
      '$scope': scope
    });

    scope.$apply();

    expect(EventsListingController.events).toBeDefined();
    expect(returnMockEvent[0].events).toEqual(EventsListingController.events);
  });

  it('EventsListingController should reject promise on faliure', function(){
    var reason = "Unable to get events",
        deferred = q.defer(),
        promise = deferred.promise;

    deferred.reject(reason);

    mockEventData.getAllEvents.returns(promise);
    route.current.locals.event.$promise = mockEventData.getAllEvents();

    var EventsListingController = ctrl('EventsListingController', {
      '$route': route,
      '$scope': scope
    });

    scope.$apply();

    expect(EventsListingController.events).toEqual([]);
    expect(EventsListingController.error).toEqual(reason);
  });

});
