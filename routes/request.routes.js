const express = require("express");
var api = express.Router();
var requestController = require('../controllers/request.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require('../middlewares/adminValidation');

api.post('/request', validationAuthenticator, requestController, createRequest);


module.exports = api;