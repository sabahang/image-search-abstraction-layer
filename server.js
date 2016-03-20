'use strict';

require('dotenv').load();
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');



var app = express();




app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect(process.env.MONGO_URI );
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  mongoose.connect(process.env.MONGOLAB_URI);
});

routes(app);

var port = process.env.PORT || 8080;
//var port = 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});