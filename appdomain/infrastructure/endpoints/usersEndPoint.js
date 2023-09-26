const express = require('express');
const usersEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/usersController');

// Endpoint para registrar un usuario
usersEndPoint.post('/users/post', Controller.usersController.postUser);
// Endpoint para consultar todos los usuarios
usersEndPoint.get('/users/get', Controller.usersController.getUser);
// Endpoint para consultar un usuario
usersEndPoint.get('/users/get/:id', Controller.usersController.getUserById);
// Endpoint para actualziar un usuario
usersEndPoint.put('/users/put/:id', Controller.usersController.updateUser);
// Endpoint para eliminar un usuario - se actualiza su estado
usersEndPoint.put('/users/delete/:id', Controller.usersController.deleteUser);

module.exports = usersEndPoint;