'use strict';

describe('UserDataDependencyFactory testing', function(){

  beforeEach(module('UserDataDependencyModule'));


  // When unit testing HTTP calls to the server, the $httpBackend
  // method intercepts those calls and captures information about
  // HTTP request made, the method used, URL and other useful data
  // to validate that the HTTP calls are being made correctly, as
  // as expected and all without the HTTP calls reaching the server
  // the $httpBackend is part of the angular-mocks library
  it('UserDataDependencyFactory.query should issue a GET request to /data/user/AJ$tevens when queryAll is called',
    inject(function(UserDataDependencyFactory, $httpBackend){
      var fakeUser = { userName: 'AJ$tevens' }, result,
          fakeUserResponseArray = [{name: 'John'}, {name: 'Paul'}, {name: 'Peter'}],
          spyOnQueryAll = sinon.spy(UserDataDependencyFactory, 'queryAll');
      //#1: Configure $httpBackend: it needs to be told the method
      // type to expect, the URL to listen out for and what to
      // respond with when the aforementioned conditions are met
      $httpBackend.expectGET('/data/users/AJ$tevens');
      $httpBackend.when('GET','/data/users/AJ$tevens')
                  .respond(fakeUserResponseArray);

      //#2: Call the method as usual a capture the response
      result = UserDataDependencyFactory.queryAll(fakeUser);

      // #3: call $httpBackend.flush() as preserves the async
      // api of the backend, while allowing the test to
      // execute synchronously
      $httpBackend.flush();

      // verifyNoOutstandingExpectation() Verifies that all of
      // the requests defined via the expect api were made
      // verifyNoOutstandingRequest(); verifies that there are
      // no outstanding requests that need to be flushed
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

      // #4: validate the expectations
      expect(spyOnQueryAll.called).toBe(true);
      expect(spyOnQueryAll.calledWith(fakeUser)).toBe(true);
      expect(spyOnQueryAll.getCall(0).returnValue.length).toEqual(3);
      expect(result[1].name).toEqual('Paul');

      // same as above but using sinon.assert API
      sinon.assert.calledOnce(spyOnQueryAll);
      sinon.assert.calledWith(spyOnQueryAll, fakeUser);
      sinon.assert.pass(spyOnQueryAll.getCall(0).returnValue.length === 3);
      sinon.assert.pass(result[1].name === 'Paul');

    }));

});
