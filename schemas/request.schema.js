var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    userID:{type:String, ref:'User',required:true,},
    createdAt: { type: Date, required: true, default: Date.now },
    menu:{type:String, ref:'Menu', required: true},
    picture:{type:String, ref:'Menu', required: true},
    state:{type:Boolean, ref:'Menu', required:true},
    userName:{type:String, ref:'User',required:true,},
    quantity:{type:Number, required:true, default:0,},  
})

module.exports = mongoose.model('Request', RequestSchema)