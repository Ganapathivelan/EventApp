(function(){
  'use strict';

  angular.module('EditEvents', ['EventDataFactory'])
         .controller('EditEventsController', ['EventData', EditEventsController]);

  function EditEventsController(EventData){
    var self = this;
    self.validateEventInfo = validateEventInfo;
    self.cancelEdit = cancelEdit;

    function validateEventInfo(eventObj, form){
      return (form.$valid) ? saveEventInfo(eventObj) : formIncomplete;
      //form refers to the name of the form on the 'name' attribute. Angular return an
      // object containing the $invalid and $valid property. These properties
      // change depending on the whether the HTML5 required attribute is present
      // for the input field in question
    }

    function saveEventInfo(newEvent){
      return EventData.saveEvent(newEvent);
    }

    function formIncomplete(){
      console.log("Please complete all required form fields.");
      return false;
    }

    function cancelEdit(newEventRequestForm){
      console.log(newEventRequestForm);
      self.event = {};
      window.location = "EventDetails.html";
    }

  }

})();
