const express = require('express');
const roleEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/roleController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar un rol
roleEndPoint.post('/role/post', authenticateToken, Controller.roleController.postRole);
// Endpoint para consultar todos los rol
roleEndPoint.get('/role/get', authenticateToken, Controller.roleController.getRole);
// Endpoint para actualziar un rol
roleEndPoint.put('/role/put/:id', authenticateToken, Controller.roleController.updateRole);
// Endpoint para eliminar un rol - se actualiza su rol
roleEndPoint.put('/role/delete/:id', authenticateToken, Controller.roleController.deleteRole);

module.exports = roleEndPoint;
