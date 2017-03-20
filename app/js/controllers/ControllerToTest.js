(function(){
  'use strict';

  angular.module('ControllerToTestModule', [])
         .controller('ControllerToTest', ['$scope', ControllerToTestFn]);

  function ControllerToTestFn($scope){
    $scope.name = 'John Smith';
    $scope.message = function(){
      return 'Hello world';
    };

  }

})();
