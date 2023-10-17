const express = require('express');
const componentEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/componentController');

// Endpoint para registrar un componente
componentEndPoint.post('/component/post', Controller.componentController.post);
// Endpoint para consultar todos los componente
componentEndPoint.get('/component/get', Controller.componentController.get);
// Endpoint para consultar por ID un componente
componentEndPoint.get('/component/get/:id', Controller.componentController.getById);
// Endpoint para actualziar un componente
componentEndPoint.put('/component/put/:id', Controller.componentController.update);
// Endpoint para eliminar un componente - se actualiza su componente
componentEndPoint.put('/component/delete/:id', Controller.componentController.delete);

module.exports = componentEndPoint;