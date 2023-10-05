const express = require('express');
const roleEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/roleController');

// Endpoint para registrar un rol
roleEndPoint.post('/role/post', Controller.roleController.postRole);
// Endpoint para consultar todos los rol
roleEndPoint.get('/role/get', Controller.roleController.getRole);
// Endpoint para actualziar un rol
roleEndPoint.put('/role/put/:id', Controller.roleController.updateRole);
// Endpoint para eliminar un rol - se actualiza su rol
roleEndPoint.put('/role/delete/:id', Controller.roleController.deleteRole);

module.exports = roleEndPoint;