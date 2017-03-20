(function(){
  'use strict';
  angular.module('eventsApp', [
          'ngResource',
          'ngRoute',
          'EventsListing',
          'EventDetails',
          'EditEvents',
          'EditProfile',
          'UserData',
          'MyCacheExample',
          'SampleDirective',
          'SampleDirectiveModule',
          'EventThumbnailView',
          'upVoteView',
          'GravatarView',
          'DirectiveWithController',
          'DirectiveWithTransclusion',
          'DatepickerDirective',
          'InputFocusDirective',
          'SubmitOnEnterkeyDirective',
          'ControllerToTestModule',
          'UserDataWithDependencyModule',
          'UserDataDependencyModule',
          'durationFilter'
        ]).config(['$routeProvider', '$locationProvider', config]);

function config($routeProvider, $locationProvider){
  $routeProvider.when('/events', {
    templateUrl: '../templates/EventsList.html',
    controller: 'EventsListingController',
    controllerAs: 'eventsListingCtrl',
    // If pulling data from a server takes too long the user may end up viewing incomplete/hard coded data
    // resolve delays angular from rendering the view until the data has returned, making the page look less weird
    resolve: {
      event: function($route, EventData){
        return EventData.getAllEvents().$promise;
      }
    }
  })
  .when('/event/:eventId', {
    templateUrl: '../templates/EventDetails.html',
    controller: 'EventController',
    controllerAs: 'eventCtrl',
    madeUpInfo: {
      foo: 'bar',
      name: 'ramblings',
      options: {
        something: 'or other',
        blah: 'blah'
      }
    }
  })
  .when('/edit-profile', {
    templateUrl: '../templates/EditProfile.html',
    controller: 'EditProfileController',
    controllerAs: 'editProfileCtrl'
  })
  .when('/new-event', {
    templateUrl: '../templates/NewEvent.html',
    controller: 'EditEventsController',
    controllerAs: 'editEventsCtrl'
  })
  .when('/welcome', {
    template: '<h1>Welcome to the Events booking system</h1>' +
    '<p>We\'re very happy to present to you our Events system' +
    'and hope you have a good experience with out SPA application</p>'
  })
  .when('/sample-directive', {
    templateUrl: '../templates/SampleDirective.html',
    controller: 'SampleDirectiveController'
  })
  .when('/directive-with-controller', {
    templateUrl: '../templates/directives/directiveWithController.html'
  })
  .otherwise({redirectTo: '/events'});

  // this method along with setting the base element in the index.html
  // page will remove the #/ in the URL making the app HTML5 compliant.
  $locationProvider.html5Mode(true);
}

})();
