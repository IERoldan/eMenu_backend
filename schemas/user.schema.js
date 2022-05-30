var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rolesValidos = [
    'ADMIN_ROLE',
    'CLIENT_ROLE',
];

var UserSchema = new Schema({
    fullname: {type: String, required:true, maxlength:40},
    email: {type:String, required:true, unique:true, maxlength:50, lowercase: true, validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Por favor ingrese un email válido"
    },},
    password: {type:String },
    status:{type:Boolean, default:false},
    role:{type:String, required: true, default:'CLIENT_ROLE', enum: rolesValidos},
})

module.exports = mongoose.model('User', UserSchema)