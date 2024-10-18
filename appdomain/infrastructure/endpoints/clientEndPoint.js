const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/clientController');

// Endpoint para registrar un cliente
EndPoint.post('/client/post', Controller.clientController.post);
// Endpoint para consultar todos los clientes
EndPoint.get('/client/get', Controller.clientController.get);

module.exports = EndPoint;