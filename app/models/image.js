'use strict';

var mongoose = require('mongoose'),
     Schema = mongoose.Schema,
     mongoosePaginate = require('mongoose-paginate');

var Image = new Schema({
    url: String,
    snippet: String,
    thumbnail: String,
    context: String
});

Image.plugin(mongoosePaginate);
module.exports = mongoose.model('Image', Image);