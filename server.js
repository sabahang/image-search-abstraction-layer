'use strict';

require('dotenv').load();
var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');

var app = express();


app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

switch (app.get('env')){
    case 'development':
        console.log( 'Loading development configuration...' );
        mongoose.connect(process.env.MONGO_URI );
        break;
    case 'production':
        console.log( 'Loading production configuration...' );
        mongoose.connect(process.env.MONGOLAB_URI);
        break;
}

routes(app);

var port = process.env.PORT || 8080;
//var port = 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});