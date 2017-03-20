var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    port = 4001,
    eventsController = require('./eventsController'),
    app = express(),
    rootPath = path.normalize(__dirname + '/../');
    app.use(express.static(rootPath + '/app'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // routing in express.js
    // URL pattern matching starts from the root aka localhost:4001
    app.get('/data/event/:id', eventsController.get);
    app.post('/data/event/:id', eventsController.save);


    // additional exercises
    app.post('/data/users/:userName', eventsController.saveNewUser);
    app.get('/data/event/', eventsController.getEverything);

    // wildcard to catch all requests that haven't been routed
    app.get('*', function(request, response){
      var indexPage = rootPath + '/app/index.html';
      response.sendFile(indexPage);
      // response.send('catch all');
    });

    app.listen(port);

console.log('Listening on port '+ port);
