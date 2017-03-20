(function(){
  'use strict';

  angular.module('DatepickerDirective', [])
         .directive('datePicker', [DatePickerFn]);

  function DatePickerFn(){
    var view = {
      restrict:'E',
      replace: true,
      templateUrl: '../templates/directives/Datepicker.html',
      link: link,
      scope: {
        id: '@',
        model: '='
      }
    };

    return view;

    // link property is a function is called anytime the directive in initialised
    // compile property is a function that is called to manipulate the DOM
    function link(scope, elem, attrs, ctrl){
      elem.datepicker();
    }
  }

})();
