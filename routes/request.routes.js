var express = require('express');
var api = express.Router();
var requestController = require('../controllers/request.controller');


api.get('/menusCart', requestController.getMenusCart);
api.post('/menusCart', requestController.addMenusCart);
api.delete('/menusCart/:menuId', requestController.deleteMenusCart);
api.put('/menusCart/:menuId',  requestController.putMenusCart);

module.exports = api;