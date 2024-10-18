const express = require('express');
const moduleEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/moduleController');

// Endpoint para registrar un modulo
moduleEndPoint.post('/module/post', Controller.moduleController.postModule);
// Endpoint para consultar todos los modulo
moduleEndPoint.get('/module/get', Controller.moduleController.getModule);
// Endpoint para actualziar un modulo
moduleEndPoint.put('/module/put/:id', Controller.moduleController.updateModule);
// Endpoint para eliminar un modulo - se actualiza su modulo
moduleEndPoint.put('/module/delete/:id', Controller.moduleController.deleteModule);

module.exports = moduleEndPoint;