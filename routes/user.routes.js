var express = require('express');
var api = express.Router();
var userController = require('../controllers/user.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require('../middlewares/adminValidation');

api.get('/users', userController.getUsers);
api.get('/user/:_id', userController.getUser);
api.post('/user/', userController.addUser);
api.delete('/user/:_id', userController.deleteUser);
api.put('/user/:userId',  userController.updateUser);
api.post('/login', userController.loginUser);

module.exports = api;
