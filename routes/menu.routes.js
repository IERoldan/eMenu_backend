var express = require('express');
var api = express.Router();
var menuController = require('../controllers/menu.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require('../middlewares/adminValidation');

api.get('/menus', menuController.getMenus);
api.get('/menu', menuController.getMenu);
api.post('/menu/', menuController.addMenu);
api.delete('/menu/:_id', menuController.deleteMenu);
api.put('/menu/:upd_id', validationAuthenticator, menuController.updateMenu);

module.exports = api;