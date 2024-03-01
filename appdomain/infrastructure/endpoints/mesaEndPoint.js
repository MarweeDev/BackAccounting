const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/mesaController');

// Endpoint para registrar un mesa
EndPoint.post('/mesa/post', Controller.mesaController.postMesa);
// Endpoint para consultar todos los mesa
EndPoint.get('/mesa/get/global/:id', Controller.mesaController.getMesa);
// Endpoint para consultar un mesa
EndPoint.get('/mesa/get/:id', Controller.mesaController.getMesaById);
// Endpoint para actualziar un mesa
EndPoint.put('/mesa/put/:id', Controller.mesaController.updateMesa);
// Endpoint para actualizar un mesa - estado disponible/reservada/descartada
EndPoint.put('/mesa/status/:id', Controller.mesaController.updateStatusMesa);
// Endpoint para eliminar un mesa - se actualiza su estado
EndPoint.put('/mesa/delete/:id', Controller.mesaController.deleteMesa);

module.exports = EndPoint;