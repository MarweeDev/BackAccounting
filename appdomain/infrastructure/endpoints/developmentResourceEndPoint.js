const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/developmentResourceController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/development/resource/post', authenticateToken, Controller.developmentResourceController.post);
EndPoint.get('/development/resource/get', authenticateToken, Controller.developmentResourceController.get);
EndPoint.put('/development/resource/put/:id', authenticateToken, Controller.developmentResourceController.update);
EndPoint.put('/development/resource/delete/:id', authenticateToken, Controller.developmentResourceController.delete);

module.exports = EndPoint;
