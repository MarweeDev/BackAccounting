const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/productController');
const upload = require('../../utility/upload');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar un mesa
EndPoint.post('/product/post', authenticateToken, upload.single('image'), Controller.productController.post);
// Endpoint para consultar todos los mesa
EndPoint.get('/product/get', Controller.productController.get);
// Endpoint para consultar todos los mesa
EndPoint.get('/product/global/get/:id', Controller.productController.getCateg);
// Endpoint para consultar un mesa
EndPoint.get('/product/get/:id', Controller.productController.getById);
// Endpoint para actualziar un mesa
EndPoint.put('/product/put/:id', authenticateToken, Controller.productController.update);
// Endpoint para actualizar un mesa - estado disponible/descartada
EndPoint.put('/product/status/:id', authenticateToken, Controller.productController.updateStatus);
// Endpoint para eliminar un mesa - se actualiza su estado
EndPoint.put('/product/delete/:id', authenticateToken, Controller.productController.delete);

module.exports = EndPoint;
