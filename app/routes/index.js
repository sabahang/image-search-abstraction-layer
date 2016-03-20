'use strict';

var path = process.cwd();
var searchController = require(path + '/app/controllers/searchController.server.js');

module.exports = function (app) {

	app.route('/api/imagesearch/:keyword')
		.get(searchController.search);
		
	app.route('/api/history')
		.get(searchController.getHistory);
		
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
};
