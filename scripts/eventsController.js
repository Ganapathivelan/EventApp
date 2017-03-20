'use strict';
var fs = require('fs'), path = require('path'),
    process = require('process'),
    api = {};

api.get = getData;
api.save = saveData;
api.saveNewUser = saveNewUser;
api.getEverything = getEverything;

function getData(request, response){
  var event = fs.readFileSync('app/data/event/' +
              request.params.id + '.json', 'utf8');
  response.setHeader('Content-Type', 'application/json');
  response.send(event);//concludes http request
}

function saveData(request, response){
  var event = request.body;
  fs.writeFileSync('app/data/event/' +
              request.params.id + '.json', JSON.stringify(event));
  response.send(event);
}

function saveNewUser(request, response){
  var newUser = request.body, newUserUsername = request.params.userName;
  fs.writeFileSync('app/data/users/' +
              newUserUsername + '.json', JSON.stringify(newUser));
  response.send('New user details received by the server: ' + newUser.userName);
}

function getEverything(request, response){
  var rootPath = path.normalize(__dirname + '/../'), directory = '/app/data/event',
      filenames = fs.readdirSync(rootPath + directory), results = [],
      data = filenames.map(function(filename){
        var content = JSON.parse(fs.readFileSync(rootPath + '/app/data/event/' + filename, 'utf8'));
        // JSON.parse() makes the key/value pairs in the json file accessible
        return {
          name: content.name,
          id: content.id,
          date: content.date,
          time: content.time,
          location: content.location,
          imageUrl: content.imageUrl
        };
  });
  results.push({events: data}, {metadata: {totalFileCount: filenames.length}});
  response.setHeader('Content-Type', 'application/json');
  response.send(results);
}

module.exports = api;
