const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/stockController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/stock/post', authenticateToken, Controller.stockController.postStock);
EndPoint.get('/stock/get', authenticateToken, Controller.stockController.getStock);
EndPoint.get('/stock/get/:id', authenticateToken, Controller.stockController.getStockById);
EndPoint.put('/stock/put/:id', authenticateToken, Controller.stockController.updateStock);
EndPoint.put('/stock/delete/:id', authenticateToken, Controller.stockController.deleteStock);

module.exports = EndPoint;
