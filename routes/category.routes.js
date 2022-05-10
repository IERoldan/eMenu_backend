var express = require('express');
var api = express.Router();
var categoryController = require('../controllers/category.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require('../middlewares/adminValidation');

api.get('/categories', categoryController.getCategories);
api.get('/category', categoryController.getCategory);
api.post('/category/', [validationAuthenticator, adminValidation], categoryController.addCategory);
api.delete('/category/', [validationAuthenticator, adminValidation], categoryController.deleteCategory);
api.put('/category/:upd_id', validationAuthenticator, categoryController.updateCategory);

module.exports = api;   