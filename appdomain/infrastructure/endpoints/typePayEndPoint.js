const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/typePayController');

EndPoint.get('/typepay/get', Controller.typePayController.get);
EndPoint.get('/typepay/getSub/:id', Controller.typePayController.getSubPay);

module.exports = EndPoint;