const express = require('express');
const usersEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/usersController');

// Endpoint para registrar un usuario
usersEndPoint.post('/users/post', Controller.usersController.postUser);
// Endpoint para registrar un usuario
usersEndPoint.get('/users/get/:id', Controller.usersController.getUser);
// Endpoint para registrar un usuario
usersEndPoint.put('/users/put/:id', Controller.usersController.updateUser);
// Endpoint para registrar un usuario
usersEndPoint.delete('/users/delete/:id', Controller.usersController.deleteUser);

module.exports = usersEndPoint;