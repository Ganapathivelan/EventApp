(function(){
  'use strict';

  angular.module('DirectiveWithTransclusion', [])
         .directive('sessionCard', [CollapsibleFn]);

  // transclusion superimposes child HTML elements contained within a directive
  // to use transclusion ensure that the transclude property is set to true and
  // that ng-transclude is used within the template/templateUrl
  function CollapsibleFn(){
    var view = {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div class=\'well span9\'>'+
      '<h4 class=\'well-title\' ng-click=\'$selfie.toggleVisibility();\'>{{ title }}</h4>'+
      '<div ng-transclude ng-show=\'$selfie.visibility\'></div>'
      +'</div>',
      scope: {
        title: '@sessionTitle'
      },
      controller: CollapsibleController,
      controllerAs: '$selfie'
    };

    return view;

    function CollapsibleController(){
      var self = this;
      self.visibility = true;
      self.toggleVisibility = toggleVisibility;

      function toggleVisibility(){
        self.visibility = !self.visibility;
      }
    }


  }

})();
