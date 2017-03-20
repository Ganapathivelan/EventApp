(function(){
  'use strict';

  angular.module('EventThumbnailView', [])
         .directive('eventThumbnail', [eventThumbnailFn]);

  function eventThumbnailFn(){
    var directive = {
      templateUrl: '../templates/directives/EventThumbnail.html',
      restrict: 'E',
      replace: true,
      scope: {
        // ***NOTE: Camel cased attributes are normalised when the component is used in HTML***
        // I.E. eventObj becomes the event-obj attribute for the event-thumbnail on the HTML
        // BUT points/refers to event property within the directive js file
        // event: '=eventObj'
        event: '=eventObj'
      }
    };

    return directive;
  }

})();
