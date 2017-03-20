(function(){
  'use strict';

  angular.module('EditProfile', ['UserData'])
         .controller('EditProfileController', ['NewUser', EditProfileController]);

  function EditProfileController(NewUser){
    var self = this;
    self.user = {};
    self.clearFormDetails = clearFormDetails;
    self.validateFormEntry = validateFormEntry;
    // self.getGravatarUrl = getGravatarUrl;

    // This has been moved to the gravatarView.js as a directive
    // the GravatarUrlBuilder module is no longer required here

    // function getGravatarUrl(emailAddress){
    //   return buildGravatarUrl.getGravatarUrl(emailAddress);
    // }

    function clearFormDetails(){
      self.user = {};
      console.log('User profile form has been cleared');
      return true;
    }

    function validateFormEntry(userProfileForm){
      if(userProfileForm.$invalid) return false;
      console.log('form submitted for validation');
      NewUser.createNewUser(self.user);
    }

  }

})();
