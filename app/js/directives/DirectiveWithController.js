(function(){
  'use strict';

  angular.module('DirectiveWithController', [])
         .directive('greetings', [greetingFn])
         .directive('french', [FrenchGreeting])
         .directive('spanish', [SpanishGreeting]);

// return values for the directive
  function greetingFn(){
    var view = {
      restrict: 'E',
      replace: true,
      priority: 1,
      template: '<button class=\'btn\' ng-click=\'$vm.sayHello();\'>' +
      'Say Hello</button>',
      controller: GreetingController,
      controllerAs: '$vm'
    };

    return view;

    function GreetingController(){
      var self = this, _langs = ['Hello'];
      self.$onInit = init;
      self.sayHello = sayHello;
      self.addGreeting = addGreeting;

      function init(){
        console.log('Run initialisation logic for directive here');
      }

      function sayHello(){
        console.log(_langs.join(', '));
      }

      function addGreeting(greeting){
        _langs.push(greeting);
      }

    }

  }

  // Borrowing controllers using the require property
  // Using the priority property controls the order of execution
  // for each directive regardless of the order they appear in the HTML
  // priority 1 is the highest order
  function FrenchGreeting(){
    var view = {
      restrict: 'A',
      // require allows other directives to borrow/use another controller and their available methods
      // simply by referring to the name of the directive the controller lives on
      // NB: this works provided that the directives borrowing the controller are on the same HTML element
      // <greeting french spanish />
      require: 'greetings',
      priority: 1,
      link: link
    };
    return view;

    // to use the methods on the borrowed controller, use the link method at initialisation
    // and invoke the controller methods via the controller parameter
    function link(scope, elem, attrs, controller){
      controller.addGreeting('Bonjour');
    }
  }

  function SpanishGreeting(){
    var view = {
      restrict: 'A',
      require: 'greetings',
      priority: 2,
      link: link
    };
    return view;

    function link(scope, elem, attrs, controller){
      controller.addGreeting('Hola');
    }
  }

})();
