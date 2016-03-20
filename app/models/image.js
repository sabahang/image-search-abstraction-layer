'use strict';

var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

var Image = new Schema({
    url: String,
    snippet: String,
    thumbnail: String,
    context: String
},{ _id : false });


module.exports = mongoose.model('Image', Image);