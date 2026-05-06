const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/shoppingController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/shopping/post', authenticateToken, Controller.shoppingController.post);
EndPoint.get('/shopping/get', authenticateToken, Controller.shoppingController.get);
EndPoint.get('/shopping/get/:id', authenticateToken, Controller.shoppingController.getById);
EndPoint.put('/shopping/put/:id', authenticateToken, Controller.shoppingController.update);
EndPoint.put('/shopping/delete/:id', authenticateToken, Controller.shoppingController.delete);

module.exports = EndPoint;
