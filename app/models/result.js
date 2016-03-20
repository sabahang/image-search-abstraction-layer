'use strict';

var mongoose = require('mongoose'),
        
        Schema = mongoose.Schema,
        Image = require('./image.js').schema;

var Result = new Schema({
    timestamp: Date,
    term: String,
    images: [Image]
}, { capped: { size: 5242880, max: 10, _id : false }});

module.exports = mongoose.model('Result', Result);