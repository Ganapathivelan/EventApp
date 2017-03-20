(function(){
  'use strict';

  angular.module('CacheSampleFactory', [])
         .factory('CacheFactoryExample', ['$cacheFactory', CacheFactoryExampleFn]);

  function CacheFactoryExampleFn($cacheFactory){
    return $cacheFactory('myCache', { capacity: 3 });
  }

})();
