(function(){
  'use strict';

  angular.module('MyCacheExample', ['CacheSampleFactory'])
         .controller('MyCacheExampleController', ['CacheFactoryExample', CacheFactoryControllerFn]);

  function CacheFactoryControllerFn(CacheFactoryExample){
    var self = this;
    self.myCacheExampleCtrl = addToCache;
    self.readFromCache = readFromCache;
    self.getCacheStats = getCacheStats;

    function addToCache(key, val){
      CacheFactoryExample.put(key, val);
    }

    function readFromCache(key){
      return CacheFactoryExample.get(key);
    }

    function getCacheStats(){
      return CacheFactoryExample.info();
    }
  }

})();
