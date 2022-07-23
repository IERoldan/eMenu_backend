var express = require('express');
var api = express.Router();
var requestController = require('../controllers/request.controller');


api.get('/menusCart', requestController.getMenusCart);
api.post('/menusCart', requestController.addMenusCart);
api.delete('/menusCart/:menuId', requestController.deleteMenuCart);
api.put('/menusCart/:menuId',  requestController.putMenuCart);

module.exports = api;