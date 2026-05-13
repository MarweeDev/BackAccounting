const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/taxController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/setting/tax/get', authenticateToken, Controller.taxController.get);
EndPoint.post('/setting/tax/post', authenticateToken, Controller.taxController.post);
EndPoint.put('/setting/tax/put/:id', authenticateToken, Controller.taxController.update);
EndPoint.put('/setting/tax/delete/:id', authenticateToken, Controller.taxController.delete);

module.exports = EndPoint;
