const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/productCategoryController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar una categoria
EndPoint.post('/category/post', authenticateToken, Controller.productCategoryController.post);
// Endpoint para consultar todas las categoria
EndPoint.get('/category/get', Controller.productCategoryController.get);
// Endpoint para consultar una categoria
EndPoint.get('/category/get/:id', Controller.productCategoryController.getById);
// Endpoint para actualziar una categoria
EndPoint.put('/category/put/:id', authenticateToken, Controller.productCategoryController.update);
// Endpoint para eliminar una categoria - se actualiza su estado
EndPoint.put('/category/delete/:id', authenticateToken, Controller.productCategoryController.delete);

module.exports = EndPoint;
