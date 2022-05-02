var express = require('express');
var api = express.Router();
var menuController = require('../controllers/menu.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require('../middlewares/adminValidation');

api.get('/menus', validationAuthenticator, menuController.getMenus);
api.get('/menu', validationAuthenticator, menuController.getMenu);
api.post('/menu/',[validationAuthenticator, adminValidation], menuController.addMenu);
api.delete('/menu/', [validationAuthenticator, adminValidation], menuController.deleteMenu);
api.put('/menu/:upd_id', validationAuthenticator, menuController.updateMenu);

module.exports = api;