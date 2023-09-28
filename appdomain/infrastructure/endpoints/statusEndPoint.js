const express = require('express');
const statusEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/statusController');

// Endpoint para registrar un estado
statusEndPoint.post('/status/post', Controller.statusController.postStatus);
// Endpoint para consultar todos los estado
statusEndPoint.get('/status/get', Controller.statusController.getStatus);
// Endpoint para actualziar un estado
statusEndPoint.put('/status/put/:id', Controller.statusController.updateStatus);
// Endpoint para eliminar un estado - se actualiza su estado
statusEndPoint.put('/status/delete/:id', Controller.statusController.deleteStatus);

module.exports = statusEndPoint;