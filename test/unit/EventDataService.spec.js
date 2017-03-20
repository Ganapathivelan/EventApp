'use strict';
describe('EventData Service tests', function(){
  var EventData, httpBackend;

  beforeEach(module('EventDataFactory'));

  // initialising EventData factory
  describe('On initialisation', function(){

    beforeEach(inject(function(_EventData_, _$httpBackend_){
      EventData = _EventData_, httpBackend = _$httpBackend_;
    }));

    it('Should work', function(){
      expect(EventData).toBeDefined();
    });
  });

  // getAllEvents method
  describe('getAllEvents method', function(){

    beforeEach(inject(function(_EventData_, _$httpBackend_){
      EventData = _EventData_, httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   it('Should return an array of fake events when a GET request is made to /data/event URL', function(){
     var spyOnGetAllEvents = sinon.spy(EventData, 'getAllEvents'),
         fakeEventsArray = [{id: 1, name: 'Event One'}, {id: 2, name: 'Event Two'}, {id: 3, name: 'Event Three'}],
         result;

     httpBackend.when('GET', '/data/event').respond(fakeEventsArray);
     result = EventData.getAllEvents();
     httpBackend.flush();

     sinon.assert.calledOnce(spyOnGetAllEvents);
     sinon.assert.pass(result.length === 3);
     sinon.assert.pass(result[2].name === 'Event Two');

   });

  });
  describe('getData method', function(){
    beforeEach(inject(function(_EventData_, _$httpBackend_){
      EventData = _EventData_, httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   it('Should issue a GET request when a request to data/event/100 is made', function(){
     var fakeEvent = {id: 1, name: 'Fake Event'}, result,
         spyOnGetData = sinon.spy(EventData, 'getData');

     httpBackend.expectGET('/data/event/100');
     httpBackend.when('GET', '/data/event/100').respond(fakeEvent);

     result = EventData.getData(100);

     httpBackend.flush();

     expect(spyOnGetData.called).toBe(true);
     expect(spyOnGetData.calledWith(100)).toBe(true);

     expect(result).not.toBeUndefined();
     expect(result.name).toEqual('Fake Event');
   });

  });
  describe('getEntryCount method', function(){
    var q, fakeNewEvent, spyOnSaveEventMethod, url;

    beforeEach(inject(function(_EventData_, _$httpBackend_, $q){
      EventData = _EventData_, httpBackend = _$httpBackend_, q = $q;
    }));

    beforeEach(function(){
      fakeNewEvent = {id: 1, name: "Fake Event One"},
      spyOnSaveEventMethod = sinon.spy(EventData, 'saveEvent'),
      url = '/data/event';
    });

    afterEach(function() {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
   });

   it('Should resolve the promise and return an array when a query request is made to /data/event', function(){
    //  arrange
     var fakeResponse = [{}, {
           metadata: {
             totalFileCount: 3
           }
         }];

     var deferred = q.defer(), result,
     promise = deferred.promise;

     deferred.resolve(fakeResponse);
     httpBackend.expectGET(url);
     httpBackend.when('GET', url)
                .respond(promise.then(function(data){
                  //result -> fakeResponse
                  result = data;
                }));
    // act
     EventData.saveEvent(fakeNewEvent);

     httpBackend.flush();
    //  assert
     expect(spyOnSaveEventMethod.called).toBe(true);
     expect(spyOnSaveEventMethod.calledWith(fakeNewEvent)).toBe(true);
     expect(result).not.toBeUndefined();
     sinon.assert.pass(result[1].metadata.totalFileCount === 3);
   });

   it('Should reject the promise and return an error message when a query is made to /data/event', function(){
     var result, error = "Unable to fulfil promise",
     deferred = q.defer(), promise = deferred.promise;

     deferred.reject(error);

     httpBackend.when('GET', url)
                .respond(promise.catch(function(response){
                  result = response;
                }));

     EventData.saveEvent(fakeNewEvent);

     httpBackend.flush();

     expect(spyOnSaveEventMethod.called).toBe(true);
     expect(spyOnSaveEventMethod.calledWith(fakeNewEvent)).toBe(true);
     expect(result).not.toBeUndefined();
     expect(result).toEqual(error);
   });

  });

});
