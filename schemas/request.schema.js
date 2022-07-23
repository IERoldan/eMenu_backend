var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
 title: {type: String, required: true, unique: true},
 picture: {type: String, required: true},
 amount: {type: Number, required: true},
 price: {type: Number, required: true},
})

module.exports = mongoose.model('Request', RequestSchema)