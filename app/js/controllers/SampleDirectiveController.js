(function(){
  'use strict';

  angular.module('SampleDirectiveModule', [])
         .controller('SampleDirectiveController', [SampleDirectiveControllerFn]);

  function SampleDirectiveControllerFn(){
    var self = this;
    console.log('Hello from SampleDirectiveController');
  }

})();
