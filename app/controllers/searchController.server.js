'use strict';

var google = require('googleapis');
var exports = module.exports = {};
var search = google.customsearch('v1');
var paginate = require('express-paginate');
var Image = require('../models/image.js');
var Result = require('../models/result.js');
//var resultController = require('./resultController.server.js');



exports.search = function(req, res, next){
  var imagesResult = googleSearch(req.params.keyword);
  let savePromise = saveLastResult(imagesResult);
  savePromise.then(function(){
    getLastResult(res);
  },function(){ console.log("Couldn't Save...")});
  // if (req.query.offset){ //TODO: you have to study paginate and learn how it works
  //   getLastResult().paginate({}, { page: req.query.offset, limit: 5 }, function(err, results, pageCount, itemCount) {
  //     if (err) return next(err);
  //     res.json({
  //       object: 'list',
  //       has_more: paginate.hasNextPages(req)(pageCount),
  //       data: results
  //     });
  //   });

  // } else {
  //   res.json(getLastResult());
  // }
  
    
};
function googleSearch(keyword){
    var params = { q: keyword, cx: "008757340720513362987:wkl37irc0sa", searchType:"image", key: 'AIzaSyCWDmZd8WHfzrsRw0NK6Vk9Gwt5tr-PNFc'};
    
    search.cse.list( params, function(err, response){
      if (err)  console.warn("encountered error", err);
      else {
        return sanitizeResults(response);
      }
    });
}
function sanitizeResults(googleresults){
  var filteredResult = [], image;
  googleresults.items.forEach(function(s){
    image = new Image(); 
    image.url = s.link;
    image.snippet = s.snippet;
    image.thumbnail = s.image.thumbnailLink;
    image.context = s.image.contextLink;
    filteredResult.push(image);
  });
  return filteredResult;
}
function saveLastResult(images) {
  console.log('Deleting previous result...');
	Result.remove({}).exec(); //remove all in db
	console.log('Deleting finished!');
	var result = new Result();
	result.timestamp = new Date();
	result.images = images;
	return result.save(function (err) {
    if (err) console.warn("Couldn't save the result to DB");
  }); //TODO: save should return promise otherwise we might get the result before it's saved
}
function getLastResult(response) {
	Result.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
  .exec(function (err, result) {
	  if (err) console.warn("Couldn't get the latest result from DB");
    //TODO: Async send result to page
    response.json(result);
  }
);
}