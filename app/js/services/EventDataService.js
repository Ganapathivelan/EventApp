(function(){
  'use strict';

  angular.module('EventDataFactory', ['ngResource'])
         .factory('EventData', ['$resource', GetEventDataFactory]);


  function GetEventDataFactory($resource){
    var factory = {}, _event = null,
        eventDetailsResourceUrl = $resource('/data/event/:id', {id: '@id'}),
        getAllEventsResource = $resource('/data/event');

    factory.getData = getData;
    factory.saveEvent = getEntryCount;
    factory.getAllEvents = getAllEvents;
    return factory;

    function getAllEvents(){
      // $resource.query() expects an Array object to be returned
      return getAllEventsResource.query();
    }

    function getData(event_id){
      // $resource.get() expects an Object to be returned
      return eventDetailsResourceUrl.get({id : event_id});
    }

    function getEntryCount(newEvent){
      _event = newEvent;
      return getAllEventsResource.query().$promise.then(_saveEvent).catch(_onError);
    }

    function _saveEvent(response){
      _event.id = response[1].metadata.totalFileCount += 1;
      return eventDetailsResourceUrl.save(_event).$promise.then(_resetEvent);
    }

    function _onError(error){
      console.log('Unable to get to the server '+ error);
    }

    function _resetEvent(response){
      _event = null;
    }
  }


})();
