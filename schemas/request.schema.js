var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var estadosValidos = [
    'Revisión',
    'Peparación',
    'Encaminado',
    'Entregado',
    'Cancelado',
];

var RequestSchema = new Schema({
    userID:{type:String, ref:'User', required:true,},
    userName:{type:String, ref:'User',required:true,},
    createdAt: { type: Number, required: true, default: parseInt(new Date().getTime()/1000)},
    menu:{type:String, ref:'Menu', required: true},
    picture:{type:String, ref:'Menu'},
    status:{type:String, default:'Revisión', enum: estadosValidos, required:true},
    quantity:{type:Number, required:true, default:0,},  
})

module.exports = mongoose.model('Request', RequestSchema)