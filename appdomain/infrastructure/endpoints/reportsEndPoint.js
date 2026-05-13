const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/reportsController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/reports/sales/get', authenticateToken, Controller.reportsController.sales);
EndPoint.get('/reports/sales-by-product/get', authenticateToken, Controller.reportsController.salesByProduct);
EndPoint.get('/reports/sales-by-seller/get', authenticateToken, Controller.reportsController.salesBySeller);
EndPoint.get('/reports/inventory/get', authenticateToken, Controller.reportsController.inventory);
EndPoint.get('/reports/inventory-movement/get', authenticateToken, Controller.reportsController.inventoryMovement);

module.exports = EndPoint;
