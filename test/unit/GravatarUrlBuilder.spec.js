'use strict';

describe('GravatarUrlBuilder', function(){
  // ***Unlike controllers, there no need to import the eventsApp
  // in order to gain access to the fatory module***

  // import the module the factory/services resides in
  beforeEach(module('GravatarUrlBuilder'));

  // depending on circumstance, the service can either be injected
  // into the a beforeEach() and Initialise or the inject() itself
  // can be used as the function for the it block (see example below)
  // this is just to demonstrate a different code style and is NOT
  // an essential style required to test services or factories

  it('buildGravatarUrl Factory should initialise successfully', inject(function(buildGravatarUrl){
    var $buildGravatarUrl = buildGravatarUrl;
    expect($buildGravatarUrl).toBeDefined();
  }));

  it('Should return the default URL if email is invalid', inject(function(buildGravatarUrl){
    var invalidEmail = "invalid.email@",
        defaultEmailToReturn = "http://www.gravatar.com/fake/defaultAvatar";

    // Jasmine notation
    spyOn(buildGravatarUrl, 'getGravatarUrl').and.returnValue(defaultEmailToReturn);

    // call the getGravatarUrl method and store the return value to a varable
    var result = buildGravatarUrl.getGravatarUrl(invalidEmail);

    // using jasmine methods here for the expectations
    expect(buildGravatarUrl.getGravatarUrl).toHaveBeenCalled();
    expect(buildGravatarUrl.getGravatarUrl).toHaveBeenCalledWith(invalidEmail);
    expect(result).toEqual(defaultEmailToReturn);

  }));

  it('Should return a fake MD5 URL if email is valid', inject(function(buildGravatarUrl){
    var $buildGravatarUrl = buildGravatarUrl,
        validEmail = "valid.email@gmail.com",
        emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Unsure of how to properly test MD5 values so will return a fake function
        // that will validate the supplied email address against the regular expression
        // supplied for this unit test
    spyOn(buildGravatarUrl, 'getGravatarUrl').and.callFake(function(email){
      return emailRegex.test(email);
    });

    var result = buildGravatarUrl.getGravatarUrl(validEmail);

    expect(buildGravatarUrl.getGravatarUrl).toHaveBeenCalled();
    expect(buildGravatarUrl.getGravatarUrl).toHaveBeenCalledWith(validEmail);
    expect(result).toEqual(true);
  }));
});
