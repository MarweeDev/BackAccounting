const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/orderController');

// Endpoint para registrar un mesa
EndPoint.post('/order/post', Controller.orderController.post);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/get', Controller.orderController.get);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/getAll', Controller.orderController.getAll);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/getFind', Controller.orderController.getFind);
// Endpoint para consultar todos los mesa
EndPoint.get('/order/get/generateCodeOrder', Controller.orderController.getCodeOrder);
// Endpoint para consultar un mesa
EndPoint.get('/order/get/:id', Controller.orderController.getById);
// Endpoint para actualziar un mesa
EndPoint.put('/order/put/:id', Controller.orderController.update);
// Endpoint para eliminar un mesa - se actualiza su estado
EndPoint.put('/order/delete/:id', Controller.orderController.delete);

module.exports = EndPoint;