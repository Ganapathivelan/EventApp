(function (){
  'use strict';

  angular.module('InputFocusDirective', [])
         .directive('focusInputField', [FocusInputFieldFn]);

  function FocusInputFieldFn(){
    var view = {
      restrict: 'A',
      link: link
    };

    return view;

    function link(scope, element, attribute, controller){
      element.on('focus', function(evt){
        element.css({
          backgroundColor: '#b9f6ca',
          borderColor: '#ff3d00'
        });
      });

      element.on('blur', function(evt){
        element.css({
          backgroundColor: '',
          borderColor: ''
        });
      });
    }
  }

})();
