(function(){
  'use strict';

  angular.module('UserDataWithDependencyModule', ['UserDataDependencyModule'])
         .factory('UserDataWithDependencyFactory', ['UserDataDependencyFactory', UserDataWithDependencyFactoryFn]);

  function UserDataWithDependencyFactoryFn(UserDataDependency){
    return {
      getUser : function(userName, callback) {
        return UserDataDependency.get({ userName : userName },
               function (user) {
                 if (callback) callback(user);
                });
        },

        save:function(user) {
          UserDataDependency.save(user);
        },

        users:function () {
          return UserDataDependency.queryAll(function(users) {
            return users;
          });
        }
      };
  }

})();
