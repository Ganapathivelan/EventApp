(function(){
  'use strict';

  angular.module('GravatarView', ['GravatarUrlBuilder'])
         .directive('gravatar', ['buildGravatarUrl', gravatarFn]);

    function gravatarFn(buildGravatarUrl){
      // the replace property crucial and is used here as we require access to the
      // 'src' attribute on the img tag. If not set to true, we'd be
      // asking for the src attribute of the <gravatar> component which it
      // doesn't have nor does it have the natural capabilities of the <img /> tag
      var view = {
        restrict: 'E',
        template:'<img />',
        replace: true,
        link: generateGravtarImg
      };

      return view;

      function generateGravtarImg(scope, el, attrs, controller){
        // attrs (attributes) refers to the attributes on the component

        // dummy gravatar email to test with: angularjsdemo@gmail.com
        attrs.$observe('emailUrl', function(newEmail, oldEmail){
          if(newEmail !== oldEmail) {
            attrs.$set('src', buildGravatarUrl.getGravatarUrl(newEmail));
          }
        });
      }
    }

})();
