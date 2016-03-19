'use strict';

var mongoose = require('mongoose'),
        Image = require('./image.js'),
        Schema = mongoose.Schema,
        mongoosePaginate = require('mongoose-paginate');

var Result = new Schema({
    timestamp: Date,
    images: [Image]
});

Result.plugin(mongoosePaginate);
module.exports = mongoose.model('Result', Result);