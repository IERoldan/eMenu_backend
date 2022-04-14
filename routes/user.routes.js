var express = require('express');
var api = express.Router();
var userController = require('../controllers/user.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require ('../middlewares/adminValidation');

api.get('/users', validationAuthenticator, userController.getUsers);
api.get('/user', validationAuthenticator, userController.getUser);
api.post('/user/', userController.addUser);
api.delete('/user/', [validationAuthenticator, adminValidation], userController.deleteUser);
api.put('/user/:upd_id', validationAuthenticator, userController.updateUser);
api.post('/login', userController.loginUser);

module.export = api;
