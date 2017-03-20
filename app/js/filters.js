(function(){
  'use strict';

  angular.module('durationFilter', [])
         .filter('durations', [callDurationFilter]);

  function callDurationFilter(){
    //This function MUST RETURN another function to be called when the filter is used/called
    return durationByDuration;
  }

  function durationByDuration(timeID){
    //This function MUST RETURN a value that will be applied to the dataset calling it
    var DURATION = [{
      id: 1,
      value: "Half day"
    }, {
      id: 2,
      value: "Full day"
    }, {
      id: 3,
      value: "One and a half days"
    }, {
      id: 4,
      value: "Two days"
    }];
    return DURATION.filter(function(courseTime){
      return courseTime.id === timeID;
    })[0].value;
  }



})();
