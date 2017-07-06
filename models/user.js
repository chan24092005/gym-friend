// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SportSchema = new Schema({ name: String });

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    name: String,
    tall: Number,
    weight: Number,
    sports: [SportSchema],
    admin: Boolean
}));
