'use strict';

var google = require('googleapis');
var exports = module.exports = {};
var search = google.customsearch('v1');
var Image = require('../models/image.js');
var Result = require('../models/result.js');


exports.search = function(req, res){
  googleSearch(req, res);

};
exports.getHistory = function(req, res){
  Result.find({}, 'term timestamp' , function(err, docs) {
	  if (err) console.warn("Could't return history!");
	  res.json(docs);
	});
};
function googleSearch(request,response){
    var params = { q: request.params.keyword, cx: "008757340720513362987:wkl37irc0sa", searchType:"image", key: 'AIzaSyCWDmZd8WHfzrsRw0NK6Vk9Gwt5tr-PNFc'};
    if (request.query.offset){
      params.start = request.query.offset;
    }
    search.cse.list( params, function(err, googleResult){
      if (err)  console.warn("encountered error", err);
      else {
        if (googleResult.items){
          var images = sanitizeResults(googleResult.items);
          saveLastResult(images, request.params.keyword);
          response.json(images);
        } else {
          response.end("Nothing found with that keyword!");
        }
      }
    });
}

function sanitizeResults(imageItems){
  var filteredResult = [], image;
  imageItems.forEach(function(s){
    image = new Image(); 
    image.url = s.link;
    image.snippet = s.snippet;
    image.thumbnail = s.image.thumbnailLink;
    image.context = s.image.contextLink;
    filteredResult.push(image);
  });
  return filteredResult;
}
function saveLastResult(images, term) {

	var result = new Result();
	result.timestamp = new Date();
	result.term = term;

	result.images.push.apply(result.images,images);
	result.save(function (err) {
    if (err) console.warn("Couldn't save the result to DB!");
  });
}
