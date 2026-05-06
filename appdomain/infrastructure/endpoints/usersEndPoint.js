const express = require('express');
const usersEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/usersController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar un usuario
usersEndPoint.post('/users/post', authenticateToken, Controller.usersController.postUser);
// Endpoint para consultar todos los usuarios
usersEndPoint.get('/users/get', authenticateToken, Controller.usersController.getUser);
// Endpoint para consultar un usuario
usersEndPoint.get('/users/get/:id', authenticateToken, Controller.usersController.getUserById);
// Endpoint para actualziar un usuario
usersEndPoint.put('/users/put/:id', authenticateToken, Controller.usersController.updateUser);
// Endpoint para eliminar un usuario - se actualiza su estado
usersEndPoint.put('/users/delete/:id', authenticateToken, Controller.usersController.deleteUser);

//Login
usersEndPoint.get('/users/getLogin', Controller.usersController.getLogin);
//InforUser
usersEndPoint.get('/users/getInfoUser', Controller.usersController.getInfoUser);

module.exports = usersEndPoint;
