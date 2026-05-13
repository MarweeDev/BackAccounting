const express = require('express');
const moduleEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/moduleController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar un modulo
moduleEndPoint.post('/module/post', authenticateToken, Controller.moduleController.postModule);
// Endpoint para consultar todos los modulo
moduleEndPoint.get('/module/get', authenticateToken, Controller.moduleController.getModule);
// Endpoint para actualziar un modulo
moduleEndPoint.put('/module/put/:id', authenticateToken, Controller.moduleController.updateModule);
// Endpoint para eliminar un modulo - se actualiza su modulo
moduleEndPoint.put('/module/delete/:id', authenticateToken, Controller.moduleController.deleteModule);

module.exports = moduleEndPoint;
