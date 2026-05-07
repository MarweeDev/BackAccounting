const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/componentPermissionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/development/permission/post', authenticateToken, Controller.componentPermissionController.post);
EndPoint.get('/development/permission/get', authenticateToken, Controller.componentPermissionController.get);
EndPoint.put('/development/permission/put/:id', authenticateToken, Controller.componentPermissionController.update);
EndPoint.put('/development/permission/delete/:id', authenticateToken, Controller.componentPermissionController.delete);

module.exports = EndPoint;
