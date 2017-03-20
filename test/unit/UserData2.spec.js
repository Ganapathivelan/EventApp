'use strict';

describe('UserData2 with another service dependency', function(){
  // When testing services with underlying dependencies, it is
  // essential to remember which system is under test. As the
  // UserDataWithDependencyFactory is under test, any underlying
  // dependencies should be substituted to keep the unit tests
  // clean and free from tight coupling.
  var mockUserDataDependencyFactory;

  // #1: load the required module containing the factory required
  beforeEach(module('UserDataWithDependencyModule'));

  beforeEach(function(){
    // #2: the $provide method substitues any dependencies of the system
    // under test with a fake object. In this example, in order to test
    // UserDataWithDependencyFactory service which has a dependency on
    // the UserDataDependencyFactory factory, the latter has been swapped
    // out with the mockUserDataDependencyFactory stub. Hence, when the
    // UserDataWithDependencyFactory is initialised, it will inject the
    // mockUserDataDependencyFactory in place of the original dependency
    // and execute successfully
    module(function($provide){
      $provide.value('UserDataDependencyFactory', mockUserDataDependencyFactory);
    });
  });


  describe('getUser method tests', function(){
    // global variables for the getUser() methods
    var fakeUserName;

    beforeEach(function(){
      mockUserDataDependencyFactory = sinon.stub({ get: function(){} });
      fakeUserName ='JJ2Squared';
    });

    it('Should be called with a valid username', inject(function(UserDataWithDependencyFactory){
      var $UserDataDependency = UserDataWithDependencyFactory,
          spyOnGetUserMethod = sinon.spy($UserDataDependency, 'getUser');

      $UserDataDependency.getUser(fakeUserName);

      // expectations for UserDataWithDependencyFactory.getUser() method
      expect(spyOnGetUserMethod.called).toBe(true);
      expect(spyOnGetUserMethod.calledWith(fakeUserName)).toBe(true);

      // expectations for the dependency mockUserDataDependencyFactory.get() method
      expect(mockUserDataDependencyFactory.get.called).toBe(true);
      expect(mockUserDataDependencyFactory.get.args[0][0]).toEqual({ userName : fakeUserName });

    }));

    it('Should return whatever the mockUserDataDependencyFactory.get method returns', inject(function(UserDataWithDependencyFactory){
      mockUserDataDependencyFactory.get.returns('Success!!');
      var result = UserDataWithDependencyFactory.getUser(fakeUserName);

      // validate that getUser method returns whatever the
      // mockUserDataDependencyFactory.get() method returns
      expect(result).toBe('Success!!');
    }));

  });

  describe('save() method tests', function(){
    beforeEach(function(){
      mockUserDataDependencyFactory = sinon.stub({ save: function(){} });
    });

    it('Should be called with a valid user', inject(function(UserDataWithDependencyFactory){
      var $UserDataWithDependency = UserDataWithDependencyFactory,
          fakeUser = {
            name: 'Janet Jenkinson'
          },
          spyOnsaveMethod = sinon.spy($UserDataWithDependency, 'save');
      // mockUserDataDependencyFactory.save.returns(fakeUser);
      $UserDataWithDependency.save(fakeUser);

      expect(spyOnsaveMethod.called).toBe(true);
      expect(spyOnsaveMethod.calledWith(fakeUser)).toBe(true);

      expect(mockUserDataDependencyFactory.save.called).toBe(true);
      expect(mockUserDataDependencyFactory.save.calledWith(fakeUser)).toBe(true);
    }));
  });


  describe('users() method tests', function(){
    var fakeUsersArray;

    beforeEach(function(){
      // stub the queryAll method
      // UserDataDependency.queryAll -> mockUserDataDependencyFactory
      mockUserDataDependencyFactory = sinon.stub({ queryAll: function(){} });

      fakeUsersArray = [{
        user: 'Jane Doe'
      },{
        user: 'John Smith'
      },{
        user: 'Adam Johnson'
      }];
    });

    it('Should return an array of users', inject(function(UserDataWithDependencyFactory){
      var result,
      spyOnUsersFn = sinon.spy(UserDataWithDependencyFactory, 'users');
      mockUserDataDependencyFactory.queryAll.returns(fakeUsersArray);

      // call the SUT's method of interest and assign the results to
      // a variable
      result = UserDataWithDependencyFactory.users(fakeUsersArray);

      expect(spyOnUsersFn.called).toBe(true);
      expect(result).toEqual(fakeUsersArray);
    }));
  });
});
