const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/peripheralController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/peripheral/config/get', authenticateToken, Controller.peripheralController.getConfig);
EndPoint.post('/peripheral/config/post', authenticateToken, Controller.peripheralController.saveConfig);
EndPoint.post('/peripheral/event/post', authenticateToken, Controller.peripheralController.postEvent);
EndPoint.get('/peripheral/event/get/order/:codigo', authenticateToken, Controller.peripheralController.getEventsByOrder);

module.exports = EndPoint;
