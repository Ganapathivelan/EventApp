'use strict';

describe('Duration filter', function(){
  beforeEach(module('durationFilter'));

  it('Should return \'Half day\' when 1 is passed to the duration directive', inject(function(durationsFilter){
    sinon.assert.pass(durationsFilter(1) === "Half day");
  }));

  it('Should return \'Full day\' when 2 is passed to the duration directive', inject(function(durationsFilter){
    console.log(durationsFilter(1));
    sinon.assert.pass(durationsFilter(2) === "Full day");
  }));

  it('Should return \'One and a half days\' when 3 is passed to the duration directive', inject(function(durationsFilter){
    sinon.assert.pass(durationsFilter(3) === "One and a half days");
  }));

  it('Should return \'Two days\' when 4 is passed to the duration directive', inject(function(durationsFilter){
    sinon.assert.pass(durationsFilter(4) === "Two days");
  }));

});
