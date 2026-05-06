const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/orderController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar un mesa
EndPoint.post('/order/post', authenticateToken, Controller.orderController.post);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/get', authenticateToken, Controller.orderController.get);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/getAll', authenticateToken, Controller.orderController.getAll);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/getFind', authenticateToken, Controller.orderController.getFind);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/getExport', authenticateToken, Controller.orderController.getFindExport);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/get/generateCodeOrder', authenticateToken, Controller.orderController.getCodeOrder);
// Endpoint para consultar un mesa
EndPoint.get('/order/get/:id', authenticateToken, Controller.orderController.getById);
// Endpoint para actualizar una orden - Anulado
EndPoint.put('/order/status/null', authenticateToken, Controller.orderController.updateNull);
// Endpoint para actualizar una orden
EndPoint.put('/order/put', authenticateToken, Controller.orderController.update);
// Endpoint para actualizar el estado de pago de una orden
EndPoint.put('/order/status/pay', authenticateToken, Controller.orderController.updatePay);
// Endpoint para eliminar un mesa - se actualiza su estado
EndPoint.put('/order/delete/:id', authenticateToken, Controller.orderController.delete);

module.exports = EndPoint;
