(function(){
  'use strict';

  angular.module('EventDetails', ['EventDataFactory'])
         .controller('EventController', ['$log', '$routeParams', '$route', 'EventData', EventController]);
  function EventController($log, $routeParams, $route, EventData){
    var self = this;
    self.upVoteCount = upVoteCount;
    self.downVoteCount = downVoteCount;
    self.myStyle = { color: '#C00' };
    self.warningCSS = "tango-orange";
    self.sortOrder = "+name";
    self.fireReload = fireReload;

    //$resource allows for direct binding to the returned data over a RESTful architecture
    //Alternatively it also has a $promise.then() method which takes in a success and error function
    self.event = EventData.getData($routeParams.eventId).$promise.then(onLoadSuccess).catch(onLoadError);

    function upVoteCount(session){
      session.upVoteCount++;
    }

    function downVoteCount(session){
      session.upVoteCount--;
    }

    function onLoadSuccess(response){
      self.event =  response;
    }

    function onLoadError(response){
      $log.log('failure to retrieve data from server - ' + response.statusText);
      $log.log(response);
      return false;
    }

    // using the $route to output custom data from $routeProvider.when block
    // into the respective controller
    console.log(
      $route.current.madeUpInfo.foo,
      $route.current.madeUpInfo.name,
      $route.current.madeUpInfo.options.blah
    );

    // To use $route to access parameters from the URL I.E.
    // localhost:4001/event/1?fname=Jane&lname=Doe&age=21
    console.log(
      $route.current.params.fname,
      $route.current.params.lname,
      $route.current.params.age
    );//returns Jane, Doe, 21

    function fireReload(){
      console.log('Reload fired');
      $route.reload();//resets any filters set on the page back to their original settings
    }
  }

})();
