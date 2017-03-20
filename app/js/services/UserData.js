(function(){
  'use strict';

  angular.module('UserData', ['ngResource'])
         .factory('NewUser', ['$resource', NewUserFactoryFn]);

  function NewUserFactoryFn($resource){
    var factory = {},
        newUserResourceUrl = $resource('data/users/:username', {username: '@userName'});
        // the @ symbol represents a property within the object passed that will be used as the parameter
        // Thus make sure that the property name exists and is identical to the value assigned to the @ symbol

    factory.createNewUser = createNewUser;
    function createNewUser(newUser){
      console.log(newUser);
      console.log('Hi from the service layer');
      return newUserResourceUrl.save(newUser).$promise
                        .then(_onNewUserSaved).catch(_onFailedUserSaved);
    }

    function _onNewUserSaved(response){
      console.log('New user saved: ' + response);
    }

    function _onFailedUserSaved(response){
      console.log('Failed to save new user:');
      console.log(response);
    }

    return factory;


  }

})();
