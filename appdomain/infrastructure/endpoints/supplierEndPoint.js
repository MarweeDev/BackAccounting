const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/supplierController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/supplier/post', authenticateToken, Controller.supplierController.post);
EndPoint.get('/supplier/get', authenticateToken, Controller.supplierController.get);
EndPoint.get('/supplier/get/:id', authenticateToken, Controller.supplierController.getById);
EndPoint.put('/supplier/put/:id', authenticateToken, Controller.supplierController.update);
EndPoint.put('/supplier/delete/:id', authenticateToken, Controller.supplierController.delete);

module.exports = EndPoint;
