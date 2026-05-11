const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/paymentMethodController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/payment/method/get', authenticateToken, Controller.paymentMethodController.getMethods);
EndPoint.post('/payment/method/post', authenticateToken, Controller.paymentMethodController.saveMethod);
EndPoint.post('/payment/transaction/detail/post', authenticateToken, Controller.paymentMethodController.saveTransaction);

module.exports = EndPoint;
