(function(){
  'use strict';

  angular.module('EventsListing', [])
         .controller('EventsListingController', ['$route', EventsListingControllerFn]);

  function EventsListingControllerFn($route){
    var self = this;
    self.sortOrder = "+name";

    init();

    function init(){
      // EventData.getAllEvents().$promise.then(_onAllEventsReceived).catch(_onFailureToGetAllEvents);

      // Con't from the $route and resolve object in app.js, the resolve object returns a promise with the data
      // in tow
      $route.current.locals.event.$promise.then(_onAllEventsReceived).catch(_onFailureToGetAllEvents);
    }

    function _onAllEventsReceived(response){
      self.events = response[0].events;
    }

    function _onFailureToGetAllEvents(error){
      console.log(error);
      self.events = [];
      self.error = error;
    }

  }
})();
