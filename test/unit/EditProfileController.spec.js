'use strict';
describe('EditProfileController', function(){
  // global variables for each it block declared here
  var ctrl, EditProfileController, scope, mockNewUserFactory;

  beforeEach(function(){
    module('eventsApp');
    mockNewUserFactory = sinon.stub({createNewUser: function(){} });
  })

  beforeEach(inject(function($controller, $rootScope){
    ctrl = $controller, scope = $rootScope.$new();

    EditProfileController = ctrl('EditProfileController', {
      NewUser: mockNewUserFactory
    });
  }))

  it('EditProfileController should initialise successfully', function(){
    expect(EditProfileController).toBeDefined();
  });

  it('clearFormDetails should return an empty user object', function(){
    // spy on the clearFormDetails method
    var spyOnClearFormDetailsFunc = sinon.spy(EditProfileController, 'clearFormDetails');

    // populate the user property with a fake user
    var fakeUser = {
      "userName": "JanetJacks",
      "password": "JJRocks123",
      "name": "Janet Jackson",
      "emailAddress": "JSquared@gmail.com",
      "bio": "Hi I', Janet Jackson"
    };
    EditProfileController.user = fakeUser;
    // ensure that the fake data is being assigned to the user property
    expect(EditProfileController.user).toEqual(fakeUser);

    // call clearFormDetails to reset user property to empty object
    EditProfileController.clearFormDetails();

    // validate that the user object has been set to an empty object
    expect(spyOnClearFormDetailsFunc.called).toBe(true);
    expect(EditProfileController.user).toEqual({});
    expect(spyOnClearFormDetailsFunc.getCall(0).returnValue).toBe(true);
  });

  it('validateFormEntry should return false if the required form fields are invalid', function(){
    var spyOnValidateFormEntryFn = sinon.spy(EditProfileController, 'validateFormEntry'),
        invalidFakeFormObject = {
          $invalid: true
        };
    EditProfileController.validateFormEntry(invalidFakeFormObject);

    expect(spyOnValidateFormEntryFn.called).toBe(true);
    expect(spyOnValidateFormEntryFn.calledWith(invalidFakeFormObject)).toBe(true);
    expect(spyOnValidateFormEntryFn.getCall(0).returnValue).toBe(false);
  });

  it('validateFormEntry should call NewUser.createNewUser if validateFormEntry method is valid', function(){
    var mockUserDetails = {
      "userName": "JanetJacks",
      "password": "JJRocks123",
      "name": "Janet Jackson",
      "emailAddress": "JSquared@gmail.com",
      "bio": "Hi I', Janet Jackson"
    },
    validFakeFormObject = {
      $invalid: false
    };

    EditProfileController.user = mockUserDetails;

    EditProfileController.validateFormEntry(validFakeFormObject);
    expect(mockNewUserFactory.createNewUser.called).toBe(true);
    expect(mockNewUserFactory.createNewUser.calledWith(mockUserDetails)).toEqual(true);
  });
});
