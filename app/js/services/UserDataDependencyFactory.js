(function(){
  'use strict';

  angular.module('UserDataDependencyModule', ['ngResource'])
         .factory('UserDataDependencyFactory', ['$resource', UserDataDependencyFactoryFn]);

  function UserDataDependencyFactoryFn($resource){
    var factory = $resource('/data/users/:userName', { userName:'@userName' }, { });

    factory.queryAll = function (userObj, callback) {
      return factory.query(userObj, callback);
    };

    return factory;
  }

})();
