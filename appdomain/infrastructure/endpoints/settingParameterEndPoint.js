const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/settingParameterController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/setting/parameter/post', authenticateToken, Controller.settingParameterController.post);
EndPoint.get('/setting/parameter/get', authenticateToken, Controller.settingParameterController.get);
EndPoint.put('/setting/parameter/put/:id', authenticateToken, Controller.settingParameterController.update);
EndPoint.put('/setting/parameter/delete/:id', authenticateToken, Controller.settingParameterController.delete);

module.exports = EndPoint;
