(function(){
  'use strict';

  angular.module('SampleDirective', [])
         .directive('sampleDirectiveView', ['$compile', SampleDirectiveViewFn]);

  function SampleDirectiveViewFn($compile){
    var view = {
      restrict: 'E',
      link: link,
      template: '<input type=\'text\' ng-model=\'sampleData\' />' +
      '<br /> <p><strong>Output:</strong> {{ sampleData }} </p>'
    };

    return view;

    function link(scope, el, attrs, ctrl){
      console.log('Hello from the link function');

      // If the template property wasn't available the code below equally works

      /*var markup = '<input type=\'text\' ng-model=\'sampleData\' />' +
      '<br /> <p><strong>Output:</strong> {{ sampleData }} </p>';
      angular.element(el).append($compile(markup)(scope));*/
    }

  }

})();
