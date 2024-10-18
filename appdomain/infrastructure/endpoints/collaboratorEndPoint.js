const express = require('express');
const collaboratorEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/collaboratorController');

// Endpoint para registrar un colaborador
collaboratorEndPoint.post('/collaborator/post', Controller.collaboratorController.postCollaborator);
// Endpoint para consultar todos los colaboradores
collaboratorEndPoint.get('/collaborator/get', Controller.collaboratorController.getCollaborator);
// Endpoint para consultar un colaborador
collaboratorEndPoint.get('/collaborator/get/:id', Controller.collaboratorController.getCollaboratorById);
// Endpoint para actualziar un colaborador
collaboratorEndPoint.put('/collaborator/put/:id', Controller.collaboratorController.updateCollaborator);
// Endpoint para eliminar un colaborador - se actualiza su estado
collaboratorEndPoint.put('/collaborator/delete/:id', Controller.collaboratorController.deleteCollaborator);

module.exports = collaboratorEndPoint;