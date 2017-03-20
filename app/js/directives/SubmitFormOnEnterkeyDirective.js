(function(){
  'use strict';
  angular.module('SubmitOnEnterkeyDirective', [])
         .directive('onEnterkeyPress', [OnEnterKeyPressedFn]);

  function OnEnterKeyPressedFn(){
    var view = {
      restrict: 'A',
      link: linkFn
    };

    function linkFn(scope, element, attribute, controller){
      // only works if cursor is inside a text field
      element.bind("keypress", function(e) {
        if(e.keyCode === 13) {
          scope.$apply(function(){
            scope.$eval(attribute.onEnterkeyPress, {'e': e});
          });
          e.preventDefault();
        }
      });
    }

    return view;
  }

})();
