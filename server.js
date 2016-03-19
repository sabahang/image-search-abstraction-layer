'use strict';

require('dotenv').load();
var express = require('express');
var routes = require('./app/routes/index.js');
var paginate = require('express-paginate');
var mongoose = require('mongoose');


var app = express();


mongoose.connect(process.env.MONGO_URI);

app.use(paginate.middleware(10, 50));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(paginate.middleware(10, 50));


routes(app);

//var port = process.env.PORT || 8080;
var port = 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});