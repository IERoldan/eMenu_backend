var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categoriasValidas = [
    'Comidas Calientes',
    'Comidas Frias',
    'Postres',
    'Bebidas',
];
var CategorySchema = new Schema({
    name: {type: String, required:true, maxlength:40, enum: categoriasValidas, unique:true},
    status:{type:Boolean, default:false, required:true},
    picture:{type:String, required: true,},
})

module.exports = mongoose.model('Category', CategorySchema)