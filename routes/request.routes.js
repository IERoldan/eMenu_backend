var express = require('express');
var api = express.Router();
var requestController = require('../controllers/request.controller');
const validationAuthenticator  = require('../middlewares/authentication');
const adminValidation = require('../middlewares/adminValidation');


api.post('/request', requestController.addRequest);
api.get('/requests', requestController.getRequests )
api.get('/request', requestController.getRequestByUser)
api.get('/request', requestController.getRequestByStatus)

module.exports = api;